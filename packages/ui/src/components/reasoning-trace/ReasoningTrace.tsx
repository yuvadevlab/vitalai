"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Cpu, ShieldCheck, Activity, Clock } from "lucide-react";

export interface ReasoningStep {
  readonly phase: string;
  readonly description: string;
  readonly status: "completed" | "verified" | "flagged";
  readonly details?: string;
}

export interface ReasoningTraceProps {
  readonly advisorName: string;
  readonly latencyMs: number;
  readonly formulaUsed?: string;
  readonly steps: readonly ReasoningStep[];
  readonly contraindicationsChecked?: readonly string[];
  readonly className?: string;
}

export const ReasoningTrace: React.FC<ReasoningTraceProps> = ({
  advisorName,
  latencyMs,
  formulaUsed,
  steps,
  contraindicationsChecked = [],
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`border-border/40 bg-card/40 overflow-hidden rounded-xl border text-xs backdrop-blur-md ${className}`}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="hover:bg-surface-2/40 flex w-full items-center justify-between p-3 text-left transition-colors"
      >
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 text-primary rounded-md p-1">
            <Cpu className="size-3.5" />
          </div>
          <span className="text-foreground font-medium">Clinical Reasoning Trace</span>
          <span className="text-muted-foreground font-mono">({advisorName})</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-muted-foreground flex items-center gap-1 font-mono text-[11px]">
            <Clock className="size-3" />
            <span>{latencyMs}ms</span>
          </div>
          <div className="flex items-center gap-1 rounded border border-emerald-500/20 bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[10px] font-medium text-emerald-400">
            <ShieldCheck className="size-3" />
            <span>Verified</span>
          </div>
          {isOpen ? (
            <ChevronUp className="text-muted-foreground size-4" />
          ) : (
            <ChevronDown className="text-muted-foreground size-4" />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="border-border/30 bg-surface/20 space-y-3 border-t p-3.5 pt-1">
          {formulaUsed && (
            <div className="bg-surface-2/40 border-border/30 flex items-start gap-2 rounded-lg border p-2">
              <Activity className="text-primary mt-0.5 size-3.5 shrink-0" />
              <div>
                <span className="text-foreground font-semibold">Formula: </span>
                <span className="text-muted-foreground font-mono">{formulaUsed}</span>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <span className="text-foreground text-[11px] font-semibold tracking-wide uppercase">
              Audit Steps
            </span>
            <div className="space-y-1.5">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-card/60 border-border/20 flex items-start gap-2 rounded-lg border p-2"
                >
                  <span className="text-muted-foreground bg-surface-2 shrink-0 rounded px-1.5 py-0.5 font-mono text-[10px]">
                    0{idx + 1}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-foreground font-medium">{step.phase}</span>
                      <span className="font-mono text-[10px] text-emerald-400 capitalize">
                        {step.status}
                      </span>
                    </div>
                    <p className="text-muted-foreground mt-0.5 leading-relaxed">
                      {step.description}
                    </p>
                    {step.details && (
                      <p className="text-primary/80 bg-surface-2/50 mt-1 rounded p-1.5 font-mono text-[11px]">
                        {step.details}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {contraindicationsChecked.length > 0 && (
            <div className="border-border/20 border-t pt-2">
              <span className="text-muted-foreground text-[11px] font-medium">
                Contraindications Screened:{" "}
              </span>
              <div className="mt-1 flex flex-wrap gap-1">
                {contraindicationsChecked.map((c, i) => (
                  <span
                    key={i}
                    className="bg-surface-2 border-border/40 text-muted-foreground rounded border px-1.5 py-0.5 font-mono text-[10px]"
                  >
                    ✓ {c}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
