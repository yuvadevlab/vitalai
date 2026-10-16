/**
 * @file packages/shared-types/src/contracts/nutrition.contract.ts
 * @description Clinical nutrition, purine risk index, glycemic load, and macro targets contracts.
 * @module @vitalai/shared-types
 */

import { PurineRiskLevel, GlycemicLoadStatus, MealType } from "../enums";

/**
 * Caloric and macronutrient distribution targets and logs.
 */
export interface MacroTargets {
  readonly calories: number;
  readonly proteinGrams: number;
  readonly carbsGrams: number;
  readonly fatsGrams: number;
  readonly waterMl: number;
  /** Caloric delta relative to maintenance TDEE (negative = deficit, positive = surplus) */
  readonly deficitSurplusKcal: number;
}

/**
 * Individual food or recipe item with clinical disease markers.
 */
export interface MealItem {
  readonly id: string;
  readonly name: string;
  readonly mealType: MealType;
  readonly calories: number;
  readonly protein: number;
  readonly carbs: number;
  readonly fats: number;
  /** Total purine content in milligrams (critical for hyperuricemia / gout monitoring) */
  readonly purineMg: number;
  /** Glycemic load (glycemic index * net carbs / 100) */
  readonly glycemicLoad: number;
  readonly tags: readonly string[];
}

/**
 * Full daily clinical nutrition schedule.
 */
export interface DailyMealPlan {
  readonly id: string;
  readonly date: string;
  readonly targets: MacroTargets;
  readonly logged: MacroTargets;
  readonly meals: readonly MealItem[];
  readonly waterLoggedMl: number;
  readonly waterTargetMl: number;
}

/**
 * Clinical purine risk evaluation for uric acid and gout prevention.
 */
export interface PurineRiskReport {
  readonly totalPurineMg: number;
  /** Daily safe clinical ceiling (typically 300mg/day) */
  readonly safeCeilingMg: number;
  readonly isInSafeZone: boolean;
  readonly riskLevel: PurineRiskLevel;
  readonly offendingFoods: readonly string[];
}

/**
 * Postprandial glycemic load analysis centered around exercise timing.
 */
export interface GlycemicLoadReport {
  readonly totalDailyGl: number;
  readonly periWorkoutGlPercentage: number;
  readonly status: GlycemicLoadStatus;
}
