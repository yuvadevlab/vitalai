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
    <div className="vt-glass vt-sets-table">
      <div className="vt-sets-table__header">
        <span>Set</span>
        <span>Prev</span>
        <span>Load</span>
        <span>Reps</span>
        <span style={{ textAlign: "right" }}>Done</span>
      </div>
      {Array.from({ length: exercise.sets }).map((_, s) => {
        const on = !!completedSets[`${exerciseIndex}-${s}`];
        return (
          <div
            key={s}
            className={`vt-tabular vt-sets-table__row ${on ? "vt-sets-table__row--active" : ""}`}
          >
            <span className="vt-sets-table__cell-index">{s + 1}</span>
            <span className="vt-sets-table__cell-prev">
              {exercise.loadKg ? `${exercise.loadKg - 2.5}×${parseInt(exercise.reps)}` : "—"}
            </span>
            <span>{exercise.load}</span>
            <span>{exercise.reps}</span>
            <motion.button
              whileTap={{ scale: 0.85 }}
              animate={on ? { scale: [1, 1.25, 1] } : {}}
              onClick={() => onToggleSet(s)}
              className={`vt-sets-table__check-btn ${on ? "vt-sets-table__check-btn--checked vt-glow-volt" : ""}`}
              aria-label={`Mark set ${s + 1} as completed`}
            >
              {on && <Check style={{ width: "1.25rem", height: "1.25rem" }} />}
            </motion.button>
          </div>
        );
      })}
    </div>
  );
}
