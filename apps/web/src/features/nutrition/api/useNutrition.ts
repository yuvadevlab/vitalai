"use client";

import { useQuery } from "@tanstack/react-query";
import { MealCarbEvent } from "@vitalai/ui";
import { QUERY_KEYS } from "@vitalai/shared-types";

export interface MealItem {
  readonly id: string;
  readonly name: string;
  readonly time: string;
  readonly calories: number;
  readonly protein: number;
  readonly carbs: number;
  readonly fats: number;
  readonly purineMg: number;
  readonly ingredients: readonly string[];
  readonly tags: readonly string[];
}

export interface NutritionDayPlan {
  readonly date: string;
  readonly macros: {
    readonly calories: { current: number; target: number };
    readonly protein: { current: number; target: number };
    readonly carbs: { current: number; target: number };
    readonly fats: { current: number; target: number };
  };
  readonly purineMg: number;
  readonly safePurineLimitMg: number;
  readonly gestationalWeek?: number;
  readonly meals: readonly MealItem[];
  readonly carbEvents: readonly MealCarbEvent[];
}

const MOCK_NUTRITION_PLAN: NutritionDayPlan = {
  date: "2026-10-17",
  macros: {
    calories: { current: 1850, target: 2450 },
    protein: { current: 145, target: 180 },
    carbs: { current: 210, target: 275 },
    fats: { current: 52, target: 70 },
  },
  purineMg: 165,
  safePurineLimitMg: 300,
  gestationalWeek: 16, // Trimester 2 active
  meals: [
    {
      id: "meal-1",
      name: "Anabolic Berry & Oatmeal Bowl",
      time: "08:30",
      calories: 520,
      protein: 38,
      carbs: 65,
      fats: 12,
      purineMg: 24,
      ingredients: ["Rolled Oats", "Whey Protein Isolate", "Blueberries", "Almond Butter"],
      tags: ["High Fiber", "Low Purine", "Folate Rich"],
    },
    {
      id: "meal-2",
      name: "Grilled Citrus Salmon & Quinoa Medley",
      time: "13:00",
      calories: 640,
      protein: 48,
      carbs: 55,
      fats: 22,
      purineMg: 68,
      ingredients: ["Wild Salmon (180g)", "Tri-Color Quinoa", "Steamed Asparagus", "Olive Oil"],
      tags: ["Omega-3 DHA", "Complete Protein", "Low GI"],
    },
    {
      id: "meal-3",
      name: "Pre-Workout Intra-Fuel Shake",
      time: "16:30",
      calories: 220,
      protein: 20,
      carbs: 32,
      fats: 2,
      purineMg: 12,
      ingredients: ["Hydrolyzed Whey", "Cluster Dextrin", "Pink Himalayan Salt"],
      tags: ["Fast Digesting", "Glycogen Priming"],
    },
    {
      id: "meal-4",
      name: "Tofu, Edamame & Bok Choy Stir-Fry",
      time: "20:00",
      calories: 470,
      protein: 39,
      carbs: 58,
      fats: 16,
      purineMg: 61,
      ingredients: ["Firm Tofu", "Edamame", "Jasmine Brown Rice", "Sesame Aminos"],
      tags: ["Plant Protein", "Iron Rich", "Antioxidant"],
    },
  ],
  carbEvents: [
    { time: "08:30", carbGrams: 65, mealName: "Breakfast Oatmeal", glycemicLoad: "med" },
    { time: "13:00", carbGrams: 55, mealName: "Salmon Quinoa", glycemicLoad: "med" },
    { time: "16:30", carbGrams: 32, mealName: "Pre-Workout Fuel", glycemicLoad: "high" },
    { time: "20:00", carbGrams: 58, mealName: "Tofu Stir-Fry", glycemicLoad: "low" },
  ],
};

export function useNutrition() {
  return useQuery({
    queryKey: QUERY_KEYS.NUTRITION.TODAY,
    queryFn: async (): Promise<NutritionDayPlan> => {
      return MOCK_NUTRITION_PLAN;
    },
    initialData: MOCK_NUTRITION_PLAN,
    staleTime: 60 * 1000,
  });
}
