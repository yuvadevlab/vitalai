/**
 * @file apps/api/src/modules/health-condition/resolvers/health-condition.resolver.ts
 * @description GraphQL resolver exposing Health Vault queries and mutations.
 * @module @vitalai/api/health-condition
 */

import { UseGuards } from "@nestjs/common";
import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Logger } from "@yuva-devlab/logger";
import { JwtAuthGuard } from "../../../common/guards/jwt-auth.guard";
import { CurrentUser, type RequestUser } from "../../../common/decorators/current-user.decorator";
import { HealthConditionService } from "../services/health-condition.service";
import { HealthConditionResponse } from "../dto/health-condition.dto";
import { CreateHealthConditionInput } from "../dto/create-health-condition.input";
import { UpdateHealthConditionInput } from "../dto/update-health-condition.input";

/**
 * Resolver managing clinical health memories and contraindications.
 */
@Resolver(() => HealthConditionResponse)
@UseGuards(JwtAuthGuard)
export class HealthConditionResolver {
  private readonly logger = new Logger(HealthConditionResolver.name);

  constructor(private readonly service: HealthConditionService) {}

  /**
   * Queries all medical conditions in the user Health Vault.
   */
  @Query(() => [HealthConditionResponse], {
    name: "healthConditions",
    description: "Lists all medical conditions and restrictions recorded in the user Health Vault",
  })
  async getHealthConditions(
    @CurrentUser() user: RequestUser,
    @Args("activeOnly", { type: () => Boolean, defaultValue: false, nullable: true })
    activeOnly: boolean,
  ): Promise<HealthConditionResponse[]> {
    this.logger.info(`[getHealthConditions] Query requested by user: ${user.id}`);
    return this.service.listConditions(user.id, activeOnly);
  }

  /**
   * Adds a medical condition to the user Health Vault.
   */
  @Mutation(() => HealthConditionResponse, {
    name: "addHealthCondition",
    description:
      "Adds a medical condition, injury, or dietary restriction with automatic contraindication mapping",
  })
  async addHealthCondition(
    @CurrentUser() user: RequestUser,
    @Args("input") input: CreateHealthConditionInput,
  ): Promise<HealthConditionResponse> {
    this.logger.info(`[addHealthCondition] Mutation requested by user: ${user.id}`);
    return this.service.addCondition(user.id, input);
  }

  /**
   * Updates an existing condition in the Health Vault.
   */
  @Mutation(() => HealthConditionResponse, {
    name: "updateHealthCondition",
    description: "Updates condition severity, active status, or blacklisted items",
  })
  async updateHealthCondition(
    @CurrentUser() user: RequestUser,
    @Args("input") input: UpdateHealthConditionInput,
  ): Promise<HealthConditionResponse> {
    this.logger.info(`[updateHealthCondition] Mutation requested by user: ${user.id}`);
    return this.service.updateCondition(user.id, input);
  }

  /**
   * Removes a condition record from the Health Vault.
   */
  @Mutation(() => Boolean, {
    name: "deleteHealthCondition",
    description: "Permanently removes a condition from the user Health Vault",
  })
  async deleteHealthCondition(
    @CurrentUser() user: RequestUser,
    @Args("id", { type: () => ID }) id: string,
  ): Promise<boolean> {
    this.logger.info(
      `[deleteHealthCondition] Deleting condition ${id} requested by user: ${user.id}`,
    );
    return this.service.deleteCondition(user.id, id);
  }
}
