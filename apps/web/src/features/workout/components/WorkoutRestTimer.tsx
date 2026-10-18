"use client";

import { motion } from "framer-motion";
import { Play, Pause, SkipForward } from "lucide-react";

interface WorkoutRestTimerProps {
  rest: number;
  paused: boolean;
  onTogglePause: () => void;
  onAdd30s: () => void;
  onSkip: () => void;
}

export function WorkoutRestTimer({
  rest,
  paused,
  onTogglePause,
  onAdd30s,
  onSkip,
}: WorkoutRestTimerProps) {
  return (
    <motion.div
      initial={{ y: 120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 120, opacity: 0 }}
      className="fixed inset-x-4 bottom-4 z-40 mx-auto flex max-w-xl items-center gap-4 rounded-2xl border border-primary/40 bg-surface/95 p-4 backdrop-blur glow-volt"
    >
      <div>
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Rest</p>
        <p className="tabular text-3xl font-bold text-primary">
          {Math.floor(rest / 60)}:{String(rest % 60).padStart(2, "0")}
        </p>
      </div>
      <div className="ml-auto flex gap-2">
        <button
          onClick={onTogglePause}
          className="grid size-11 place-items-center rounded-xl bg-secondary"
        >
          {paused ? <Play className="size-5" /> : <Pause className="size-5" />}
        </button>
        <button
          onClick={onAdd30s}
          className="tabular h-11 rounded-xl bg-secondary px-3 text-sm font-bold"
        >
          +30s
        </button>
        <button
          onClick={onSkip}
          className="grid size-11 place-items-center rounded-xl bg-primary text-primary-foreground"
        >
          <SkipForward className="size-5" />
        </button>
      </div>
    </motion.div>
  );
}
