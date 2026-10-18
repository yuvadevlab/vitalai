import { z } from "zod";
import { SPLIT_TYPES } from "../enums/fitness.enum";

export const ExerciseSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  sets: z.number().int().positive(),
  reps: z.string(),
  load: z.string(),
  loadKg: z.number().nonnegative(),
  targetRir: z.number().min(0).max(5).default(2),
  cues: z.array(z.string()).default([]),
  alternatives: z.array(z.string()).default([]),
});

export type ExerciseDto = z.infer<typeof ExerciseSchema>;

export const WorkoutSessionSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  split: z.enum(SPLIT_TYPES),
  durationMins: z.number().int().positive(),
  targetRir: z.number().int().min(0).max(5),
  exercises: z.array(ExerciseSchema),
});

export type WorkoutSessionDto = z.infer<typeof WorkoutSessionSchema>;

export const LoggedSetSchema = z.object({
  setNumber: z.number().int().positive(),
  loadKg: z.number().nonnegative(),
  reps: z.number().int().positive(),
  completed: z.boolean().default(false),
});

export type LoggedSetDto = z.infer<typeof LoggedSetSchema>;
