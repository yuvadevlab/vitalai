"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { useRouter } from "next/navigation";

interface WorkoutSummaryModalProps {
  volume: number;
  totalSets: number;
}

export function WorkoutSummaryModal({ volume, totalSets }: WorkoutSummaryModalProps) {
  const router = useRouter();

  return (
    <motion.div className="vt-summary-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="vt-glass vt-summary-card"
      >
        <Trophy className="vt-summary-card__icon" />
        <h2 className="vt-font-display vt-summary-card__title">Session Complete</h2>
        <div className="vt-summary-card__grid">
          <div className="vt-summary-card__stat">
            <p className="vt-tabular vt-summary-card__stat-val">
              {Math.round(volume).toLocaleString()}kg
            </p>
            <p className="vt-summary-card__stat-label">Volume</p>
          </div>
          <div className="vt-summary-card__stat">
            <p className="vt-tabular vt-summary-card__stat-val">{String(totalSets)}</p>
            <p className="vt-summary-card__stat-label">Sets</p>
          </div>
          <div className="vt-summary-card__stat">
            <p className="vt-tabular vt-summary-card__stat-val">{totalSets > 10 ? "1" : "0"}</p>
            <p className="vt-summary-card__stat-label">PRs</p>
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => router.push("/analytics")}
          className="vt-summary-card__btn vt-glow-volt"
        >
          Save & View Stats
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
