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
      <h1 className="vt-font-display vt-analytics-title">Analytics</h1>
      <div className="vt-analytics-grid">
        <div className="vt-glass vt-analytics-card">
          <p className="vt-analytics-card__label">Weekly volume (kg)</p>
          <div className="vt-volume-chart">
            {volume.map((v, i) => (
              <div key={i} className="vt-volume-chart__col">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(v / max) * 100}%` }}
                  transition={{ delay: i * 0.05, duration: 0.6 }}
                  className={`vt-volume-chart__bar ${i === volume.length - 1 ? "vt-volume-chart__bar--active" : ""}`}
                />
                <span className="vt-tabular vt-volume-chart__label">W{i + 1}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="vt-glass vt-analytics-card">
          <p className="vt-analytics-card__label">Bench est. 1RM</p>
          <p className="vt-tabular vt-analytics-card__value vt-text-glow">100 kg</p>
          <svg viewBox="0 0 400 120" className="vt-analytics-chart-svg">
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
      <div className="vt-glass vt-history-card">
        <p className="vt-analytics-card__label">History</p>
        <ul className="vt-history-list">
          {history.map((h, i) => (
            <li key={i} className="vt-history-item">
              <span>
                <span className="vt-history-item__title">{h.title}</span>{" "}
                <span className="vt-tabular vt-history-item__date">{h.date}</span>
              </span>
              <span className="vt-tabular vt-history-item__meta">
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
