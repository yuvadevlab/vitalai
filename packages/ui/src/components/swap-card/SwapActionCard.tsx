"use client";

import React from "react";
import { Check, ShieldAlert, Sparkles, Loader2 } from "lucide-react";

export interface SwapActionCardProps {
  readonly title: string;
  readonly before: {
    readonly label: string;
    readonly detail?: string;
  };
  readonly after: {
    readonly label: string;
    readonly detail?: string;
    readonly badge?: string;
  };
  readonly rationale: string;
  readonly safetyBenefit?: string;
  readonly onAccept: () => void;
  readonly onDecline: () => void;
  readonly isLoading?: boolean;
  readonly className?: string;
}

export const SwapActionCard: React.FC<SwapActionCardProps> = ({
  title,
  before,
  after,
  rationale,
  safetyBenefit,
  onAccept,
  onDecline,
  isLoading = false,
  className = "",
}) => {
  return (
    <div
      className={`border-primary/30 bg-primary/5 space-y-3.5 rounded-2xl border p-4 backdrop-blur-md ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary/20 text-primary rounded-lg p-1">
            <Sparkles className="size-4" />
          </div>
          <h4 className="text-foreground text-sm font-semibold tracking-tight">{title}</h4>
        </div>
        <span className="bg-primary/10 text-primary border-primary/20 rounded-full border px-2 py-0.5 font-mono text-[11px]">
          Two-Phase Approval Required
        </span>
      </div>

      {/* Before / After Grid */}
      <div className="grid grid-cols-1 items-center gap-2.5 sm:grid-cols-2">
        <div className="bg-card/60 border-border/30 rounded-xl border p-3">
          <span className="text-muted-foreground text-[10px] font-semibold tracking-wider uppercase">
            Original
          </span>
          <p className="text-foreground mt-0.5 text-sm font-semibold">{before.label}</p>
          {before.detail && (
            <p className="text-muted-foreground mt-0.5 font-mono text-xs">{before.detail}</p>
          )}
        </div>

        <div className="bg-card/80 border-primary/40 relative rounded-xl border p-3">
          <div className="flex items-center justify-between">
            <span className="text-primary text-[10px] font-semibold tracking-wider uppercase">
              Proposed Substitute
            </span>
            {after.badge && (
              <span className="py-0.2 rounded bg-emerald-500/10 px-1.5 font-mono text-[10px] text-emerald-400">
                {after.badge}
              </span>
            )}
          </div>
          <p className="text-foreground mt-0.5 text-sm font-semibold">{after.label}</p>
          {after.detail && (
            <p className="text-muted-foreground mt-0.5 font-mono text-xs">{after.detail}</p>
          )}
        </div>
      </div>

      {/* Rationale & Safety Benefit */}
      <div className="bg-surface-2/40 border-border/20 space-y-1.5 rounded-xl border p-2.5 text-xs">
        <p className="text-muted-foreground leading-relaxed">
          <span className="text-foreground font-semibold">Clinical Rationale: </span>
          {rationale}
        </p>
        {safetyBenefit && (
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-400">
            <ShieldAlert className="size-3.5 shrink-0" />
            <span>{safetyBenefit}</span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-2.5 pt-1">
        <button
          type="button"
          onClick={onDecline}
          disabled={isLoading}
          className="text-muted-foreground hover:text-foreground hover:bg-surface-2 rounded-xl px-3.5 py-1.5 text-xs font-medium transition-colors disabled:opacity-50"
        >
          Keep Original
        </button>
        <button
          type="button"
          onClick={onAccept}
          disabled={isLoading}
          className="bg-primary text-primary-foreground flex items-center gap-1.5 rounded-xl px-4 py-1.5 text-xs font-semibold shadow-sm transition-all hover:brightness-110 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="size-3.5 animate-spin" />
              <span>Applying...</span>
            </>
          ) : (
            <>
              <Check className="size-3.5" />
              <span>Confirm & Apply Swap</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
