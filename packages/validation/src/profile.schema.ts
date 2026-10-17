/**
 * @file packages/validation/src/profile.schema.ts
 * @description Zod validation schemas for user onboarding, physical traits, and Muscle Monster equipment selection.
 * @module @vitalai/validation
 */

import { z } from "zod";
import { BiologicalSex, ActivityLevel, CaloricGoal, LifeStage } from "@vitalai/shared-types";

/**
 * Validates clinical biometric inputs during initial user onboarding.
 */
export const onboardingSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name cannot exceed 100 characters"),
  biologicalSex: z.nativeEnum(BiologicalSex, {
    errorMap: () => ({ message: "Please select a biological sex" }),
  }),
  age: z
    .number()
    .int("Age must be an integer")
    .min(13, "Must be at least 13 years old")
    .max(120, "Age cannot exceed 120 years"),
  heightCm: z
    .number()
    .min(80, "Height must be at least 80 cm")
    .max(250, "Height cannot exceed 250 cm"),
  weightKg: z
    .number()
    .min(30, "Weight must be at least 30 kg")
    .max(300, "Weight cannot exceed 300 kg"),
  activityLevel: z.nativeEnum(ActivityLevel, {
    errorMap: () => ({ message: "Please select an activity level" }),
  }),
  caloricGoal: z.nativeEnum(CaloricGoal, {
    errorMap: () => ({ message: "Please select a caloric strategy" }),
  }),
  lifeStage: z.nativeEnum(LifeStage).default(LifeStage.GENERAL_ADULT),
});

export type OnboardingInput = z.infer<typeof onboardingSchema>;

/**
 * Validates profile metric updates.
 */
export const updateProfileSchema = onboardingSchema.partial();
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

/**
 * Validates the Muscle Monster equipment selection flow.
 * Users choose available equipment from the master catalog to unlock matching exercises.
 */
export const equipmentSelectionSchema = z.object({
  availableEquipmentIds: z
    .array(z.string().uuid("Invalid equipment UUID"))
    .min(1, "Select at least one piece of equipment or bodyweight"),
  isHomeGym: z.boolean().default(false),
  notes: z.string().max(500).optional(),
});

export type EquipmentSelectionInput = z.infer<typeof equipmentSelectionSchema>;
