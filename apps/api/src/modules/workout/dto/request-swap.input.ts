/**
 * @file apps/api/src/modules/workout/dto/request-swap.input.ts
 * @description GraphQL InputType for requesting an AI biomechanical exercise substitution.
 * @module @vitalai/api/workout
 */

import { Field, ID, InputType } from "@nestjs/graphql";
import { SwapReason } from "@vitalai/shared-types";

@InputType({ description: "Payload requesting an intelligent exercise replacement" })
export class RequestExerciseSwapInput {
  @Field(() => ID, { description: "Prescribed exercise UUID to replace" })
  prescribedExerciseId!: string;

  @Field(() => SwapReason, {
    description: "Clinical, biomechanical, or logistical reason for swap",
  })
  reason!: SwapReason;
}
