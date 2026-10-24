"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Level = "primary" | "secondary" | "rest";
const fill: Record<Level, string> = {
  primary: "var(--volt)",
  secondary: "var(--cyan)",
  rest: "var(--slate-muscle)",
};

const front: { id: string; label: string; level: Level; d: string }[] = [
  {
    id: "delt-l",
    label: "Front Delts",
    level: "primary",
    d: "M58 62 q-14 4 -16 22 l14 4 q4 -16 12 -22z",
  },
  {
    id: "delt-r",
    label: "Front Delts",
    level: "primary",
    d: "M122 62 q14 4 16 22 l-14 4 q-4 -16 -12 -22z",
  },
  {
    id: "pec-l",
    label: "Upper Chest",
    level: "primary",
    d: "M70 64 h19 v30 q-14 4 -26 -4 q0 -18 7 -26z",
  },
  {
    id: "pec-r",
    label: "Upper Chest",
    level: "primary",
    d: "M110 64 h-19 v30 q14 4 26 -4 q0 -18 -7 -26z",
  },
  { id: "bi-l", label: "Biceps", level: "rest", d: "M42 90 l14 4 l-4 30 l-14 -4z" },
  { id: "bi-r", label: "Biceps", level: "rest", d: "M138 90 l-14 4 l4 30 l14 -4z" },
  { id: "fore-l", label: "Forearms", level: "rest", d: "M38 124 l14 4 l-6 34 l-12 -2z" },
  { id: "fore-r", label: "Forearms", level: "rest", d: "M142 124 l-14 4 l6 34 l12 -2z" },
  { id: "abs", label: "Core", level: "secondary", d: "M76 100 h28 v52 q-14 8 -28 0z" },
  { id: "quad-l", label: "Quads", level: "rest", d: "M68 160 h20 l-2 64 h-16z" },
  { id: "quad-r", label: "Quads", level: "rest", d: "M112 160 h-20 l2 64 h16z" },
  { id: "calf-l", label: "Calves", level: "rest", d: "M70 230 h14 l-2 44 h-10z" },
  { id: "calf-r", label: "Calves", level: "rest", d: "M110 230 h-14 l2 44 h10z" },
];

const back: typeof front = [
  { id: "trap", label: "Traps", level: "rest", d: "M72 50 h36 l8 14 h-52z" },
  {
    id: "rdelt-l",
    label: "Rear Delts",
    level: "secondary",
    d: "M58 62 q-14 4 -16 22 l14 4 q4 -16 12 -22z",
  },
  {
    id: "rdelt-r",
    label: "Rear Delts",
    level: "secondary",
    d: "M122 62 q14 4 16 22 l-14 4 q-4 -16 -12 -22z",
  },
  { id: "lat-l", label: "Lats", level: "rest", d: "M66 66 h22 v50 q-14 -4 -20 -20z" },
  { id: "lat-r", label: "Lats", level: "rest", d: "M114 66 h-22 v50 q14 -4 20 -20z" },
  { id: "tri-l", label: "Triceps", level: "primary", d: "M42 90 l14 4 l-4 30 l-14 -4z" },
  { id: "tri-r", label: "Triceps", level: "primary", d: "M138 90 l-14 4 l4 30 l14 -4z" },
  { id: "low", label: "Lower Back", level: "secondary", d: "M78 118 h24 v30 h-24z" },
  { id: "glute", label: "Glutes", level: "rest", d: "M68 150 h44 v20 q-22 8 -44 0z" },
  { id: "ham-l", label: "Hamstrings", level: "rest", d: "M68 174 h20 l-2 50 h-16z" },
  { id: "ham-r", label: "Hamstrings", level: "rest", d: "M112 174 h-20 l2 50 h16z" },
  { id: "calf-l", label: "Calves", level: "rest", d: "M70 230 h14 l-2 44 h-10z" },
  { id: "calf-r", label: "Calves", level: "rest", d: "M110 230 h-14 l2 44 h10z" },
];

export function MuscleMap() {
  const [view, setView] = useState<"front" | "back">("front");
  const [hover, setHover] = useState<string | null>(null);
  const parts = view === "front" ? front : back;
  return (
    <div className="glass p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-display-x text-xl">Muscle Recruitment</h3>
        <div className="flex rounded-full bg-secondary p-1 text-xs">
          {(["front", "back"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`relative rounded-full px-3 py-1 font-semibold ${view === v ? "text-primary-foreground" : "text-muted-foreground"}`}
            >
              {view === v && (
                <motion.span
                  layoutId="mmpill"
                  className="absolute inset-0 rounded-full bg-primary"
                />
              )}
              <span className="relative">{v === "front" ? "Anterior" : "Posterior"}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center gap-4">
        <motion.svg
          key={view}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          viewBox="0 0 180 290"
          className="h-72 w-auto shrink-0"
        >
          <circle cx="90" cy="30" r="16" fill="var(--slate-muscle)" />
          <rect x="83" y="44" width="14" height="10" fill="var(--slate-muscle)" />
          {parts.map((p) => (
            <path
              key={p.id}
              d={p.d}
              fill={fill[p.level]}
              stroke="var(--background)"
              strokeWidth="1.5"
              onMouseEnter={() => setHover(p.label)}
              onMouseLeave={() => setHover(null)}
              style={{
                filter: p.level === "primary" ? "drop-shadow(0 0 6px var(--volt))" : undefined,
                opacity: hover && hover !== p.label ? 0.45 : 1,
                transition: "opacity .2s",
                cursor: "pointer",
              }}
            />
          ))}
        </motion.svg>
        <div className="space-y-3 text-sm">
          <p className="tabular text-xs text-muted-foreground">{hover ?? "Hover a muscle"}</p>
          <Legend color="bg-volt" label="Primary movers" />
          <Legend color="bg-cyan" label="Stabilizers" />
          <Legend color="bg-slate-muscle" label="Rested" />
        </div>
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`size-3 rounded-full ${color}`} />
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}
