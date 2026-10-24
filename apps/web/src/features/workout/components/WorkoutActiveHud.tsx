"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Repeat } from "lucide-react";
import { InsightWidget } from "@/components/vital/InsightWidget";
import { generateSession, type Exercise } from "@/lib/plan";
import { useVital } from "@/lib/store";
import { WorkoutRestTimer } from "./WorkoutRestTimer";
import { WorkoutSummaryModal } from "./WorkoutSummaryModal";
import { WorkoutExerciseSwapper } from "./WorkoutExerciseSwapper";
import { WorkoutSetsTable } from "./WorkoutSetsTable";
import { WorkoutActiveHeader } from "./WorkoutActiveHeader";

export function WorkoutActiveHud() {
  const exsInit = generateSession(useVital.getState().profile).exercises;
  const [exs, setExs] = useState<Exercise[]>(exsInit);
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [rest, setRest] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [swap, setSwap] = useState(false);
  const [summary, setSummary] = useState(false);
  const addHistory = useVital((s) => s.addHistory);

  const ex = exs[idx]!;
  const totalSets = Object.values(done).filter(Boolean).length;
  const volume = exs.reduce((acc, e, i) => {
    const sets = Array.from({ length: e.sets }).filter((_, s) => done[`${i}-${s}`]).length;
    return acc + sets * (parseInt(e.reps) || 8) * (e.loadKg || 50);
  }, 0);

  useEffect(() => {
    if (rest === null || paused) return;
    const t = setInterval(() => {
      setRest((r) => {
        if (r === null || r <= 1) return null;
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [rest, paused]);

  const toggle = (s: number) => {
    const k = `${idx}-${s}`;
    const next = !done[k];
    setDone({ ...done, [k]: next });
    if (next) {
      setRest(90);
      setPaused(false);
      if (typeof navigator !== "undefined" && "vibrate" in navigator) {
        navigator.vibrate(40);
      }
    }
  };

  const move = (d: number) => {
    setDir(d);
    setIdx((i) => Math.max(0, Math.min(exs.length - 1, i + d)));
  };

  const finish = () => {
    addHistory({
      date: new Date().toISOString().slice(0, 10),
      title: "Custom Session",
      volume: Math.round(volume),
      sets: totalSets,
      prs: totalSets > 10 ? 1 : 0,
    });
    setSummary(true);
  };

  return (
    <div className="mx-auto min-h-screen max-w-2xl px-4 py-5 pb-36">
      <WorkoutActiveHeader
        currentIndex={idx}
        totalExercises={exs.length}
        totalSets={totalSets}
        onFinish={finish}
      />

      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={idx + ex.name}
          initial={{ x: 35 * dir, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -35 * dir, opacity: 0 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6"
        >
          <div className="glass relative overflow-hidden p-5">
            <motion.div
              className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-primary/20 blur-3xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2.4, repeat: Infinity }}
            />
            <h1 className="font-display-x relative text-4xl md:text-5xl">{ex.name}</h1>
            <div className="relative mt-3 flex flex-wrap gap-2">
              {ex.cues.map((c) => (
                <span key={c} className="rounded-full bg-secondary px-3 py-1 text-xs">
                  {c}
                </span>
              ))}
            </div>
            <button
              onClick={() => setSwap(true)}
              className="relative mt-4 flex items-center gap-2 text-sm font-semibold text-cyan"
            >
              <Repeat className="size-4" /> Swap exercise
            </button>
          </div>

          <WorkoutSetsTable
            exerciseIndex={idx}
            exercise={ex}
            completedSets={done}
            onToggleSet={toggle}
          />
        </motion.div>
      </AnimatePresence>

      <div className="mt-4 flex gap-3">
        <button
          disabled={idx === 0}
          onClick={() => move(-1)}
          className="flex flex-1 items-center justify-center gap-1 rounded-xl border py-3 text-sm disabled:opacity-30"
        >
          <ChevronLeft className="size-4" />
          Prev
        </button>
        <button
          disabled={idx === exs.length - 1}
          onClick={() => move(1)}
          className="flex flex-1 items-center justify-center gap-1 rounded-xl border py-3 text-sm disabled:opacity-30"
        >
          Next
          <ChevronRight className="size-4" />
        </button>
      </div>

      <div className="mt-6">
        <InsightWidget text="Rest interval optimized: 90 seconds recommended for full ATP replenishment before set 2." />
      </div>

      <AnimatePresence>
        {rest !== null && (
          <WorkoutRestTimer
            rest={rest}
            paused={paused}
            onTogglePause={() => setPaused(!paused)}
            onAdd30s={() => setRest(rest + 30)}
            onSkip={() => setRest(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {swap && (
          <WorkoutExerciseSwapper
            exerciseName={ex.name}
            alternatives={ex.alternatives}
            onSelectAlternative={(a) => {
              setExs(
                exs.map((e, i) =>
                  i === idx
                    ? {
                        ...e,
                        name: a,
                        alternatives: [ex.name, ...e.alternatives.filter((x) => x !== a)],
                      }
                    : e,
                ),
              );
              setSwap(false);
            }}
            onClose={() => setSwap(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {summary && <WorkoutSummaryModal volume={volume} totalSets={totalSets} />}
      </AnimatePresence>
    </div>
  );
}
