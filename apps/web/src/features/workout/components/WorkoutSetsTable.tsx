"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { Exercise } from "@/lib/plan";

interface WorkoutSetsTableProps {
  exerciseIndex: number;
  exercise: Exercise;
  completedSets: Record<string, boolean>;
  onToggleSet: (setIndex: number) => void;
}

export function WorkoutSetsTable({
  exerciseIndex,
  exercise,
  completedSets,
  onToggleSet,
}: WorkoutSetsTableProps) {
  return (
    <div className="glass mt-4 overflow-hidden">
      <div className="grid grid-cols-[3rem_1fr_1fr_1fr_3.5rem] gap-2 border-b px-4 py-3 text-[10px] uppercase tracking-widest text-muted-foreground">
        <span>Set</span>
        <span>Prev</span>
        <span>Load</span>
        <span>Reps</span>
        <span className="text-right">Done</span>
      </div>
      {Array.from({ length: exercise.sets }).map((_, s) => {
        const on = !!completedSets[`${exerciseIndex}-${s}`];
        return (
          <div
            key={s}
            className={`tabular grid grid-cols-[3rem_1fr_1fr_1fr_3.5rem] items-center gap-2 px-4 py-3 text-sm transition ${on ? "bg-primary/8" : ""}`}
          >
            <span className="text-primary">{s + 1}</span>
            <span className="text-muted-foreground">
              {exercise.loadKg ? `${exercise.loadKg - 2.5}×${parseInt(exercise.reps)}` : "—"}
            </span>
            <span>{exercise.load}</span>
            <span>{exercise.reps}</span>
            <motion.button
              whileTap={{ scale: 0.85 }}
              animate={on ? { scale: [1, 1.25, 1] } : {}}
              onClick={() => onToggleSet(s)}
              className={`ml-auto grid size-9 place-items-center rounded-lg border ${on ? "border-primary bg-primary text-primary-foreground glow-volt" : ""}`}
            >
              {on && <Check className="size-5" />}
            </motion.button>
          </div>
        );
      })}
    </div>
  );
}
