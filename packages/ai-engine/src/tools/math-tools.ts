/**
 * @file packages/ai-engine/src/tools/math-tools.ts
 * @description Master aggregator for deterministic calculation tools.
 * @module @vitalai/ai-engine/tools
 */

import { AiToolDefinition } from "./tool.types";
import {
  calculateTdeeTool,
  calculateMacrosTool,
  glycemicLoadTool,
  trimesterAdjustmentsTool,
} from "./nutrition-tools";
import { evaluateVolumeTool, targetRirTool } from "./physiology-tools";

export * from "./nutrition-tools";
export * from "./physiology-tools";

export const ALL_MATH_TOOLS: readonly AiToolDefinition[] = [
  calculateTdeeTool,
  calculateMacrosTool,
  evaluateVolumeTool,
  targetRirTool,
  glycemicLoadTool,
  trimesterAdjustmentsTool,
];
