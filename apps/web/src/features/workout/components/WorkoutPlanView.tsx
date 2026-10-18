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
      <h1 className="font-display-x text-5xl">Weekly Plan</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {profile.goal} • {profile.days} days • {profile.equipment}
      </p>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        {split.map((s, i) => {
          const rest = s === "Rest";
          const today = i === 5;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`glass p-4 ${today ? "border-primary glow-volt" : ""}`}
            >
              <p className="tabular text-xs text-muted-foreground">
                {DAYS[i]}
                {today && " • Today"}
              </p>
              <p className={`font-display-x mt-3 text-2xl ${rest ? "text-muted-foreground" : ""}`}>
                {s}
              </p>
              {!rest && (
                <p className="tabular mt-2 text-xs text-primary">{profile.sessionLength} min</p>
              )}
            </motion.div>
          );
        })}
      </div>
      <div className="glass mt-6 p-5">
        <h3 className="font-display-x text-xl">Mesocycle</h3>
        <div className="mt-4 flex gap-2">
          {["Base", "Build", "Overload", "Overload", "Peak", "Deload"].map((w, i) => (
            <div key={i} className="flex-1">
              <div
                className={`h-2 rounded-full ${i < 2 ? "bg-primary/60" : i === 2 ? "bg-primary glow-volt" : "bg-secondary"}`}
              />
              <p className="tabular mt-2 text-[10px] text-muted-foreground">
                W{i + 1} {w}
              </p>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
