/**
 * @file packages/ai-engine/src/llm/devlab-chat.model.ts
 * @description ChatModel adapter implementation backed by @yuva-devlab/ai-client.
 * @module @vitalai/ai-engine/llm
 */

import {
  MessageRole as DevLabMessageRole,
  type ILLMProvider,
  type AIMessage,
} from "@yuva-devlab/ai-client";
import {
  AiProvider,
  ChatModel,
  LlmChatRequest,
  LlmCompleteResult,
  LlmRole,
  LlmStreamEvent,
} from "./llm.types";

function mapToDevLabRole(
  role: LlmRole,
): (typeof DevLabMessageRole)[keyof typeof DevLabMessageRole] {
  switch (role) {
    case "system":
      return DevLabMessageRole.SYSTEM;
    case "user":
      return DevLabMessageRole.USER;
    case "assistant":
      return DevLabMessageRole.ASSISTANT;
    case "tool":
      return DevLabMessageRole.TOOL;
    default:
      return DevLabMessageRole.USER;
  }
}

export class DevLabChatModel implements ChatModel {
  public readonly provider: AiProvider;
  public readonly model: string;
  private readonly client: ILLMProvider;
  private readonly defaultTemperature: number;
  private readonly defaultTimeoutMs: number;

  constructor(
    provider: AiProvider,
    model: string,
    client: ILLMProvider,
    temperature = 0.2,
    timeoutMs = 60000,
  ) {
    this.provider = provider;
    this.model = model;
    this.client = client;
    this.defaultTemperature = temperature;
    this.defaultTimeoutMs = timeoutMs;
  }

  async complete(request: LlmChatRequest): Promise<LlmCompleteResult> {
    const messages: AIMessage[] = request.messages.map((m) => ({
      role: mapToDevLabRole(m.role),
      content: m.content,
    }));

    const response = await this.client.complete({
      model: this.model,
      messages,
      temperature: request.temperature ?? this.defaultTemperature,
      responseFormat: "text",
      timeoutMs: this.defaultTimeoutMs,
      stop: request.stop ? [...request.stop] : undefined,
    });

    return {
      content: response.text,
      tokensIn: response.usage?.promptTokens,
      tokensOut: response.usage?.completionTokens,
    };
  }

  async *stream(request: LlmChatRequest): AsyncIterable<LlmStreamEvent> {
    const messages: AIMessage[] = request.messages.map((m) => ({
      role: mapToDevLabRole(m.role),
      content: m.content,
    }));

    for await (const chunk of this.client.stream({
      model: this.model,
      messages,
      temperature: request.temperature ?? this.defaultTemperature,
      responseFormat: "text",
      timeoutMs: this.defaultTimeoutMs,
      stop: request.stop ? [...request.stop] : undefined,
    })) {
      if (chunk.delta) {
        yield { type: "text-delta", text: chunk.delta };
      }
    }

    yield { type: "done" };
  }
}
