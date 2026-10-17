/**
 * @file apps/api/src/modules/nutrition/dto/add-meal-item.input.ts
 * @description GraphQL InputType for recording a food item in a daily meal plan.
 * @module @vitalai/api/nutrition
 */

import { Field, Float, ID, InputType } from "@nestjs/graphql";
import { MealType } from "@vitalai/shared-types";

@InputType({ description: "Food item submission payload" })
export class AddMealItemInput {
  @Field(() => ID, { description: "Target DailyMealPlan UUID" })
  dailyMealPlanId!: string;

  @Field(() => String, { description: "Food name or culinary recipe" })
  name!: string;

  @Field(() => MealType, { description: "Meal slot category" })
  mealType!: MealType;

  @Field(() => Float, { description: "Total calories in kcal" })
  calories!: number;

  @Field(() => Float, { description: "Protein content in grams" })
  protein!: number;

  @Field(() => Float, { description: "Carbohydrates in grams" })
  carbs!: number;

  @Field(() => Float, { description: "Dietary fats in grams" })
  fats!: number;

  @Field(() => Float, { defaultValue: 0, description: "Purine content in mg" })
  purineMg!: number;

  @Field(() => Float, { defaultValue: 0, description: "Glycemic Load score" })
  glycemicLoad!: number;

  @Field(() => [String], { defaultValue: [], description: "Dietary classification tags" })
  tags!: string[];
}
