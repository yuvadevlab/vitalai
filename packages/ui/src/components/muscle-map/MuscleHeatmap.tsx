"use client";

import React, { useState } from "react";
import { ANTERIOR_MUSCLES, POSTERIOR_MUSCLES, MusclePath } from "./body-svg-paths";

export interface MuscleHeatmapProps {
  readonly primaryMuscles: readonly string[];
  readonly secondaryMuscles?: readonly string[];
  readonly fatiguedMuscles?: readonly string[];
  readonly highlightedMuscle?: string | null;
  readonly onMuscleClick?: (muscleId: string) => void;
  readonly className?: string;
}

export const MuscleHeatmap: React.FC<MuscleHeatmapProps> = ({
  primaryMuscles,
  secondaryMuscles = [],
  fatiguedMuscles = [],
  highlightedMuscle,
  onMuscleClick,
  className = "",
}) => {
  const [activeTab, setActiveTab] = useState<"anterior" | "posterior">("anterior");
  const [hovered, setHovered] = useState<string | null>(null);

  const getMuscleColor = (muscleId: string) => {
    if (fatiguedMuscles.includes(muscleId)) return "fill-rose-500/80 stroke-rose-400";
    if (primaryMuscles.includes(muscleId))
      return "fill-cyan-400/90 stroke-cyan-300 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]";
    if (secondaryMuscles.includes(muscleId)) return "fill-violet-400/70 stroke-violet-300";
    return "fill-white/10 stroke-white/20 hover:fill-white/20";
  };

  const currentMuscles = activeTab === "anterior" ? ANTERIOR_MUSCLES : POSTERIOR_MUSCLES;

  return (
    <div
      className={`bg-card/60 border-border/40 flex flex-col items-center rounded-2xl border p-5 backdrop-blur-md ${className}`}
    >
      <div className="mb-4 flex w-full items-center justify-between">
        <div>
          <h4 className="text-foreground text-sm font-semibold tracking-tight">
            Anatomical Heatmap
          </h4>
          <p className="text-muted-foreground mt-0.5 text-xs">Biomechanical recruitment map</p>
        </div>
        <div className="bg-surface-2 border-border/30 flex rounded-lg border p-0.5">
          <button
            type="button"
            onClick={() => setActiveTab("anterior")}
            className={`rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
              activeTab === "anterior"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Anterior
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("posterior")}
            className={`rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
              activeTab === "posterior"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Posterior
          </button>
        </div>
      </div>

      <div className="relative my-2 flex h-72 w-44 items-center justify-center">
        <svg viewBox="0 0 120 200" className="size-full drop-shadow-md">
          {/* Head & Neck Base Outline */}
          <ellipse
            cx="60"
            cy="22"
            rx="11"
            ry="14"
            className="fill-white/10 stroke-white/20"
            strokeWidth="1.2"
          />
          <path
            d="M 54 34 L 54 38 L 66 38 L 66 34 Z"
            className="fill-white/10 stroke-white/20"
            strokeWidth="1.2"
          />

          {/* Muscle Groups */}
          {currentMuscles.map((muscle: MusclePath) => {
            const isTarget = primaryMuscles.includes(muscle.id);
            const isSecondary = secondaryMuscles.includes(muscle.id);
            const isHovered = hovered === muscle.id || highlightedMuscle === muscle.id;

            return (
              <path
                key={muscle.id}
                d={muscle.path}
                strokeWidth={isHovered ? "2" : "1.2"}
                className={`cursor-pointer transition-all duration-300 ${getMuscleColor(muscle.id)} ${
                  isHovered ? "scale-1.02 brightness-125" : ""
                }`}
                onMouseEnter={() => setHovered(muscle.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => onMuscleClick?.(muscle.id)}
              >
                <title>
                  {muscle.name} (
                  {isTarget ? "Primary Mover" : isSecondary ? "Stabilizer" : "Resting"})
                </title>
              </path>
            );
          })}
        </svg>

        {hovered && (
          <div className="bg-card/90 border-border/50 text-foreground pointer-events-none absolute bottom-2 rounded-md border px-2.5 py-1 font-mono text-[11px] font-medium shadow-lg backdrop-blur-md">
            {currentMuscles.find((m) => m.id === hovered)?.name}
          </div>
        )}
      </div>

      {/* Recruitment Legend */}
      <div className="border-border/30 text-muted-foreground mt-3 flex w-full flex-wrap items-center justify-center gap-3 border-t pt-3 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.8)]" />
          <span className="text-foreground font-medium">Primary</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-violet-400" />
          <span>Secondary</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-rose-500" />
          <span>Fatigued</span>
        </div>
      </div>
    </div>
  );
};
