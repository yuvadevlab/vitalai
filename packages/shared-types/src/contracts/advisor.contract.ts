/**
 * @file packages/shared-types/src/contracts/advisor.contract.ts
 * @description Contracts for AI Advisor personas, transparent clinical reasoning traces, and two-phase proposals.
 * @module @vitalai/shared-types
 */

import {
  AdvisorSpecialty,
  AdvisorTone,
  AdvisorMode,
  ProposalType,
  ProposalStatus,
  MessageRole,
} from "../enums";

/**
 * A single clinical verification or math evaluation phase within the Transparent AI Reasoning Trace.
 */
export interface ClinicalReasoningPhase {
  readonly phaseNumber: number;
  readonly title: string;
  readonly description: string;
  readonly latencyMs: number;
  readonly passed: boolean;
}

/**
 * 100% Transparent AI Reasoning & Safety Trace object displayed in the chat drawer.
 */
export interface AiReasoningTrace {
  readonly traceId: string;
  readonly totalDurationMs: number;
  readonly phases: readonly ClinicalReasoningPhase[];
  readonly formulasEvaluated: readonly string[];
  readonly vaultConditionsChecked: readonly string[];
  readonly contraindicationsDetected: readonly string[];
}

/**
 * Two-phase action proposal rendered inside the chat when the AI recommends a mutation.
 */
export interface TwoPhaseActionProposal {
  readonly proposalId: string;
  readonly type: ProposalType;
  readonly summary: string;
  readonly previousState: string;
  readonly proposedState: string;
  readonly status: ProposalStatus;
}

/**
 * Persona definition for a clinical or athletic AI advisor.
 */
export interface AdvisorPersona {
  readonly id: string;
  readonly name: string;
  readonly title: string;
  readonly avatar: string;
  readonly specialty: AdvisorSpecialty;
  readonly tone: AdvisorTone;
  readonly systemInstructions: string;
  readonly isPrebuilt: boolean;
  readonly isActive: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}

/**
 * DTO for creating a new custom clinical advisor persona.
 */
export interface CreateAdvisorDto {
  readonly name: string;
  readonly title: string;
  readonly avatar: string;
  readonly specialty: AdvisorSpecialty;
  readonly tone: AdvisorTone;
  readonly systemInstructions: string;
}

/**
 * Real-time message exchange in the floating advisor chat drawer.
 */
export interface AdvisorChatMessage {
  readonly id: string;
  readonly role: MessageRole;
  readonly content: string;
  readonly timestamp: string;
  readonly advisorId: string;
  readonly advisorName: string;
  readonly advisorSpecialty: AdvisorSpecialty;
  readonly autoAssigned: boolean;
  readonly mode: AdvisorMode;
  readonly reasoningTrace?: AiReasoningTrace;
  readonly actionProposal?: TwoPhaseActionProposal;
}
