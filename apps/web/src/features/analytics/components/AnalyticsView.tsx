"use client";

import { motion } from "framer-motion";
import { AppShell } from "@/components/vital/AppShell";
import { useVital } from "@/lib/store";

const volume = [11200, 11800, 12400, 12100, 13050, 13700, 14280];
const orm = [92.5, 95, 95, 97.5, 100];

export function AnalyticsView() {
  const history = useVital((s) => s.history);
  const max = Math.max(...volume);

  return (
    <AppShell insight="Your 1RM on Bench has increased by 7.5kg over the last 3 weeks. Progressive overload curve is optimal.">
      <h1 className="font-display-x text-5xl">Analytics</h1>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="glass p-5">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Weekly volume (kg)
          </p>
          <div className="mt-6 flex h-48 items-end gap-3">
            {volume.map((v, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(v / max) * 100}%` }}
                  transition={{ delay: i * 0.05, duration: 0.6 }}
                  className={`w-full rounded-t-lg ${i === volume.length - 1 ? "bg-gradient-volt glow-volt" : "bg-surface-2"}`}
                />
                <span className="tabular text-[10px] text-muted-foreground">W{i + 1}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="glass p-5">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Bench est. 1RM</p>
          <p className="tabular mt-2 text-4xl font-bold text-primary text-glow">100 kg</p>
          <svg viewBox="0 0 400 120" className="mt-4 w-full">
            <motion.polyline
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2 }}
              fill="none"
              stroke="var(--volt)"
              strokeWidth="3"
              strokeLinecap="round"
              points={orm.map((v, i) => `${i * 100},${110 - (v - 90) * 9}`).join(" ")}
            />
          </svg>
        </div>
      </div>
      <div className="glass mt-6 p-5">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">History</p>
        <ul className="mt-3 divide-y divide-border">
          {history.map((h, i) => (
            <li key={i} className="flex items-center justify-between py-3 text-sm">
              <span>
                <span className="font-semibold">{h.title}</span>{" "}
                <span className="tabular text-muted-foreground">{h.date}</span>
              </span>
              <span className="tabular text-muted-foreground">
                {h.volume.toLocaleString()} kg • {h.sets} sets
                {h.prs ? ` • ${h.prs} PR` : ""}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </AppShell>
  );
}
