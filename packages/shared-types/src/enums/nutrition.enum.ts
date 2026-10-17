/**
 * @file packages/shared-types/src/enums/nutrition.enum.ts
 * @description Clinical nutrition, glycemic index, and metabolic risk status enums with UUID generation.
 * @module @vitalai/shared-types
 */

import { generateCatalogUuid } from "../utils/uuid";

/**
 * Purine risk tiers for hyperuricemia and gout prevention.
 */
export enum PurineRiskLevel {
  SAFE = "safe",
  MODERATE = "moderate",
  HIGH = "high",
}

/**
 * Postprandial glycemic load distribution assessment.
 */
export enum GlycemicLoadStatus {
  OPTIMAL = "optimal",
  ELEVATED = "elevated",
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

/**
 * Standardized food and dietary ingredient classification tags.
 */
export enum FoodTag {
  ORGAN_MEATS = "organ_meats",
  SARDINES = "sardines",
  ANCHOVIES = "anchovies",
  BEER = "beer",
  HIGH_FRUCTOSE_CORN_SYRUP = "high_fructose_corn_syrup",
  REFINED_SUGAR = "refined_sugar",
  WHITE_BREAD = "white_bread",
  CANDY = "candy",
  EGGS = "eggs",
  TOFU = "tofu",
  WHEY_ISOLATE = "whey_isolate",
  LOW_FAT_DAIRY = "low_fat_dairy",
  ROLLED_OATS = "rolled_oats",
  BROWN_RICE = "brown_rice",
  LENTILS = "lentils",
  BERRIES = "berries",
  SWEET_POTATO = "sweet_potato",
  BROCCOLI = "broccoli",
  SALMON = "salmon",
  CHICKEN_BREAST = "chicken_breast",
}

/**
 * Canonical food purine database item UUIDs generated via RFC 4122 v5 standard.
 */
export const FoodPurineId = {
  LIVER: generateCatalogUuid("food_purine", "liver"),
  SARDINES: generateCatalogUuid("food_purine", "sardines"),
  ANCHOVIES: generateCatalogUuid("food_purine", "anchovies"),
  SALMON: generateCatalogUuid("food_purine", "salmon"),
  CHICKEN_BREAST: generateCatalogUuid("food_purine", "chicken_breast"),
  SIRLOIN_STEAK: generateCatalogUuid("food_purine", "sirloin_steak"),
  WHOLE_EGGS: generateCatalogUuid("food_purine", "whole_eggs"),
  FIRM_TOFU: generateCatalogUuid("food_purine", "firm_tofu"),
  WHEY_PROTEIN_ISOLATE: generateCatalogUuid("food_purine", "whey_protein_isolate"),
  ROLLED_OATS: generateCatalogUuid("food_purine", "rolled_oats"),
  GREEK_YOGURT: generateCatalogUuid("food_purine", "greek_yogurt"),
} as const;

export type FoodPurineId = (typeof FoodPurineId)[keyof typeof FoodPurineId];

/**
 * Canonical food glycemic database item UUIDs generated via RFC 4122 v5 standard.
 */
export const FoodGlycemicId = {
  WHITE_RICE: generateCatalogUuid("food_glycemic", "white_rice"),
  SWEET_POTATO: generateCatalogUuid("food_glycemic", "sweet_potato"),
  ROLLED_OATS: generateCatalogUuid("food_glycemic", "rolled_oats"),
  BROWN_RICE: generateCatalogUuid("food_glycemic", "brown_rice"),
  LENTILS: generateCatalogUuid("food_glycemic", "lentils"),
  BROCCOLI: generateCatalogUuid("food_glycemic", "broccoli"),
} as const;

export type FoodGlycemicId = (typeof FoodGlycemicId)[keyof typeof FoodGlycemicId];
