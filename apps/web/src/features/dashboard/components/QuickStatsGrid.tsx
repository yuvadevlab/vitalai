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
      color: "text-volt",
    },
    {
      label: "ACTIVE STREAK",
      val: stats ? stats.streakWeeks + " WEEKS" : "6 WEEKS",
      sub: "100% Adherence",
      icon: Flame,
      color: "text-ember",
    },
    {
      label: "WEEKLY VOLUME",
      val: stats ? (stats.weeklyVolumeTotal / 1000).toFixed(1) + "t" : "22.6t",
      sub: "+4.2% Progressive",
      icon: Zap,
      color: "text-cyan",
    },
    {
      label: "ALL-TIME PRS",
      val: stats ? stats.personalRecords.length : 4,
      sub: "Last on Incline Bench",
      icon: Trophy,
      color: "text-amber-400",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {items.map((it) => (
        <div key={it.label} className="glass p-4 transition-all hover:border-volt/40">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              {it.label}
            </span>
            <it.icon className={"size-4 " + it.color} />
          </div>
          <div className="font-display-x mt-2 text-2xl md:text-3xl">{it.val}</div>
          <p className="mt-1 text-xs text-muted-foreground">{it.sub}</p>
        </div>
      ))}
    </div>
  );
}
