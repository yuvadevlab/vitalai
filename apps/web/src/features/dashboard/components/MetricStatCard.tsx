"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

export interface MetricStatCardProps {
  readonly title: string;
  readonly value: string | number;
  readonly unit?: string;
  readonly subtitle?: string;
  readonly icon: LucideIcon;
  readonly accentColor?: string;
  readonly className?: string;
}

export const MetricStatCard: React.FC<MetricStatCardProps> = ({
  title,
  value,
  unit,
  subtitle,
  icon: Icon,
  accentColor = "text-primary",
  className = "",
}) => {
  return (
    <div
      className={`bg-card/60 border-border/40 flex items-start justify-between rounded-2xl border p-4 backdrop-blur-md ${className}`}
    >
      <div>
        <p className="text-muted-foreground text-xs font-medium">{title}</p>
        <div className="mt-1 flex items-baseline gap-1.5">
          <span className="text-foreground font-mono text-2xl font-bold tracking-tight tabular-nums">
            {value}
          </span>
          {unit && <span className="text-muted-foreground font-mono text-xs">{unit}</span>}
        </div>
        {subtitle && <p className="text-muted-foreground mt-1 font-mono text-[11px]">{subtitle}</p>}
      </div>
      <div className={`bg-surface-2/80 rounded-xl p-2.5 ${accentColor}`}>
        <Icon className="size-4" />
      </div>
    </div>
  );
};
