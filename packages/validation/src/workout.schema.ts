/**
 * @file packages/validation/src/workout.schema.ts
 * @description Zod validation schemas for active workout logging, repetition cadence, and biomechanical swaps.
 * @module @vitalai/validation
 */

import { z } from "zod";
import { MesocyclePhase, SwapReason } from "@vitalai/shared-types";

/**
 * Validates 4-phase movement tempo (seconds).
 */
export const movementTempoSchema = z.object({
  eccentric: z.number().int().min(1).max(10),
  pauseBottom: z.number().int().min(0).max(10),
  concentric: z.number().int().min(1).max(10),
  pauseTop: z.number().int().min(0).max(10),
});

export type MovementTempoInput = z.infer<typeof movementTempoSchema>;

/**
 * Validates individual logged workout set during a live training session.
 */
export const logWorkoutSetSchema = z.object({
  setNumber: z.number().int().min(1).max(20),
  targetReps: z.number().int().min(1).max(100),
  actualReps: z.number().int().min(0).max(100).optional(),
  targetRir: z.number().min(0).max(5),
  actualRir: z.number().min(0).max(5).optional(),
  weightKg: z.number().min(0).max(1000).optional(),
  completed: z.boolean().default(false),
  restSeconds: z.number().int().min(15).max(600).default(90),
});

export type LogWorkoutSetInput = z.infer<typeof logWorkoutSetSchema>;

/**
 * Validates request to swap an exercise biomechanically.
 */
export const exerciseSwapRequestSchema = z.object({
  currentExerciseId: z.string().uuid("Invalid current exercise UUID"),
  sessionId: z.string().uuid("Invalid session UUID"),
  reason: z.nativeEnum(SwapReason),
  notes: z.string().max(500).optional(),
});

export type ExerciseSwapRequestInput = z.infer<typeof exerciseSwapRequestSchema>;

/**
 * Validates creating or scheduling a new workout session in a mesocycle.
 */
export const createWorkoutSessionSchema = z.object({
  name: z.string().trim().min(2).max(100),
  weekNumber: z.number().int().min(1).max(12),
  phase: z.nativeEnum(MesocyclePhase),
  estimatedDurationMins: z.number().int().min(10).max(180),
  notes: z.string().max(500).optional(),
});

export type CreateWorkoutSessionInput = z.infer<typeof createWorkoutSessionSchema>;
