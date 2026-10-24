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
    <motion.div
      className="fixed inset-0 z-50 grid place-items-center bg-background/85 p-6 backdrop-blur"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="glass w-full max-w-md p-8 text-center"
      >
        <Trophy className="mx-auto size-12 text-primary" />
        <h2 className="font-display-x mt-4 text-4xl">Session Complete</h2>
        <div className="mt-6 grid grid-cols-3 gap-3">
          <div className="rounded-xl bg-secondary p-3">
            <p className="tabular text-lg font-bold text-primary">
              {Math.round(volume).toLocaleString()}kg
            </p>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Volume</p>
          </div>
          <div className="rounded-xl bg-secondary p-3">
            <p className="tabular text-lg font-bold text-primary">{String(totalSets)}</p>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Sets</p>
          </div>
          <div className="rounded-xl bg-secondary p-3">
            <p className="tabular text-lg font-bold text-primary">{totalSets > 10 ? "1" : "0"}</p>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">PRs</p>
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => router.push("/analytics")}
          className="mt-8 w-full rounded-2xl bg-primary py-4 font-display-x text-xl text-primary-foreground glow-volt"
        >
          Save & View Stats
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
