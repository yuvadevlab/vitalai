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
    <div className="vt-glass vt-today-card">
      <div className="vt-today-card__glow" />
      <div className="vt-today-card__header">
        <span className="vt-today-card__badge">⚡ TODAY'S NEURAL WORKOUT</span>
        <div className="vt-today-card__meta">
          <span className="vt-today-card__meta-item">
            <Clock className="vt-today-card__meta-icon" /> {session.durationMinutes} min
          </span>
          <span className="vt-today-card__meta-item">
            <Dumbbell className="vt-today-card__meta-icon" /> {session.exercises.length} Movements
          </span>
        </div>
      </div>

      <h2 className="vt-font-display vt-today-card__title">{session.title}</h2>

      <div className="vt-today-card__tags">
        {session.focusMuscles.map((m) => (
          <span key={m} className="vt-today-card__tag">
            {m}
          </span>
        ))}
      </div>

      <div className="vt-today-card__actions">
        <Link href={APP_ROUTES.WORKOUT_ACTIVE} className="vt-today-card__start-btn">
          <Play style={{ width: "1rem", height: "1rem" }} fill="currentColor" />{" "}
          {COMMON_COPY.actions.startWorkout}
        </Link>
        <Link href={APP_ROUTES.PLAN} className="vt-today-card__plan-btn">
          {COMMON_COPY.actions.viewPlan}
        </Link>
      </div>
    </div>
  );
}
