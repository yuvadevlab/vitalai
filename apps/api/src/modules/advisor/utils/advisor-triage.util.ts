/**
 * @file apps/api/src/modules/advisor/utils/advisor-triage.util.ts
 * @description Triage query router and mapping utilities for clinical AI advisor personas.
 * @module @vitalai/api/advisor
 */

import { type AdvisorPersona, type ChatMessage } from "@vitalai/database";
import { AdvisorSpecialty, AdvisorTone, MessageRole } from "@vitalai/shared-types";
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
    q.includes("swap")
  ) {
    return (
      personas.find((p) => p.specialty === AdvisorSpecialty.PHYSICAL_THERAPY_REHAB) ?? personas[0]!
    );
  }
  if (
    q.includes("purine") ||
    q.includes("food") ||
    q.includes("meal") ||
    q.includes("calorie") ||
    q.includes("protein")
  ) {
    return (
      personas.find((p) => p.specialty === AdvisorSpecialty.CLINICAL_NUTRITION) ?? personas[0]!
    );
  }
  return (
    personas.find((p) => p.specialty === AdvisorSpecialty.HYPERTROPHY_PERIODIZATION) ?? personas[0]!
  );
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
