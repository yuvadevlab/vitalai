/**
 * @file packages/shared-types/src/contracts/health-vault.contract.ts
 * @description Health Memory Vault, private clinical records, and medical guardrails contracts.
 * @module @vitalai/shared-types
 */

import { ConditionCategory, ConditionSeverity, GuardrailType } from "../enums";

/**
 * Active automated guardrail rule enforced by the AI reasoning engine.
 */
export interface MedicalGuardrailRule {
  readonly ruleId: string;
  readonly type: GuardrailType;
  readonly targetEntity: string;
  readonly clinicalRationale: string;
}

/**
 * Private health condition or biomechanical injury stored in the Health Memory Vault.
 */
export interface HealthCondition {
  readonly id: string;
  readonly name: string;
  readonly category: ConditionCategory;
  readonly severity: ConditionSeverity;
  readonly notes: string;
  readonly active: boolean;
  readonly guardrails: readonly MedicalGuardrailRule[];
  readonly diagnosedAt?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

/**
 * DTO for recording a new health memory or injury record into the vault.
 */
export interface CreateHealthConditionDto {
  readonly name: string;
  readonly category: ConditionCategory;
  readonly severity: ConditionSeverity;
  readonly notes: string;
  readonly active: boolean;
  readonly blacklistedMovements?: readonly string[];
  readonly blacklistedIngredients?: readonly string[];
}
