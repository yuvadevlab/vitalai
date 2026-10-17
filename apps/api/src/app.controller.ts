/**
 * @file apps/api/src/app.controller.ts
 * @description Root REST controller serving system health checks and database connectivity probes.
 * @module @vitalai/api
 */

import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Logger } from "@yuva-devlab/logger";
import { PrismaService } from "./modules/prisma/prisma.service";

/**
 * Controller exposing root liveness and readiness health endpoints.
 */
@ApiTags("Health")
@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Health probe verifying both API process uptime and PostgreSQL connectivity.
   *
   * @returns Health status payload with timestamp and database state
   */
  @Get("health")
  @ApiOperation({ summary: "System liveness and database readiness probe" })
  @ApiResponse({ status: 200, description: "System is healthy and database is connected" })
  @ApiResponse({ status: 503, description: "Database is unreachable" })
  async getHealth(): Promise<{
    status: string;
    timestamp: string;
    service: string;
    database: string;
  }> {
    this.logger.info("[getHealth] Health check requested");

    let dbStatus = "unreachable";
    try {
      // Direct raw query probe to verify live database response
      await this.prisma.client.$queryRaw`SELECT 1`;
      dbStatus = "connected";
    } catch (error) {
      this.logger.error("[getHealth] Database health probe failed", error);
    }

    return {
      status: dbStatus === "connected" ? "ok" : "degraded",
      timestamp: new Date().toISOString(),
      service: "vitalai-api",
      database: dbStatus,
    };
  }
}
