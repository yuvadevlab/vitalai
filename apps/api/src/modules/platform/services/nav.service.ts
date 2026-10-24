/**
 * @file apps/api/src/modules/platform/services/nav.service.ts
 * @description Domain service for managing application menu and navigation items from PostgreSQL.
 * @module @vitalai/api/platform
 */

import { Injectable } from "@nestjs/common";
import { Logger } from "@yuva-devlab/logger";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class NavService {
  private readonly logger = new Logger(NavService.name);

  constructor(private readonly prisma: PrismaService) {}

  async listNavItems() {
    this.logger.info("[listNavItems] Fetching active navigation items from database");
    return this.prisma.client.navItem.findMany({
      where: { isVisible: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });
  }
}
