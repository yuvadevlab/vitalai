/**
 * @file apps/api/src/modules/workout/dto/mesocycle.dto.ts
 * @description GraphQL ObjectTypes for 6-week mesocycles and workout session days.
 * @module @vitalai/api/workout
 */

import { Field, ID, Int, ObjectType, registerEnumType } from "@nestjs/graphql";
import { MesocyclePhase } from "@vitalai/shared-types";
import { PrescribedExerciseResponse } from "./exercise.dto";

registerEnumType(MesocyclePhase, {
  name: "MesocyclePhase",
  description: "Periodization phase (baseline, overload, peak, deload)",
});

@ObjectType({ description: "Single training session day in the mesocycle" })
export class WorkoutSessionResponse {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => Int)
  weekNumber!: number;

  @Field(() => Int)
  dayNumber!: number;

  @Field(() => MesocyclePhase)
  phase!: MesocyclePhase;

  @Field(() => Int)
  estimatedDurationMins!: number;

  @Field(() => Boolean)
  completed!: boolean;

  @Field(() => String, { nullable: true })
  completedAt?: string | null;

  @Field(() => [PrescribedExerciseResponse])
  exercises!: PrescribedExerciseResponse[];
}

@ObjectType({ description: "6-week periodized hypertrophy mesocycle" })
export class MesocycleResponse {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => Int)
  currentWeek!: number;

  @Field(() => Int)
  totalWeeks!: number;

  @Field(() => MesocyclePhase)
  phase!: MesocyclePhase;

  @Field(() => Boolean)
  active!: boolean;

  @Field(() => [WorkoutSessionResponse])
  sessions!: WorkoutSessionResponse[];

  @Field(() => String)
  createdAt!: string;
}
