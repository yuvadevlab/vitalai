/**
 * @file packages/ai-engine/src/tools/tool-registry.ts
 * @description Central registry managing deterministic AI engine tools.
 * @module @vitalai/ai-engine/tools
 */

import { Logger } from "@yuva-devlab/logger";
import { AiToolDefinition, AiToolName, ToolCallResult } from "./tool.types";
import { ALL_MATH_TOOLS } from "./math-tools";

export class ToolRegistry {
  private readonly logger = new Logger(ToolRegistry.name);
  private readonly tools = new Map<AiToolName, AiToolDefinition>();

  constructor(customTools: readonly AiToolDefinition[] = ALL_MATH_TOOLS) {
    for (const tool of customTools) {
      this.tools.set(tool.name, tool);
    }
  }

  getTool(name: AiToolName): AiToolDefinition | undefined {
    return this.tools.get(name);
  }

  getAllTools(): readonly AiToolDefinition[] {
    return Array.from(this.tools.values());
  }

  formatToolsForPrompt(): string {
    return Array.from(this.tools.values())
      .map((tool) => {
        const params = Object.entries(tool.parameters)
          .map(
            ([name, schema]) =>
              `${name} (${schema.type}${schema.required ? ", required" : ""}): ${schema.description}`,
          )
          .join("; ");
        return `- ${tool.name}: ${tool.description}\n  Parameters: { ${params} }`;
      })
      .join("\n");
  }

  async executeTool(name: AiToolName, args: Record<string, unknown>): Promise<ToolCallResult> {
    const tool = this.tools.get(name);
    if (!tool) {
      this.logger.warn(`[executeTool] Attempted to call unregistered tool: ${name}`);
      return {
        toolName: name,
        args,
        output: { error: `Tool ${name} is not registered` },
        latencyMs: 0,
      };
    }

    const start = performance.now();
    try {
      const output = await tool.execute(args);
      const latencyMs = Math.round(performance.now() - start);
      return {
        toolName: name,
        args,
        output,
        latencyMs,
      };
    } catch (error) {
      const latencyMs = Math.round(performance.now() - start);
      const msg = error instanceof Error ? error.message : String(error);
      this.logger.error(`[executeTool] Error running tool ${name}: ${msg}`);
      return {
        toolName: name,
        args,
        output: { error: msg },
        latencyMs,
      };
    }
  }
}

export const globalToolRegistry = new ToolRegistry();
