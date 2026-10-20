/**
 * @file apps/api/src/modules/auth/jwt.strategy.ts
 * @description Passport JWT authentication strategy supporting dual-mode verification:
 * 1. RS256 SSO tokens issued by DevLab Gateway with JWKS verification.
 * 2. HS256 tokens issued locally with symmetric secret verification.
 * Automatically handles Just-In-Time (JIT) provisioning for new SSO accounts.
 * @module @vitalai/api/auth
 */

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Logger } from "@yuva-devlab/logger";
import { config } from "@/config";
import { PrismaService } from "@/modules/prisma/prisma.service";
import type { RequestUser } from "@/common/decorators/current-user.decorator";
import { getDevLabPublicKey } from "./jwks.util";

export interface JwtPayload {
  readonly sub: string;
  readonly email: string;
  readonly name?: string;
  readonly avatarUrl?: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      algorithms: ["HS256", "RS256"],
      secretOrKeyProvider: (
        _req: unknown,
        rawJwtToken: string,
        done: (err: unknown, secretOrKey?: string | Buffer) => void,
      ) => {
        try {
          if (!rawJwtToken || typeof rawJwtToken !== "string") {
            return done(new UnauthorizedException("Token missing or malformed"));
          }

          const parts = rawJwtToken.split(".");
          if (parts.length < 2 || !parts[0]) {
            return done(new UnauthorizedException("Malformed JWT structure"));
          }

          const header = JSON.parse(Buffer.from(parts[0], "base64url").toString("utf-8")) as {
            alg?: string;
            kid?: string;
          };

          if (header.alg === "RS256") {
            const portalApiUrl =
              process.env.DEVLAB_PORTAL_API_URL || process.env.GATEWAY_URL || config.gatewayUrl;
            getDevLabPublicKey(portalApiUrl, header.kid)
              .then((pem) => done(null, pem))
              .catch((err) => {
                this.logger.error("[secretOrKeyProvider] JWKS resolution failed", err);
                done(err);
              });
            return;
          }

          return done(null, config.jwtSecret);
        } catch (parseError) {
          this.logger.error("[secretOrKeyProvider] Error parsing token header", parseError);
          return done(parseError);
        }
      },
    });
  }

  /**
   * Validates the decoded JWT subject.
   * If the user does not exist yet in VitalAI, provisions a new record Just-In-Time (JIT).
   */
  async validate(payload: JwtPayload): Promise<RequestUser> {
    this.logger.info(
      `[validate] Authenticating token for sub=${payload.sub?.slice(0, 8)} email=${payload.email}`,
    );

    let user = await this.prisma.client.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, email: true, name: true, avatarUrl: true, onboardingCompleted: true },
    });

    if (!user && payload.email) {
      const normalizedEmail = payload.email.toLowerCase().trim();
      user = await this.prisma.client.user.findUnique({
        where: { email: normalizedEmail },
        select: { id: true, email: true, name: true, avatarUrl: true, onboardingCompleted: true },
      });
    }

    // Just-In-Time (JIT) provisioning for new SSO accounts
    if (!user && payload.email) {
      const normalizedEmail = payload.email.toLowerCase().trim();
      const userName = payload.name?.trim() || normalizedEmail.split("@")[0] || "VitalAI User";

      this.logger.info(
        `[validate] JIT provisioning new SSO user: ${normalizedEmail} (id: ${payload.sub})`,
      );

      user = await this.prisma.client.user.create({
        data: {
          id: payload.sub,
          email: normalizedEmail,
          name: userName,
          avatarUrl: payload.avatarUrl,
          onboardingCompleted: false,
        },
        select: { id: true, email: true, name: true, avatarUrl: true, onboardingCompleted: true },
      });
    }

    // If still no user found, reject the token
    if (!user) {
      this.logger.warn(
        `[validate] Authorization rejected: user ${payload.sub?.slice(0, 8)} not found`,
      );
      throw new UnauthorizedException("User profile not found or inactive");
    }

    return user;
  }
}
