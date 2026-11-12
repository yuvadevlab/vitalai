"use client";

import { OptionCard, GOALS } from "@/components/vital/ProfileFields";
import type { Goal } from "@/lib/store";

interface OnboardingGoalsStepProps {
  selectedGoal: Goal;
  onSelectGoal: (goal: Goal) => void;
}

export function OnboardingGoalsStep({ selectedGoal, onSelectGoal }: OnboardingGoalsStepProps) {
  return (
    <div>
      <h2 className="vt-font-display" style={{ fontSize: "1.875rem", margin: 0 }}>
        WHAT IS YOUR PRIMARY MISSION?
      </h2>
      <div className="vt-onboarding__list" style={{ marginTop: "1rem" }}>
        {GOALS.map((g) => (
          <OptionCard
            key={g}
            active={selectedGoal === g}
            label={g}
            onClick={() => onSelectGoal(g as Goal)}
          />
        ))}
      </div>
    </div>
  );
}
