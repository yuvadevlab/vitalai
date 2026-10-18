/**
 * @file apps/api/src/modules/workout/dto/volume.dto.ts
 * @description GraphQL ObjectType for hypertrophy volume landmarks assessment.
 * @module @vitalai/api/workout
 */

import { Field, Int, ObjectType, registerEnumType } from "@nestjs/graphql";
import { MuscleGroup, VolumeStatus } from "@vitalai/shared-types";

registerEnumType(VolumeStatus, {
  name: "VolumeStatus",
  description: "Hypertrophy volume tier relative to MEV, MAV, and MRV",
});

@ObjectType({ description: "Hypertrophy volume landmark status for an anatomical muscle group" })
export class VolumeSummaryResponse {
  @Field(() => MuscleGroup)
  muscle!: MuscleGroup;

  @Field(() => Int)
  currentWeeklySets!: number;

  @Field(() => Int)
  mev!: number;

  @Field(() => Int)
  mav!: number;

  @Field(() => Int)
  mrv!: number;

  @Field(() => VolumeStatus)
  status!: VolumeStatus;
}
