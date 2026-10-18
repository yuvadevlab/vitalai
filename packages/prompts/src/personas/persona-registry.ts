/**
 * @file packages/prompts/src/personas/persona-registry.ts
 * @description Central registry and prompt compiler for clinical AI personas.
 * @module @vitalai/prompts/personas
 */

import { AdvisorSpecialty } from "@vitalai/shared-types";
import { PersonaDefinition, PersonaContext, AdvisorPersonaId } from "./persona.types";
import { elenaNutritionPersona } from "./elena-nutrition.prompt";
import { marcusHypertrophyPersona } from "./marcus-hypertrophy.prompt";
import { julianRehabPersona } from "./julian-rehab.prompt";
import { sarahObstetricPersona } from "./sarah-obstetric.prompt";

export const PREBUILT_ENGINE_PERSONAS: readonly PersonaDefinition[] = [
  elenaNutritionPersona,
  marcusHypertrophyPersona,
  julianRehabPersona,
  sarahObstetricPersona,
];

export class PersonaRegistry {
  private readonly personasMap = new Map<AdvisorPersonaId, PersonaDefinition>();
  private readonly specialtyMap = new Map<AdvisorSpecialty, PersonaDefinition>();

  constructor() {
    for (const persona of PREBUILT_ENGINE_PERSONAS) {
      this.personasMap.set(persona.id, persona);
      this.specialtyMap.set(persona.specialty, persona);
    }
  }

  getPersonaById(id: AdvisorPersonaId): PersonaDefinition | undefined {
    return this.personasMap.get(id);
  }

  getPersonaBySpecialty(specialty: AdvisorSpecialty): PersonaDefinition {
    return this.specialtyMap.get(specialty) ?? elenaNutritionPersona;
  }

  triageByQuery(query: string): PersonaDefinition {
    const lower = query.toLowerCase();

    if (
      lower.includes("pregnant") ||
      lower.includes("trimester") ||
      lower.includes("prenatal") ||
      lower.includes("fetal") ||
      lower.includes("pelvic floor") ||
      lower.includes("folate")
    ) {
      return sarahObstetricPersona;
    }

    if (
      lower.includes("pain") ||
      lower.includes("hurt") ||
      lower.includes("injury") ||
      lower.includes("herniat") ||
      lower.includes("imping") ||
      lower.includes("rehab") ||
      lower.includes("swap") ||
      lower.includes("knee") ||
      lower.includes("shoulder") ||
      lower.includes("spine")
    ) {
      return julianRehabPersona;
    }

    if (
      lower.includes("workout") ||
      lower.includes("exercise") ||
      lower.includes("mesocycle") ||
      lower.includes("hypertrophy") ||
      lower.includes("volume") ||
      lower.includes("sets") ||
      lower.includes("reps") ||
      lower.includes("rir") ||
      lower.includes("overload")
    ) {
      return marcusHypertrophyPersona;
    }

    return elenaNutritionPersona;
  }

  compileSystemPrompt(persona: PersonaDefinition, context: PersonaContext): string {
    return persona.buildSystemPrompt(context);
  }
}

export const globalPersonaRegistry = new PersonaRegistry();
