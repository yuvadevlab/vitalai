/**
 * @file apps/api/src/modules/auth/auth.module.ts
 * @description NestJS module configuring Passport JWT authentication and DevLab SSO integration.
 * @module @vitalai/api/auth
 */

import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [PassportModule.register({ defaultStrategy: "jwt" })],
  providers: [JwtStrategy],
  exports: [PassportModule, JwtStrategy],
})
export class AuthModule {}
