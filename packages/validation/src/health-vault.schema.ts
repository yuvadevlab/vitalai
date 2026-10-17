/**
 * @file packages/validation/src/health-vault.schema.ts
 * @description Zod validation schemas for the private Health Memory Vault and clinical guardrail rules.
 * @module @vitalai/validation
 */

import { z } from "zod";
import {
  ConditionCategory,
  ConditionSeverity,
  GuardrailType,
  FoodTag,
} from "@vitalai/shared-types";

/**
 * Validates adding a private health condition, injury, or metabolic memory to the vault.
 */
export const createHealthConditionSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Condition name must be at least 2 characters")
    .max(100, "Condition name cannot exceed 100 characters"),
  category: z.nativeEnum(ConditionCategory, {
    errorMap: () => ({ message: "Select a valid condition category" }),
  }),
  severity: z.nativeEnum(ConditionSeverity, {
    errorMap: () => ({ message: "Select a clinical severity tier" }),
  }),
  notes: z.string().max(1000, "Notes cannot exceed 1000 characters").default(""),
  active: z.boolean().default(true),
  blacklistedMovements: z.array(z.string().uuid("Invalid exercise UUID")).optional(),
  blacklistedIngredients: z.array(z.union([z.nativeEnum(FoodTag), z.string()])).optional(),
  diagnosedAt: z.string().datetime().optional(),
});

export type CreateHealthConditionInput = z.infer<typeof createHealthConditionSchema>;

/**
 * Validates updates to existing health vault memories.
 */
export const updateHealthConditionSchema = createHealthConditionSchema.partial();
export type UpdateHealthConditionInput = z.infer<typeof updateHealthConditionSchema>;

/**
 * Validates automated clinical guardrail rule definitions.
 */
export const medicalGuardrailRuleSchema = z.object({
  ruleId: z.string().uuid("Rule ID must be a valid UUID"),
  type: z.nativeEnum(GuardrailType),
  targetEntity: z.string().min(1, "Target entity is required"),
  clinicalRationale: z.string().min(5, "Rationale must contain at least 5 characters"),
});

export type MedicalGuardrailRuleInput = z.infer<typeof medicalGuardrailRuleSchema>;
