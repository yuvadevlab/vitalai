"use client";

import { ANALYTICS_COPY } from "@/lib/ui-copy";

interface VolumeTrendProps {
  data: { week: string; volume: number; target: number }[];
}

export function VolumeTrendChart({ data }: VolumeTrendProps) {
  const maxVolume = Math.max(...data.map((d) => d.volume), 25000);

  return (
    <div className="vt-glass vt-analytics-card">
      <h3 className="vt-font-display vt-heatmap-card__title">
        {ANALYTICS_COPY.sections.volumeTrend}
      </h3>
      <div
        className="vt-volume-chart"
        style={{ borderBottom: "1px solid var(--border)", paddingBottom: "0.75rem" }}
      >
        {data.map((item) => {
          const heightPct = Math.round((item.volume / maxVolume) * 100);
          return (
            <div key={item.week} className="vt-volume-chart__col">
              <span className="vt-tabular vt-volume-chart__label" style={{ color: "var(--volt)" }}>
                {(item.volume / 1000).toFixed(1)}t
              </span>
              <div
                className="vt-volume-chart__bar vt-volume-chart__bar--active"
                style={{ height: `${heightPct}%` }}
              />
              <span
                className="vt-volume-chart__label"
                style={{ fontWeight: 600, textTransform: "uppercase" }}
              >
                {item.week}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
