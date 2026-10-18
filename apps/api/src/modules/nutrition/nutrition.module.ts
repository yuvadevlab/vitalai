/**
 * @file apps/api/src/modules/nutrition/nutrition.module.ts
 * @description NestJS module configuring clinical nutrition, meal planning, purine index, and hydration tracking.
 * @module @vitalai/api/nutrition
 */

import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { HealthConditionModule } from "../health-condition/health-condition.module";
import { NutritionRepository } from "./repositories/nutrition.repository";
import { NutritionService } from "./services/nutrition.service";
import { NutritionResolver } from "./resolvers/nutrition.resolver";

@Module({
  imports: [UserModule, HealthConditionModule],
  providers: [NutritionRepository, NutritionService, NutritionResolver],
  exports: [NutritionService, NutritionRepository],
})
export class NutritionModule {}
