/**
 * @file apps/api/src/modules/platform/controllers/platform.controller.ts
 * @description REST API controller exposing database-backed navigation, models, and platform configs.
 * @module @vitalai/api/platform
 */

import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { NavService } from "../services/nav.service";
import { LlmCatalogService } from "../services/llm-catalog.service";
import { PlatformConfigService } from "../services/platform-config.service";

@ApiTags("Platform")
@Controller("api/v1/platform")
export class PlatformController {
  constructor(
    private readonly navService: NavService,
    private readonly llmService: LlmCatalogService,
    private readonly configService: PlatformConfigService,
  ) {}

  @Get("nav")
  @ApiOperation({ summary: "Get active application navigation and menu items from database" })
  async getNavItems() {
    return this.navService.listNavItems();
  }

  @Get("providers")
  @ApiOperation({ summary: "Get registered LLM inference providers from database" })
  async getProviders() {
    return this.llmService.listProviders();
  }

  @Get("models")
  @ApiOperation({ summary: "Get LLM models catalog from database" })
  async getModels(@Query("providerId") providerId?: string) {
    return this.llmService.listModels(providerId);
  }

  @Get("configs/:namespace")
  @ApiOperation({ summary: "Get platform configurations by namespace from database" })
  async getConfigsByNamespace(@Param("namespace") namespace: string) {
    return this.configService.getConfigsByNamespace(namespace);
  }

  @Get("configs/:namespace/:key")
  @ApiOperation({ summary: "Get a specific platform configuration from database" })
  async getConfig(@Param("namespace") namespace: string, @Param("key") key: string) {
    return this.configService.getConfig(namespace, key);
  }
}
