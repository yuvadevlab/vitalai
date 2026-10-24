/**
 * @file packages/ai-engine/src/guardrails/tier1-safety-filter.ts
 * @description Tier-1 deterministic medical safety guardrail engine.
 * @module @vitalai/ai-engine/guardrails
 */

import { Logger } from "@yuva-devlab/logger";
import { CONTRAINDICATION_MATRIX, EXERCISE_TAXONOMY } from "@vitalai/constants";
import { ConditionSeverity, LifeStage } from "@vitalai/shared-types";
import {
  SafetyGuardrailContext,
  GuardrailEvaluationResult,
  GuardrailViolation,
  GuardrailViolationType,
} from "./guardrail.types";

const OBSTETRIC_CONTRAINDICATED_MANEUVER = "valsalva";
const OBSTETRIC_ALTERNATIVE_BREATHING = "Continuous rhythmic diaphragmatic breathing";

export class Tier1SafetyFilter {
  private readonly logger = new Logger(Tier1SafetyFilter.name);

  /**
   * Evaluates proposed recommendations against active Health Vault conditions.
   */
  evaluateSafety(
    proposedContent: string,
    context: SafetyGuardrailContext,
  ): GuardrailEvaluationResult {
    const violations: GuardrailViolation[] = [];
    const blockedExclusions = new Set<string>();
    const safeSubstitutes = new Set<string>();

    const contentLower = proposedContent.toLowerCase();

    for (const conditionId of context.activeConditions) {
      const entry = CONTRAINDICATION_MATRIX.find((c) => c.conditionId === conditionId);
      if (!entry) continue;

      // 1. Verify blacklisted exercises
      for (const exerciseId of entry.blacklistedExerciseIds) {
        const taxEntry = EXERCISE_TAXONOMY.find((e) => e.id === exerciseId);
        const readableExercise = taxEntry ? taxEntry.name.toLowerCase() : exerciseId.toLowerCase();
        blockedExclusions.add(readableExercise);

        if (
          contentLower.includes(readableExercise) ||
          contentLower.includes(exerciseId.toLowerCase())
        ) {
          const alternatives = entry.whitelistedAlternativeExerciseIds.map((id) => {
            const alt = EXERCISE_TAXONOMY.find((e) => e.id === id);
            return alt ? alt.name.toLowerCase() : id.toLowerCase();
          });
          alternatives.forEach((alt) => safeSubstitutes.add(alt));

          violations.push({
            type: GuardrailViolationType.EXERCISE,
            item: readableExercise,
            condition: entry.conditionName,
            severity: entry.defaultSeverity,
            rationale: `Contraindicated by clinical protocol: ${entry.clinicalProtocols[0] ?? "Structural pathology risk"}`,
            safeAlternatives: alternatives,
          });
        }
      }

      // 2. Verify blacklisted food tags
      for (const foodTag of entry.blacklistedFoodTags) {
        const readableFood = foodTag.replace(/_/g, " ").toLowerCase();
        blockedExclusions.add(readableFood);

        if (contentLower.includes(readableFood) || contentLower.includes(foodTag.toLowerCase())) {
          const alternatives = entry.whitelistedFoodTags.map((tag) =>
            tag.replace(/_/g, " ").toLowerCase(),
          );
          alternatives.forEach((alt) => safeSubstitutes.add(alt));

          violations.push({
            type: GuardrailViolationType.FOOD,
            item: readableFood,
            condition: entry.conditionName,
            severity: entry.defaultSeverity,
            rationale: `Metabolic safety violation: ${entry.clinicalProtocols[0] ?? "Exceeds clinical metabolic ceiling"}`,
            safeAlternatives: alternatives,
          });
        }
      }
    }

    // 3. Obstetric safeguards
    const isPregnant =
      context.currentLifeStage === LifeStage.PREGNANCY_FIRST_TRIMESTER ||
      context.currentLifeStage === LifeStage.PREGNANCY_SECOND_TRIMESTER ||
      context.currentLifeStage === LifeStage.PREGNANCY_THIRD_TRIMESTER;

    if (isPregnant && contentLower.includes(OBSTETRIC_CONTRAINDICATED_MANEUVER)) {
      violations.push({
        type: GuardrailViolationType.OBSTETRIC_CONTRAINDICATION,
        item: "Valsalva Maneuver",
        condition: `Pregnancy (${context.currentLifeStage})`,
        severity: ConditionSeverity.STRICT_CONTRAINDICATION,
        rationale:
          "Elevated intra-abdominal pressure contraindicated due to fetal perfusion risks and pelvic floor compromise.",
        safeAlternatives: [OBSTETRIC_ALTERNATIVE_BREATHING],
      });
    }

    const isSafe = violations.length === 0;

    if (!isSafe) {
      this.logger.warn(
        `[evaluateSafety] Blocked ${violations.length} safety violations for conditions: ${context.activeConditions.join(", ")}`,
      );
    }

    return {
      isSafe,
      violations,
      blockedExclusions: Array.from(blockedExclusions),
      safeSubstitutes: Array.from(safeSubstitutes),
      clinicalAdvisory: isSafe
        ? undefined
        : `Medical Guardrail Intercept: Replaced ${violations.map((v) => v.item).join(", ")} with clinically validated alternatives.`,
    };
  }
}

export const globalSafetyFilter = new Tier1SafetyFilter();
