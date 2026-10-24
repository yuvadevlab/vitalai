/**
 * @file packages/vital-engine/src/nutrition/trimester-adjustments.ts
 * @description Obstetric clinical energy and hydration adjustments across pregnancy and postpartum stages.
 * @module @vitalai/vital-engine
 */

import { LifeStage } from "@vitalai/shared-types";

export interface ObstetricAdjustment {
  readonly additionalKcal: number;
  readonly hydrationSurplusMl: number;
  readonly keyNutrientFocus: readonly string[];
}

/**
 * Clinical guidelines (ACOG / Institute of Medicine) for energetic adjustments by life stage.
 */
const STAGE_ADJUSTMENTS: Record<LifeStage, ObstetricAdjustment> = {
  [LifeStage.GENERAL_ADULT]: {
    additionalKcal: 0,
    hydrationSurplusMl: 0,
    keyNutrientFocus: [],
  },
  [LifeStage.PRECONCEPTION]: {
    additionalKcal: 0,
    hydrationSurplusMl: 0,
    keyNutrientFocus: ["Methylfolate (400mcg)", "Iron", "Zinc", "Choline"],
  },
  [LifeStage.PREGNANCY_FIRST_TRIMESTER]: {
    additionalKcal: 0, // Minimal embryonic energy requirement
    hydrationSurplusMl: 250,
    keyNutrientFocus: ["Methylfolate (600mcg)", "Vitamin B6", "Electrolytes"],
  },
  [LifeStage.PREGNANCY_SECOND_TRIMESTER]: {
    additionalKcal: 340, // Accelerated fetal growth and maternal blood volume expansion
    hydrationSurplusMl: 350,
    keyNutrientFocus: ["Iron (27mg)", "Calcium (1000mg)", "DHA Omega-3", "Choline"],
  },
  [LifeStage.PREGNANCY_THIRD_TRIMESTER]: {
    additionalKcal: 452, // Maximal fetal weight gain and brain development
    hydrationSurplusMl: 500,
    keyNutrientFocus: ["DHA (300mg)", "Choline (450mg)", "Iron", "Magnesium"],
  },
  [LifeStage.POSTPARTUM_EARLY]: {
    additionalKcal: 200, // Tissue healing, pelvic recovery
    hydrationSurplusMl: 500,
    keyNutrientFocus: ["Collagen peptides", "Vitamin C", "Zinc", "Iron"],
  },
  [LifeStage.POSTPARTUM_RECOVERY]: {
    additionalKcal: 100,
    hydrationSurplusMl: 300,
    keyNutrientFocus: ["Protein adequacy", "Vitamin D", "Magnesium"],
  },
  [LifeStage.LACTATION]: {
    additionalKcal: 500, // Breast milk synthesis (~20 kcal/oz)
    hydrationSurplusMl: 1000, // Massive fluid turnover
    keyNutrientFocus: ["Choline (550mg)", "Iodine (290mcg)", "DHA", "Calcium"],
  },
  [LifeStage.MASTERS_ATHLETE]: {
    additionalKcal: 0,
    hydrationSurplusMl: 200,
    keyNutrientFocus: ["High Leucine (3g/meal)", "Creatine", "Omega-3", "Vitamin D3/K2"],
  },
};

/**
 * Returns the clinically mandated caloric and hydration surplus for a given physiological stage.
 */
export function getLifeStageAdjustments(stage: LifeStage): ObstetricAdjustment {
  return STAGE_ADJUSTMENTS[stage];
}
