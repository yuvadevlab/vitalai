/**
 * @file packages/ai-engine/src/guardrails/guardrail.types.ts
 * @description Type definitions for Tier-1 deterministic medical safety guardrails.
 * @module @vitalai/ai-engine/guardrails
 */

import {
  ConditionId,
  ConditionSeverity,
  ExerciseId,
  FoodTag,
  LifeStage,
} from "@vitalai/shared-types";

/**
 * Domain category for clinical guardrail intercepts.
 */
export enum GuardrailViolationType {
  EXERCISE = "exercise",
  FOOD = "food",
  OBSTETRIC_CONTRAINDICATION = "obstetric_contraindication",
}

/**
 * Diagnostic context passed into the safety guardrails engine.
 */
export interface SafetyGuardrailContext {
  readonly activeConditions: readonly ConditionId[];
  readonly blacklistedMovements?: readonly ExerciseId[];
  readonly blacklistedIngredients?: readonly FoodTag[];
  readonly currentLifeStage?: LifeStage;
}

/**
 * Details of a medical safety violation intercepted by Tier-1 filters.
 */
export interface GuardrailViolation {
  readonly type: GuardrailViolationType;
  readonly item: string;
  readonly condition: string;
  readonly severity: ConditionSeverity;
  readonly rationale: string;
  readonly safeAlternatives: readonly string[];
}

/**
 * Complete evaluation outcome from the deterministic safety filter.
 */
export interface GuardrailEvaluationResult {
  readonly isSafe: boolean;
  readonly violations: readonly GuardrailViolation[];
  readonly blockedExclusions: readonly string[];
  readonly safeSubstitutes: readonly string[];
  readonly clinicalAdvisory?: string;
}
