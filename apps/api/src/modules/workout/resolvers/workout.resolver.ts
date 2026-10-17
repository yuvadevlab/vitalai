/**
 * @file apps/api/src/modules/workout/resolvers/workout.resolver.ts
 * @description GraphQL resolver for periodized workout sessions, mesocycles, set logging, and swaps.
 * @module @vitalai/api/workout
 */

import { UseGuards } from "@nestjs/common";
import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Logger } from "@yuva-devlab/logger";
import { MuscleGroup } from "@vitalai/shared-types";
import { JwtAuthGuard } from "../../../common/guards/jwt-auth.guard";
import { CurrentUser, type RequestUser } from "../../../common/decorators/current-user.decorator";
import { WorkoutService } from "../services/workout.service";
import {
  MesocycleResponse,
  WorkoutSessionResponse,
  SetLogResponse,
  ExerciseSwapResponse,
  VolumeSummaryResponse,
  CreateMesocycleInput,
  LogSetInput,
  RequestExerciseSwapInput,
} from "../dto";

@Resolver()
@UseGuards(JwtAuthGuard)
export class WorkoutResolver {
  private readonly logger = new Logger(WorkoutResolver.name);

  constructor(private readonly service: WorkoutService) {}

  @Query(() => MesocycleResponse, {
    name: "activeMesocycle",
    nullable: true,
    description: "Fetches current active 6-week hypertrophy mesocycle",
  })
  async getActiveMesocycle(@CurrentUser() user: RequestUser) {
    this.logger.info(`[getActiveMesocycle] Query called by user: ${user.id}`);
    return this.service.getActiveMesocycle(user.id);
  }

  @Query(() => WorkoutSessionResponse, {
    name: "workoutSession",
    description: "Fetches a specific workout session day",
  })
  async getSession(
    @CurrentUser() user: RequestUser,
    @Args("sessionId", { type: () => ID }) sessionId: string,
  ) {
    this.logger.info(`[getSession] Query session ${sessionId} called by user: ${user.id}`);
    return this.service.getSession(sessionId, user.id);
  }

  @Query(() => VolumeSummaryResponse, {
    name: "volumeSummary",
    description: "Evaluates hypertrophy volume status against MEV, MAV, and MRV",
  })
  getVolumeSummary(
    @Args("muscle", { type: () => MuscleGroup }) muscle: MuscleGroup,
    @Args("weeklySets", { type: () => Number, defaultValue: 12 }) weeklySets: number,
  ) {
    return this.service.getVolumeSummary(muscle, weeklySets);
  }

  @Mutation(() => MesocycleResponse, {
    name: "createMesocycle",
    description: "Generates a periodized 6-week hypertrophy mesocycle",
  })
  async createMesocycle(
    @CurrentUser() user: RequestUser,
    @Args("input") input: CreateMesocycleInput,
  ) {
    this.logger.info(`[createMesocycle] Generating mesocycle for user: ${user.id}`);
    return this.service.createMesocycle(user.id, input);
  }

  @Mutation(() => SetLogResponse, {
    name: "logSet",
    description: "Records set performance (weight, actual reps, actual RIR)",
  })
  async logSet(@Args("input") input: LogSetInput) {
    this.logger.info(`[logSet] Set log update called for set: ${input.setId}`);
    return this.service.logSet(input);
  }

  @Mutation(() => ExerciseSwapResponse, {
    name: "requestExerciseSwap",
    description: "Requests an intelligent exercise substitution based on biomechanics or equipment",
  })
  async requestExerciseSwap(
    @CurrentUser() user: RequestUser,
    @Args("input") input: RequestExerciseSwapInput,
  ) {
    this.logger.info(`[requestExerciseSwap] Request swap called by user: ${user.id}`);
    return this.service.requestExerciseSwap(user.id, input);
  }

  @Mutation(() => Boolean, {
    name: "acceptExerciseSwap",
    description: "Applies proposed exercise substitution to the workout session",
  })
  async acceptExerciseSwap(
    @Args("swapId", { type: () => ID }) swapId: string,
    @Args("prescribedExerciseId", { type: () => ID }) prescribedExerciseId: string,
    @Args("proposedExerciseId", { type: () => String }) proposedExerciseId: string,
    @Args("proposedName", { type: () => String }) proposedName: string,
  ) {
    return this.service.acceptExerciseSwap(
      swapId,
      prescribedExerciseId,
      proposedExerciseId,
      proposedName,
    );
  }
}
