/**
 * @file apps/api/src/app.resolver.ts
 * @description Root GraphQL resolver providing schema-level health query.
 * @module @vitalai/api
 */

import { Field, ObjectType, Query, Resolver } from "@nestjs/graphql";
import { Logger } from "@yuva-devlab/logger";
import { PrismaService } from "./modules/prisma/prisma.service";

/**
 * GraphQL object type representing system health status.
 */
@ObjectType({ description: "System health check response payload" })
export class HealthPingResponse {
  @Field(() => String, { description: "Overall operational status" })
  status!: string;

  @Field(() => String, { description: "ISO timestamp of the health check" })
  timestamp!: string;

  @Field(() => String, { description: "Service identifier" })
  service!: string;

  @Field(() => String, { description: "PostgreSQL connection status" })
  database!: string;
}

/**
 * Root GraphQL resolver exposing the healthPing query.
 */
@Resolver()
export class AppResolver {
  private readonly logger = new Logger(AppResolver.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Health check query executed through the GraphQL Mercurius engine.
   *
   * @returns HealthPingResponse
   */
  @Query(() => HealthPingResponse, {
    name: "healthPing",
    description: "Queries the operational health of the GraphQL gateway and database",
  })
  async healthPing(): Promise<HealthPingResponse> {
    this.logger.info("[healthPing] GraphQL health ping requested");

    let dbStatus = "unreachable";
    try {
      await this.prisma.client.$queryRaw`SELECT 1`;
      dbStatus = "connected";
    } catch (error) {
      this.logger.error("[healthPing] Database health check probe failed", error);
    }

    return {
      status: dbStatus === "connected" ? "ok" : "degraded",
      timestamp: new Date().toISOString(),
      service: "vitalai-api",
      database: dbStatus,
    };
  }
}
