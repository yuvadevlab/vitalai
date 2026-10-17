"use client";

import React from "react";

export interface HealthConditionFormProps {
  readonly name: string;
  readonly category: string;
  readonly severity: string;
  readonly clinicalGuidance: string;
  readonly onNameChange: (val: string) => void;
  readonly onCategoryChange: (val: string) => void;
  readonly onSeverityChange: (val: string) => void;
  readonly onClinicalGuidanceChange: (val: string) => void;
  readonly errors: Record<string, string>;
}

export const HealthConditionForm: React.FC<HealthConditionFormProps> = ({
  name,
  category,
  severity,
  clinicalGuidance,
  onNameChange,
  onCategoryChange,
  onSeverityChange,
  onClinicalGuidanceChange,
  errors,
}) => {
  return (
    <div className="space-y-4 text-xs">
      <div className="space-y-1.5">
        <label className="text-foreground text-xs font-semibold">Condition or Injury Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="e.g. Patellar Tendinopathy (Jumper's Knee)"
          className="bg-surface-2 border-border/40 text-foreground placeholder:text-muted-foreground focus:ring-primary w-full rounded-xl border px-3.5 py-2.5 text-xs focus:ring-1 focus:outline-none"
        />
        {errors.name && <p className="mt-0.5 font-mono text-[11px] text-rose-400">{errors.name}</p>}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-foreground text-xs font-semibold">Category</label>
          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="bg-surface-2 border-border/40 text-foreground focus:ring-primary w-full rounded-xl border px-3 py-2 text-xs focus:ring-1 focus:outline-none"
          >
            <option value="orthopedic">Orthopedic / Joint</option>
            <option value="metabolic">Metabolic / Renal</option>
            <option value="gestational">Gestational / Maternal</option>
            <option value="cardiovascular">Cardiovascular</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-foreground text-xs font-semibold">Severity Level</label>
          <select
            value={severity}
            onChange={(e) => onSeverityChange(e.target.value)}
            className="bg-surface-2 border-border/40 text-foreground focus:ring-primary w-full rounded-xl border px-3 py-2 text-xs focus:ring-1 focus:outline-none"
          >
            <option value="mild">Mild (Monitor)</option>
            <option value="moderate">Moderate (Strict Guardrails)</option>
            <option value="severe">Severe (Total Contraindication)</option>
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-foreground text-xs font-semibold">
          Clinical Guidance & Pain Triggers
        </label>
        <textarea
          rows={3}
          value={clinicalGuidance}
          onChange={(e) => onClinicalGuidanceChange(e.target.value)}
          placeholder="e.g. Avoid rapid eccentric knee flexion past 90 degrees; prioritize isometric Spanish squats."
          className="bg-surface-2 border-border/40 text-foreground placeholder:text-muted-foreground focus:ring-primary w-full rounded-xl border px-3.5 py-2.5 text-xs leading-relaxed focus:ring-1 focus:outline-none"
        />
        {errors.clinicalGuidance && (
          <p className="mt-0.5 font-mono text-[11px] text-rose-400">{errors.clinicalGuidance}</p>
        )}
      </div>
    </div>
  );
};
