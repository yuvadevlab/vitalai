"use client";

import { ANALYTICS_COPY } from "@/lib/ui-copy";

interface VolumeTrendProps {
  data: { week: string; volume: number; target: number }[];
}

export function VolumeTrendChart({ data }: VolumeTrendProps) {
  const maxVolume = Math.max(...data.map((d) => d.volume), 25000);

  return (
    <div className="glass p-5">
      <h3 className="font-display-x text-2xl">{ANALYTICS_COPY.sections.volumeTrend}</h3>
      <div className="mt-6 flex h-44 items-end gap-4 border-b border-border pb-3">
        {data.map((item) => {
          const heightPct = Math.round((item.volume / maxVolume) * 100);
          return (
            <div key={item.week} className="flex flex-1 flex-col items-center gap-2">
              <span className="tabular text-[10px] font-semibold text-volt">
                {(item.volume / 1000).toFixed(1)}t
              </span>
              <div
                className="w-full rounded-t-lg bg-secondary/80 relative overflow-hidden"
                style={{ height: `${heightPct}%` }}
              >
                <div className="absolute inset-0 bg-linear-to-t from-volt/40 to-volt" />
              </div>
              <span className="text-xs font-semibold uppercase text-muted-foreground">
                {item.week}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
