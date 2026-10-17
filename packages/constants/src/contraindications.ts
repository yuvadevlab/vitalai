/**
 * @file packages/constants/src/contraindications.ts
 * @description Clinical contraindication rules mapping medical conditions to blacklisted exercises and foods.
 * @module @vitalai/constants
 */

import {
  ConditionId,
  ConditionCategory,
  ConditionSeverity,
  ExerciseId,
  FoodTag,
} from "@vitalai/shared-types";

export interface ContraindicationMatrixEntry {
  readonly conditionId: ConditionId;
  readonly conditionName: string;
  readonly category: ConditionCategory;
  readonly defaultSeverity: ConditionSeverity;
  readonly blacklistedExerciseIds: readonly ExerciseId[];
  readonly blacklistedFoodTags: readonly FoodTag[];
  readonly whitelistedAlternativeExerciseIds: readonly ExerciseId[];
  readonly whitelistedFoodTags: readonly FoodTag[];
  readonly clinicalProtocols: readonly string[];
}

export const CONTRAINDICATION_MATRIX: readonly ContraindicationMatrixEntry[] = [
  {
    conditionId: ConditionId.ROTATOR_CUFF_IMPINGEMENT,
    conditionName: "Rotator Cuff Impingement (Shoulder)",
    category: ConditionCategory.ORTHOPEDIC,
    defaultSeverity: ConditionSeverity.CAUTION,
    blacklistedExerciseIds: [ExerciseId.BARBELL_BENCH_PRESS],
    blacklistedFoodTags: [],
    whitelistedAlternativeExerciseIds: [
      ExerciseId.INCLINE_DUMBBELL_BENCH,
      ExerciseId.CABLE_CHEST_FLY,
    ],
    whitelistedFoodTags: [],
    clinicalProtocols: [
      "Blacklist extreme glenohumeral internal rotation",
      "Whitelist neutral-grip dumbbell pressing",
    ],
  },
  {
    conditionId: ConditionId.LUMBAR_DISC_BULGE,
    conditionName: "L4-S1 Lumbar Disc Bulge",
    category: ConditionCategory.ORTHOPEDIC,
    defaultSeverity: ConditionSeverity.STRICT_CONTRAINDICATION,
    blacklistedExerciseIds: [ExerciseId.BARBELL_BACK_SQUAT],
    blacklistedFoodTags: [],
    whitelistedAlternativeExerciseIds: [ExerciseId.SEATED_HAMSTRING_LEG_CURL],
    whitelistedFoodTags: [],
    clinicalProtocols: [
      "Filter high axial spinal loading",
      "Replace with chest-supported and seated machine variants",
    ],
  },
  {
    conditionId: ConditionId.HYPERURICEMIA_GOUT,
    conditionName: "Hyperuricemia & Gout History",
    category: ConditionCategory.METABOLIC,
    defaultSeverity: ConditionSeverity.STRICT_CONTRAINDICATION,
    blacklistedExerciseIds: [],
    blacklistedFoodTags: [
      FoodTag.ORGAN_MEATS,
      FoodTag.SARDINES,
      FoodTag.ANCHOVIES,
      FoodTag.BEER,
      FoodTag.HIGH_FRUCTOSE_CORN_SYRUP,
    ],
    whitelistedAlternativeExerciseIds: [],
    whitelistedFoodTags: [FoodTag.EGGS, FoodTag.TOFU, FoodTag.WHEY_ISOLATE, FoodTag.LOW_FAT_DAIRY],
    clinicalProtocols: [
      "Strict purine ceiling < 300mg/day",
      "Enforce 3.5L mandatory daily hydration protocol",
    ],
  },
  {
    conditionId: ConditionId.TYPE_2_DIABETES,
    conditionName: "Type 2 Diabetes / Pre-Diabetes",
    category: ConditionCategory.METABOLIC,
    defaultSeverity: ConditionSeverity.CAUTION,
    blacklistedExerciseIds: [],
    blacklistedFoodTags: [FoodTag.REFINED_SUGAR, FoodTag.WHITE_BREAD, FoodTag.CANDY],
    whitelistedAlternativeExerciseIds: [],
    whitelistedFoodTags: [
      FoodTag.ROLLED_OATS,
      FoodTag.BROWN_RICE,
      FoodTag.LENTILS,
      FoodTag.BERRIES,
    ],
    clinicalProtocols: [
      "Low glycemic load carb cycling",
      "Time carbohydrates exclusively in peri-workout windows",
    ],
  },
] as const;
