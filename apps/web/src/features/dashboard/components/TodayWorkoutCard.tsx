"use client";

import Link from "next/link";
import { Play, Dumbbell, Clock } from "lucide-react";
import { APP_ROUTES } from "@/lib/routes";
import { COMMON_COPY } from "@/lib/ui-copy";
import { useTodayWorkout } from "../api/getDashboardData";

export function TodayWorkoutCard() {
  const { data: session } = useTodayWorkout();

  if (!session) return null;

  return (
    <div className="glass relative overflow-hidden p-6">
      <div className="pointer-events-none absolute -right-12 -top-12 size-48 rounded-full bg-volt/15 blur-3xl" />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="rounded-full border border-volt/30 bg-volt/10 px-3 py-1 text-xs font-semibold text-volt">
          ⚡ TODAY'S NEURAL WORKOUT
        </span>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" /> {session.durationMinutes} min
          </span>
          <span className="flex items-center gap-1">
            <Dumbbell className="size-3.5" /> {session.exercises.length} Movements
          </span>
        </div>
      </div>

      <h2 className="font-display-x mt-4 text-3xl md:text-4xl">{session.title}</h2>

      <div className="mt-3 flex flex-wrap gap-2">
        {session.focusMuscles.map((m) => (
          <span
            key={m}
            className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-foreground"
          >
            {m}
          </span>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href={APP_ROUTES.WORKOUT_ACTIVE}
          className="flex items-center gap-2 rounded-xl bg-volt px-5 py-3 font-semibold text-primary-foreground shadow-lg shadow-volt/20 transition hover:brightness-110"
        >
          <Play className="size-4 fill-current" /> {COMMON_COPY.actions.startWorkout}
        </Link>
        <Link
          href={APP_ROUTES.PLAN}
          className="flex items-center gap-2 rounded-xl border border-border bg-card/50 px-4 py-3 font-medium text-foreground transition hover:bg-card"
        >
          {COMMON_COPY.actions.viewPlan}
        </Link>
      </div>
    </div>
  );
}
