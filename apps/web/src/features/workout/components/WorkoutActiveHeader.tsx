"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface WorkoutActiveHeaderProps {
  currentIndex: number;
  totalExercises: number;
  totalSets: number;
  onFinish: () => void;
}

export function WorkoutActiveHeader({
  currentIndex,
  totalExercises,
  totalSets,
  onFinish,
}: WorkoutActiveHeaderProps) {
  return (
    <div>
      <div className="vt-active-header">
        <Link href="/" className="vt-active-header__close" aria-label="Close workout">
          <X style={{ width: "1.25rem", height: "1.25rem" }} />
        </Link>
        <p className="vt-tabular vt-active-header__progress-text">
          EXERCISE {currentIndex + 1} / {totalExercises} • {totalSets} SETS
        </p>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onFinish}
          className="vt-active-header__finish-btn"
        >
          Finish
        </motion.button>
      </div>

      <div className="vt-active-header__bars">
        {Array.from({ length: totalExercises }).map((_, i) => (
          <div
            key={i}
            className={`vt-active-header__bar ${i <= currentIndex ? "vt-active-header__bar--active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}
