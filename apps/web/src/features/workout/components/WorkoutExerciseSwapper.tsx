"use client";

import { motion } from "framer-motion";

interface WorkoutExerciseSwapperProps {
  exerciseName: string;
  alternatives: string[];
  onSelectAlternative: (alt: string) => void;
  onClose: () => void;
}

export function WorkoutExerciseSwapper({
  exerciseName,
  alternatives,
  onSelectAlternative,
  onClose,
}: WorkoutExerciseSwapperProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end bg-background/70 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="mx-auto w-full max-w-2xl rounded-t-3xl border bg-popover p-6"
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
          AI-recommended alternatives
        </p>
        <h3 className="font-display-x mt-1 text-2xl">Replace {exerciseName}</h3>
        <div className="mt-4 space-y-2">
          {alternatives.map((a) => (
            <motion.button
              key={a}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelectAlternative(a)}
              className="flex w-full items-center justify-between rounded-xl border bg-card px-4 py-3 text-left hover:border-primary"
            >
              <span className="font-medium">{a}</span>
              <span className="text-xs text-muted-foreground">Same muscle targets</span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
