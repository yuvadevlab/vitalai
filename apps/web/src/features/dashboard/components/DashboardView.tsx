"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Activity, Brain, Clock, Dumbbell, Flame, Layers, Play, TrendingUp } from "lucide-react";
import { useEffect, useSyncExternalStore } from "react";
import { AppShell } from "@/components/vital/AppShell";
import { MuscleMap } from "@/components/vital/MuscleMap";
import { generateSession } from "@/lib/plan";
import { useVital } from "@/lib/store";

const subscribe = () => () => {};

export function DashboardView() {
  const { onboarded, profile } = useVital();
  const router = useRouter();
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  useEffect(() => {
    if (mounted && !onboarded) {
      router.push("/onboarding");
    }
  }, [mounted, onboarded, router]);

  const session = generateSession(profile);
  if (!mounted || !onboarded) return null;

  const stats = [
    { icon: Flame, label: "Active Streak", value: "18 Days", sub: "94% consistency" },
    {
      icon: TrendingUp,
      label: "Weekly Volume",
      value: "14,280 kg",
      sub: "+4.2% progressive overload",
    },
    { icon: Brain, label: "Readiness", value: "92%", sub: "Optimal • Tension primed" },
    {
      icon: Layers,
      label: "Mesocycle",
      value: "Wk 3 / 6",
      sub: `Overload • Target: ${session.rir} RIR`,
    },
  ];

  return (
    <AppShell insight="Readiness is at 92%. In today's session, increase load on Incline Bench to 85kg. Maintain a 3-second eccentric on Set 1.">
      <header className="vt-dashboard-header">
        <div className="vt-dashboard-user">
          <div className="vt-dashboard-avatar vt-gradient-volt vt-font-display">
            {profile.name[0]}
          </div>
          <div className="vt-dashboard-user-meta">
            <p className="vt-dashboard-welcome">Welcome back,</p>
            <h1 className="vt-font-display vt-dashboard-name">{profile.name}</h1>
          </div>
        </div>
        <div className="vt-dashboard-actions">
          <span className="vt-tabular vt-dashboard-streak">18 Days 🔥</span>
          <Link href="/workout/active" className="vt-dashboard-start-btn">
            Start Today's Workout
          </Link>
        </div>
      </header>

      <section className="vt-stats-grid">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="vt-glass vt-stats-card"
          >
            <div className="vt-stats-card__top">
              <span className="vt-stats-card__label">{s.label}</span>
              <s.icon className="vt-stats-card__icon vt-stats-card__icon--volt" />
            </div>
            <p className="vt-tabular vt-stats-card__value">{s.value}</p>
            <p className="vt-stats-card__sub">{s.sub}</p>
          </motion.div>
        ))}
      </section>

      <section className="vt-dashboard-split">
        <div className="vt-glass vt-session-card">
          <div className="vt-session-card__glow" />
          <p className="vt-session-card__subtitle">Today's Session</p>
          <h2 className="vt-font-display vt-session-card__title">{session.title}</h2>
          <div className="vt-session-card__meta">
            <span className="vt-session-card__meta-item">
              <Clock className="vt-session-card__meta-icon" />
              {session.duration} mins
            </span>
            <span className="vt-session-card__meta-item">
              <Dumbbell className="vt-session-card__meta-icon" />
              {session.exercises.length} Movements
            </span>
            <span className="vt-session-card__meta-item">
              <Activity className="vt-session-card__meta-icon" />
              Target: {session.rir} RIR
            </span>
          </div>
          <ol className="vt-session-card__list">
            {session.exercises.map((e, i) => (
              <li key={e.name} className="vt-session-card__list-item">
                <span className="vt-tabular vt-session-card__list-num">{i + 1}</span>
                <span className="vt-session-card__list-name">{e.name}</span>
                <span className="vt-tabular vt-session-card__list-sets">
                  {e.sets}×{e.reps} @ {e.load}
                </span>
              </li>
            ))}
          </ol>
          <motion.div whileTap={{ scale: 0.97 }} style={{ marginTop: "1.5rem" }}>
            <Link
              href="/workout/active"
              className="vt-session-card__launch-btn vt-gradient-volt vt-glow-volt"
            >
              <Play style={{ width: "1.25rem", height: "1.25rem" }} fill="currentColor" /> Launch
              Workout HUD
            </Link>
          </motion.div>
        </div>
        <MuscleMap />
      </section>
    </AppShell>
  );
}
