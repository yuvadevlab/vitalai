/**
 * @file packages/shared-types/src/enums/fitness.enum.ts
 * @description Scientific hypertrophy, periodization, and biomechanical taxonomy enums.
 * @module @vitalai/shared-types
 */

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
  /** Week 1: Establish baseline weights, 3 RIR, Minimum Effective Volume (MEV) */
  BASELINE = "baseline",

  /** Weeks 2-4: Progressive overload, 2-1 RIR, Maximum Adaptive Volume (MAV) */
  OVERLOAD = "overload",

  /** Week 5: Overreaching peak, 0-1 RIR, approaching Maximum Recoverable Volume (MRV) */
  PEAK = "peak",

  /** Week 6: Strategic recovery deload, 50% volume reduction, resensitize receptors */
  DELOAD = "deload",
}

/**
 * Movement classification determining fatigue accumulation and neurological demand.
 */
export enum ExerciseCategory {
  /** Multi-joint free weight or machine movements (high axial loading, e.g., Squat, Bench) */
  COMPOUND = "compound",

  /** Machine or cable compound variants with reduced stabilizer fatigue */
  ACCESSORY = "accessory",

  /** Single-joint targeted isolation movements (e.g., Lateral Raise, Leg Curl) */
  ISOLATION = "isolation",
}

/**
 * Trigger reason for executing an AI Biomechanical Exercise Swap.
 */
export enum SwapReason {
  /** The requested gym equipment or machine is currently occupied by someone else */
  MACHINE_OCCUPIED = "machine_occupied",

  /** Acute joint pain or discomfort detected during warmup or execution */
  JOINT_DISCOMFORT = "joint_discomfort",

  /** User needs a superset or time-condensed substitute to finish session quickly */
  TIME_CONSTRAINED = "time_constrained",

  /** Gym lacks the specific equipment specified in the current workout plan */
  EQUIPMENT_MISSING = "equipment_missing",
}
