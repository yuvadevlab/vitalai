/**
 * @file apps/api/src/modules/nutrition/dto/log-water.input.ts
 * @description GraphQL InputType for incrementing daily hydration logging.
 * @module @vitalai/api/nutrition
 */

import { Field, Float, ID, InputType } from "@nestjs/graphql";

@InputType({ description: "Hydration tracking submission payload" })
export class LogWaterInput {
  @Field(() => ID, { description: "Target DailyMealPlan UUID" })
  dailyMealPlanId!: string;

  @Field(() => Float, { description: "Volume of water consumed in milliliters" })
  waterMl!: number;
}
