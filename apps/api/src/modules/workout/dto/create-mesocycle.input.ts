/**
 * @file apps/api/src/modules/workout/dto/create-mesocycle.input.ts
 * @description GraphQL InputType for generating a new 6-week periodized mesocycle.
 * @module @vitalai/api/workout
 */

import { Field, InputType, Int } from "@nestjs/graphql";

@InputType({ description: "Generation parameters for a personalized 6-week hypertrophy mesocycle" })
export class CreateMesocycleInput {
  @Field(() => String, { description: "Custom mesocycle name" })
  name!: string;

  @Field(() => String, {
    defaultValue: "upper_lower",
    description: "Training split structure",
  })
  split!: string;

  @Field(() => Int, {
    defaultValue: 4,
    description: "Training frequency in days per week (3 to 6)",
  })
  daysPerWeek!: number;
}
