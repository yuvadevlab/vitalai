"use client";

import { Flame, Trophy, Activity, Zap } from "lucide-react";
import { useDashboardStats } from "../api/getDashboardData";

export function QuickStatsGrid() {
  const { data: stats } = useDashboardStats();

  const items = [
    {
      label: "SYSTEMIC READINESS",
      val: stats ? stats.systemicReadiness + "%" : "88%",
      sub: "CNS Prime for Load",
      icon: Activity,
      iconClass: "vt-stats-card__icon--volt",
    },
    {
      label: "ACTIVE STREAK",
      val: stats ? stats.streakWeeks + " WEEKS" : "6 WEEKS",
      sub: "100% Adherence",
      icon: Flame,
      iconClass: "vt-stats-card__icon--ember",
    },
    {
      label: "WEEKLY VOLUME",
      val: stats ? (stats.weeklyVolumeTotal / 1000).toFixed(1) + "t" : "22.6t",
      sub: "+4.2% Progressive",
      icon: Zap,
      iconClass: "vt-stats-card__icon--cyan",
    },
    {
      label: "ALL-TIME PRS",
      val: stats ? stats.personalRecords.length : 4,
      sub: "Last on Incline Bench",
      icon: Trophy,
      iconClass: "vt-stats-card__icon--amber",
    },
  ];

  return (
    <div className="vt-stats-grid">
      {items.map((it) => (
        <div key={it.label} className="vt-glass vt-stats-card">
          <div className="vt-stats-card__top">
            <span className="vt-stats-card__label">{it.label}</span>
            <it.icon className={`vt-stats-card__icon ${it.iconClass}`} />
          </div>
          <div className="vt-tabular vt-stats-card__value">{it.val}</div>
          <p className="vt-stats-card__sub">{it.sub}</p>
        </div>
      ))}
    </div>
  );
}
