/**
 * @file packages/shared-types/src/enums/nutrition.enum.ts
 * @description Clinical nutrition, glycemic index, and metabolic risk status enums.
 * @module @vitalai/shared-types
 */

/**
 * Purine risk tiers for hyperuricemia and gout prevention.
 */
export enum PurineRiskLevel {
  /** Daily purine intake < 300mg — safe clinical baseline */
  SAFE = "safe",

  /** Daily purine intake 300mg - 500mg — moderate risk, monitor hydration */
  MODERATE = "moderate",

  /** Daily purine intake > 500mg — strict risk, trigger advisor warning */
  HIGH = "high",
}

/**
 * Postprandial glycemic load distribution assessment.
 */
export enum GlycemicLoadStatus {
  /** Carbohydrates timed around high-insulin sensitivity windows */
  OPTIMAL = "optimal",

  /** Moderate elevation in non-training windows */
  ELEVATED = "elevated",

  /** Prolonged high glycemic load risking insulin spikes */
  CONCERNING = "concerning",
}

/**
 * Meal schedule slots throughout the day.
 */
export enum MealType {
  BREAKFAST = "breakfast",
  LUNCH = "lunch",
  DINNER = "dinner",
  SNACK = "snack",
  POST_WORKOUT = "post_workout",
}

/**
 * Physical activity multiplier tiers for TDEE expenditure calculations.
 */
export enum ActivityLevel {
  SEDENTARY = "sedentary",
  LIGHTLY_ACTIVE = "lightly_active",
  MODERATELY_ACTIVE = "moderately_active",
  VERY_ACTIVE = "very_active",
  EXTRA_ACTIVE = "extra_active",
}

/**
 * Biological sex baseline for Mifflin-St Jeor basal metabolic rate formulas.
 */
export enum BiologicalSex {
  MALE = "male",
  FEMALE = "female",
}

/**
 * Primary caloric intake strategy relative to maintenance TDEE.
 */
export enum CaloricGoal {
  MAINTENANCE = "maintenance",
  DEFICIT = "deficit",
  SURPLUS = "surplus",
}
