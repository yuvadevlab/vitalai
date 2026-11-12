"use client";

import { Trophy } from "lucide-react";
import { ANALYTICS_COPY } from "@/lib/ui-copy";

interface PrProps {
  records: { exercise: string; weight: number; reps: number; date: string; rpe: number }[];
}

export function PersonalRecordsTable({ records }: PrProps) {
  return (
    <div className="vt-glass vt-pr-card">
      <div className="vt-pr-card__header">
        <Trophy className="vt-pr-card__icon" />
        <h3 className="vt-font-display vt-pr-card__title">
          {ANALYTICS_COPY.sections.personalRecords}
        </h3>
      </div>
      <div className="vt-pr-list">
        {records.map((r) => (
          <div key={r.exercise} className="vt-pr-item">
            <div>
              <p className="vt-pr-item__name">{r.exercise}</p>
              <p className="vt-pr-item__meta">
                {r.date} • RPE {r.rpe}
              </p>
            </div>
            <div className="vt-tabular vt-pr-item__stat">
              <span className="vt-pr-item__weight">{r.weight}kg</span>
              <span className="vt-pr-item__reps">× {r.reps} reps</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
