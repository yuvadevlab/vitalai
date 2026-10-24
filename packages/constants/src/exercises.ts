/**
 * @file packages/constants/src/exercises.ts
 * @description Curated clinical exercise taxonomy with required equipment tags for Muscle Monster filtering.
 * @module @vitalai/constants
 */

import {
  ExerciseId,
  MuscleGroup,
  ExerciseCategory,
  EquipmentId,
  MovementPattern,
  AxialLoadingLevel,
  ContraindicationTag,
  type MovementTempo,
} from "@vitalai/shared-types";

export interface ExerciseTaxonomyEntry {
  readonly id: ExerciseId;
  readonly name: string;
  readonly primaryMuscle: MuscleGroup;
  readonly secondaryMuscles: readonly MuscleGroup[];
  readonly category: ExerciseCategory;
  readonly requiredEquipment: readonly EquipmentId[];
  readonly movementPattern: MovementPattern;
  readonly axialLoading: AxialLoadingLevel;
  readonly contraindicationTags: readonly ContraindicationTag[];
  readonly defaultTempo: MovementTempo;
  readonly defaultRestSeconds: number;
}

export const EXERCISE_TAXONOMY: readonly ExerciseTaxonomyEntry[] = [
  // ── Chest ─────────────────────────────────────────────────────────────
  {
    id: ExerciseId.INCLINE_DUMBBELL_BENCH,
    name: "Incline Dumbbell Press",
    primaryMuscle: MuscleGroup.CHEST,
    secondaryMuscles: [MuscleGroup.SHOULDERS, MuscleGroup.TRICEPS],
    category: ExerciseCategory.COMPOUND,
    requiredEquipment: [EquipmentId.DUMBBELLS, EquipmentId.ADJUSTABLE_BENCH],
    movementPattern: MovementPattern.HORIZONTAL_PUSH,
    axialLoading: AxialLoadingLevel.LOW,
    contraindicationTags: [],
    defaultTempo: { eccentric: 3, pauseBottom: 0, concentric: 1, pauseTop: 0 },
    defaultRestSeconds: 90,
  },
  {
    id: ExerciseId.BARBELL_BENCH_PRESS,
    name: "Barbell Bench Press",
    primaryMuscle: MuscleGroup.CHEST,
    secondaryMuscles: [MuscleGroup.SHOULDERS, MuscleGroup.TRICEPS],
    category: ExerciseCategory.COMPOUND,
    requiredEquipment: [
      EquipmentId.BARBELL_AND_PLATES,
      EquipmentId.FLAT_BENCH,
      EquipmentId.SQUAT_RACK,
    ],
    movementPattern: MovementPattern.HORIZONTAL_PUSH,
    axialLoading: AxialLoadingLevel.LOW,
    contraindicationTags: [ContraindicationTag.SHOULDER_INTERNAL_ROTATION],
    defaultTempo: { eccentric: 2, pauseBottom: 1, concentric: 1, pauseTop: 0 },
    defaultRestSeconds: 120,
  },
  {
    id: ExerciseId.CABLE_CHEST_FLY,
    name: "Cable Chest Fly",
    primaryMuscle: MuscleGroup.CHEST,
    secondaryMuscles: [MuscleGroup.SHOULDERS],
    category: ExerciseCategory.ISOLATION,
    requiredEquipment: [EquipmentId.CABLE_PULLEY_TOWER],
    movementPattern: MovementPattern.ISOLATION,
    axialLoading: AxialLoadingLevel.NONE,
    contraindicationTags: [],
    defaultTempo: { eccentric: 3, pauseBottom: 1, concentric: 1, pauseTop: 0 },
    defaultRestSeconds: 60,
  },
  {
    id: ExerciseId.PUSH_UPS,
    name: "Standard Floor Push-Ups",
    primaryMuscle: MuscleGroup.CHEST,
    secondaryMuscles: [MuscleGroup.SHOULDERS, MuscleGroup.TRICEPS, MuscleGroup.CORE],
    category: ExerciseCategory.COMPOUND,
    requiredEquipment: [EquipmentId.BODYWEIGHT_ONLY],
    movementPattern: MovementPattern.HORIZONTAL_PUSH,
    axialLoading: AxialLoadingLevel.NONE,
    contraindicationTags: [ContraindicationTag.WRIST_EXTENSION],
    defaultTempo: { eccentric: 2, pauseBottom: 0, concentric: 1, pauseTop: 0 },
    defaultRestSeconds: 60,
  },

  // ── Back ──────────────────────────────────────────────────────────────
  {
    id: ExerciseId.CHEST_SUPPORTED_T_BAR_ROW,
    name: "Chest-Supported T-Bar Row",
    primaryMuscle: MuscleGroup.BACK,
    secondaryMuscles: [MuscleGroup.BICEPS, MuscleGroup.SHOULDERS],
    category: ExerciseCategory.COMPOUND,
    requiredEquipment: [EquipmentId.CHEST_PRESS_MACHINE],
    movementPattern: MovementPattern.HORIZONTAL_PULL,
    axialLoading: AxialLoadingLevel.NONE,
    contraindicationTags: [],
    defaultTempo: { eccentric: 2, pauseBottom: 1, concentric: 1, pauseTop: 0 },
    defaultRestSeconds: 90,
  },
  {
    id: ExerciseId.NEUTRAL_GRIP_LAT_PULLDOWN,
    name: "Neutral-Grip Lat Pulldown",
    primaryMuscle: MuscleGroup.BACK,
    secondaryMuscles: [MuscleGroup.BICEPS],
    category: ExerciseCategory.COMPOUND,
    requiredEquipment: [EquipmentId.LAT_PULLDOWN_ROW],
    movementPattern: MovementPattern.VERTICAL_PULL,
    axialLoading: AxialLoadingLevel.NONE,
    contraindicationTags: [],
    defaultTempo: { eccentric: 3, pauseBottom: 0, concentric: 1, pauseTop: 0 },
    defaultRestSeconds: 90,
  },
  {
    id: ExerciseId.PULL_UPS,
    name: "Overhand Grip Pull-Ups",
    primaryMuscle: MuscleGroup.BACK,
    secondaryMuscles: [MuscleGroup.BICEPS, MuscleGroup.SHOULDERS],
    category: ExerciseCategory.COMPOUND,
    requiredEquipment: [EquipmentId.PULL_UP_BAR],
    movementPattern: MovementPattern.VERTICAL_PULL,
    axialLoading: AxialLoadingLevel.NONE,
    contraindicationTags: [],
    defaultTempo: { eccentric: 2, pauseBottom: 1, concentric: 1, pauseTop: 0 },
    defaultRestSeconds: 90,
  },

  // ── Shoulders & Arms ──────────────────────────────────────────────────
  {
    id: ExerciseId.CABLE_LATERAL_RAISE,
    name: "Cable Lateral Raise",
    primaryMuscle: MuscleGroup.SHOULDERS,
    secondaryMuscles: [],
    category: ExerciseCategory.ISOLATION,
    requiredEquipment: [EquipmentId.CABLE_PULLEY_TOWER],
    movementPattern: MovementPattern.ISOLATION,
    axialLoading: AxialLoadingLevel.NONE,
    contraindicationTags: [],
    defaultTempo: { eccentric: 2, pauseBottom: 1, concentric: 1, pauseTop: 0 },
    defaultRestSeconds: 60,
  },
  {
    id: ExerciseId.CABLE_ROPE_TRICEPS_PUSHDOWN,
    name: "Cable Rope Triceps Pushdown",
    primaryMuscle: MuscleGroup.TRICEPS,
    secondaryMuscles: [],
    category: ExerciseCategory.ISOLATION,
    requiredEquipment: [EquipmentId.CABLE_PULLEY_TOWER],
    movementPattern: MovementPattern.ISOLATION,
    axialLoading: AxialLoadingLevel.NONE,
    contraindicationTags: [],
    defaultTempo: { eccentric: 2, pauseBottom: 0, concentric: 1, pauseTop: 0 },
    defaultRestSeconds: 60,
  },

  // ── Legs ──────────────────────────────────────────────────────────────
  {
    id: ExerciseId.BARBELL_BACK_SQUAT,
    name: "Barbell Back Squat",
    primaryMuscle: MuscleGroup.QUADS,
    secondaryMuscles: [MuscleGroup.GLUTES, MuscleGroup.HAMSTRINGS, MuscleGroup.CORE],
    category: ExerciseCategory.COMPOUND,
    requiredEquipment: [EquipmentId.BARBELL_AND_PLATES, EquipmentId.SQUAT_RACK],
    movementPattern: MovementPattern.SQUAT,
    axialLoading: AxialLoadingLevel.HIGH,
    contraindicationTags: [ContraindicationTag.SPINAL_COMPRESSION, ContraindicationTag.KNEE_SHEAR],
    defaultTempo: { eccentric: 3, pauseBottom: 1, concentric: 1, pauseTop: 0 },
    defaultRestSeconds: 180,
  },
  {
    id: ExerciseId.DUMBBELL_GOBLET_SQUAT,
    name: "Dumbbell Goblet Squat",
    primaryMuscle: MuscleGroup.QUADS,
    secondaryMuscles: [MuscleGroup.GLUTES, MuscleGroup.CORE],
    category: ExerciseCategory.COMPOUND,
    requiredEquipment: [EquipmentId.DUMBBELLS],
    movementPattern: MovementPattern.SQUAT,
    axialLoading: AxialLoadingLevel.LOW,
    contraindicationTags: [],
    defaultTempo: { eccentric: 3, pauseBottom: 1, concentric: 1, pauseTop: 0 },
    defaultRestSeconds: 90,
  },
  {
    id: ExerciseId.SEATED_HAMSTRING_LEG_CURL,
    name: "Seated Hamstring Leg Curl",
    primaryMuscle: MuscleGroup.HAMSTRINGS,
    secondaryMuscles: [],
    category: ExerciseCategory.ISOLATION,
    requiredEquipment: [EquipmentId.LEG_CURL_MACHINE],
    movementPattern: MovementPattern.ISOLATION,
    axialLoading: AxialLoadingLevel.NONE,
    contraindicationTags: [],
    defaultTempo: { eccentric: 3, pauseBottom: 1, concentric: 1, pauseTop: 0 },
    defaultRestSeconds: 75,
  },
] as const;
