"use client";

import React from "react";
import Link from "next/link";
import { Dumbbell, Flame, Activity, ShieldCheck, ArrowRight, Play } from "lucide-react";
import { MultiRingGauge, PurineSafetyGauge, HealthGuardrailBadge } from "@vitalai/ui";
import { useDashboardData } from "../api";
import { MetricStatCard } from "./MetricStatCard";
import { DASHBOARD_COPY } from "@/lib/ui-copy";
import { APP_ROUTES } from "@/lib/routes";

export const DashboardView: React.FC = () => {
  const { data } = useDashboardData();

  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Header Greeting */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-foreground font-display text-2xl font-bold tracking-tight">
            {DASHBOARD_COPY.greeting}
          </h2>
          <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
            {DASHBOARD_COPY.subheading}
          </p>
        </div>
        <Link
          href={APP_ROUTES.WORKOUTS}
          className="bg-primary text-primary-foreground inline-flex items-center gap-2 self-start rounded-xl px-4 py-2 text-xs font-semibold shadow-md transition-all hover:brightness-110 sm:self-auto"
        >
          <Play className="size-3.5 fill-current" />
          <span>Launch Today's Routine</span>
        </Link>
      </div>

      {/* Quick Telemetry Cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricStatCard
          title={DASHBOARD_COPY.quickStats.activeStreak}
          value="18"
          unit="days"
          subtitle="94% consistency"
          icon={Flame}
          accentColor="text-amber-400"
        />
        <MetricStatCard
          title={DASHBOARD_COPY.quickStats.weeklyVolume}
          value="14,280"
          unit="kg"
          subtitle="+4.2% vs last week"
          icon={Dumbbell}
          accentColor="text-cyan-400"
        />
        <MetricStatCard
          title={DASHBOARD_COPY.quickStats.purineLoad}
          value={data.purine.currentMg}
          unit="mg"
          subtitle="Safe (<300mg limit)"
          icon={ShieldCheck}
          accentColor="text-emerald-400"
        />
        <MetricStatCard
          title={DASHBOARD_COPY.quickStats.currentPhase}
          value="Overload"
          unit="Wk 3"
          subtitle="Target: 2 RIR"
          icon={Activity}
          accentColor="text-violet-400"
        />
      </div>

      {/* Main Biometric Split */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        {/* Concentric Macro Gauge */}
        <div className="lg:col-span-5">
          <MultiRingGauge data={data.macros} />
        </div>

        {/* Today's Routine & Metabolic Purine Gauge */}
        <div className="space-y-6 lg:col-span-7">
          <div className="bg-card/60 border-border/40 space-y-4 rounded-2xl border p-5 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-primary font-mono text-[10px] font-bold tracking-wider uppercase">
                  {data.workout.phase}
                </span>
                <h3 className="text-foreground mt-0.5 text-base font-bold tracking-tight">
                  {data.workout.name}
                </h3>
              </div>
              <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2 py-0.5 font-mono text-xs text-cyan-400">
                {data.workout.estimatedMinutes} mins
              </span>
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              <span className="text-muted-foreground">Primary Focus:</span>
              {data.workout.primaryMuscles.map((m) => (
                <span
                  key={m}
                  className="bg-surface-2 text-foreground border-border/30 rounded-md border px-2 py-0.5 font-mono text-[11px]"
                >
                  {m}
                </span>
              ))}
            </div>

            <div className="border-border/30 flex items-center justify-between border-t pt-2 text-xs">
              <span className="text-muted-foreground font-mono">
                {data.workout.exerciseCount} exercises prescribed • 2 RIR
              </span>
              <Link
                href={APP_ROUTES.WORKOUTS}
                className="text-primary flex items-center gap-1 font-semibold hover:underline"
              >
                <span>View Full Workout</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>

          <PurineSafetyGauge
            purineMg={data.purine.currentMg}
            safeLimitMg={data.purine.safeLimitMg}
          />
        </div>
      </div>

      {/* Active Clinical Guardrails Banner */}
      <div className="bg-surface-2/30 border-border/30 flex flex-col justify-between gap-3 rounded-2xl border p-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <ShieldCheck className="text-primary size-4 shrink-0" />
          <span className="text-foreground text-xs font-semibold">
            {DASHBOARD_COPY.guardrailsTitle}:
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {data.guardrails.map((g) => (
            <HealthGuardrailBadge
              key={g.id}
              conditionName={g.name}
              severity={g.severity}
              excludedCount={g.excludedCount}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
