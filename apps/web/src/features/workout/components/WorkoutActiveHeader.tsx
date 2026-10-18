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
      <div className="flex items-center justify-between">
        <Link href="/" className="grid size-10 place-items-center rounded-xl border">
          <X className="size-5" />
        </Link>
        <p className="tabular text-xs text-muted-foreground">
          EXERCISE {currentIndex + 1} / {totalExercises} • {totalSets} SETS
        </p>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onFinish}
          className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          Finish
        </motion.button>
      </div>

      <div className="mt-4 flex gap-1">
        {Array.from({ length: totalExercises }).map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full ${i <= currentIndex ? "bg-primary" : "bg-secondary"}`}
          />
        ))}
      </div>
    </div>
  );
}
