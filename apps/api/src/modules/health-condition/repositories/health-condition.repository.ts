/**
 * @file apps/api/src/modules/health-condition/repositories/health-condition.repository.ts
 * @description Data access repository isolating HealthCondition database operations.
 * Enforces mandatory user tenant scoping across all queries and mutations.
 * @module @vitalai/api/health-condition
 */

import { Injectable } from "@nestjs/common";
import { Logger } from "@yuva-devlab/logger";
import { type HealthCondition } from "@vitalai/database";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateHealthConditionInput } from "../dto/create-health-condition.input";
import { UpdateHealthConditionInput } from "../dto/update-health-condition.input";

/**
 * Repository managing HealthCondition entities in PostgreSQL.
 */
@Injectable()
export class HealthConditionRepository {
  private readonly logger = new Logger(HealthConditionRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Retrieves all health conditions belonging to the user.
   */
  async findAllByUserId(userId: string, activeOnly = false): Promise<HealthCondition[]> {
    this.logger.info(
      `[findAllByUserId] Fetching conditions for user: ${userId} (activeOnly=${activeOnly})`,
    );
    return this.prisma.client.healthCondition.findMany({
      where: {
        userId,
        ...(activeOnly ? { active: true } : {}),
      },
      orderBy: { createdAt: "desc" },
    });
  }

  /**
   * Retrieves a single condition record verifying user ownership.
   */
  async findByIdAndUserId(id: string, userId: string): Promise<HealthCondition | null> {
    this.logger.info(`[findByIdAndUserId] Fetching condition ${id} for user: ${userId}`);
    return this.prisma.client.healthCondition.findFirst({
      where: { id, userId },
    });
  }

  /**
   * Creates a new health condition record for the user.
   */
  async create(userId: string, data: CreateHealthConditionInput): Promise<HealthCondition> {
    this.logger.info(`[create] Creating condition '${data.name}' for user: ${userId}`);
    return this.prisma.client.healthCondition.create({
      data: {
        userId,
        name: data.name,
        category: data.category,
        severity: data.severity,
        notes: data.notes,
        blacklistedMovements: data.blacklistedMovements,
        blacklistedIngredients: data.blacklistedIngredients,
        diagnosedAt: data.diagnosedAt ? new Date(data.diagnosedAt) : null,
      },
    });
  }

  /**
   * Updates an existing condition ensuring ownership.
   */
  async update(userId: string, data: UpdateHealthConditionInput): Promise<HealthCondition> {
    this.logger.info(`[update] Updating condition ${data.id} for user: ${userId}`);
    return this.prisma.client.healthCondition.update({
      where: { id: data.id, userId },
      data: {
        ...(data.severity !== undefined && { severity: data.severity }),
        ...(data.notes !== undefined && { notes: data.notes }),
        ...(data.active !== undefined && { active: data.active }),
        ...(data.blacklistedMovements !== undefined && {
          blacklistedMovements: data.blacklistedMovements,
        }),
        ...(data.blacklistedIngredients !== undefined && {
          blacklistedIngredients: data.blacklistedIngredients,
        }),
      },
    });
  }

  /**
   * Deletes a condition record scoped to the user.
   */
  async delete(id: string, userId: string): Promise<HealthCondition> {
    this.logger.info(`[delete] Deleting condition ${id} for user: ${userId}`);
    return this.prisma.client.healthCondition.delete({
      where: { id, userId },
    });
  }
}
