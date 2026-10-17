"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Sparkles, Utensils, Dumbbell } from "lucide-react";
import { HealthGuardrailBadge } from "@vitalai/ui";
import { NAVIGATION_COPY } from "@/lib/ui-copy";

export interface HeaderProps {
  readonly onOpenAdvisorDrawer?: () => void;
  readonly onQuickLogMeal?: () => void;
  readonly onStartWorkout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAdvisorDrawer,
  onQuickLogMeal,
  onStartWorkout,
}) => {
  const pathname = usePathname();

  const getPageTitle = (path: string) => {
    if (path.includes("workouts")) return "Training & Periodization";
    if (path.includes("nutrition")) return "Clinical Nutrition & Macros";
    if (path.includes("health-vault")) return "Health Vault & Guardrails";
    if (path.includes("advisors")) return "Advisor Studio";
    if (path.includes("settings")) return "System Settings";
    return "Telemetry Dashboard";
  };

  return (
    <header className="border-border/40 bg-card/40 sticky top-0 z-30 flex h-16 items-center justify-between border-b px-6 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-foreground text-sm font-bold tracking-tight">
            {getPageTitle(pathname)}
          </h1>
          <p className="text-muted-foreground hidden font-mono text-[11px] sm:block">
            VitalAI Clinical Platform • Local Engine :4004
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Active Guardrail Badge */}
        <div className="hidden items-center gap-2 lg:flex">
          <HealthGuardrailBadge
            conditionName="Lumbar L4-L5 Protection"
            severity="moderate"
            excludedCount={3}
          />
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-1.5">
          {onQuickLogMeal && (
            <button
              type="button"
              onClick={onQuickLogMeal}
              className="bg-surface-2 hover:bg-surface border-border/30 text-foreground hidden items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-medium transition-all sm:flex"
            >
              <Utensils className="text-primary size-3.5" />
              <span>{NAVIGATION_COPY.logMeal}</span>
            </button>
          )}

          {onStartWorkout && (
            <button
              type="button"
              onClick={onStartWorkout}
              className="bg-primary text-primary-foreground hidden items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold shadow-sm transition-all hover:brightness-110 sm:flex"
            >
              <Dumbbell className="size-3.5" />
              <span>{NAVIGATION_COPY.startWorkout}</span>
            </button>
          )}

          <button
            type="button"
            onClick={onOpenAdvisorDrawer}
            className="from-primary text-primary-foreground shadow-primary/20 hover:scale-1.02 flex items-center gap-1.5 rounded-xl bg-linear-to-r to-cyan-400 px-3.5 py-1.5 text-xs font-bold shadow-md transition-transform"
          >
            <Sparkles className="size-3.5" />
            <span className="hidden md:inline">AI Advisor</span>
          </button>
        </div>

        {/* User Avatar */}
        <div className="to-primary flex size-8 items-center justify-center rounded-full bg-linear-to-br from-violet-500 text-xs font-bold text-white shadow-inner">
          YP
        </div>
      </div>
    </header>
  );
};
