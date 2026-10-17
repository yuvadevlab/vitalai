"use client";

import React, { useState } from "react";
import { ShieldCheck, Lock, AlertTriangle, Plus } from "lucide-react";
import { HealthGuardrailBadge } from "@vitalai/ui";
import { useHealthConditions } from "../api";
import { HealthConditionDialog } from "./HealthConditionDialog";
import { HEALTH_VAULT_COPY } from "@/lib/ui-copy";

export const HealthVaultView: React.FC = () => {
  const { data: conditions } = useHealthConditions();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (!conditions) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <span className="flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-400">
              <Lock className="size-2.5" />
              <span>Encrypted Local Record Store</span>
            </span>
          </div>
          <h2 className="text-foreground font-display text-2xl font-bold tracking-tight">
            {HEALTH_VAULT_COPY.title}
          </h2>
          <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
            {HEALTH_VAULT_COPY.subtitle}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsDialogOpen(true)}
          className="bg-primary text-primary-foreground inline-flex items-center gap-2 self-start rounded-xl px-4 py-2 text-xs font-semibold shadow-md transition-all hover:brightness-110 sm:self-auto"
        >
          <Plus className="size-3.5" />
          <span>{HEALTH_VAULT_COPY.addConditionBtn}</span>
        </button>
      </div>

      {/* Security & Invariant Banner */}
      <div className="bg-surface-2/40 border-border/30 flex items-center justify-between rounded-2xl border p-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary/20 text-primary rounded-xl p-2">
            <ShieldCheck className="size-5" />
          </div>
          <div>
            <h4 className="text-foreground text-xs font-bold">
              {HEALTH_VAULT_COPY.guardrailsEnforced}
            </h4>
            <p className="text-muted-foreground mt-0.5 text-[11px]">
              Workouts and recipes violating active conditions are blocked before presentation.
            </p>
          </div>
        </div>
        <span className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 font-mono text-xs font-semibold text-emerald-400">
          Deterministic
        </span>
      </div>

      {/* Conditions Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {conditions.map((cond) => (
          <div
            key={cond.id}
            className="bg-card/60 border-border/40 flex flex-col justify-between space-y-4 rounded-2xl border p-5 shadow-sm backdrop-blur-md"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-muted-foreground font-mono text-[10px] font-semibold tracking-wider uppercase">
                    {cond.category}
                  </span>
                  <h3 className="text-foreground mt-0.5 text-base leading-snug font-bold">
                    {cond.name}
                  </h3>
                </div>
                <HealthGuardrailBadge conditionName="" severity={cond.severity} />
              </div>

              {/* Excluded Exercises */}
              {cond.excludedExercises.length > 0 && (
                <div className="border-border/20 mt-3 space-y-1.5 border-t pt-3">
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-rose-400">
                    <Lock className="size-3" />
                    <span>Contraindicated Movements ({cond.excludedExercises.length})</span>
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {cond.excludedExercises.map((ex) => (
                      <span
                        key={ex}
                        className="bg-surface-2 text-muted-foreground border-border/30 rounded-md border px-2 py-0.5 font-mono text-[10px]"
                      >
                        ✕ {ex}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Excluded Nutrients */}
              {cond.excludedNutrients.length > 0 && (
                <div className="border-border/20 mt-3 space-y-1.5 border-t pt-3">
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-400">
                    <AlertTriangle className="size-3" />
                    <span>Metabolic Restrictions</span>
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {cond.excludedNutrients.map((nut) => (
                      <span
                        key={nut}
                        className="bg-surface-2 text-muted-foreground border-border/30 rounded-md border px-2 py-0.5 font-mono text-[10px]"
                      >
                        ✕ {nut}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="border-border/20 text-muted-foreground border-t pt-3 text-xs leading-relaxed">
              <span className="text-foreground font-semibold">Clinical Strategy: </span>
              {cond.clinicalGuidance}
            </div>
          </div>
        ))}
      </div>

      {/* 2-File Add Condition Modal */}
      <HealthConditionDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConditionAdded={(c) => {
          alert(`Health memory saved: ${c.name} (${c.category})`);
          setIsDialogOpen(false);
        }}
      />
    </div>
  );
};
