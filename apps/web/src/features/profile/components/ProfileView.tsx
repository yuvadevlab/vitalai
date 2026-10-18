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
    <div className="glass p-5">
      <p className="text-muted-foreground mb-3 text-xs font-semibold tracking-widest uppercase">
        {title}
      </p>
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
    <div className="flex flex-wrap gap-2">
      {items.map((i) => (
        <button
          key={i}
          onClick={() => onPick(i)}
          className={`rounded-full border px-4 py-2 text-sm transition ${
            value(i) ? "border-primary bg-primary/15 text-primary" : "bg-card"
          }`}
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
      <h1 className="font-display-x text-5xl">Profile</h1>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="space-y-5">
          <Section title="Name">
            <input
              className="bg-card focus:border-primary w-full rounded-xl border px-4 py-3 outline-none"
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
            <div className="grid grid-cols-4 gap-2">
              {[3, 4, 5, 6].map((d) => (
                <Pill key={d} active={profile.days === d} onClick={() => update({ days: d })}>
                  {d}d
                </Pill>
              ))}
            </div>
            <div className="mt-2 grid grid-cols-4 gap-2">
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
            <ThemeSwitch variant="segmented" className="max-w-md" />
          </Section>
        </div>

        <div className="glass h-fit p-5 lg:sticky lg:top-8">
          <p className="text-primary text-[11px] font-semibold tracking-[0.2em] uppercase">
            Live plan
          </p>
          <h3 className="font-display-x mt-2 text-2xl">{session.title}</h3>
          <p className="tabular text-muted-foreground mt-1 text-xs">
            {session.split} • {profile.days}×/wk • {session.duration} min
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {session.exercises.map((e) => (
              <li
                key={e.name}
                className="bg-secondary/60 flex justify-between gap-2 rounded-lg px-3 py-2"
              >
                <span>{e.name}</span>
                <span className="tabular text-muted-foreground">
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
