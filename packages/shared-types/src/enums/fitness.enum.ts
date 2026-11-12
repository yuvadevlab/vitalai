/**
 * @file packages/shared-types/src/enums/fitness.enum.ts
 * @description Scientific hypertrophy, periodization, and equipment taxonomy enums with dynamic UUID generation.
 * @module @vitalai/shared-types
 */

import { generateCatalogUuid } from "../utils/uuid";

// ─── Onboarding & User Preference Taxonomies ─────────────────────────────────

export enum GoalEnum {
  HYPERTROPHY = "Hypertrophy",
  SHRED_AND_CUT = "Shred & Cut",
  CALISTHENICS_MASTERY = "Calisthenics Mastery",
  MAXIMUM_STRENGTH = "Maximum Strength",
  ATHLETIC_STAMINA = "Athletic Stamina",
}
export const Goal = GoalEnum;
export type Goal = `${GoalEnum}`;

export const GOALS = [
  GoalEnum.HYPERTROPHY,
  GoalEnum.SHRED_AND_CUT,
  GoalEnum.CALISTHENICS_MASTERY,
  GoalEnum.MAXIMUM_STRENGTH,
  GoalEnum.ATHLETIC_STAMINA,
] as const;

export enum EquipmentTypeEnum {
  FULL_COMMERCIAL_GYM = "Full Commercial Gym",
  DUMBBELLS_AND_BENCH = "Dumbbells & Bench",
  RESISTANCE_BANDS_ONLY = "Resistance Bands Only",
  BODYWEIGHT_ONLY = "Bodyweight Only",
}
export const EquipmentType = EquipmentTypeEnum;
export type Equipment = `${EquipmentTypeEnum}`;

export const EQUIPMENT_TYPES = [
  EquipmentTypeEnum.FULL_COMMERCIAL_GYM,
  EquipmentTypeEnum.DUMBBELLS_AND_BENCH,
  EquipmentTypeEnum.RESISTANCE_BANDS_ONLY,
  EquipmentTypeEnum.BODYWEIGHT_ONLY,
] as const;

export enum ExperienceLevelEnum {
  BEGINNER = "Beginner",
  INTERMEDIATE = "Intermediate",
  ADVANCED = "Advanced",
  ELITE = "Elite",
}
export const ExperienceLevel = ExperienceLevelEnum;
export type ExperienceLevel = `${ExperienceLevelEnum}`;

export const EXPERIENCE_LEVELS = [
  ExperienceLevelEnum.BEGINNER,
  ExperienceLevelEnum.INTERMEDIATE,
  ExperienceLevelEnum.ADVANCED,
  ExperienceLevelEnum.ELITE,
] as const;

export enum FocusAreaEnum {
  CHEST_AND_ARMS = "Chest & Arms",
  CORE_AND_SIX_PACK = "Core & Six-Pack",
  BACK_AND_SHOULDERS = "Back & Shoulders",
  QUADS_AND_GLUTES = "Quads & Glutes",
  FULL_BODY = "Full Body",
}
export const FocusArea = FocusAreaEnum;
export type FocusArea = `${FocusAreaEnum}`;

export const FOCUS_AREAS = [
  FocusAreaEnum.CHEST_AND_ARMS,
  FocusAreaEnum.CORE_AND_SIX_PACK,
  FocusAreaEnum.BACK_AND_SHOULDERS,
  FocusAreaEnum.QUADS_AND_GLUTES,
  FocusAreaEnum.FULL_BODY,
] as const;

export enum SplitTypeEnum {
  PUSH_PULL_LEGS = "Push/Pull/Legs",
  UPPER_LOWER = "Upper/Lower",
  FULL_BODY = "Full Body",
  ARNOLD_SPLIT = "Arnold Split",
}
export const SplitType = SplitTypeEnum;
export type SplitType = `${SplitTypeEnum}`;

export const SPLIT_TYPES = [
  SplitTypeEnum.PUSH_PULL_LEGS,
  SplitTypeEnum.UPPER_LOWER,
  SplitTypeEnum.FULL_BODY,
  SplitTypeEnum.ARNOLD_SPLIT,
] as const;

// ─── Hypertrophy & Periodization Enums ───────────────────────────────────────

/** Anatomical muscle groups mapped in the interactive Human Muscle Heatmap. */
export enum MuscleGroup {
  CHEST = "chest",
  BACK = "back",
  SHOULDERS = "shoulders",
  BICEPS = "biceps",
  TRICEPS = "triceps",
  QUADS = "quads",
  HAMSTRINGS = "hamstrings",
  GLUTES = "glutes",
  CALVES = "calves",
  CORE = "core",
}

/** Phases of a standard 6-week hypertrophy mesocycle. */
export enum MesocyclePhase {
  BASELINE = "baseline",
  OVERLOAD = "overload",
  PEAK = "peak",
  DELOAD = "deload",
}

/** Movement classification determining fatigue accumulation and neurological demand. */
export enum ExerciseCategory {
  COMPOUND = "compound",
  ACCESSORY = "accessory",
  ISOLATION = "isolation",
}

/** Trigger reason for executing an AI Biomechanical Exercise Swap. */
export enum SwapReason {
  MACHINE_OCCUPIED = "machine_occupied",
  JOINT_DISCOMFORT = "joint_discomfort",
  TIME_CONSTRAINED = "time_constrained",
  EQUIPMENT_MISSING = "equipment_missing",
}

/** Training volume status relative to hypertrophy landmarks (MEV, MAV, MRV). */
export enum VolumeStatus {
  BELOW_MEV = "below_mev",
  OPTIMAL_MAV = "optimal_mav",
  APPROACHING_MRV = "approaching_mrv",
  OVERREACHING = "overreaching",
}

/** Broad category grouping for gym and home equipment. */
export enum EquipmentCategory {
  BODYWEIGHT = "bodyweight",
  FREE_WEIGHTS = "free_weights",
  BENCHES_AND_RACKS = "benches_and_racks",
  CABLES = "cables",
  MACHINES = "machines",
  RESISTANCE_BANDS = "resistance_bands",
}

/**
 * Canonical equipment identifier UUIDs generated via official RFC 4122 v5 UUID standard.
 * Users check these during onboarding (Muscle Monster flow) to unlock matching exercises.
 */
export const EquipmentId = {
  // Bodyweight & Calisthenics
  BODYWEIGHT_ONLY: generateCatalogUuid("equipment", "bodyweight_only"),
  PULL_UP_BAR: generateCatalogUuid("equipment", "pull_up_bar"),
  DIP_STATION: generateCatalogUuid("equipment", "dip_station"),
  RESISTANCE_BANDS: generateCatalogUuid("equipment", "resistance_bands"),

  // Free Weights
  DUMBBELLS: generateCatalogUuid("equipment", "dumbbells"),
  BARBELL_AND_PLATES: generateCatalogUuid("equipment", "barbell_and_plates"),
  KETTLEBELL: generateCatalogUuid("equipment", "kettlebell"),
  EZ_CURL_BAR: generateCatalogUuid("equipment", "ez_curl_bar"),

  // Benches & Racks
  FLAT_BENCH: generateCatalogUuid("equipment", "flat_bench"),
  ADJUSTABLE_BENCH: generateCatalogUuid("equipment", "adjustable_bench"),
  SQUAT_RACK: generateCatalogUuid("equipment", "squat_rack"),

  // Cables & Machines
  CABLE_PULLEY_TOWER: generateCatalogUuid("equipment", "cable_pulley_tower"),
  SMITH_MACHINE: generateCatalogUuid("equipment", "smith_machine"),
  LEG_PRESS_MACHINE: generateCatalogUuid("equipment", "leg_press_machine"),
  LEG_CURL_MACHINE: generateCatalogUuid("equipment", "leg_curl_machine"),
  LAT_PULLDOWN_ROW: generateCatalogUuid("equipment", "lat_pulldown_row"),
  CHEST_PRESS_MACHINE: generateCatalogUuid("equipment", "chest_press_machine"),
} as const;

export type EquipmentId = (typeof EquipmentId)[keyof typeof EquipmentId];

/**
 * Fundamental human movement patterns.
 */
export enum MovementPattern {
  HORIZONTAL_PUSH = "horizontal_push",
  HORIZONTAL_PULL = "horizontal_pull",
  VERTICAL_PUSH = "vertical_push",
  VERTICAL_PULL = "vertical_pull",
  SQUAT = "squat",
  HINGE = "hinge",
  LUNGE = "lunge",
  ISOLATION = "isolation",
}

/**
 * Compressive vertical stress applied to the spine.
 */
export enum AxialLoadingLevel {
  NONE = "none",
  LOW = "low",
  MODERATE = "moderate",
  HIGH = "high",
}

/**
 * Clinical biomechanical contraindication tags.
 */
export enum ContraindicationTag {
  SPINAL_COMPRESSION = "spinal_compression",
  SHOULDER_INTERNAL_ROTATION = "shoulder_internal_rotation",
  KNEE_SHEAR = "knee_shear",
  WRIST_EXTENSION = "wrist_extension",
  HIP_IMPINGEMENT = "hip_impingement",
}

/**
 * Canonical clinical exercise identifier UUIDs generated via official RFC 4122 v5 UUID standard.
 */
export const ExerciseId = {
  INCLINE_DUMBBELL_BENCH: generateCatalogUuid("exercise", "incline_dumbbell_bench"),
  BARBELL_BENCH_PRESS: generateCatalogUuid("exercise", "barbell_bench_press"),
  CABLE_CHEST_FLY: generateCatalogUuid("exercise", "cable_chest_fly"),
  PUSH_UPS: generateCatalogUuid("exercise", "push_ups"),
  CHEST_SUPPORTED_T_BAR_ROW: generateCatalogUuid("exercise", "chest_supported_t_bar_row"),
  NEUTRAL_GRIP_LAT_PULLDOWN: generateCatalogUuid("exercise", "neutral_grip_lat_pulldown"),
  PULL_UPS: generateCatalogUuid("exercise", "pull_ups"),
  CABLE_LATERAL_RAISE: generateCatalogUuid("exercise", "cable_lateral_raise"),
  CABLE_ROPE_TRICEPS_PUSHDOWN: generateCatalogUuid("exercise", "cable_rope_triceps_pushdown"),
  BARBELL_BACK_SQUAT: generateCatalogUuid("exercise", "barbell_back_squat"),
  DUMBBELL_GOBLET_SQUAT: generateCatalogUuid("exercise", "dumbbell_goblet_squat"),
  SEATED_HAMSTRING_LEG_CURL: generateCatalogUuid("exercise", "seated_hamstring_leg_curl"),
} as const;

export type ExerciseId = (typeof ExerciseId)[keyof typeof ExerciseId];
