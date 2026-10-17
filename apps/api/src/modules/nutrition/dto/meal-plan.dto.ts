/**
 * @file apps/api/src/modules/nutrition/dto/meal-plan.dto.ts
 * @description GraphQL ObjectTypes for daily meal plans, purine risk evaluations, and glycemic load curves.
 * @module @vitalai/api/nutrition
 */

import { Field, Float, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
import { PurineRiskLevel, GlycemicLoadStatus } from "@vitalai/shared-types";
import { MealItemResponse } from "./meal-item.dto";

registerEnumType(PurineRiskLevel, {
  name: "PurineRiskLevel",
  description: "Clinical purine risk assessment tier for gout crystal prophylaxis",
});

registerEnumType(GlycemicLoadStatus, {
  name: "GlycemicLoadStatus",
  description: "Evaluation of daily postprandial glycemic excursions and peri-workout carb timing",
});

@ObjectType({ description: "Clinical evaluation of daily purine intake" })
export class PurineRiskReportResponse {
  @Field(() => Float)
  totalPurineMg!: number;

  @Field(() => Float)
  safeCeilingMg!: number;

  @Field(() => Boolean)
  isInSafeZone!: boolean;

  @Field(() => PurineRiskLevel)
  riskLevel!: PurineRiskLevel;

  @Field(() => [String])
  offendingFoods!: string[];
}

@ObjectType({ description: "Daily glycemic load analysis and carb timing efficiency" })
export class GlycemicLoadReportResponse {
  @Field(() => Float)
  totalDailyGl!: number;

  @Field(() => Float)
  periWorkoutGlPercentage!: number;

  @Field(() => GlycemicLoadStatus)
  status!: GlycemicLoadStatus;
}

@ObjectType({ description: "Comprehensive daily nutrition blueprint and meal tracking ledger" })
export class DailyMealPlanResponse {
  @Field(() => ID)
  id!: string;

  @Field(() => String, { description: "ISO date format YYYY-MM-DD" })
  date!: string;

  @Field(() => Float)
  targetCalories!: number;

  @Field(() => Float)
  targetProtein!: number;

  @Field(() => Float)
  targetCarbs!: number;

  @Field(() => Float)
  targetFats!: number;

  @Field(() => Float)
  targetWaterMl!: number;

  @Field(() => Float)
  waterLoggedMl!: number;

  @Field(() => [MealItemResponse])
  meals!: MealItemResponse[];

  @Field(() => PurineRiskReportResponse, { nullable: true })
  purineRiskReport?: PurineRiskReportResponse | null;

  @Field(() => GlycemicLoadReportResponse, { nullable: true })
  glycemicLoadReport?: GlycemicLoadReportResponse | null;

  @Field(() => String)
  createdAt!: string;

  @Field(() => String)
  updatedAt!: string;
}
