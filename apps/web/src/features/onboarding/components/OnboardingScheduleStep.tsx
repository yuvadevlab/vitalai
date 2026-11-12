"use client";

import { useVital } from "@/lib/store";
import { Pill } from "@/components/vital/ProfileFields";

export function OnboardingScheduleStep() {
  const { profile, setProfile } = useVital();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div>
        <p
          style={{ marginBottom: "0.5rem", fontSize: "0.875rem", color: "var(--mutedForeground)" }}
        >
          Days per week
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: "0.5rem",
          }}
        >
          {[3, 4, 5, 6].map((d) => (
            <Pill key={d} active={profile.days === d} onClick={() => setProfile({ days: d })}>
              {d}
            </Pill>
          ))}
        </div>
      </div>
      <div>
        <p
          style={{ marginBottom: "0.5rem", fontSize: "0.875rem", color: "var(--mutedForeground)" }}
        >
          Session length
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: "0.5rem",
          }}
        >
          {[30, 45, 60, 75].map((d) => (
            <Pill
              key={d}
              active={profile.sessionLength === d}
              onClick={() => setProfile({ sessionLength: d })}
            >
              {d}m
            </Pill>
          ))}
        </div>
      </div>
    </div>
  );
}
