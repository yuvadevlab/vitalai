/**
 * @file packages/vital-engine/src/nutrition/tdee.ts
 * @description Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) calculations.
 * Uses the clinically validated Mifflin-St Jeor and Katch-McArdle equations.
 * @module @vitalai/vital-engine
 */

import { BiologicalSex, ActivityLevel } from "@vitalai/shared-types";

export interface MifflinStJeorParams {
  readonly weightKg: number;
  readonly heightCm: number;
  readonly ageYears: number;
  readonly sex: BiologicalSex;
}

/**
 * Activity multipliers based on the Harris-Benedict & FAO/WHO standards.
 */
const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  [ActivityLevel.SEDENTARY]: 1.2, // Desk job, little to no exercise
  [ActivityLevel.LIGHTLY_ACTIVE]: 1.375, // 1-3 light sessions / week
  [ActivityLevel.MODERATELY_ACTIVE]: 1.55, // 3-5 moderate hypertrophy sessions / week
  [ActivityLevel.VERY_ACTIVE]: 1.725, // 6-7 intense sessions / week
  [ActivityLevel.EXTRA_ACTIVE]: 1.9, // Daily heavy training + manual labor
};

/**
 * Calculates BMR using the Mifflin-St Jeor formula (clinical gold standard for general population).
 * Formula: (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + s
 * where s is +5 for males, -161 for females.
 */
export function calculateBmrMifflinStJeor(params: MifflinStJeorParams): number {
  const { weightKg, heightCm, ageYears, sex } = params;
  const base = 10 * weightKg + 6.25 * heightCm - 5 * ageYears;
  const sexOffset = sex === BiologicalSex.MALE ? 5 : -161;
  return Math.round(base + sexOffset);
}

/**
 * Calculates BMR using the Katch-McArdle formula (lean body mass formula for athletic individuals).
 * Formula: 370 + (21.6 × Lean Body Mass in kg)
 */
export function calculateBmrKatchMcArdle(leanMassKg: number): number {
  return Math.round(370 + 21.6 * leanMassKg);
}

/**
 * Calculates Total Daily Energy Expenditure (TDEE) in kilocalories.
 */
export function calculateTdee(bmr: number, activityLevel: ActivityLevel): number {
  const multiplier = ACTIVITY_MULTIPLIERS[activityLevel];
  return Math.round(bmr * multiplier);
}
