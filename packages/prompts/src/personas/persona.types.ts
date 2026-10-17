/**
 * @file packages/prompts/src/personas/persona.types.ts
 * @description Canonical type definitions for clinical and athletic AI advisor personas.
 * @module @vitalai/prompts/personas
 */

import {
  AdvisorSpecialty,
  AdvisorTone,
  ConditionId,
  ExerciseId,
  FoodTag,
  LifeStage,
  CaloricGoal,
} from "@vitalai/shared-types";

/**
 * Canonical identifiers for prebuilt clinical and athletic AI personas.
 */
export enum AdvisorPersonaId {
  ELENA_ROSTOVA = "dr-elena-rostova",
  MARCUS_VANCE = "marcus-vance",
  JULIAN_MERCER = "dr-julian-mercer",
  SARAH_JENKINS = "dr-sarah-jenkins",
}

/**
 * Dynamic user Health Vault context interpolated into the persona's system prompt.
 * Strictly typed against canonical monorepo enums (zero loose strings).
 */
export interface PersonaContext {
  readonly userName?: string;
  readonly activeConditions?: readonly ConditionId[];
  readonly blacklistedMovements?: readonly ExerciseId[];
  readonly blacklistedIngredients?: readonly FoodTag[];
  readonly currentLifeStage?: LifeStage;
  readonly caloricGoal?: CaloricGoal;
  readonly targetCalories?: number;
  readonly currentMesocycleId?: string;
}

/**
 * Internal persona definition and system instructions generator.
 */
export interface PersonaDefinition {
  readonly id: AdvisorPersonaId;
  readonly name: string;
  readonly title: string;
  readonly avatar: string;
  readonly specialty: AdvisorSpecialty;
  readonly tone: AdvisorTone;
  readonly description: string;
  readonly buildSystemPrompt: (context: PersonaContext) => string;
}
