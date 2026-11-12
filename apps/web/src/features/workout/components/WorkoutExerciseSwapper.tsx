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
      className="vt-swapper-overlay"
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
        className="vt-swapper-sheet"
      >
        <p className="vt-swapper-sheet__badge">AI-recommended alternatives</p>
        <h3 className="vt-font-display vt-swapper-sheet__title">Replace {exerciseName}</h3>
        <div className="vt-swapper-sheet__list">
          {alternatives.map((a) => (
            <motion.button
              key={a}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelectAlternative(a)}
              className="vt-swapper-sheet__item"
            >
              <span className="vt-swapper-sheet__item-name">{a}</span>
              <span className="vt-swapper-sheet__item-sub">Same muscle targets</span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
