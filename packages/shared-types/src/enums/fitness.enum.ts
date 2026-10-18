/**
 * @file packages/shared-types/src/enums/fitness.enum.ts
 * @description Scientific hypertrophy, periodization, and equipment taxonomy enums with dynamic UUID generation.
 * @module @vitalai/shared-types
 */

import { generateCatalogUuid } from "../utils/uuid";

// ─── Onboarding & User Preference Taxonomies ─────────────────────────────────

export const GOALS = [
  "Hypertrophy",
  "Shred & Cut",
  "Calisthenics Mastery",
  "Maximum Strength",
  "Athletic Stamina",
] as const;
export type Goal = (typeof GOALS)[number];

export const EQUIPMENT_TYPES = [
  "Full Commercial Gym",
  "Dumbbells & Bench",
  "Resistance Bands Only",
  "Bodyweight Only",
] as const;
export type Equipment = (typeof EQUIPMENT_TYPES)[number];

export const EXPERIENCE_LEVELS = ["Beginner", "Intermediate", "Advanced", "Elite"] as const;
export type ExperienceLevel = (typeof EXPERIENCE_LEVELS)[number];

export const FOCUS_AREAS = [
  "Chest & Arms",
  "Core & Six-Pack",
  "Back & Shoulders",
  "Quads & Glutes",
  "Full Body",
] as const;
export type FocusArea = (typeof FOCUS_AREAS)[number];

export const SPLIT_TYPES = ["Push/Pull/Legs", "Upper/Lower", "Full Body", "Arnold Split"] as const;
export type SplitType = (typeof SPLIT_TYPES)[number];

// ─── Hypertrophy & Periodization Enums ───────────────────────────────────────

/**
 * Anatomical muscle groups mapped in the interactive Human Muscle Heatmap.
 */
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

/**
 * Phases of a standard 6-week hypertrophy mesocycle.
 */
export enum MesocyclePhase {
  BASELINE = "baseline",
  OVERLOAD = "overload",
  PEAK = "peak",
  DELOAD = "deload",
}

/**
 * Movement classification determining fatigue accumulation and neurological demand.
 */
export enum ExerciseCategory {
  COMPOUND = "compound",
  ACCESSORY = "accessory",
  ISOLATION = "isolation",
}

/**
 * Trigger reason for executing an AI Biomechanical Exercise Swap.
 */
export enum SwapReason {
  MACHINE_OCCUPIED = "machine_occupied",
  JOINT_DISCOMFORT = "joint_discomfort",
  TIME_CONSTRAINED = "time_constrained",
  EQUIPMENT_MISSING = "equipment_missing",
}

/**
 * Training volume status relative to hypertrophy landmarks (MEV, MAV, MRV).
 */
export enum VolumeStatus {
  BELOW_MEV = "below_mev",
  OPTIMAL_MAV = "optimal_mav",
  APPROACHING_MRV = "approaching_mrv",
  OVERREACHING = "overreaching",
}

/**
 * Broad category grouping for gym and home equipment.
 */
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
