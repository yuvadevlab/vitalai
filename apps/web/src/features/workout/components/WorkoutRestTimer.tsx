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
      className="vt-rest-timer vt-glow-volt"
    >
      <div>
        <p className="vt-rest-timer__label">Rest</p>
        <p className="vt-tabular vt-rest-timer__time">
          {Math.floor(rest / 60)}:{String(rest % 60).padStart(2, "0")}
        </p>
      </div>
      <div className="vt-rest-timer__controls">
        <button
          onClick={onTogglePause}
          className="vt-rest-timer__btn"
          aria-label={paused ? "Resume rest timer" : "Pause rest timer"}
        >
          {paused ? (
            <Play style={{ width: "1.25rem", height: "1.25rem" }} />
          ) : (
            <Pause style={{ width: "1.25rem", height: "1.25rem" }} />
          )}
        </button>
        <button
          onClick={onAdd30s}
          className="vt-tabular vt-rest-timer__btn vt-rest-timer__btn--text"
        >
          +30s
        </button>
        <button
          onClick={onSkip}
          className="vt-rest-timer__btn vt-rest-timer__btn--primary"
          aria-label="Skip rest timer"
        >
          <SkipForward style={{ width: "1.25rem", height: "1.25rem" }} />
        </button>
      </div>
    </motion.div>
  );
}
