/**
 * @file apps/api/src/modules/platform/services/llm-catalog.service.ts
 * @description Domain service for managing the dynamic database-backed LLM provider and model catalog.
 * @module @vitalai/api/platform
 */

import { Injectable } from "@nestjs/common";
import { Logger } from "@yuva-devlab/logger";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class LlmCatalogService {
  private readonly logger = new Logger(LlmCatalogService.name);

  constructor(private readonly prisma: PrismaService) {}

  async listProviders() {
    this.logger.info("[listProviders] Fetching registered LLM providers from database");
    const providers = await this.prisma.client.llmProvider.findMany({
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
      include: { _count: { select: { models: true } } },
    });

    return providers.map((p) => ({
      ...p,
      modelCount: p._count.models,
    }));
  }

  async listModels(providerId?: string) {
    this.logger.info(
      `[listModels] Fetching LLM model catalog${providerId ? ` for provider: ${providerId}` : ""}`,
    );
    return this.prisma.client.llmModel.findMany({
      where: providerId ? { providerId } : undefined,
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    });
  }

  async getDefaultModel() {
    this.logger.info("[getDefaultModel] Resolving default platform model from database");
    const explicitDefault = await this.prisma.client.llmModel.findFirst({
      where: { isDefault: true, isEnabled: true },
    });
    if (explicitDefault) {
      return explicitDefault;
    }
    return this.prisma.client.llmModel.findFirst({
      where: { isEnabled: true },
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    });
  }
}
