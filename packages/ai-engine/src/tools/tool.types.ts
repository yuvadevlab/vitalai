/**
 * @file packages/ai-engine/src/tools/tool.types.ts
 * @description Standardized interface contracts and enums for deterministic AI engine tools.
 * @module @vitalai/ai-engine/tools
 */

/**
 * Canonical tool names available for ReAct reasoning.
 */
export enum AiToolName {
  CALCULATE_TDEE = "calculate_tdee",
  CALCULATE_MACROS = "calculate_macros",
  EVALUATE_VOLUME_LANDMARKS = "evaluate_volume_landmarks",
  CALCULATE_TARGET_RIR = "calculate_target_rir",
  CALCULATE_GLYCEMIC_LOAD = "calculate_glycemic_load",
  CALCULATE_TRIMESTER_SURPLUS = "calculate_trimester_surplus",
}

/**
 * Data types supported in tool parameter schemas.
 */
export enum ToolParameterType {
  STRING = "string",
  NUMBER = "number",
  BOOLEAN = "boolean",
  OBJECT = "object",
}

export interface ToolParameterSchema {
  readonly type: ToolParameterType;
  readonly description: string;
  readonly required?: boolean;
}

export interface AiToolDefinition {
  readonly name: AiToolName;
  readonly description: string;
  readonly parameters: Record<string, ToolParameterSchema>;
  readonly execute: (
    args: Record<string, unknown>,
  ) => Promise<Record<string, unknown>> | Record<string, unknown>;
}

export interface ToolCallResult {
  readonly toolName: AiToolName;
  readonly args: Record<string, unknown>;
  readonly output: Record<string, unknown>;
  readonly latencyMs: number;
}
