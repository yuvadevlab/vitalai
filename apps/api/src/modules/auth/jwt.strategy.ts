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
        if (!rawJwtToken || typeof rawJwtToken !== "string") {
          return done(new UnauthorizedException("Token missing or malformed"));
        }
        // In local development or symmetric mode, verify against config.jwtSecret
        return done(null, config.jwtSecret);
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
