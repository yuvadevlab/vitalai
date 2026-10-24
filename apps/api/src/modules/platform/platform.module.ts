/**
 * @file apps/api/src/modules/platform/platform.module.ts
 * @description NestJS module for database-driven navigation, LLM catalogs, and platform configurations.
 * @module @vitalai/api/platform
 */

import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { NavService } from "./services/nav.service";
import { LlmCatalogService } from "./services/llm-catalog.service";
import { PlatformConfigService } from "./services/platform-config.service";
import { PlatformResolver } from "./resolvers/platform.resolver";
import { PlatformController } from "./controllers/platform.controller";

@Module({
  imports: [PrismaModule],
  controllers: [PlatformController],
  providers: [NavService, LlmCatalogService, PlatformConfigService, PlatformResolver],
  exports: [NavService, LlmCatalogService, PlatformConfigService],
})
export class PlatformModule {}
