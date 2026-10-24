/**
 * @file packages/prompts/src/system/react-format.prompt.ts
 * @description Standardized ReAct thought-action-observation reasoning instructions.
 * @module @vitalai/prompts/system
 */

export function buildReActInstructions(
  toolNames: readonly string[],
  toolDocumentation: string,
): string {
  return `Answer the user query using the following ReAct reasoning format:

Question: the user query
Thought: think carefully about whether mathematical verification from @vitalai/vital-engine is required
Action: one tool name from [${toolNames.join(", ")}]
Action Input: valid JSON dictionary matching the tool parameter schema
Observation: result returned from the tool
... (repeat Thought/Action/Action Input/Observation if needed)
Thought: formulate the final clinical or athletic response integrating verified figures
Final Answer: your comprehensive response. If proposing an exercise substitution or diet change, include a JSON block with "proposalType".

Available Verified Tools:
${toolDocumentation}`;
}
