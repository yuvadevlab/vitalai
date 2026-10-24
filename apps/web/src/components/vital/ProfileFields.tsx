"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useVital } from "@/lib/store";

export { GOALS, FOCUS, LEVELS, LEVEL_SUB, EQUIP } from "./profile-constants";

export function OptionCard({
  label,
  sub,
  active,
  onClick,
}: {
  label: string;
  sub?: string | undefined;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left transition ${active ? "border-primary bg-primary/10 glow-volt" : "bg-card hover:border-foreground/20"}`}
    >
      <span>
        <span className="block font-semibold">{label}</span>
        {sub && <span className="tabular text-xs text-muted-foreground">{sub}</span>}
      </span>
      <span
        className={`grid size-6 place-items-center rounded-full border ${active ? "border-primary bg-primary text-primary-foreground" : ""}`}
      >
        {active && <Check className="size-4" />}
      </span>
    </motion.button>
  );
}

const field =
  "tabular w-full rounded-xl border bg-card px-4 py-3 text-foreground outline-none focus:border-primary";

export function BiometricsForm({ onChange }: { onChange?: () => void }) {
  const { profile, setProfile } = useVital();
  const set = (p: Parameters<typeof setProfile>[0]) => {
    setProfile(p);
    onChange?.();
  };
  const num = (k: "age" | "height" | "weight" | "targetWeight") => (
    <input
      type="number"
      className={field}
      value={profile[k]}
      onChange={(e) => set({ [k]: Number(e.target.value) })}
    />
  );
  return (
    <div className="grid grid-cols-2 gap-4">
      <label className="text-sm text-muted-foreground">Age{num("age")}</label>
      <label className="text-sm text-muted-foreground">
        Gender
        <select
          className={field}
          value={profile.gender}
          onChange={(e) => set({ gender: e.target.value })}
        >
          {["Male", "Female", "Other"].map((g) => (
            <option key={g}>{g}</option>
          ))}
        </select>
      </label>
      <label className="text-sm text-muted-foreground">Height (cm){num("height")}</label>
      <label className="text-sm text-muted-foreground">Weight (kg){num("weight")}</label>
      <label className="col-span-2 text-sm text-muted-foreground">
        Target weight (kg){num("targetWeight")}
      </label>
      <div className="col-span-2">
        <p className="mb-2 text-sm text-muted-foreground">Joint / injury considerations</p>
        <div className="flex flex-wrap gap-2">
          {["Lower Back", "Shoulder", "Knees", "None"].map((j) => {
            const on = profile.injuries.includes(j);
            return (
              <motion.button
                key={j}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  if (j === "None") return set({ injuries: ["None"] });
                  const rest = profile.injuries.filter((x) => x !== "None" && x !== j);
                  set({ injuries: on ? (rest.length ? rest : ["None"]) : [...rest, j] });
                }}
                className={`rounded-full border px-4 py-2 text-sm ${on ? "border-primary bg-primary/15 text-primary" : "bg-card"}`}
              >
                {j}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`tabular rounded-xl border py-4 text-lg font-bold transition ${active ? "border-primary bg-primary/15 text-primary glow-volt" : "bg-card text-foreground"}`}
    >
      {children}
    </motion.button>
  );
}
