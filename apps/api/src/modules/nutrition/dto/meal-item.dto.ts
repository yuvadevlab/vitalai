/**
 * @file apps/api/src/modules/nutrition/dto/meal-item.dto.ts
 * @description GraphQL ObjectType for logged meal items, macronutrients, and metabolic indicators.
 * @module @vitalai/api/nutrition
 */

import { Field, Float, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
import { MealType } from "@vitalai/shared-types";

registerEnumType(MealType, {
  name: "MealType",
  description: "Chronological meal schedule slot (breakfast, lunch, dinner, snack, post_workout)",
});

@ObjectType({ description: "Single food item or recipe logged within a daily meal plan" })
export class MealItemResponse {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => MealType)
  mealType!: MealType;

  @Field(() => Float)
  calories!: number;

  @Field(() => Float)
  protein!: number;

  @Field(() => Float)
  carbs!: number;

  @Field(() => Float)
  fats!: number;

  @Field(() => Float, { description: "Purine content in milligrams" })
  purineMg!: number;

  @Field(() => Float, { description: "Calculated Glycemic Load (GL) score" })
  glycemicLoad!: number;

  @Field(() => [String], { description: "Clinical food classification tags" })
  tags!: string[];

  @Field(() => String)
  createdAt!: string;
}
