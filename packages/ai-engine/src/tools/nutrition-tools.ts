/**
 * @file packages/ai-engine/src/tools/nutrition-tools.ts
 * @description Deterministic nutrition and metabolic calculation tools.
 * @module @vitalai/ai-engine/tools
 */

import {
  calculateBmrMifflinStJeor,
  calculateTdee,
  calculateMacroTargets,
  calculateMealGlycemicLoad,
  getLifeStageAdjustments,
} from "@vitalai/vital-engine";
import { BiologicalSex, ActivityLevel, CaloricGoal, LifeStage } from "@vitalai/shared-types";
import { AiToolDefinition, AiToolName, ToolParameterType } from "./tool.types";

export const calculateTdeeTool: AiToolDefinition = {
  name: AiToolName.CALCULATE_TDEE,
  description:
    "Calculates Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) using Mifflin-St Jeor equation.",
  parameters: {
    weightKg: {
      type: ToolParameterType.NUMBER,
      description: "Body weight in kilograms",
      required: true,
    },
    heightCm: {
      type: ToolParameterType.NUMBER,
      description: "Height in centimeters",
      required: true,
    },
    ageYears: { type: ToolParameterType.NUMBER, description: "Age in years", required: true },
    sex: {
      type: ToolParameterType.STRING,
      description: "Biological sex: 'male' or 'female'",
      required: true,
    },
    activityLevel: {
      type: ToolParameterType.STRING,
      description: "Activity level from ActivityLevel enum",
      required: true,
    },
  },
  execute: (args: Record<string, unknown>) => {
    const weightKg = Number(args["weightKg"]);
    const heightCm = Number(args["heightCm"]);
    const ageYears = Number(args["ageYears"]);
    const sex = args["sex"] === BiologicalSex.FEMALE ? BiologicalSex.FEMALE : BiologicalSex.MALE;
    const activity = (args["activityLevel"] as ActivityLevel) || ActivityLevel.MODERATELY_ACTIVE;

    const bmr = calculateBmrMifflinStJeor({ weightKg, heightCm, ageYears, sex });
    const tdee = calculateTdee(bmr, activity);

    return { bmr, tdee, unit: "kcal/day" };
  },
};

export const calculateMacrosTool: AiToolDefinition = {
  name: AiToolName.CALCULATE_MACROS,
  description:
    "Calculates target daily calories and macronutrient split (protein, carbs, fats) based on TDEE and CaloricGoal.",
  parameters: {
    tdee: {
      type: ToolParameterType.NUMBER,
      description: "Total Daily Energy Expenditure in kcal",
      required: true,
    },
    weightKg: {
      type: ToolParameterType.NUMBER,
      description: "Body weight in kilograms",
      required: true,
    },
    goal: {
      type: ToolParameterType.STRING,
      description: "Caloric goal from CaloricGoal enum: deficit, maintenance, surplus",
      required: true,
    },
  },
  execute: (args: Record<string, unknown>) => {
    const tdee = Number(args["tdee"]);
    const weightKg = Number(args["weightKg"]);

    let goalEnum: CaloricGoal = CaloricGoal.MAINTENANCE;
    const rawGoal = String(args["goal"] || "").toLowerCase();
    if (
      rawGoal === CaloricGoal.DEFICIT ||
      rawGoal.includes("deficit") ||
      rawGoal.includes("cut") ||
      rawGoal.includes("fat_loss")
    ) {
      goalEnum = CaloricGoal.DEFICIT;
    } else if (
      rawGoal === CaloricGoal.SURPLUS ||
      rawGoal.includes("surplus") ||
      rawGoal.includes("bulk") ||
      rawGoal.includes("gain")
    ) {
      goalEnum = CaloricGoal.SURPLUS;
    }

    const macros = calculateMacroTargets({ tdee, weightKg, goal: goalEnum });
    return {
      targetCalories: macros.calories,
      proteinGrams: macros.proteinGrams,
      carbGrams: macros.carbsGrams,
      fatGrams: macros.fatsGrams,
      waterMl: macros.waterMl,
    };
  },
};

export const glycemicLoadTool: AiToolDefinition = {
  name: AiToolName.CALCULATE_GLYCEMIC_LOAD,
  description:
    "Calculates the glycemic load (GL) for a carbohydrate serving given grams and glycemic index (GI).",
  parameters: {
    carbsGrams: {
      type: ToolParameterType.NUMBER,
      description: "Net carbohydrates in grams",
      required: true,
    },
    glycemicIndex: {
      type: ToolParameterType.NUMBER,
      description: "Glycemic Index rating of the food (0-100)",
      required: true,
    },
  },
  execute: (args: Record<string, unknown>) => {
    const carbs = Number(args["carbsGrams"] || 0);
    const gi = Number(args["glycemicIndex"] || 0);
    const gl = calculateMealGlycemicLoad(carbs, gi);
    const category = gl < 10 ? "low" : gl < 20 ? "moderate" : "high";
    return { carbsGrams: carbs, glycemicIndex: gi, glycemicLoad: gl, classification: category };
  },
};

export const trimesterAdjustmentsTool: AiToolDefinition = {
  name: AiToolName.CALCULATE_TRIMESTER_SURPLUS,
  description:
    "Calculates obstetric clinical caloric and hydration adjustments for pregnancy or postpartum stages.",
  parameters: {
    stage: { type: ToolParameterType.STRING, description: "LifeStage enum member", required: true },
  },
  execute: (args: Record<string, unknown>) => {
    const stage = (args["stage"] as LifeStage) || LifeStage.PREGNANCY_SECOND_TRIMESTER;
    const adjustment = getLifeStageAdjustments(stage);
    return {
      stage,
      additionalKcal: adjustment.additionalKcal,
      hydrationSurplusMl: adjustment.hydrationSurplusMl,
      keyNutrientFocus: adjustment.keyNutrientFocus,
    };
  },
};
