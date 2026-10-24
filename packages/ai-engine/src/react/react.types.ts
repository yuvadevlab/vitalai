/**
 * @file packages/ai-engine/src/react/react.types.ts
 * @description Canonical type definitions for the ReAct cognitive reasoning loop with dynamic DB advisors.
 * @module @vitalai/ai-engine/react
 */

import { AiReasoningTrace, TwoPhaseActionProposal } from "@vitalai/shared-types";
import { PersonaContext } from "@vitalai/prompts";
import { AiToolName } from "../tools/tool.types";

export interface DynamicAdvisorProfile {
  readonly id: string;
  readonly name: string;
  readonly title?: string;
  readonly systemInstructions: string;
  readonly enabledTools?: readonly string[];
}

export interface ReActStep {
  readonly thought: string;
  readonly action?: AiToolName;
  readonly actionInput?: Record<string, unknown>;
  readonly observation?: Record<string, unknown>;
  readonly durationMs: number;
}

export interface ReActAgentOptions {
  readonly query: string;
  readonly advisor: DynamicAdvisorProfile;
  readonly context: PersonaContext;
  readonly maxIterations?: number;
  readonly temperature?: number;
}

export interface ReActAgentResult {
  readonly finalAnswer: string;
  readonly advisorId: string;
  readonly advisorName: string;
  readonly steps: readonly ReActStep[];
  readonly trace: AiReasoningTrace;
  readonly proposal?: TwoPhaseActionProposal;
}
