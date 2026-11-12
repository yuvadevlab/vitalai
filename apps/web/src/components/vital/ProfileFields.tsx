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
      className={`vt-option-card ${active ? "vt-option-card--active vt-glow-volt" : ""}`}
    >
      <span>
        <span className="vt-option-card__label">{label}</span>
        {sub && <span className="vt-tabular vt-option-card__sub">{sub}</span>}
      </span>
      <span className={`vt-option-card__radio ${active ? "vt-option-card__radio--active" : ""}`}>
        {active && <Check className="vt-theme-switch-icon" />}
      </span>
    </motion.button>
  );
}

const fieldClass = "vt-tabular vt-profile-input";

export function BiometricsForm({ onChange }: { onChange?: () => void }) {
  const { profile, setProfile } = useVital();
  const set = (p: Parameters<typeof setProfile>[0]) => {
    setProfile(p);
    onChange?.();
  };
  const num = (k: "age" | "height" | "weight" | "targetWeight") => (
    <input
      type="number"
      className={fieldClass}
      value={profile[k]}
      onChange={(e) => set({ [k]: Number(e.target.value) })}
    />
  );
  return (
    <div className="vt-bio-grid">
      <label className="vt-bio-field">Age{num("age")}</label>
      <label className="vt-bio-field">
        Gender
        <select
          className={fieldClass}
          value={profile.gender}
          onChange={(e) => set({ gender: e.target.value })}
        >
          {["Male", "Female", "Other"].map((g) => (
            <option key={g}>{g}</option>
          ))}
        </select>
      </label>
      <label className="vt-bio-field">Height (cm){num("height")}</label>
      <label className="vt-bio-field">Weight (kg){num("weight")}</label>
      <label className="vt-bio-field vt-bio-field--full">
        Target weight (kg){num("targetWeight")}
      </label>
      <div className="vt-bio-injuries">
        <p className="vt-bio-injuries__label">Joint / injury considerations</p>
        <div className="vt-bio-injuries__list">
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
                className={`vt-profile-chip ${on ? "vt-profile-chip--active" : ""}`}
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
      className={`vt-tabular vt-pill-btn ${active ? "vt-pill-btn--active vt-glow-volt" : ""}`}
    >
      {children}
    </motion.button>
  );
}
