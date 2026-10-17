/**
 * @file apps/api/src/modules/prisma/prisma.module.ts
 * @description Global NestJS module providing the PrismaService singleton across all features.
 * @module @vitalai/api/prisma
 */

import { Global, Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

/**
 * Global module making PrismaService available monorepo-wide without repetitive imports.
 */
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
