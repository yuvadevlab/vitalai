"use client";

import React from "react";
import { calculateRingOffset, RingSegment } from "./gauge-utils";
import { VITAL_CHART_COLORS } from "../../charts/chart-theme";

export interface MacroRingData {
  readonly calories: { current: number; target: number };
  readonly protein: { current: number; target: number };
  readonly carbs: { current: number; target: number };
  readonly fats: { current: number; target: number };
}

export interface MultiRingGaugeProps {
  readonly data: MacroRingData;
  readonly size?: number;
  readonly title?: string;
  readonly className?: string;
}

export const MultiRingGauge: React.FC<MultiRingGaugeProps> = ({
  data,
  size = 280,
  title = "Daily Macro Adherence",
  className = "",
}) => {
  const center = size / 2;
  const strokeWidth = Math.max(8, Math.round(size * 0.04));
  const ringGap = strokeWidth + 4;

  const rings: RingSegment[] = [
    {
      id: "calories",
      label: "Calories",
      current: data.calories.current,
      target: data.calories.target,
      unit: "kcal",
      color: VITAL_CHART_COLORS.calories,
      radius: center - strokeWidth - 6,
      strokeWidth,
    },
    {
      id: "protein",
      label: "Protein",
      current: data.protein.current,
      target: data.protein.target,
      unit: "g",
      color: VITAL_CHART_COLORS.protein,
      radius: center - strokeWidth - ringGap - 6,
      strokeWidth,
    },
    {
      id: "carbs",
      label: "Carbs",
      current: data.carbs.current,
      target: data.carbs.target,
      unit: "g",
      color: VITAL_CHART_COLORS.carbs,
      radius: center - strokeWidth - ringGap * 2 - 6,
      strokeWidth,
    },
    {
      id: "fats",
      label: "Fats",
      current: data.fats.current,
      target: data.fats.target,
      unit: "g",
      color: VITAL_CHART_COLORS.fats,
      radius: center - strokeWidth - ringGap * 3 - 6,
      strokeWidth,
    },
  ];

  const calRemaining = Math.max(0, data.calories.target - data.calories.current);

  return (
    <div
      className={`bg-card/60 border-border/40 flex flex-col items-center rounded-2xl border p-5 backdrop-blur-md ${className}`}
    >
      {title && (
        <div className="mb-3 flex w-full items-center justify-between">
          <span className="text-foreground text-sm font-semibold tracking-tight">{title}</span>
          <span className="text-muted-foreground font-mono text-xs tabular-nums">
            {Math.round((data.calories.current / (data.calories.target || 1)) * 100)}% of goal
          </span>
        </div>
      )}

      <div
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <svg width={size} height={size} className="-rotate-90 transform">
          <defs>
            <filter id="vital-ring-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {rings.map((ring) => {
            const { circumference, offset } = calculateRingOffset(
              ring.radius,
              ring.current,
              ring.target,
            );
            return (
              <g key={ring.id}>
                <circle
                  cx={center}
                  cy={center}
                  r={ring.radius}
                  fill="none"
                  stroke={ring.color}
                  strokeOpacity={0.15}
                  strokeWidth={ring.strokeWidth}
                />
                <circle
                  cx={center}
                  cy={center}
                  r={ring.radius}
                  fill="none"
                  stroke={ring.color}
                  strokeWidth={ring.strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </g>
            );
          })}
        </svg>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
            Remaining
          </span>
          <span className="text-foreground mt-0.5 font-mono text-3xl font-bold tracking-tight tabular-nums">
            {calRemaining.toLocaleString()}
          </span>
          <span className="text-muted-foreground/80 font-mono text-[11px]">kcal left</span>
        </div>
      </div>

      <div className="border-border/30 mt-4 grid w-full grid-cols-2 gap-2.5 border-t pt-3 sm:grid-cols-4">
        {rings.map((ring) => (
          <div
            key={ring.id}
            className="bg-surface-2/40 border-border/20 flex flex-col rounded-xl border p-2"
          >
            <div className="mb-1 flex items-center gap-1.5">
              <span className="size-2 rounded-full" style={{ backgroundColor: ring.color }} />
              <span className="text-muted-foreground text-xs font-medium">{ring.label}</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-foreground font-mono text-sm font-semibold tabular-nums">
                {Math.round(ring.current)}
              </span>
              <span className="text-muted-foreground font-mono text-[11px]">
                / {ring.target}
                {ring.unit}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
