/**
 * @file apps/api/src/modules/platform/resolvers/platform.resolver.ts
 * @description GraphQL resolver exposing dynamic database-backed navigation, LLM catalogs, and platform configs.
 * @module @vitalai/api/platform
 */

import { Args, Query, Resolver } from "@nestjs/graphql";
import {
  NavItemResponse,
  LlmProviderResponse,
  LlmModelResponse,
  PlatformConfigResponse,
} from "../dto/platform.dto";
import { NavService } from "../services/nav.service";
import { LlmCatalogService } from "../services/llm-catalog.service";
import { PlatformConfigService } from "../services/platform-config.service";

@Resolver()
export class PlatformResolver {
  constructor(
    private readonly navService: NavService,
    private readonly llmService: LlmCatalogService,
    private readonly configService: PlatformConfigService,
  ) {}

  @Query(() => [NavItemResponse], {
    description: "Fetches active navigation and menu items configured in the database",
  })
  async navItems(): Promise<NavItemResponse[]> {
    const items = await this.navService.listNavItems();
    return items.map((i) => ({
      id: i.id,
      label: i.label,
      icon: i.icon,
      href: i.href,
      roles: i.roles,
      section: i.section,
      isVisible: i.isVisible,
      isEnabled: i.isEnabled,
      sortOrder: i.sortOrder,
    }));
  }

  @Query(() => [LlmProviderResponse], {
    description: "Fetches registered LLM inference providers from the database",
  })
  async llmProviders(): Promise<LlmProviderResponse[]> {
    const providers = await this.llmService.listProviders();
    return providers.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      providerType: p.providerType,
      description: p.description,
      baseUrl: p.baseUrl,
      isEnabled: p.isEnabled,
      sortOrder: p.sortOrder,
      modelCount: p.modelCount,
    }));
  }

  @Query(() => [LlmModelResponse], {
    description: "Fetches available LLM models from the database catalog",
  })
  async llmModels(
    @Args("providerId", { type: () => String, nullable: true }) providerId?: string,
  ): Promise<LlmModelResponse[]> {
    const models = await this.llmService.listModels(providerId);
    return models.map((m) => ({
      id: m.id,
      providerId: m.providerId,
      name: m.name,
      modelIdentifier: m.modelIdentifier,
      description: m.description,
      contextWindow: m.contextWindow,
      isDefault: m.isDefault,
      isEnabled: m.isEnabled,
      sortOrder: m.sortOrder,
    }));
  }

  @Query(() => [PlatformConfigResponse], {
    description: "Fetches platform configurations by namespace from the database",
  })
  async platformConfigs(
    @Args("namespace", { type: () => String }) namespace: string,
  ): Promise<PlatformConfigResponse[]> {
    const configs = await this.configService.getConfigsByNamespace(namespace);
    return configs.map((c) => ({
      id: c.id,
      namespace: c.namespace,
      key: c.key,
      value: typeof c.value === "string" ? c.value : JSON.stringify(c.value),
      description: c.description,
      createdAt: c.createdAt.toISOString(),
      updatedAt: c.updatedAt.toISOString(),
    }));
  }
}
