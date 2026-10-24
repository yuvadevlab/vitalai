/**
 * @file apps/api/src/modules/health-condition/health-condition.module.ts
 * @description NestJS module configuring Health Vault medical conditions and clinical contraindications.
 * @module @vitalai/api/health-condition
 */

import { Module } from "@nestjs/common";
import { HealthConditionRepository } from "./repositories/health-condition.repository";
import { HealthConditionService } from "./services/health-condition.service";
import { HealthConditionResolver } from "./resolvers/health-condition.resolver";

/**
 * Module providing Health Vault and contraindication guardrail capabilities.
 */
@Module({
  providers: [HealthConditionRepository, HealthConditionService, HealthConditionResolver],
  exports: [HealthConditionService, HealthConditionRepository],
})
export class HealthConditionModule {}
