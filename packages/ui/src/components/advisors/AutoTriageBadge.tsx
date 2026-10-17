"use client";

import React from "react";
import { Sparkles } from "lucide-react";

export interface AutoTriageBadgeProps {
  readonly advisorName: string;
  readonly advisorTitle?: string;
  readonly reason?: string;
  readonly className?: string;
}

export const AutoTriageBadge: React.FC<AutoTriageBadgeProps> = ({
  advisorName,
  advisorTitle,
  reason,
  className = "",
}) => {
  return (
    <div
      className={`bg-primary/10 border-primary/20 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs ${className}`}
    >
      <Sparkles className="text-primary size-3.5 shrink-0" />
      <span className="text-primary font-mono font-semibold">{advisorName}</span>
      {advisorTitle && (
        <span className="text-muted-foreground hidden sm:inline">• {advisorTitle}</span>
      )}
      {reason && (
        <span className="text-muted-foreground/80 font-mono text-[11px] italic">({reason})</span>
      )}
    </div>
  );
};
