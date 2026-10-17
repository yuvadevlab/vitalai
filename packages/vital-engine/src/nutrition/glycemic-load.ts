/**
 * @file packages/vital-engine/src/nutrition/glycemic-load.ts
 * @description Glycemic Load (GL) calculations and carbohydrate peri-workout timing analysis.
 * @module @vitalai/vital-engine
 */

import {
  GlycemicLoadStatus,
  MealType,
  type MealItem,
  type GlycemicLoadReport,
} from "@vitalai/shared-types";

/**
 * Calculates the glycemic load of a meal.
 * Formula: (Glycemic Index × Net Carbs in grams) / 100
 * A GL under 10 is low, 11-19 is medium, 20+ is high.
 */
export function calculateMealGlycemicLoad(carbsGrams: number, glycemicIndex: number): number {
  if (carbsGrams <= 0 || glycemicIndex <= 0) return 0;
  return Math.round(((glycemicIndex * carbsGrams) / 100) * 10) / 10;
}

/**
 * Analyzes whether carbohydrate consumption is strategically centered around the workout
 * window (peri-workout) where muscle insulin-independent glucose uptake (GLUT4) is highest.
 */
export function evaluateDailyGlycemicLoad(meals: readonly MealItem[]): GlycemicLoadReport {
  let totalDailyGl = 0;
  let periWorkoutGl = 0;

  for (const meal of meals) {
    totalDailyGl += meal.glycemicLoad;
    if (meal.mealType === MealType.POST_WORKOUT || meal.tags.includes("peri_workout")) {
      periWorkoutGl += meal.glycemicLoad;
    }
  }

  const periWorkoutGlPercentage =
    totalDailyGl > 0 ? Math.round((periWorkoutGl / totalDailyGl) * 100) : 0;

  let status = GlycemicLoadStatus.OPTIMAL;
  if (totalDailyGl > 120 && periWorkoutGlPercentage < 35) {
    status = GlycemicLoadStatus.CONCERNING;
  } else if (totalDailyGl > 100) {
    status = GlycemicLoadStatus.ELEVATED;
  }

  return {
    totalDailyGl,
    periWorkoutGlPercentage,
    status,
  };
}
