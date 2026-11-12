"use client";

import { motion } from "framer-motion";
import { AppShell } from "@/components/vital/AppShell";
import { weeklySplit } from "@/lib/plan";
import { useVital } from "@/lib/store";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function WorkoutPlanView() {
  const profile = useVital((s) => s.profile);
  const split = weeklySplit(profile);

  return (
    <AppShell insight="Your push-to-pull volume ratio is 1.1:1, perfectly balanced for shoulder health and posture.">
      <h1 className="vt-font-display vt-plan-title">Weekly Plan</h1>
      <p className="vt-plan-subtitle">
        {profile.goal} • {profile.days} days • {profile.equipment}
      </p>
      <div className="vt-plan-grid">
        {split.map((s, i) => {
          const rest = s === "Rest";
          const today = i === 5;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`vt-glass vt-plan-card ${today ? "vt-plan-card--today vt-glow-volt" : ""}`}
            >
              <p className="vt-tabular vt-plan-card__day">
                {DAYS[i]}
                {today && " • Today"}
              </p>
              <p
                className={`vt-font-display vt-plan-card__split ${rest ? "vt-plan-card__split--rest" : ""}`}
              >
                {s}
              </p>
              {!rest && (
                <p className="vt-tabular vt-plan-card__duration">{profile.sessionLength} min</p>
              )}
            </motion.div>
          );
        })}
      </div>
      <div className="vt-glass vt-mesocycle-card">
        <h3 className="vt-font-display vt-mesocycle-card__title">Mesocycle</h3>
        <div className="vt-mesocycle-card__grid">
          {["Base", "Build", "Overload", "Overload", "Peak", "Deload"].map((w, i) => (
            <div key={i} className="vt-mesocycle-card__item">
              <div
                className={`vt-mesocycle-card__bar ${i < 2 ? "vt-mesocycle-card__bar--past" : i === 2 ? "vt-mesocycle-card__bar--current vt-glow-volt" : ""}`}
              />
              <p className="vt-tabular vt-mesocycle-card__week">
                W{i + 1} {w}
              </p>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
