/**
 * @file apps/api/src/modules/user/dto/update-profile.input.ts
 * @description GraphQL InputType for partial user profile modifications.
 * @module @vitalai/api/user
 */

import { Field, Float, InputType, Int } from "@nestjs/graphql";
import { ActivityLevel, CaloricGoal, LifeStage } from "@vitalai/shared-types";

/**
 * Input payload for updating select fields on the user profile.
 */
@InputType({ description: "Partial profile modification payload" })
export class UpdateProfileInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  avatarUrl?: string;

  @Field(() => ActivityLevel, { nullable: true })
  activityLevel?: ActivityLevel;

  @Field(() => CaloricGoal, { nullable: true })
  caloricGoal?: CaloricGoal;

  @Field(() => LifeStage, { nullable: true })
  lifeStage?: LifeStage;

  @Field(() => Float, { nullable: true })
  weightKg?: number;

  @Field(() => Float, { nullable: true })
  heightCm?: number;

  @Field(() => Int, { nullable: true })
  age?: number;

  @Field(() => [String], { nullable: true })
  availableEquipment?: string[];

  @Field(() => Boolean, { nullable: true })
  isHomeGym?: boolean;
}
