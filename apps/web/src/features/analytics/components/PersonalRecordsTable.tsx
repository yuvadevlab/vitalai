"use client";

import { Trophy } from "lucide-react";
import { ANALYTICS_COPY } from "@/lib/ui-copy";

interface PrProps {
  records: { exercise: string; weight: number; reps: number; date: string; rpe: number }[];
}

export function PersonalRecordsTable({ records }: PrProps) {
  return (
    <div className="glass p-5">
      <div className="flex items-center gap-2">
        <Trophy className="size-5 text-amber-400" />
        <h3 className="font-display-x text-2xl">{ANALYTICS_COPY.sections.personalRecords}</h3>
      </div>
      <div className="mt-4 divide-y divide-border/60">
        {records.map((r) => (
          <div key={r.exercise} className="flex items-center justify-between py-3 text-sm">
            <div>
              <p className="font-medium text-foreground">{r.exercise}</p>
              <p className="text-xs text-muted-foreground">
                {r.date} • RPE {r.rpe}
              </p>
            </div>
            <div className="tabular text-right">
              <span className="font-display-x text-xl text-volt">{r.weight}kg</span>
              <span className="text-xs text-muted-foreground ml-1">× {r.reps} reps</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
