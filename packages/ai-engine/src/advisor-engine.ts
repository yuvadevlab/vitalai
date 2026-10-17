/**
 * @file packages/ai-engine/src/advisor-engine.ts
 * @description Master cognitive AI advisory engine coordinating ReAct, multi-LLM models, and database-driven advisors.
 * @module @vitalai/ai-engine
 */

import { Logger } from "@yuva-devlab/logger";
import { AiReasoningTrace, TwoPhaseActionProposal } from "@vitalai/shared-types";
import { PersonaContext } from "@vitalai/prompts";
import { ChatModel, VitalAiEngineConfig } from "./llm/llm.types";
import { createChatModel } from "./llm/provider-factory";
import { ReActAgent } from "./react/react-agent";
import { DynamicAdvisorProfile } from "./react/react.types";

export interface AdvisorGenerateOptions {
  readonly query: string;
  readonly advisor: DynamicAdvisorProfile;
  readonly context: PersonaContext;
}

export interface AdvisorStreamCallbacks {
  readonly onReasoningPhase?: (phase: string, detail: string) => void;
  readonly onToken?: (token: string) => void;
  readonly onError?: (error: Error) => void;
}

export interface AdvisorStreamOptions extends AdvisorGenerateOptions {
  readonly callbacks: AdvisorStreamCallbacks;
}

export interface AdvisorResponse {
  readonly answer: string;
  readonly advisorId: string;
  readonly advisorName: string;
  readonly trace: AiReasoningTrace;
  readonly proposal?: TwoPhaseActionProposal;
}

export class VitalAdvisorEngine {
  private readonly logger = new Logger(VitalAdvisorEngine.name);
  private readonly chatModel: ChatModel;
  private readonly planningModel: ChatModel;
  private readonly agent: ReActAgent;

  /**
   * Initializes the advisory engine strictly from client-provided configuration.
   * Zero direct access to process.env.
   */
  constructor(config: VitalAiEngineConfig) {
    this.chatModel = createChatModel(config.defaultModelConfig);
    this.planningModel = config.planningModelConfig
      ? createChatModel(config.planningModelConfig)
      : this.chatModel;

    this.agent = new ReActAgent(this.planningModel);
    this.logger.info(
      `[constructor] Initialized VitalAdvisorEngine (Chat: ${this.chatModel.provider}[${this.chatModel.model}], Planning: ${this.planningModel.provider}[${this.planningModel.model}])`,
    );
  }

  async generateAdvisory(options: AdvisorGenerateOptions): Promise<AdvisorResponse> {
    this.logger.info(`[generateAdvisory] Processing query for advisor ${options.advisor.name}`);
    const result = await this.agent.run({
      query: options.query,
      advisor: options.advisor,
      context: options.context,
    });

    return {
      answer: result.finalAnswer,
      advisorId: result.advisorId,
      advisorName: result.advisorName,
      trace: result.trace,
      proposal: result.proposal,
    };
  }

  async streamAdvisory(options: AdvisorStreamOptions): Promise<AdvisorResponse> {
    this.logger.info(
      `[streamAdvisory] Streaming advisory via ${this.chatModel.provider} [${this.chatModel.model}] with advisor ${options.advisor.name}`,
    );

    // 1. Emit reasoning phase
    options.callbacks.onReasoningPhase?.(
      "Health Vault & Medical Safety Cross-Reference",
      "Scanning clinical contraindications and active injury records against Tier-1 filter...",
    );

    // 2. Run ReAct reasoning loop
    const result = await this.agent.run({
      query: options.query,
      advisor: options.advisor,
      context: options.context,
    });

    // 3. Emit completed reasoning phases from the trace
    for (const phase of result.trace.phases) {
      options.callbacks.onReasoningPhase?.(phase.title, phase.description);
    }

    // 4. Stream tokens of the final answer in simulated/buffered micro-chunks
    const words = result.finalAnswer.split(" ");
    for (const word of words) {
      options.callbacks.onToken?.(`${word} `);
    }

    return {
      answer: result.finalAnswer,
      advisorId: result.advisorId,
      advisorName: result.advisorName,
      trace: result.trace,
      proposal: result.proposal,
    };
  }
}
