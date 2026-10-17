"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@vitalai/shared-types";

export interface HealthConditionRecord {
  readonly id: string;
  readonly name: string;
  readonly category: "orthopedic" | "metabolic" | "gestational" | "cardiovascular";
  readonly severity: "mild" | "moderate" | "severe";
  readonly diagnosedYear?: number;
  readonly excludedExercises: readonly string[];
  readonly excludedNutrients: readonly string[];
  readonly isActive: boolean;
  readonly clinicalGuidance: string;
}

const MOCK_CONDITIONS: readonly HealthConditionRecord[] = [
  {
    id: "cond-1",
    name: "L4-L5 Lumbar Disc Herniation",
    category: "orthopedic",
    severity: "moderate",
    diagnosedYear: 2024,
    excludedExercises: [
      "Barbell Back Squat",
      "Conventional Deadlift",
      "Overhead Standing Military Press",
      "Barbell Good Mornings",
    ],
    excludedNutrients: [],
    isActive: true,
    clinicalGuidance:
      "Axial vertical compressive load strictly contraindicated. Replace with horizontal sled or leg press with hip wedge.",
  },
  {
    id: "cond-2",
    name: "Hyperuricemia & Uric Acid Predisposition",
    category: "metabolic",
    severity: "moderate",
    diagnosedYear: 2023,
    excludedExercises: [],
    excludedNutrients: [
      "High-purine meats (>400mg/100g)",
      "Brewer's Yeast",
      "Organ Meats",
      "High Fructose Corn Syrup",
    ],
    isActive: true,
    clinicalGuidance:
      "Purine load capped at 300mg daily. Alkalizing hydration and cherry extract supplementation advised.",
  },
  {
    id: "cond-3",
    name: "Gestational Protocol (Second Trimester)",
    category: "gestational",
    severity: "mild",
    diagnosedYear: 2026,
    excludedExercises: ["Supine Bench Press after Wk 20", "Valsalva Max Effort Reps"],
    excludedNutrients: ["Unpasteurized Cheeses", "Raw Seafood / High Mercury Fish"],
    isActive: true,
    clinicalGuidance:
      "ACOG guideline: +340 kcal/day calorie scaling. Avoid prolonged supine positioning to prevent inferior vena cava compression.",
  },
];

export function useHealthConditions() {
  return useQuery({
    queryKey: QUERY_KEYS.HEALTH_VAULT.ALL,
    queryFn: async (): Promise<readonly HealthConditionRecord[]> => {
      return MOCK_CONDITIONS;
    },
    initialData: MOCK_CONDITIONS,
    staleTime: 60 * 1000,
  });
}
