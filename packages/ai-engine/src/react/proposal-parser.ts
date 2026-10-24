/**
 * @file packages/ai-engine/src/react/proposal-parser.ts
 * @description Extracts structured Two-Phase Action Proposals from LLM reasoning outputs.
 * @module @vitalai/ai-engine/react
 */

import { ProposalType, ProposalStatus, TwoPhaseActionProposal } from "@vitalai/shared-types";

export class ProposalParser {
  /**
   * Scans text for action proposal payload blocks.
   */
  extractProposal(text: string): { cleanText: string; proposal?: TwoPhaseActionProposal } {
    const jsonBlockRegex = /```json\s*(\{[\s\S]*?"proposalType"[\s\S]*?\})\s*```/i;
    const match = text.match(jsonBlockRegex);

    if (!match || !match[1]) {
      return { cleanText: text };
    }

    try {
      const parsed = JSON.parse(match[1]) as Record<string, unknown>;
      const rawType = String(
        parsed["proposalType"] || parsed["type"] || "exercise_swap",
      ).toLowerCase();

      let proposalType: ProposalType = ProposalType.EXERCISE_SWAP;
      if (rawType.includes("meal")) {
        proposalType = ProposalType.MEAL_SWAP;
      } else if (rawType.includes("volume")) {
        proposalType = ProposalType.VOLUME_ADJUSTMENT;
      }

      const proposal: TwoPhaseActionProposal = {
        proposalId: crypto.randomUUID(),
        type: proposalType,
        summary: String(parsed["summary"] || "Action proposal recommended by clinical advisor"),
        previousState: String(parsed["previousState"] || ""),
        proposedState: String(parsed["proposedState"] || ""),
        status: ProposalStatus.PENDING,
      };

      const cleanText = text.replace(match[0], "").trim();
      return { cleanText, proposal };
    } catch {
      return { cleanText: text };
    }
  }
}

export const globalProposalParser = new ProposalParser();
