/**
 * @file packages/shared-types/src/contracts/workout.contract.ts
 * @description Contracts for scientific hypertrophy, volume landmarks, exercises, and biomechanical swaps.
 * @module @vitalai/shared-types
 */

import { MuscleGroup, MesocyclePhase, ExerciseCategory, SwapReason } from "../enums";

/**
 * Volume landmarks defined by scientific hypertrophy physiology (Dr. Mike Israetel).
 */
export interface VolumeLandmarks {
  readonly muscle: MuscleGroup;
  /** Minimum Effective Volume: lowest weekly sets required to trigger hypertrophy */
  readonly mev: number;
  /** Maximum Adaptive Volume: optimal sweet spot of hypertrophic stimulus */
  readonly mav: number;
  /** Maximum Recoverable Volume: highest weekly volume before chronic fatigue outpaces recovery */
  readonly mrv: number;
  /** Actual completed sets in the current rolling 7-day period */
  readonly currentWeeklySets: number;
}

/**
 * Individual logged set within an active workout session.
 */
export interface WorkoutSet {
  readonly id: string;
  readonly setNumber: number;
  readonly targetReps: number;
  readonly actualReps?: number;
  readonly targetRir: number;
  readonly actualRir?: number;
  readonly weightKg?: number;
  readonly completed: boolean;
  readonly restSeconds: number;
}

/**
 * Prescribed exercise with biomechanical loading specifications.
 */
export interface Exercise {
  readonly id: string;
  readonly name: string;
  readonly targetMuscle: MuscleGroup;
  readonly secondaryMuscles: readonly MuscleGroup[];
  readonly category: ExerciseCategory;
  readonly sets: readonly WorkoutSet[];
  readonly tempo: string;
  readonly restSeconds: number;
  readonly notes?: string;
}

/**
 * Single workout session within a mesocycle.
 */
export interface WorkoutSession {
  readonly id: string;
  readonly name: string;
  readonly weekNumber: number;
  readonly phase: MesocyclePhase;
  readonly exercises: readonly Exercise[];
  readonly totalVolumeSets: number;
  readonly estimatedDurationMins: number;
  readonly completedAt?: string;
}

/**
 * Request payload for executing an AI Biomechanical Exercise Swap.
 */
export interface ExerciseSwapRequest {
  readonly currentExerciseId: string;
  readonly sessionId: string;
  readonly reason: SwapReason;
  readonly notes?: string;
}

/**
 * AI-generated biomechanically verified exercise substitute.
 */
export interface ExerciseSwapResponse {
  readonly originalExercise: Exercise;
  readonly proposedExercise: Exercise;
  readonly biomechanicalRationale: string;
  readonly fatigueReductionFactor: number;
}
