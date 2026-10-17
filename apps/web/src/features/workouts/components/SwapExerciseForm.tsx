"use client";

import React from "react";

export interface SwapExerciseFormProps {
  readonly currentExerciseName: string;
  readonly substituteName: string;
  readonly reason: string;
  readonly targetMover: string;
  readonly onSubstituteChange: (val: string) => void;
  readonly onReasonChange: (val: string) => void;
  readonly onTargetMoverChange: (val: string) => void;
  readonly errors: Record<string, string>;
}

export const SwapExerciseForm: React.FC<SwapExerciseFormProps> = ({
  currentExerciseName,
  substituteName,
  reason,
  targetMover,
  onSubstituteChange,
  onReasonChange,
  onTargetMoverChange,
  errors,
}) => {
  return (
    <div className="space-y-4 text-xs">
      {/* Current Exercise Indicator */}
      <div className="bg-surface-2/60 border-border/30 rounded-xl border p-3">
        <span className="text-muted-foreground font-mono text-[10px] font-semibold uppercase">
          Current Movement to Substitute
        </span>
        <p className="text-foreground mt-0.5 text-sm font-bold">{currentExerciseName}</p>
      </div>

      {/* Replacement Selection */}
      <div className="space-y-1.5">
        <label className="text-foreground text-xs font-semibold">
          Proposed Equivalent Exercise
        </label>
        <input
          type="text"
          value={substituteName}
          onChange={(e) => onSubstituteChange(e.target.value)}
          placeholder="e.g. 45° Leg Press with Hip Wedge"
          className="bg-surface-2 border-border/40 text-foreground placeholder:text-muted-foreground focus:ring-primary w-full rounded-xl border px-3.5 py-2.5 text-xs focus:ring-1 focus:outline-none"
        />
        {errors.substituteName && (
          <p className="mt-0.5 font-mono text-[11px] text-rose-400">{errors.substituteName}</p>
        )}
      </div>

      {/* Target Muscle Group */}
      <div className="space-y-1.5">
        <label className="text-foreground text-xs font-semibold">
          Primary Muscle Group Maintained
        </label>
        <select
          value={targetMover}
          onChange={(e) => onTargetMoverChange(e.target.value)}
          className="bg-surface-2 border-border/40 text-foreground focus:ring-primary w-full rounded-xl border px-3.5 py-2.5 text-xs focus:ring-1 focus:outline-none"
        >
          <option value="quadriceps">Quadriceps</option>
          <option value="chest">Pectorals (Chest)</option>
          <option value="shoulders">Deltoids (Shoulders)</option>
          <option value="lats">Latissimus Dorsi (Back)</option>
          <option value="hamstrings">Hamstrings</option>
          <option value="triceps">Triceps</option>
        </select>
      </div>

      {/* Clinical / Biomechanical Reason */}
      <div className="space-y-1.5">
        <label className="text-foreground text-xs font-semibold">
          Clinical Rationale or Equipment Unavailability
        </label>
        <textarea
          rows={3}
          value={reason}
          onChange={(e) => onReasonChange(e.target.value)}
          placeholder="e.g. Eliminates vertical compressive load on lumbar L4-L5 disc while retaining knee extension stimulus."
          className="bg-surface-2 border-border/40 text-foreground placeholder:text-muted-foreground focus:ring-primary w-full rounded-xl border px-3.5 py-2.5 text-xs leading-relaxed focus:ring-1 focus:outline-none"
        />
        {errors.reason && (
          <p className="mt-0.5 font-mono text-[11px] text-rose-400">{errors.reason}</p>
        )}
      </div>
    </div>
  );
};
