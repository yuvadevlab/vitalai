/**
 * @file apps/api/src/modules/health-condition/services/health-condition.service.ts
 * @description Business logic service managing health vault conditions and clinical contraindication matching.
 * @module @vitalai/api/health-condition
 */

import { Injectable, NotFoundException } from "@nestjs/common";
import { Logger } from "@yuva-devlab/logger";
import { type HealthCondition } from "@vitalai/database";
import { ConditionCategory, ConditionSeverity } from "@vitalai/shared-types";
import { CONTRAINDICATION_MATRIX } from "@vitalai/constants";
import { HealthConditionRepository } from "../repositories/health-condition.repository";
import { CreateHealthConditionInput } from "../dto/create-health-condition.input";
import { UpdateHealthConditionInput } from "../dto/update-health-condition.input";
import { HealthConditionResponse } from "../dto/health-condition.dto";

/**
 * Service managing user health memories and clinical contraindication guardrails.
 */
@Injectable()
export class HealthConditionService {
  private readonly logger = new Logger(HealthConditionService.name);

  constructor(private readonly repository: HealthConditionRepository) {}

  /**
   * Lists conditions for the user.
   */
  async listConditions(userId: string, activeOnly = false): Promise<HealthConditionResponse[]> {
    this.logger.info(`[listConditions] Listing conditions for user: ${userId}`);
    const conditions = await this.repository.findAllByUserId(userId, activeOnly);
    return conditions.map(this.mapToResponse);
  }

  /**
   * Creates a new condition, auto-populating contraindications from the clinical matrix if recognized.
   */
  async addCondition(
    userId: string,
    input: CreateHealthConditionInput,
  ): Promise<HealthConditionResponse> {
    this.logger.info(`[addCondition] Adding condition '${input.name}' for user: ${userId}`);

    // Check if condition matches known entries in the CONTRAINDICATION_MATRIX
    const normalizedName = input.name.toLowerCase().trim();
    const matrixMatch = CONTRAINDICATION_MATRIX.find(
      (entry) =>
        entry.conditionName.toLowerCase().includes(normalizedName) ||
        normalizedName.includes(entry.conditionName.toLowerCase()),
    );

    let movements = [...input.blacklistedMovements];
    let ingredients = [...input.blacklistedIngredients];

    if (matrixMatch) {
      this.logger.info(
        `[addCondition] Matched clinical rule in CONTRAINDICATION_MATRIX for '${input.name}'`,
      );
      movements = Array.from(new Set([...movements, ...matrixMatch.blacklistedExerciseIds]));
      ingredients = Array.from(new Set([...ingredients, ...matrixMatch.blacklistedFoodTags]));
    }

    const created = await this.repository.create(userId, {
      ...input,
      blacklistedMovements: movements,
      blacklistedIngredients: ingredients,
    });

    return this.mapToResponse(created);
  }

  /**
   * Updates an existing condition.
   */
  async updateCondition(
    userId: string,
    input: UpdateHealthConditionInput,
  ): Promise<HealthConditionResponse> {
    this.logger.info(`[updateCondition] Updating condition ${input.id} for user: ${userId}`);
    const existing = await this.repository.findByIdAndUserId(input.id, userId);
    if (!existing) {
      this.logger.warn(`[updateCondition] Condition ${input.id} not found for user: ${userId}`);
      throw new NotFoundException(`Health condition with ID ${input.id} not found`);
    }

    const updated = await this.repository.update(userId, input);
    return this.mapToResponse(updated);
  }

  /**
   * Deletes a condition from the vault.
   */
  async deleteCondition(userId: string, id: string): Promise<boolean> {
    this.logger.info(`[deleteCondition] Deleting condition ${id} for user: ${userId}`);
    const existing = await this.repository.findByIdAndUserId(id, userId);
    if (!existing) {
      throw new NotFoundException(`Health condition with ID ${id} not found`);
    }

    await this.repository.delete(id, userId);
    return true;
  }

  /**
   * Aggregates all currently active blacklisted movement patterns and ingredients for the user.
   */
  async getActiveContraindications(userId: string): Promise<{
    blacklistedMovements: string[];
    blacklistedIngredients: string[];
  }> {
    const active = await this.repository.findAllByUserId(userId, true);
    const movements = new Set<string>();
    const ingredients = new Set<string>();

    for (const c of active) {
      c.blacklistedMovements.forEach((m) => movements.add(m));
      c.blacklistedIngredients.forEach((i) => ingredients.add(i));
    }

    return {
      blacklistedMovements: Array.from(movements),
      blacklistedIngredients: Array.from(ingredients),
    };
  }

  /**
   * Maps a Prisma HealthCondition record into GraphQL HealthConditionResponse.
   */
  private mapToResponse(condition: HealthCondition): HealthConditionResponse {
    return {
      id: condition.id,
      name: condition.name,
      category: condition.category as unknown as ConditionCategory,
      severity: condition.severity as unknown as ConditionSeverity,
      notes: condition.notes,
      active: condition.active,
      blacklistedMovements: condition.blacklistedMovements,
      blacklistedIngredients: condition.blacklistedIngredients,
      diagnosedAt: condition.diagnosedAt?.toISOString() ?? null,
      createdAt: condition.createdAt.toISOString(),
      updatedAt: condition.updatedAt.toISOString(),
    };
  }
}
