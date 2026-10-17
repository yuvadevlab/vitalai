/**
 * @file apps/api/src/modules/platform/services/platform-config.service.ts
 * @description Dynamic database-backed configuration service with in-memory TTL cache.
 * Eliminates hardcoded constants across branding, hypertrophy volume, and nutrition defaults.
 * @module @vitalai/api/platform
 */

import { Injectable } from "@nestjs/common";
import { Logger } from "@yuva-devlab/logger";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class PlatformConfigService {
  private readonly logger = new Logger(PlatformConfigService.name);
  private readonly cache = new Map<string, { value: unknown; expiresAt: number }>();
  private readonly CACHE_TTL_MS = 15_000;

  constructor(private readonly prisma: PrismaService) {}

  async getConfig(namespace: string, key: string) {
    const cacheKey = `${namespace}:${key}`;
    const cached = this.cache.get(cacheKey);
    const now = Date.now();

    if (cached && cached.expiresAt > now) {
      return cached.value;
    }

    this.logger.info(`[getConfig] Cache miss for config ${namespace}.${key}`);
    const record = await this.prisma.client.platformConfig.findUnique({
      where: {
        namespace_key: { namespace, key },
      },
    });

    if (!record) {
      return null;
    }

    this.cache.set(cacheKey, {
      value: record.value,
      expiresAt: now + this.CACHE_TTL_MS,
    });

    return record.value;
  }

  async getConfigsByNamespace(namespace: string) {
    this.logger.info(`[getConfigsByNamespace] Fetching configurations for namespace: ${namespace}`);
    return this.prisma.client.platformConfig.findMany({
      where: { namespace },
      orderBy: { key: "asc" },
    });
  }

  async getAllConfigs() {
    this.logger.info("[getAllConfigs] Fetching all platform configurations from database");
    return this.prisma.client.platformConfig.findMany({
      orderBy: [{ namespace: "asc" }, { key: "asc" }],
    });
  }
}
