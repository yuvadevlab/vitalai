/**
 * @file apps/api/src/modules/user/dto/user.dto.ts
 * @description GraphQL ObjectTypes representing user profile entities and computed metabolic targets.
 * @module @vitalai/api/user
 */

import { Field, Float, ID, Int, ObjectType, registerEnumType } from "@nestjs/graphql";
import { BiologicalSex, ActivityLevel, CaloricGoal, LifeStage } from "@vitalai/shared-types";

// Register domain enums with GraphQL Code-First schema generator
registerEnumType(BiologicalSex, {
  name: "BiologicalSex",
  description: "Biological sex baseline for basal metabolic rate equations",
});

registerEnumType(ActivityLevel, {
  name: "ActivityLevel",
  description: "Weekly physical activity and exercise frequency tier",
});

registerEnumType(CaloricGoal, {
  name: "CaloricGoal",
  description: "Primary dietary caloric intake strategy relative to maintenance",
});

registerEnumType(LifeStage, {
  name: "LifeStage",
  description: "Physiological life stage (trimesters, postpartum, general adult)",
});

/**
 * GraphQL representation of calculated nutritional metabolic targets.
 */
@ObjectType({ description: "Calculated nutritional metabolic targets" })
export class CaloricTargetsResponse {
  @Field(() => Float, { description: "Basal Metabolic Rate in kilocalories" })
  bmrKcal!: number;

  @Field(() => Float, { description: "Total Daily Energy Expenditure in kilocalories" })
  tdeeKcal!: number;

  @Field(() => Float, { description: "Target daily caloric intake" })
  targetCalories!: number;

  @Field(() => Float, { description: "Target daily protein in grams" })
  targetProteinGrams!: number;

  @Field(() => Float, { description: "Target daily carbohydrates in grams" })
  targetCarbsGrams!: number;

  @Field(() => Float, { description: "Target daily dietary fats in grams" })
  targetFatsGrams!: number;
}

/**
 * GraphQL representation of the authenticated user profile entity.
 */
@ObjectType({ description: "User profile entity with physical metrics and vitals" })
export class UserProfileResponse {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  email!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String, { nullable: true })
  avatarUrl?: string | null;

  @Field(() => Boolean)
  onboardingCompleted!: boolean;

  @Field(() => BiologicalSex, { nullable: true })
  biologicalSex?: BiologicalSex | null;

  @Field(() => ActivityLevel, { nullable: true })
  activityLevel?: ActivityLevel | null;

  @Field(() => CaloricGoal, { nullable: true })
  caloricGoal?: CaloricGoal | null;

  @Field(() => LifeStage)
  lifeStage!: LifeStage;

  @Field(() => Float, { nullable: true })
  weightKg?: number | null;

  @Field(() => Float, { nullable: true })
  heightCm?: number | null;

  @Field(() => Int, { nullable: true })
  age?: number | null;

  @Field(() => [String])
  availableEquipment!: string[];

  @Field(() => Boolean)
  isHomeGym!: boolean;

  @Field(() => CaloricTargetsResponse, {
    nullable: true,
    description: "Calculated metabolic and macronutrient targets based on current vitals",
  })
  caloricTargets?: CaloricTargetsResponse | null;

  @Field(() => String)
  createdAt!: string;

  @Field(() => String)
  updatedAt!: string;
}
