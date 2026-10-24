/**
 * @file apps/api/src/modules/workout/workout.module.ts
 * @description NestJS module configuring periodized workout generation, set logging, and biomechanical swaps.
 * @module @vitalai/api/workout
 */

import { Module } from "@nestjs/common";
import { HealthConditionModule } from "../health-condition/health-condition.module";
import { WorkoutRepository } from "./repositories/workout.repository";
import { WorkoutService } from "./services/workout.service";
import { WorkoutResolver } from "./resolvers/workout.resolver";
import { PrescribedExerciseResolver } from "./resolvers/prescribed-exercise.resolver";

@Module({
  imports: [HealthConditionModule],
  providers: [WorkoutRepository, WorkoutService, WorkoutResolver, PrescribedExerciseResolver],
  exports: [WorkoutService, WorkoutRepository],
})
export class WorkoutModule {}
