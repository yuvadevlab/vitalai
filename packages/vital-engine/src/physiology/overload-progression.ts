/**
 * @file packages/vital-engine/src/physiology/overload-progression.ts
 * @description 6-week hypertrophy mesocycle periodization, RIR targets, and progressive overload calculations.
 * @module @vitalai/vital-engine
 */

import { MesocyclePhase, ExerciseCategory } from "@vitalai/shared-types";

/**
 * Returns the target Reps in Reserve (RIR) based on the current week of a 6-week mesocycle.
 * Week 1: 3 RIR (establish baseline, low fatigue)
 * Weeks 2-4: 2-1 RIR (progressive overload accumulation)
 * Week 5: 0-1 RIR (functional overreaching peak)
 * Week 6: 4 RIR (active recovery deload)
 */
export function calculateTargetRir(weekNumber: number, phase: MesocyclePhase): number {
  if (phase === MesocyclePhase.DELOAD || weekNumber >= 6) {
    return 4;
  }
  if (phase === MesocyclePhase.PEAK || weekNumber === 5) {
    return 1;
  }
  if (weekNumber === 1 || phase === MesocyclePhase.BASELINE) {
    return 3;
  }
  // Weeks 2-4: Progressive decrease in RIR
  return Math.max(1, 4 - weekNumber);
}

/**
 * Calculates the recommended progressive overload load increment (in kg) for the next session.
 * Compound movements progress by ~2.5kg (or 2-3%), isolation by ~1.0kg - 1.25kg.
 */
export function calculateNextLoadKg(
  previousWeightKg: number,
  targetRepsAchieved: boolean,
  category: ExerciseCategory,
): number {
  if (!targetRepsAchieved || previousWeightKg <= 0) {
    return previousWeightKg;
  }

  switch (category) {
    case ExerciseCategory.COMPOUND: {
      // 2.5kg increment standard for multi-joint movements
      return Math.round((previousWeightKg + 2.5) * 10) / 10;
    }
    case ExerciseCategory.ACCESSORY: {
      return Math.round((previousWeightKg + 1.5) * 10) / 10;
    }
    case ExerciseCategory.ISOLATION: {
      // 1.0kg micro-increment for single-joint isolations
      return Math.round((previousWeightKg + 1.0) * 10) / 10;
    }
  }
}
