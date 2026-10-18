/**
 * @file packages/ai-engine/src/react/trace-builder.ts
 * @description Builder for 100% transparent AI Reasoning and Safety Traces.
 * @module @vitalai/ai-engine/react
 */

import { AiReasoningTrace, ClinicalReasoningPhase } from "@vitalai/shared-types";

export class TraceBuilder {
  private readonly startTime = performance.now();
  private readonly phases: ClinicalReasoningPhase[] = [];
  private readonly formulas = new Set<string>();
  private readonly conditions = new Set<string>();
  private readonly contraindications = new Set<string>();

  addPhase(title: string, description: string, latencyMs: number, passed = true): this {
    this.phases.push({
      phaseNumber: this.phases.length + 1,
      title,
      description,
      latencyMs: Math.max(1, Math.round(latencyMs)),
      passed,
    });
    return this;
  }

  recordFormula(formulaName: string): this {
    this.formulas.add(formulaName);
    return this;
  }

  recordConditionChecked(condition: string): this {
    this.conditions.add(condition);
    return this;
  }

  recordContraindication(contraindication: string): this {
    this.contraindications.add(contraindication);
    return this;
  }

  build(): AiReasoningTrace {
    const totalDurationMs = Math.max(1, Math.round(performance.now() - this.startTime));
    return {
      traceId: crypto.randomUUID(),
      totalDurationMs,
      phases: [...this.phases],
      formulasEvaluated: Array.from(this.formulas),
      vaultConditionsChecked: Array.from(this.conditions),
      contraindicationsDetected: Array.from(this.contraindications),
    };
  }
}
