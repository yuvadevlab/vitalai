/**
 * @file apps/api/src/modules/user/user.module.ts
 * @description NestJS module configuring User domain layer: DTOs, repository, service, and resolver.
 * @module @vitalai/api/user
 */

import { Module } from "@nestjs/common";
import { UserRepository } from "./repositories/user.repository";
import { UserService } from "./services/user.service";
import { UserResolver } from "./resolvers/user.resolver";

/**
 * Module providing user management and profile capabilities.
 */
@Module({
  providers: [UserRepository, UserService, UserResolver],
  exports: [UserService, UserRepository],
})
export class UserModule {}
