/**
 * @file packages/vital-engine/src/nutrition/macronutrients.ts
 * @description Evidence-based macronutrient distribution calculations for body composition.
 * @module @vitalai/vital-engine
 */

import { CaloricGoal, type MacroTargets } from "@vitalai/shared-types";

export interface MacroCalculationParams {
  readonly tdee: number;
  readonly weightKg: number;
  readonly goal: CaloricGoal;
  /** Optional custom caloric delta (e.g. -350 for moderate fat loss) */
  readonly customDeltaKcal?: number;
}

/**
 * Calculates optimal protein, carbohydrates, and fats based on energy goals.
 * - Protein: 2.0g per kg bodyweight (hypertrophy & lean tissue preservation)
 * - Fats: 25% of total calories (hormone production and cellular membranes)
 * - Carbs: Remaining caloric budget (divided by 4 kcal/g) for glycogen replenishment
 */
export function calculateMacroTargets(params: MacroCalculationParams): MacroTargets {
  const { tdee, weightKg, goal, customDeltaKcal } = params;

  let deltaKcal = 0;
  if (customDeltaKcal !== undefined) {
    deltaKcal = customDeltaKcal;
  } else if (goal === CaloricGoal.DEFICIT) {
    deltaKcal = -400; // Standard moderate deficit
  } else if (goal === CaloricGoal.SURPLUS) {
    deltaKcal = +250; // Lean hypertrophy surplus
  }

  const targetCalories = Math.max(1200, Math.round(tdee + deltaKcal));

  // Protein: 2.0g per kg of body mass (4 kcal per gram)
  const proteinGrams = Math.round(weightKg * 2.0);
  const proteinCalories = proteinGrams * 4;

  // Fats: 25% of total daily caloric intake (9 kcal per gram)
  const fatCalories = targetCalories * 0.25;
  const fatsGrams = Math.round(fatCalories / 9);

  // Carbs: Remaining caloric budget allocated to carbohydrates (4 kcal per gram)
  const remainingCalories = Math.max(0, targetCalories - (proteinCalories + fatCalories));
  const carbsGrams = Math.round(remainingCalories / 4);

  // Hydration baseline: 35ml per kg bodyweight
  const waterMl = Math.round(weightKg * 35);

  return {
    calories: targetCalories,
    proteinGrams,
    carbsGrams,
    fatsGrams,
    waterMl,
    deficitSurplusKcal: deltaKcal,
  };
}
