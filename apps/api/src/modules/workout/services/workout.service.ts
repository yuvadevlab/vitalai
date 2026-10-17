/**
 * @file apps/api/src/modules/workout/services/workout.service.ts
 * @description Business logic service generating 6-week mesocycles, volume checks, and exercise swaps.
 * @module @vitalai/api/workout
 */

import { Injectable, NotFoundException } from "@nestjs/common";
import { Logger } from "@yuva-devlab/logger";
import {
  type MesocyclePhase as PrismaMesocyclePhase,
  type SwapReason as PrismaSwapReason,
} from "@vitalai/database";
import { MesocyclePhase, MuscleGroup, SwapReason } from "@vitalai/shared-types";
import { getVolumeLandmarks, evaluateVolumeStatus } from "@vitalai/vital-engine";
import { EXERCISE_TAXONOMY } from "@vitalai/constants";
import { WorkoutRepository } from "../repositories/workout.repository";
import { HealthConditionService } from "../../health-condition/services/health-condition.service";
import {
  CreateMesocycleInput,
  LogSetInput,
  RequestExerciseSwapInput,
  VolumeSummaryResponse,
} from "../dto";
import { generateMesocycleSessionsData } from "../utils/workout-generator.util";

@Injectable()
export class WorkoutService {
  private readonly logger = new Logger(WorkoutService.name);

  constructor(
    private readonly repository: WorkoutRepository,
    private readonly healthService: HealthConditionService,
  ) {}

  async getActiveMesocycle(userId: string) {
    this.logger.info(`[getActiveMesocycle] Fetching for user: ${userId}`);
    return this.repository.findActiveMesocycle(userId);
  }

  async getSession(sessionId: string, userId: string) {
    this.logger.info(`[getSession] Fetching session ${sessionId} for user: ${userId}`);
    const session = await this.repository.findSessionById(sessionId, userId);
    if (!session) {
      throw new NotFoundException(`Workout session ${sessionId} not found`);
    }
    return session;
  }

  async createMesocycle(userId: string, input: CreateMesocycleInput) {
    this.logger.info(
      `[createMesocycle] Generating 6-week mesocycle '${input.name}' for user: ${userId}`,
    );
    const contraindications = await this.healthService.getActiveContraindications(userId);
    const blacklisted = new Set(contraindications.blacklistedMovements);

    await this.repository.deactivateActiveMesocycles(userId);

    const safeExercises = EXERCISE_TAXONOMY.filter(
      (e) => !blacklisted.has(e.id) && !blacklisted.has(e.name),
    );
    const sessionsData = generateMesocycleSessionsData(input.daysPerWeek, safeExercises);

    return this.repository.createMesocycleTree({
      user: { connect: { id: userId } },
      name: input.name,
      currentWeek: 1,
      totalWeeks: 6,
      phase: MesocyclePhase.BASELINE as unknown as PrismaMesocyclePhase,
      active: true,
      sessions: { create: sessionsData },
    });
  }

  async logSet(input: LogSetInput) {
    this.logger.info(`[logSet] Logging set ${input.setId}`);
    return this.repository.updateSetLog(input.setId, {
      actualReps: input.actualReps,
      actualRir: input.actualRir,
      weightKg: input.weightKg,
      completed: input.completed,
    });
  }

  async requestExerciseSwap(userId: string, input: RequestExerciseSwapInput) {
    this.logger.info(
      `[requestExerciseSwap] Swap requested for exercise: ${input.prescribedExerciseId}`,
    );
    const exercise = await this.repository.findPrescribedExercise(
      input.prescribedExerciseId,
      userId,
    );
    if (!exercise) {
      throw new NotFoundException(`Prescribed exercise ${input.prescribedExerciseId} not found`);
    }

    const currentTaxonomy = EXERCISE_TAXONOMY.find((e) => e.id === exercise.exerciseId);
    const alternatives = EXERCISE_TAXONOMY.filter(
      (e) =>
        e.id !== exercise.exerciseId &&
        e.primaryMuscle === (exercise.targetMuscle as unknown as MuscleGroup),
    );
    const alternative = alternatives[0] ?? currentTaxonomy;
    const rationale =
      input.reason === SwapReason.JOINT_DISCOMFORT
        ? "Replaced free weight with guided plane to reduce joint shear stress"
        : "Selected equivalent motor pattern variant matching available equipment";

    return this.repository.createExerciseSwap({
      exercise: { connect: { id: exercise.id } },
      originalExerciseId: exercise.exerciseId,
      proposedExerciseId: alternative.id,
      originalName: exercise.name,
      proposedName: alternative.name,
      reason: input.reason as unknown as PrismaSwapReason,
      biomechanicalRationale: rationale,
      fatigueReductionFactor: 0.9,
      accepted: false,
    });
  }

  async acceptExerciseSwap(
    swapId: string,
    prescribedExerciseId: string,
    proposedExerciseId: string,
    proposedName: string,
  ) {
    this.logger.info(`[acceptExerciseSwap] Applying swap ${swapId}`);
    await this.repository.applyExerciseSwap(
      swapId,
      prescribedExerciseId,
      proposedExerciseId,
      proposedName,
    );
    return true;
  }

  getVolumeSummary(muscle: MuscleGroup, weeklySets = 12): VolumeSummaryResponse {
    const landmarks = getVolumeLandmarks(muscle, weeklySets);
    const status = evaluateVolumeStatus(weeklySets, landmarks);
    return {
      muscle,
      currentWeeklySets: weeklySets,
      mev: landmarks.mev,
      mav: landmarks.mav,
      mrv: landmarks.mrv,
      status,
    };
  }
}
