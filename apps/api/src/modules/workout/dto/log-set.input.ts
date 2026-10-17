/**
 * @file apps/api/src/modules/workout/dto/log-set.input.ts
 * @description GraphQL InputType for recording completed workout sets in the active gym HUD.
 * @module @vitalai/api/workout
 */

import { Field, Float, ID, InputType, Int } from "@nestjs/graphql";

@InputType({ description: "Telemetry payload for logging a completed exercise set" })
export class LogSetInput {
  @Field(() => ID, { description: "Target SetLog record UUID" })
  setId!: string;

  @Field(() => Int, { description: "Actual repetitions performed" })
  actualReps!: number;

  @Field(() => Float, { description: "Actual Reps in Reserve (RIR) observed" })
  actualRir!: number;

  @Field(() => Float, { description: "Weight used in kilograms" })
  weightKg!: number;

  @Field(() => Boolean, { defaultValue: true, description: "Marks set as successfully finished" })
  completed!: boolean;
}
