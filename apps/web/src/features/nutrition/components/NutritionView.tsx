"use client";

import React, { useState } from "react";
import { Plus, Clock } from "lucide-react";
import {
  MultiRingGauge,
  PurineSafetyGauge,
  GlycemicTimeline,
  TrimesterTimeline,
} from "@vitalai/ui";
import { useNutrition } from "../api";
import { LogMealDialog } from "./LogMealDialog";
import { NUTRITION_COPY } from "@/lib/ui-copy";

export const NutritionView: React.FC = () => {
  const { data: plan } = useNutrition();
  const [isLogDialogOpen, setIsLogDialogOpen] = useState(false);

  if (!plan) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-foreground font-display text-2xl font-bold tracking-tight">
            {NUTRITION_COPY.title}
          </h2>
          <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
            {NUTRITION_COPY.subtitle}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsLogDialogOpen(true)}
          className="bg-primary text-primary-foreground inline-flex items-center gap-2 self-start rounded-xl px-4 py-2 text-xs font-semibold shadow-md transition-all hover:brightness-110 sm:self-auto"
        >
          <Plus className="size-3.5" />
          <span>{NUTRITION_COPY.logMealBtn}</span>
        </button>
      </div>

      {/* Top Biometric Split */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        {/* Left: Concentric Macro Gauge + Purine Safety Gauge */}
        <div className="space-y-6 lg:col-span-5">
          <MultiRingGauge data={plan.macros} />
          <PurineSafetyGauge purineMg={plan.purineMg} safeLimitMg={plan.safePurineLimitMg} />
        </div>

        {/* Right: Glycemic Fuel Curve + Maternal Trimester Timeline */}
        <div className="space-y-6 lg:col-span-7">
          <GlycemicTimeline events={plan.carbEvents} workoutTime="17:00" />
          {plan.gestationalWeek && <TrimesterTimeline currentWeek={plan.gestationalWeek} />}
        </div>
      </div>

      {/* Daily Meal Schedule Stack */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-foreground font-display text-base font-bold tracking-tight">
            {NUTRITION_COPY.mealScheduleTitle}
          </h3>
          <span className="text-muted-foreground font-mono text-xs">
            {plan.meals.length} Clinical Protocols Active
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {plan.meals.map((meal) => (
            <div
              key={meal.id}
              className="bg-card/60 border-border/40 space-y-3 rounded-2xl border p-4 backdrop-blur-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-foreground text-sm font-bold">{meal.name}</h4>
                  <div className="text-muted-foreground mt-0.5 flex items-center gap-1.5 font-mono text-xs">
                    <Clock className="text-primary size-3" />
                    <span>{meal.time}</span>
                  </div>
                </div>
                <div className="text-right font-mono">
                  <span className="text-foreground text-sm font-bold">{meal.calories}</span>
                  <span className="text-muted-foreground ml-1 text-[11px]">kcal</span>
                </div>
              </div>

              {/* Macro Pills */}
              <div className="border-border/20 grid grid-cols-4 gap-2 border-t pt-1 text-center font-mono">
                <div className="bg-surface-2/60 rounded-lg p-1.5">
                  <span className="text-muted-foreground block text-[10px]">Protein</span>
                  <span className="text-primary text-xs font-semibold">{meal.protein}g</span>
                </div>
                <div className="bg-surface-2/60 rounded-lg p-1.5">
                  <span className="text-muted-foreground block text-[10px]">Carbs</span>
                  <span className="text-xs font-semibold text-amber-400">{meal.carbs}g</span>
                </div>
                <div className="bg-surface-2/60 rounded-lg p-1.5">
                  <span className="text-muted-foreground block text-[10px]">Fats</span>
                  <span className="text-xs font-semibold text-rose-400">{meal.fats}g</span>
                </div>
                <div className="bg-surface-2/60 rounded-lg p-1.5">
                  <span className="text-muted-foreground block text-[10px]">Purines</span>
                  <span className="text-xs font-semibold text-emerald-400">{meal.purineMg}mg</span>
                </div>
              </div>

              {/* Ingredients & Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {meal.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-surface-2 text-muted-foreground border-border/30 rounded-md border px-2 py-0.5 font-mono text-[10px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2-File Log Meal Modal */}
      <LogMealDialog
        isOpen={isLogDialogOpen}
        onClose={() => setIsLogDialogOpen(false)}
        onMealLogged={(m) => {
          alert(`Meal logged: ${m.mealName} (${m.calories} kcal)`);
          setIsLogDialogOpen(false);
        }}
      />
    </div>
  );
};
