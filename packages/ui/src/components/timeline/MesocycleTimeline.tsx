"use client";

import React from "react";
import { Activity, Flame, Shield, ArrowUpRight } from "lucide-react";

export interface MicrocycleWeek {
  readonly weekNumber: number;
  readonly name: string;
  readonly targetRir: number;
  readonly focus: string;
  readonly isDeload?: boolean;
}

export interface MesocycleTimelineProps {
  readonly currentWeek: number;
  readonly totalWeeks?: number;
  readonly weeks?: readonly MicrocycleWeek[];
  readonly mesocycleName?: string;
  readonly className?: string;
}

const DEFAULT_WEEKS: MicrocycleWeek[] = [
  { weekNumber: 1, name: "Intro", targetRir: 3, focus: "Technique & Volume Priming" },
  { weekNumber: 2, name: "Accumulation", targetRir: 3, focus: "+1 Set per Primary Mover" },
  { weekNumber: 3, name: "Overload", targetRir: 2, focus: "Intensity Ramp (+2.5kg)" },
  { weekNumber: 4, name: "Overload II", targetRir: 1, focus: "Max Effective Reps" },
  { weekNumber: 5, name: "Peak", targetRir: 0, focus: "True Failure Set" },
  {
    weekNumber: 6,
    name: "Deload",
    targetRir: 4,
    focus: "50% Volume Active Resorption",
    isDeload: true,
  },
];

export const MesocycleTimeline: React.FC<MesocycleTimelineProps> = ({
  currentWeek,
  totalWeeks = 6,
  weeks = DEFAULT_WEEKS,
  mesocycleName = "Hypertrophy Block A — Posterior Chain Focus",
  className = "",
}) => {
  return (
    <div
      className={`bg-card/60 border-border/40 space-y-4 rounded-2xl border p-5 backdrop-blur-md ${className}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <span className="text-primary font-mono text-xs font-semibold tracking-wider uppercase">
            6-Week Periodization Curve
          </span>
          <h4 className="text-foreground mt-0.5 text-sm font-bold tracking-tight">
            {mesocycleName}
          </h4>
        </div>
        <div className="bg-primary/10 text-primary border-primary/20 flex items-center gap-1 rounded-full border px-2.5 py-1 font-mono text-xs font-semibold">
          <Activity className="size-3.5" />
          <span>
            Week {currentWeek} of {totalWeeks}
          </span>
        </div>
      </div>

      {/* Stepper Grid */}
      <div className="grid grid-cols-2 gap-2 pt-1 sm:grid-cols-6">
        {weeks.slice(0, totalWeeks).map((wk) => {
          const isCompleted = wk.weekNumber < currentWeek;
          const isActive = wk.weekNumber === currentWeek;

          let cardStyle = "bg-surface-2/40 border-border/20 text-muted-foreground";
          if (isActive) {
            cardStyle =
              "bg-primary/15 border-primary/60 text-foreground shadow-[0_0_12px_rgba(6,182,212,0.25)] ring-1 ring-primary/40";
          } else if (isCompleted) {
            cardStyle = "bg-emerald-500/10 border-emerald-500/30 text-emerald-300";
          }

          return (
            <div
              key={wk.weekNumber}
              className={`relative flex flex-col justify-between overflow-hidden rounded-xl border p-3 transition-all ${cardStyle}`}
            >
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold tracking-wider uppercase">
                    Wk {wk.weekNumber}
                  </span>
                  {wk.isDeload ? (
                    <Shield className="size-3 text-cyan-400" />
                  ) : isActive ? (
                    <Flame className="size-3.5 animate-pulse text-amber-400" />
                  ) : null}
                </div>
                <p className="truncate text-xs font-semibold tracking-tight">{wk.name}</p>
              </div>

              <div className="border-border/20 mt-3 flex items-baseline justify-between border-t pt-2 font-mono text-[11px]">
                <span className="text-muted-foreground">RIR</span>
                <span className={`font-bold ${isActive ? "text-primary" : ""}`}>
                  {wk.targetRir}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-muted-foreground border-border/30 flex items-center justify-between border-t pt-1 text-xs">
        <span className="font-mono text-[11px]">
          Active Target: {weeks.find((w) => w.weekNumber === currentWeek)?.focus}
        </span>
        <span className="text-primary flex cursor-pointer items-center gap-1 hover:underline">
          Periodization Rules <ArrowUpRight className="size-3" />
        </span>
      </div>
    </div>
  );
};
