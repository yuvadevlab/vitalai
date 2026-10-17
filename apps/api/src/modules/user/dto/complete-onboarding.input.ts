/**
 * @file apps/api/src/modules/user/dto/complete-onboarding.input.ts
 * @description GraphQL InputType capturing full biometrics and onboarding questionnaire answers.
 * @module @vitalai/api/user
 */

import { Field, Float, InputType, Int } from "@nestjs/graphql";
import { BiologicalSex, ActivityLevel, CaloricGoal, LifeStage } from "@vitalai/shared-types";

/**
 * Input payload submitted upon completing the onboarding questionnaire.
 */
@InputType({ description: "Physical vitals and fitness goals questionnaire submission" })
export class CompleteOnboardingInput {
  @Field(() => BiologicalSex, { description: "Biological sex baseline" })
  biologicalSex!: BiologicalSex;

  @Field(() => ActivityLevel, { description: "Current weekly physical activity level" })
  activityLevel!: ActivityLevel;

  @Field(() => CaloricGoal, {
    description: "Primary nutrition goal (deficit, maintenance, surplus)",
  })
  caloricGoal!: CaloricGoal;

  @Field(() => LifeStage, {
    defaultValue: LifeStage.GENERAL_ADULT,
    description: "Life stage classification for physiological adaptations",
  })
  lifeStage!: LifeStage;

  @Field(() => Float, { description: "Current body weight in kilograms" })
  weightKg!: number;

  @Field(() => Float, { description: "Standing height in centimeters" })
  heightCm!: number;

  @Field(() => Int, { description: "Chronological age in years" })
  age!: number;

  @Field(() => [String], {
    defaultValue: [],
    description: "List of available equipment UUIDs selected during onboarding",
  })
  availableEquipment!: string[];

  @Field(() => Boolean, {
    defaultValue: false,
    description: "Whether the user trains predominantly in a home gym setup",
  })
  isHomeGym!: boolean;
}
