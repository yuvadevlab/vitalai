"use client";

import React, { useRef } from "react";
import { toast } from "@vitalai/ui";
import { AppShell } from "@/components/vital/AppShell";
import { ThemeSwitch } from "@/components/vital/ThemeSwitch";
import {
  BiometricsForm,
  EQUIP,
  FOCUS,
  GOALS,
  LEVELS,
  Pill,
} from "@/components/vital/ProfileFields";
import { generateSession } from "@/lib/plan";
import { useVital } from "@/lib/store";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="vt-glass vt-profile-section">
      <p className="vt-profile-section__title">{title}</p>
      {children}
    </div>
  );
}

interface ChipsProps<T extends string> {
  items: T[];
  value: (v: T) => boolean;
  onPick: (v: T) => void;
}

function Chips<T extends string>({ items, value, onPick }: ChipsProps<T>) {
  return (
    <div className="vt-profile-chips">
      {items.map((i) => (
        <button
          key={i}
          onClick={() => onPick(i)}
          className={`vt-profile-chip ${value(i) ? "vt-profile-chip--active" : ""}`}
        >
          {i}
        </button>
      ))}
    </div>
  );
}

export function ProfileView() {
  const { profile, setProfile } = useVital();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const recal = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(
      () => toast.success("Plan recalibrated by VitalAI based on updated equipment & schedule!"),
      400,
    );
  };

  const update = (p: Parameters<typeof setProfile>[0]) => {
    setProfile(p);
    recal();
  };

  const session = generateSession(profile);
  const delta = profile.targetWeight - profile.weight;

  return (
    <AppShell
      insight={`Target weight delta is ${delta > 0 ? "+" : ""}${delta}kg. Macro targets and volume are calibrated for a lean ${delta >= 0 ? "300 kcal surplus" : "400 kcal deficit"}.`}
    >
      <h1 className="vt-font-display vt-profile-title">Profile</h1>
      <div className="vt-profile-grid">
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <Section title="Name">
            <input
              className="vt-profile-input"
              value={profile.name}
              onChange={(e) => setProfile({ name: e.target.value })}
            />
          </Section>

          <Section title="Primary goal">
            <Chips
              items={GOALS}
              value={(g) => profile.goal === g}
              onPick={(g) => update({ goal: g })}
            />
          </Section>

          <Section title="Focus areas">
            <Chips
              items={FOCUS}
              value={(f) => profile.focus.includes(f)}
              onPick={(f) =>
                update({
                  focus: profile.focus.includes(f)
                    ? profile.focus.filter((x) => x !== f)
                    : [...profile.focus, f],
                })
              }
            />
          </Section>

          <Section title="Fitness level">
            <Chips
              items={LEVELS}
              value={(l) => profile.level === l}
              onPick={(l) => update({ level: l })}
            />
          </Section>

          <Section title="Equipment">
            <Chips
              items={EQUIP}
              value={(e) => profile.equipment === e}
              onPick={(e) => update({ equipment: e })}
            />
          </Section>

          <Section title="Schedule">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                gap: "0.5rem",
              }}
            >
              {[3, 4, 5, 6].map((d) => (
                <Pill key={d} active={profile.days === d} onClick={() => update({ days: d })}>
                  {d}d
                </Pill>
              ))}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                gap: "0.5rem",
                marginTop: "0.5rem",
              }}
            >
              {[30, 45, 60, 75].map((d) => (
                <Pill
                  key={d}
                  active={profile.sessionLength === d}
                  onClick={() => update({ sessionLength: d })}
                >
                  {d}m
                </Pill>
              ))}
            </div>
          </Section>

          <Section title="Biometrics">
            <BiometricsForm onChange={recal} />
          </Section>

          <Section title="Interface theme">
            <ThemeSwitch variant="segmented" style={{ maxWidth: "28rem" }} />
          </Section>
        </div>

        <div className="vt-glass vt-live-plan">
          <p className="vt-live-plan__badge">Live plan</p>
          <h3 className="vt-font-display vt-live-plan__title">{session.title}</h3>
          <p className="vt-tabular vt-live-plan__meta">
            {session.split} • {profile.days}×/wk • {session.duration} min
          </p>
          <ul className="vt-live-plan__list">
            {session.exercises.map((e) => (
              <li key={e.name} className="vt-live-plan__item">
                <span>{e.name}</span>
                <span className="vt-tabular" style={{ color: "var(--mutedForeground)" }}>
                  {e.sets}×{e.reps}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AppShell>
  );
}
