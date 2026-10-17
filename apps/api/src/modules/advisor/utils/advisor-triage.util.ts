/**
 * @file apps/api/src/modules/advisor/utils/advisor-triage.util.ts
 * @description Triage query router and mapping utilities for clinical AI advisor personas.
 * @module @vitalai/api/advisor
 */

import { type AdvisorPersona, type ChatMessage } from "@vitalai/database";
import {
  AdvisorSpecialty,
  AdvisorTone,
  MessageRole,
  ClinicalReasoningPhase,
} from "@vitalai/shared-types";
import { DynamicAdvisorProfile } from "@vitalai/ai-engine";
import {
  AdvisorPersonaResponse,
  ChatMessageResponse,
  ReasoningTraceStep,
  ActionProposalResponse,
} from "../dto";

export type ChatMessageWithAdvisor = ChatMessage & { readonly advisor?: AdvisorPersona | null };

/**
 * Routes user query intent automatically to the best clinical specialist persona.
 */
export function triageAdvisorQuery(
  query: string,
  personas: readonly AdvisorPersona[],
): AdvisorPersona {
  const q = query.toLowerCase();

  if (
    q.includes("pain") ||
    q.includes("joint") ||
    q.includes("hurt") ||
    q.includes("shoulder") ||
    q.includes("knee") ||
    q.includes("rehab") ||
    q.includes("tendon")
  ) {
    const match = personas.find((p) => p.specialty === AdvisorSpecialty.PHYSICAL_THERAPY_REHAB);
    if (match) return match;
  }

  if (
    q.includes("pregnancy") ||
    q.includes("postpartum") ||
    q.includes("trimester") ||
    q.includes("pelvic") ||
    q.includes("gestational") ||
    q.includes("breastfeeding") ||
    q.includes("lactation")
  ) {
    const match = personas.find((p) => p.specialty === AdvisorSpecialty.OBSTETRIC_HEALTH);
    if (match) return match;
  }

  if (
    q.includes("purine") ||
    q.includes("food") ||
    q.includes("meal") ||
    q.includes("calorie") ||
    q.includes("protein") ||
    q.includes("nutrition") ||
    q.includes("diet") ||
    q.includes("gout") ||
    q.includes("glycemic")
  ) {
    const match = personas.find((p) => p.specialty === AdvisorSpecialty.CLINICAL_NUTRITION);
    if (match) return match;
  }

  return (
    personas.find((p) => p.specialty === AdvisorSpecialty.HYPERTROPHY_PERIODIZATION) ?? personas[0]!
  );
}

/**
 * Converts a database AdvisorPersona record into the cognitive engine's DynamicAdvisorProfile.
 */
export function toAdvisorProfile(persona: AdvisorPersona): DynamicAdvisorProfile {
  return {
    id: persona.id,
    name: persona.name,
    title: persona.title,
    systemInstructions: persona.systemInstructions,
    enabledTools: persona.enabledTools,
  };
}

/**
 * Maps an internal database AdvisorPersona record to the GraphQL presentation response.
 */
export function mapAdvisorPersona(p: AdvisorPersona): AdvisorPersonaResponse {
  return {
    id: p.id,
    name: p.name,
    title: p.title,
    avatar: p.avatar,
    specialty: p.specialty as unknown as AdvisorSpecialty,
    tone: p.tone as unknown as AdvisorTone,
    specialties: p.specialties,
    isPrebuilt: p.isPrebuilt,
    isActive: p.isActive,
  };
}

/**
 * Maps trace phases from the AI reasoning engine to GraphQL reasoning trace steps.
 */
export function mapTracePhasesToSteps(
  phases: readonly ClinicalReasoningPhase[],
): ReasoningTraceStep[] {
  return phases.map((phase) => ({
    phase: phase.title,
    observation: phase.description,
    evaluation: phase.passed ? "Verified clinical safety" : "Contraindication flagged",
    timestamp: new Date().toISOString(),
  }));
}

/**
 * Maps an internal database ChatMessage record to the GraphQL presentation response.
 */
export function mapAdvisorMessage(
  m: ChatMessageWithAdvisor,
  traceOverride?: ReasoningTraceStep[],
): ChatMessageResponse {
  return {
    id: m.id,
    role: m.role as unknown as MessageRole,
    content: m.content,
    autoAssigned: m.autoAssigned,
    advisor: m.advisor ? mapAdvisorPersona(m.advisor) : null,
    reasoningTrace: traceOverride ?? (m.reasoningTrace as unknown as ReasoningTraceStep[] | null),
    actionProposal: m.actionProposal
      ? (m.actionProposal as unknown as ActionProposalResponse)
      : null,
    createdAt: m.createdAt.toISOString(),
  };
}
