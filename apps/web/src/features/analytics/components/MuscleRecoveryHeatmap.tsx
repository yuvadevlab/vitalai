"use client";

import { ANALYTICS_COPY } from "@/lib/ui-copy";

interface HeatmapProps {
  items: { muscle: string; fatigue: number; recoveryPercent: number; status: string }[];
}

export function MuscleRecoveryHeatmap({ items }: HeatmapProps) {
  return (
    <div className="vt-glass vt-heatmap-card">
      <h3 className="vt-font-display vt-heatmap-card__title">
        {ANALYTICS_COPY.sections.muscleFatigue}
      </h3>
      <div className="vt-heatmap-grid">
        {items.map((m) => {
          const badgeType =
            m.recoveryPercent > 75
              ? "vt-heatmap-item__badge--volt"
              : m.recoveryPercent > 50
                ? "vt-heatmap-item__badge--cyan"
                : "vt-heatmap-item__badge--ember";

          const fillColor =
            m.recoveryPercent > 75
              ? "var(--volt)"
              : m.recoveryPercent > 50
                ? "var(--cyan)"
                : "var(--ember, #f97316)";

          return (
            <div key={m.muscle} className="vt-heatmap-item">
              <div>
                <span className="vt-heatmap-item__name">{m.muscle}</span>
                <p className="vt-heatmap-item__sub">Fatigue: {m.fatigue}%</p>
              </div>
              <div className="vt-heatmap-item__status">
                <div className="vt-heatmap-item__track">
                  <div
                    className="vt-heatmap-item__fill"
                    style={{ width: `${m.recoveryPercent}%`, backgroundColor: fillColor }}
                  />
                </div>
                <span className={`vt-heatmap-item__badge ${badgeType}`}>{m.status}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
