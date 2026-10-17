/**
 * @file apps/api/src/modules/prisma/prisma.service.ts
 * @description NestJS lifecycle-aware wrapper around the @vitalai/database PrismaClient.
 * Manages database connection pool initialization and graceful shutdown.
 * @module @vitalai/api/prisma
 */

import { Injectable, type OnModuleInit, type OnModuleDestroy } from "@nestjs/common";
import { Logger } from "@yuva-devlab/logger";
import { prisma, type PrismaClient } from "@vitalai/database";

/**
 * Service providing typed access to the PostgreSQL database via Prisma ORM.
 * Implements lifecycle hooks to coordinate connection pooling with the NestJS container.
 */
@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  /** Direct reference to the singleton Prisma client instance */
  public readonly client: PrismaClient = prisma;

  /**
   * Connects to the PostgreSQL database during module initialization.
   */
  async onModuleInit(): Promise<void> {
    this.logger.info("[onModuleInit] Initializing PostgreSQL database connection pool");
    try {
      await this.client.$connect();
      this.logger.info("[onModuleInit] PostgreSQL database connection established successfully");
    } catch (error) {
      this.logger.error("[onModuleInit] Failed to connect to PostgreSQL database", error);
      throw error;
    }
  }

  /**
   * Gracefully disconnects the connection pool on module destruction.
   */
  async onModuleDestroy(): Promise<void> {
    this.logger.info("[onModuleDestroy] Disconnecting PostgreSQL connection pool");
    await this.client.$disconnect();
    this.logger.info("[onModuleDestroy] PostgreSQL connection pool closed cleanly");
  }
}
