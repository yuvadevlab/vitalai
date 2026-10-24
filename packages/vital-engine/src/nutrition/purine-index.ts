/**
 * @file packages/vital-engine/src/nutrition/purine-index.ts
 * @description Evaluates daily purine intake to prevent hyperuricemia and gout crystal precipitation.
 * @module @vitalai/vital-engine
 */

import { PurineRiskLevel, type MealItem, type PurineRiskReport } from "@vitalai/shared-types";

/**
 * Clinical threshold for purine intake in individuals with gout history or hyperuricemia.
 * Target is < 300 mg per day.
 */
export const DAILY_SAFE_PURINE_CEILING_MG = 300;
export const ELEVATED_PURINE_THRESHOLD_MG = 500;

/**
 * Evaluates the total daily purine intake across all logged meals, determines clinical risk tier,
 * and identifies high-purine offending foods.
 */
export function evaluateDailyPurineRisk(meals: readonly MealItem[]): PurineRiskReport {
  let totalPurineMg = 0;
  const offendingFoods: string[] = [];

  for (const meal of meals) {
    totalPurineMg += meal.purineMg;
    // Any single meal contributing > 100mg of purine is flagged as high-risk
    if (meal.purineMg >= 100) {
      offendingFoods.push(meal.name);
    }
  }

  let riskLevel = PurineRiskLevel.SAFE;
  if (totalPurineMg > ELEVATED_PURINE_THRESHOLD_MG) {
    riskLevel = PurineRiskLevel.HIGH;
  } else if (totalPurineMg > DAILY_SAFE_PURINE_CEILING_MG) {
    riskLevel = PurineRiskLevel.MODERATE;
  }

  return {
    totalPurineMg,
    safeCeilingMg: DAILY_SAFE_PURINE_CEILING_MG,
    isInSafeZone: totalPurineMg <= DAILY_SAFE_PURINE_CEILING_MG,
    riskLevel,
    offendingFoods,
  };
}
