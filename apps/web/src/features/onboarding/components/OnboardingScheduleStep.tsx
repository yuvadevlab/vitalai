"use client";

import { useVital } from "@/lib/store";
import { Pill } from "@/components/vital/ProfileFields";

export function OnboardingScheduleStep() {
  const { profile, setProfile } = useVital();

  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-sm text-muted-foreground">Days per week</p>
        <div className="grid grid-cols-4 gap-2">
          {[3, 4, 5, 6].map((d) => (
            <Pill key={d} active={profile.days === d} onClick={() => setProfile({ days: d })}>
              {d}
            </Pill>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm text-muted-foreground">Session length</p>
        <div className="grid grid-cols-4 gap-2">
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
