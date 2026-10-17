/**
 * @file packages/validation/src/nutrition.schema.ts
 * @description Zod validation schemas for clinical meals, macro targets, and purine risk thresholds.
 * @module @vitalai/validation
 */

import { z } from "zod";
import { MealType, FoodTag } from "@vitalai/shared-types";

/**
 * Validates individual food or recipe item logging.
 */
export const logMealItemSchema = z.object({
  name: z.string().trim().min(1, "Food name is required").max(100),
  mealType: z.nativeEnum(MealType),
  calories: z.number().min(0, "Calories must be positive").max(5000),
  protein: z.number().min(0).max(500),
  carbs: z.number().min(0).max(1000),
  fats: z.number().min(0).max(500),
  purineMg: z.number().min(0).max(2000).default(0),
  glycemicLoad: z.number().min(0).max(100).default(0),
  tags: z.array(z.union([z.nativeEnum(FoodTag), z.string()])).default([]),
});

export type LogMealItemInput = z.infer<typeof logMealItemSchema>;

/**
 * Validates clinical daily macro and caloric allocation targets.
 */
export const updateMacroTargetsSchema = z.object({
  calories: z.number().min(800, "Daily calories must be at least 800").max(8000),
  proteinGrams: z.number().min(20).max(500),
  carbsGrams: z.number().min(0).max(1000),
  fatsGrams: z.number().min(10).max(300),
  waterMl: z.number().min(500).max(10000),
  deficitSurplusKcal: z.number().min(-2000).max(2000).default(0),
});

export type UpdateMacroTargetsInput = z.infer<typeof updateMacroTargetsSchema>;

/**
 * Validates logging daily water intake.
 */
export const logWaterSchema = z.object({
  amountMl: z.number().int().min(50, "Minimum 50ml").max(2000, "Maximum 2000ml per entry"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
});

export type LogWaterInput = z.infer<typeof logWaterSchema>;
