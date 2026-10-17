/**
 * @file packages/vital-engine/src/physiology/fatigue-scoring.ts
 * @description Neurological and axial loading fatigue calculation heuristics for workouts.
 * @module @vitalai/vital-engine
 */

import { ExerciseCategory, type WorkoutSet, type Exercise } from "@vitalai/shared-types";

/**
 * Multipliers reflecting neurological fatigue and axial spinal loading per exercise category.
 */
const CATEGORY_FATIGUE_WEIGHTS: Record<ExerciseCategory, number> = {
  [ExerciseCategory.COMPOUND]: 1.5,
  [ExerciseCategory.ACCESSORY]: 1.1,
  [ExerciseCategory.ISOLATION]: 0.7,
};

/**
 * Calculates an integrated fatigue index (0-100) for an exercise based on category, sets, and RIR.
 */
export function calculateExerciseFatigueScore(exercise: Exercise): number {
  const categoryWeight = CATEGORY_FATIGUE_WEIGHTS[exercise.category];

  const setsFatigue = exercise.sets.reduce((sum: number, set: WorkoutSet) => {
    if (!set.completed) return sum;
    // Lower RIR = significantly higher neuromuscular fatigue
    const proximityMultiplier = set.targetRir <= 1 ? 1.4 : set.targetRir === 2 ? 1.1 : 0.9;
    return sum + 5 * proximityMultiplier;
  }, 0);

  return Math.min(100, Math.round(setsFatigue * categoryWeight));
}

/**
 * Calculates the total session fatigue score (0-100) across all completed exercises.
 */
export function calculateSessionFatigueScore(exercises: readonly Exercise[]): number {
  if (exercises.length === 0) return 0;

  const totalRawScore = exercises.reduce((sum: number, ex: Exercise) => {
    return sum + calculateExerciseFatigueScore(ex);
  }, 0);

  // Normalize across typical 4-6 exercise session
  const normalized = Math.round((totalRawScore / (exercises.length * 40)) * 100);
  return Math.min(100, Math.max(0, normalized));
}
