/**
 * @file apps/api/src/modules/workout/dto/exercise.dto.ts
 * @description GraphQL ObjectTypes for prescribed exercises, set logs, and exercise swaps.
 * @module @vitalai/api/workout
 */

import { Field, Float, ID, Int, ObjectType, registerEnumType } from "@nestjs/graphql";
import { ExerciseCategory, SwapReason, MuscleGroup } from "@vitalai/shared-types";

registerEnumType(ExerciseCategory, {
  name: "ExerciseCategory",
  description: "Biomechanical category (compound, accessory, isolation)",
});

registerEnumType(SwapReason, {
  name: "SwapReason",
  description: "Trigger rationale for an exercise substitution",
});

registerEnumType(MuscleGroup, {
  name: "MuscleGroup",
  description: "Anatomical muscle group target",
});

@ObjectType({ description: "Live set logging record" })
export class SetLogResponse {
  @Field(() => ID)
  id!: string;

  @Field(() => Int)
  setNumber!: number;

  @Field(() => Int)
  targetReps!: number;

  @Field(() => Int, { nullable: true })
  actualReps?: number | null;

  @Field(() => Float)
  targetRir!: number;

  @Field(() => Float, { nullable: true })
  actualRir?: number | null;

  @Field(() => Float, { nullable: true })
  weightKg?: number | null;

  @Field(() => Boolean)
  completed!: boolean;

  @Field(() => Int)
  restSeconds!: number;

  @Field(() => String, { nullable: true })
  completedAt?: string | null;
}

@ObjectType({ description: "AI biomechanical exercise swap proposal" })
export class ExerciseSwapResponse {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  originalName!: string;

  @Field(() => String)
  proposedName!: string;

  @Field(() => SwapReason)
  reason!: SwapReason;

  @Field(() => String)
  biomechanicalRationale!: string;

  @Field(() => Float)
  fatigueReductionFactor!: number;

  @Field(() => Boolean)
  accepted!: boolean;
}

@ObjectType({ description: "Prescribed movement within a training session" })
export class PrescribedExerciseResponse {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  exerciseId!: string;

  @Field(() => String)
  name!: string;

  @Field(() => MuscleGroup)
  targetMuscle!: MuscleGroup;

  @Field(() => ExerciseCategory)
  category!: ExerciseCategory;

  @Field(() => Int)
  orderIndex!: number;

  @Field(() => String)
  tempo!: string;

  @Field(() => Int)
  restSeconds!: number;

  @Field(() => String, { nullable: true })
  notes?: string | null;

  @Field(() => [SetLogResponse])
  sets!: SetLogResponse[];

  @Field(() => [ExerciseSwapResponse])
  swaps!: ExerciseSwapResponse[];
}
