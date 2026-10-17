"use client";

import React from "react";
import { ShieldCheck, ShieldAlert, Lock, ChevronRight } from "lucide-react";

export interface HealthGuardrailBadgeProps {
  readonly conditionName: string;
  readonly severity?: "mild" | "moderate" | "severe";
  readonly excludedCount?: number;
  readonly onClick?: () => void;
  readonly className?: string;
}

export const HealthGuardrailBadge: React.FC<HealthGuardrailBadgeProps> = ({
  conditionName,
  severity = "moderate",
  excludedCount,
  onClick,
  className = "",
}) => {
  let severityStyle = "bg-amber-500/10 border-amber-500/30 text-amber-300";
  let Icon = ShieldAlert;

  if (severity === "severe") {
    severityStyle = "bg-rose-500/10 border-rose-500/30 text-rose-300";
  } else if (severity === "mild") {
    severityStyle = "bg-cyan-500/10 border-cyan-500/30 text-cyan-300";
    Icon = ShieldCheck;
  }

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs transition-all ${severityStyle} ${
        onClick ? "cursor-pointer hover:brightness-110" : ""
      } ${className}`}
    >
      <Icon className="size-3.5 shrink-0" />
      <span className="text-foreground font-semibold">{conditionName}</span>

      {excludedCount !== undefined && excludedCount > 0 && (
        <span className="py-0.2 bg-surface-2 text-muted-foreground flex items-center gap-1 rounded px-1.5 font-mono text-[10px]">
          <Lock className="text-primary size-2.5" />
          {excludedCount} excluded
        </span>
      )}

      {onClick && <ChevronRight className="ml-0.5 size-3 opacity-60" />}
    </div>
  );
};
