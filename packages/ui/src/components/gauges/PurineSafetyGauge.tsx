"use client";

import React from "react";
import { AlertTriangle, ShieldCheck, AlertOctagon } from "lucide-react";

export interface PurineSafetyGaugeProps {
  readonly purineMg: number;
  readonly safeLimitMg?: number;
  readonly maxScaleMg?: number;
  readonly className?: string;
}

export const PurineSafetyGauge: React.FC<PurineSafetyGaugeProps> = ({
  purineMg,
  safeLimitMg = 300,
  maxScaleMg = 600,
  className = "",
}) => {
  const percentage = Math.min(100, Math.max(0, (purineMg / maxScaleMg) * 100));

  let status: "safe" | "caution" | "danger" = "safe";
  let statusColor = "text-emerald-400";
  let badgeBg = "bg-emerald-500/15 border-emerald-500/30 text-emerald-300";
  let Icon = ShieldCheck;
  let advisoryText = "Uric acid load within clinical safety limits.";

  if (purineMg > 400) {
    status = "danger";
    statusColor = "text-rose-400";
    badgeBg = "bg-rose-500/15 border-rose-500/30 text-rose-300";
    Icon = AlertOctagon;
    advisoryText = "High purine threshold exceeded. High risk for gout flare.";
  } else if (purineMg >= 200) {
    status = "caution";
    statusColor = "text-amber-400";
    badgeBg = "bg-amber-500/15 border-amber-500/30 text-amber-300";
    Icon = AlertTriangle;
    advisoryText = "Moderate purine accumulation. Hydrate with alkalizing fluids.";
  }

  return (
    <div
      className={`bg-card/60 border-border/40 rounded-2xl border p-5 backdrop-blur-md ${className}`}
    >
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h4 className="text-foreground text-sm font-semibold tracking-tight">
            Metabolic Purine Gauge
          </h4>
          <p className="text-muted-foreground mt-0.5 text-xs">Uric acid flare prevention index</p>
        </div>
        <div
          className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${badgeBg}`}
        >
          <Icon className="size-3.5" />
          <span className="capitalize">{status}</span>
        </div>
      </div>

      <div className="my-2 flex items-baseline justify-between">
        <div className="flex items-baseline gap-1.5">
          <span
            className={`font-mono text-3xl font-bold tracking-tight tabular-nums ${statusColor}`}
          >
            {Math.round(purineMg)}
          </span>
          <span className="text-muted-foreground font-mono text-xs">mg / day</span>
        </div>
        <span className="text-muted-foreground font-mono text-xs">Limit: {safeLimitMg} mg</span>
      </div>

      {/* Segmented Gradient Progress Track */}
      <div className="bg-surface-2 border-border/30 relative h-3 w-full overflow-hidden rounded-full border">
        <div
          className="h-full rounded-full bg-linear-to-r from-emerald-400 via-amber-400 to-rose-500 transition-all duration-700 ease-out"
          style={{ width: `${percentage}%` }}
        />
        {/* Safe limit tick marker */}
        <div
          className="absolute inset-y-0 z-10 w-0.5 bg-white/60"
          style={{ left: `${(safeLimitMg / maxScaleMg) * 100}%` }}
          title={`Safe limit (${safeLimitMg}mg)`}
        />
      </div>

      <div className="text-muted-foreground mt-1.5 flex justify-between px-0.5 font-mono text-[10px]">
        <span>0 mg</span>
        <span>Low (&lt;150)</span>
        <span className="text-foreground/80 font-semibold">300 mg</span>
        <span>Danger (&gt;400)</span>
      </div>

      <div className="bg-surface-2/30 border-border/20 text-muted-foreground mt-3.5 rounded-xl border p-2.5 text-xs leading-relaxed">
        {advisoryText}
      </div>
    </div>
  );
};
