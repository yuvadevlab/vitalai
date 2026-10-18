"use client";

import { ANALYTICS_COPY } from "@/lib/ui-copy";

interface HeatmapProps {
  items: { muscle: string; fatigue: number; recoveryPercent: number; status: string }[];
}

export function MuscleRecoveryHeatmap({ items }: HeatmapProps) {
  return (
    <div className="glass p-5">
      <h3 className="font-display-x text-2xl">{ANALYTICS_COPY.sections.muscleFatigue}</h3>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {items.map((m) => {
          const color =
            m.recoveryPercent > 75
              ? "bg-volt text-primary-foreground"
              : m.recoveryPercent > 50
                ? "bg-cyan text-primary-foreground"
                : "bg-ember text-white";
          return (
            <div
              key={m.muscle}
              className="flex items-center justify-between rounded-xl bg-secondary/50 p-3.5"
            >
              <div>
                <span className="font-semibold text-sm">{m.muscle}</span>
                <p className="text-xs text-muted-foreground">Fatigue: {m.fatigue}%</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-secondary rounded-full h-2 overflow-hidden">
                  <div
                    className={"h-full " + color.split(" ")[0]}
                    style={{ width: `${m.recoveryPercent}%` }}
                  />
                </div>
                <span
                  className={"rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase " + color}
                >
                  {m.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
