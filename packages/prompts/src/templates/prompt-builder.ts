/**
 * @file packages/prompts/src/templates/prompt-builder.ts
 * @description Dynamic prompt assembler combining database-driven system instructions with Health Vault contexts and safety guidelines.
 * @module @vitalai/prompts/templates
 */

import { PersonaContext } from "../personas/persona.types";
import { CLINICAL_SAFETY_DIRECTIVES } from "../system/safety-guidelines.prompt";
import { buildReActInstructions } from "../system/react-format.prompt";

/**
 * Dynamically builds the complete system prompt from database-stored advisor instructions,
 * interpolating active clinical health vault conditions and mandatory safety directives.
 */
export function buildAdvisorSystemPrompt(
  systemInstructions: string,
  context: PersonaContext,
  safetyDirectives?: string,
): string {
  const vaultLines: string[] = [
    `LIVE PATIENT HEALTH VAULT CONTEXT:`,
    `- Active Diagnosed Conditions: ${
      context.activeConditions && context.activeConditions.length > 0
        ? context.activeConditions.join(", ")
        : "None reported"
    }`,
    `- Clinically Blacklisted Movements: ${
      context.blacklistedMovements && context.blacklistedMovements.length > 0
        ? context.blacklistedMovements.join(", ")
        : "None"
    }`,
    `- Blacklisted Nutrition Ingredients: ${
      context.blacklistedIngredients && context.blacklistedIngredients.length > 0
        ? context.blacklistedIngredients.join(", ")
        : "None"
    }`,
  ];

  if (context.currentLifeStage) {
    vaultLines.push(`- Current Life Stage: ${context.currentLifeStage}`);
  }
  if (context.caloricGoal) {
    vaultLines.push(`- Caloric Goal: ${context.caloricGoal}`);
  }
  if (context.targetCalories) {
    vaultLines.push(`- Target Daily Calories: ${context.targetCalories} kcal`);
  }

  const safety = safetyDirectives ?? CLINICAL_SAFETY_DIRECTIVES;

  return `${systemInstructions}

---
${vaultLines.join("\n")}

---
${safety}`;
}

export function buildFullReActPrompt(
  query: string,
  toolNames: readonly string[],
  toolDocumentation: string,
  scratchpad: string,
): string {
  const instructions = buildReActInstructions(toolNames, toolDocumentation);
  return `${instructions}

${scratchpad}Thought:`;
}
