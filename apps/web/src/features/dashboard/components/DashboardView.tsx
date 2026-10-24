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
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="grid size-12 place-items-center rounded-full bg-gradient-volt font-display-x text-xl text-primary-foreground">
            {profile.name[0]}
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Welcome back,</p>
            <h1 className="font-display-x text-3xl">{profile.name}</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="tabular rounded-full border border-ember/40 bg-ember/10 px-3 py-1.5 text-sm text-ember">
            18 Days 🔥
          </span>
          <Link
            href="/workout/active"
            className="hidden rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground sm:block"
          >
            Start Today's Workout
          </Link>
        </div>
      </header>

      <section className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="glass p-4"
          >
            <s.icon className="size-5 text-primary" />
            <p className="mt-3 text-[11px] uppercase tracking-widest text-muted-foreground">
              {s.label}
            </p>
            <p className="tabular mt-1 text-xl font-bold md:text-2xl">{s.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{s.sub}</p>
          </motion.div>
        ))}
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="glass relative overflow-hidden p-5 md:p-6">
          <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-primary/10 blur-3xl" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
            Today's Session
          </p>
          <h2 className="font-display-x mt-2 text-3xl md:text-4xl">{session.title}</h2>
          <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Clock className="size-4" />
              {session.duration} mins
            </span>
            <span className="flex items-center gap-1.5">
              <Dumbbell className="size-4" />
              {session.exercises.length} Movements
            </span>
            <span className="flex items-center gap-1.5">
              <Activity className="size-4" />
              Target: {session.rir} RIR
            </span>
          </div>
          <ol className="mt-5 space-y-2">
            {session.exercises.map((e, i) => (
              <li
                key={e.name}
                className="flex items-center gap-3 rounded-xl bg-secondary/60 px-3 py-2.5"
              >
                <span className="tabular grid size-7 place-items-center rounded-lg bg-background text-xs text-primary">
                  {i + 1}
                </span>
                <span className="flex-1 text-sm font-medium">{e.name}</span>
                <span className="tabular text-xs text-muted-foreground">
                  {e.sets}×{e.reps} @ {e.load}
                </span>
              </li>
            ))}
          </ol>
          <motion.div whileTap={{ scale: 0.97 }} className="mt-6">
            <Link
              href="/workout/active"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-volt py-4 font-display-x text-xl text-primary-foreground glow-volt"
            >
              <Play className="size-5" fill="currentColor" /> Launch Workout HUD
            </Link>
          </motion.div>
        </div>
        <MuscleMap />
      </section>
    </AppShell>
  );
}
