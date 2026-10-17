"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { axisProps, tooltipStyle, VITAL_CHART_COLORS } from "./chart-theme";

export interface MealCarbEvent {
  readonly time: string;
  readonly carbGrams: number;
  readonly mealName: string;
  readonly glycemicLoad: "low" | "med" | "high";
}

export interface GlycemicTimelineProps {
  readonly events: readonly MealCarbEvent[];
  readonly workoutTime?: string;
  readonly className?: string;
}

export const GlycemicTimeline: React.FC<GlycemicTimelineProps> = ({
  events,
  workoutTime = "17:00",
  className = "",
}) => {
  const chartData = events.map((e) => ({
    time: e.time,
    carbs: e.carbGrams,
    meal: e.mealName,
    load: e.glycemicLoad,
  }));

  return (
    <div
      className={`bg-card/60 border-border/40 rounded-2xl border p-5 backdrop-blur-md ${className}`}
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h4 className="text-foreground text-sm font-semibold tracking-tight">
            Glycemic Distribution & Fuel Timing
          </h4>
          <p className="text-muted-foreground mt-0.5 text-xs">
            Carbohydrate bioavailability mapped to training window
          </p>
        </div>
        {workoutTime && (
          <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2 py-0.5 font-mono text-xs text-cyan-400">
            Training: {workoutTime}
          </span>
        )}
      </div>

      <div className="h-52 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="carbGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={VITAL_CHART_COLORS.carbs} stopOpacity={0.4} />
                <stop offset="95%" stopColor={VITAL_CHART_COLORS.carbs} stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" {...axisProps} />
            <YAxis {...axisProps} unit="g" />
            <Tooltip
              {...tooltipStyle()}
              formatter={(value) => [`${value}g`, "Carbohydrate"]}
              labelFormatter={(label) => `Time: ${label}`}
            />
            {workoutTime && (
              <ReferenceLine
                x={workoutTime}
                stroke={VITAL_CHART_COLORS.primary}
                strokeDasharray="3 3"
                label={{
                  value: "Workout",
                  fill: VITAL_CHART_COLORS.primary,
                  fontSize: 10,
                  position: "top",
                }}
              />
            )}
            <Area
              type="monotone"
              dataKey="carbs"
              stroke={VITAL_CHART_COLORS.carbs}
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#carbGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="border-border/30 text-muted-foreground mt-3 flex flex-wrap items-center justify-between gap-2 border-t pt-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-amber-400" />
          <span>Carbohydrate Ingestion (g)</span>
        </div>
        <div className="flex items-center gap-3 font-mono text-[11px]">
          <span>Low GI: &lt;10</span>
          <span>Med GI: 11-19</span>
          <span className="text-foreground">High GI: 20+</span>
        </div>
      </div>
    </div>
  );
};
