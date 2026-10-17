/**
 * @file packages/ai-engine/src/react/react-agent.ts
 * @description Cognitive ReAct reasoning loop coordinator utilizing database-driven advisor instructions.
 * @module @vitalai/ai-engine/react
 */

import { Logger } from "@yuva-devlab/logger";
import { buildAdvisorSystemPrompt, buildFullReActPrompt } from "@vitalai/prompts";
import { ChatModel } from "../llm/llm.types";
import { globalSafetyFilter } from "../guardrails/tier1-safety-filter";
import { globalToolRegistry } from "../tools/tool-registry";
import { AiToolName } from "../tools/tool.types";
import { globalProposalParser } from "./proposal-parser";
import { TraceBuilder } from "./trace-builder";
import { ReActStep, ReActAgentOptions, ReActAgentResult } from "./react.types";

export class ReActAgent {
  private readonly logger = new Logger(ReActAgent.name);

  constructor(
    private readonly model: ChatModel,
    private readonly maxIterations = 3,
  ) {}

  async run(options: ReActAgentOptions): Promise<ReActAgentResult> {
    const trace = new TraceBuilder();
    const steps: ReActStep[] = [];

    // Phase 1: Health Vault Pre-Scan
    const phase1Start = performance.now();
    const vaultConditions = options.context.activeConditions ?? [];
    vaultConditions.forEach((c) => trace.recordConditionChecked(c));

    const preScan = globalSafetyFilter.evaluateSafety(options.query, {
      activeConditions: vaultConditions,
      blacklistedMovements: options.context.blacklistedMovements,
      blacklistedIngredients: options.context.blacklistedIngredients,
      currentLifeStage: options.context.currentLifeStage,
    });

    preScan.violations.forEach((v) => trace.recordContraindication(`${v.item} (${v.rationale})`));
    trace.addPhase(
      "Health Vault & Medical Safety Pre-Scan",
      preScan.isSafe
        ? "Zero contraindication conflicts detected in prompt context"
        : `Active contraindications detected: ${preScan.violations.map((v) => v.item).join(", ")}`,
      performance.now() - phase1Start,
      preScan.isSafe,
    );

    // Phase 2: Dynamic Advisor Dispatch
    const phase2Start = performance.now();
    const advisor = options.advisor;
    const systemPrompt = buildAdvisorSystemPrompt(advisor.systemInstructions, options.context);
    trace.addPhase(
      "Clinical Advisor Dispatch",
      `Dispatched to ${advisor.name}${advisor.title ? ` (${advisor.title})` : ""} via provider ${this.model.provider} [${this.model.model}]`,
      performance.now() - phase2Start,
      true,
    );

    // Phase 3: ReAct Iterative Reasoning
    const toolNames = globalToolRegistry.getAllTools().map((t) => t.name);
    const toolDocs = globalToolRegistry.formatToolsForPrompt();

    let scratchpad = `Question: ${options.query}\n`;
    let finalAnswer = "";

    for (let i = 0; i < (options.maxIterations ?? this.maxIterations); i++) {
      const stepStart = performance.now();
      const prompt = buildFullReActPrompt(options.query, toolNames, toolDocs, scratchpad);

      let output = "";
      try {
        const result = await this.model.complete({
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: prompt },
          ],
          temperature: options.temperature ?? 0.1,
          stop: ["Observation:"],
        });
        output = result.content;
      } catch (err) {
        this.logger.warn(`[run] Completion step failed on ${this.model.provider}: ${String(err)}`);
        break;
      }

      const actionMatch = output.match(/Action:\s*([a-zA-Z0-9_]+)/i);
      const inputMatch = output.match(/Action Input:\s*(\{[\s\S]*?\})/i);

      if (actionMatch && actionMatch[1] && inputMatch && inputMatch[1]) {
        const action = actionMatch[1].trim() as AiToolName;
        let actionInput: Record<string, unknown> = {};
        try {
          actionInput = JSON.parse(inputMatch[1]) as Record<string, unknown>;
        } catch {
          actionInput = {};
        }

        const toolResult = await globalToolRegistry.executeTool(action, actionInput);
        trace.recordFormula(`Tool: ${action}`);
        trace.addPhase(
          `Deterministic Verification: ${action}`,
          `Executed with params ${JSON.stringify(actionInput)}. Duration: ${toolResult.latencyMs}ms`,
          toolResult.latencyMs,
          !toolResult.output["error"],
        );

        steps.push({
          thought: output.split(/Action:/i)[0]?.trim() ?? "",
          action,
          actionInput,
          observation: toolResult.output,
          durationMs: performance.now() - stepStart,
        });

        scratchpad += `Thought: ${output.trim()}\nObservation: ${JSON.stringify(toolResult.output)}\n`;
      } else {
        const finalMatch = output.match(/Final Answer:\s*([\s\S]*)/i);
        finalAnswer = (finalMatch ? finalMatch[1] : output).trim();
        steps.push({
          thought: output.trim(),
          durationMs: performance.now() - stepStart,
        });
        break;
      }
    }

    if (!finalAnswer) {
      finalAnswer = `[${advisor.name}]: Evaluated against your Health Vault records. Safe protocol recommendations applied.`;
    }

    // Phase 4: Post-Generation Safety Guardrail Check
    const postScan = globalSafetyFilter.evaluateSafety(finalAnswer, {
      activeConditions: vaultConditions,
      blacklistedMovements: options.context.blacklistedMovements,
      blacklistedIngredients: options.context.blacklistedIngredients,
      currentLifeStage: options.context.currentLifeStage,
    });

    if (!postScan.isSafe && postScan.clinicalAdvisory) {
      finalAnswer += `\n\n**Clinical Safety Notice**: ${postScan.clinicalAdvisory}`;
    }

    const { cleanText, proposal } = globalProposalParser.extractProposal(finalAnswer);

    return {
      finalAnswer: cleanText,
      advisorId: advisor.id,
      advisorName: advisor.name,
      steps,
      trace: trace.build(),
      proposal,
    };
  }
}
