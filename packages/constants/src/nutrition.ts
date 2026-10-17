/**
 * @file packages/constants/src/nutrition.ts
 * @description Curated clinical purine concentrations, glycemic index ratings, and micronutrient benchmarks.
 * @module @vitalai/constants
 */

import { FoodPurineId, FoodGlycemicId, FoodTag, PurineRiskLevel } from "@vitalai/shared-types";

export interface FoodPurineEntry {
  readonly id: FoodPurineId;
  readonly name: string;
  readonly purineMgPer100g: number;
  readonly riskLevel: PurineRiskLevel;
  readonly tag: FoodTag;
}

export const FOOD_PURINE_DATABASE: readonly FoodPurineEntry[] = [
  // High Purine (Strict Caution / Blacklisted for Gout)
  {
    id: FoodPurineId.LIVER,
    name: "Beef Liver",
    purineMgPer100g: 360,
    riskLevel: PurineRiskLevel.HIGH,
    tag: FoodTag.ORGAN_MEATS,
  },
  {
    id: FoodPurineId.SARDINES,
    name: "Sardines (in oil)",
    purineMgPer100g: 345,
    riskLevel: PurineRiskLevel.HIGH,
    tag: FoodTag.SARDINES,
  },
  {
    id: FoodPurineId.ANCHOVIES,
    name: "Anchovies",
    purineMgPer100g: 410,
    riskLevel: PurineRiskLevel.HIGH,
    tag: FoodTag.ANCHOVIES,
  },

  // Moderate Purine (Safe in moderation with hydration)
  {
    id: FoodPurineId.SALMON,
    name: "Atlantic Salmon",
    purineMgPer100g: 170,
    riskLevel: PurineRiskLevel.MODERATE,
    tag: FoodTag.SALMON,
  },
  {
    id: FoodPurineId.CHICKEN_BREAST,
    name: "Chicken Breast",
    purineMgPer100g: 140,
    riskLevel: PurineRiskLevel.MODERATE,
    tag: FoodTag.CHICKEN_BREAST,
  },
  {
    id: FoodPurineId.SIRLOIN_STEAK,
    name: "Sirloin Steak",
    purineMgPer100g: 160,
    riskLevel: PurineRiskLevel.MODERATE,
    tag: FoodTag.ORGAN_MEATS, // red meat monitoring
  },

  // Low Purine (Gout Safe Baseline)
  {
    id: FoodPurineId.WHOLE_EGGS,
    name: "Whole Eggs",
    purineMgPer100g: 5,
    riskLevel: PurineRiskLevel.SAFE,
    tag: FoodTag.EGGS,
  },
  {
    id: FoodPurineId.FIRM_TOFU,
    name: "Firm Tofu",
    purineMgPer100g: 68,
    riskLevel: PurineRiskLevel.SAFE,
    tag: FoodTag.TOFU,
  },
  {
    id: FoodPurineId.WHEY_PROTEIN_ISOLATE,
    name: "Whey Protein Isolate",
    purineMgPer100g: 12,
    riskLevel: PurineRiskLevel.SAFE,
    tag: FoodTag.WHEY_ISOLATE,
  },
  {
    id: FoodPurineId.ROLLED_OATS,
    name: "Rolled Oats",
    purineMgPer100g: 94,
    riskLevel: PurineRiskLevel.SAFE,
    tag: FoodTag.ROLLED_OATS,
  },
  {
    id: FoodPurineId.GREEK_YOGURT,
    name: "Greek Yogurt (Non-Fat)",
    purineMgPer100g: 8,
    riskLevel: PurineRiskLevel.SAFE,
    tag: FoodTag.LOW_FAT_DAIRY,
  },
] as const;

export interface FoodGlycemicEntry {
  readonly id: FoodGlycemicId;
  readonly name: string;
  readonly glycemicIndex: number; // 0-100 scale
  readonly netCarbsPer100g: number;
  readonly tag: FoodTag;
}

export const FOOD_GLYCEMIC_DATABASE: readonly FoodGlycemicEntry[] = [
  {
    id: FoodGlycemicId.WHITE_RICE,
    name: "Jasmine White Rice",
    glycemicIndex: 73,
    netCarbsPer100g: 28,
    tag: FoodTag.WHITE_BREAD,
  },
  {
    id: FoodGlycemicId.SWEET_POTATO,
    name: "Baked Sweet Potato",
    glycemicIndex: 63,
    netCarbsPer100g: 21,
    tag: FoodTag.SWEET_POTATO,
  },
  {
    id: FoodGlycemicId.ROLLED_OATS,
    name: "Rolled Oats",
    glycemicIndex: 55,
    netCarbsPer100g: 56,
    tag: FoodTag.ROLLED_OATS,
  },
  {
    id: FoodGlycemicId.BROWN_RICE,
    name: "Brown Rice",
    glycemicIndex: 50,
    netCarbsPer100g: 23,
    tag: FoodTag.BROWN_RICE,
  },
  {
    id: FoodGlycemicId.LENTILS,
    name: "Boiled Lentils",
    glycemicIndex: 32,
    netCarbsPer100g: 18,
    tag: FoodTag.LENTILS,
  },
  {
    id: FoodGlycemicId.BROCCOLI,
    name: "Steamed Broccoli",
    glycemicIndex: 15,
    netCarbsPer100g: 4,
    tag: FoodTag.BROCCOLI,
  },
] as const;
