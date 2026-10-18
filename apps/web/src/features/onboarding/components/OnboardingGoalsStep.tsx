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
      <h2 className="font-display-x text-3xl">WHAT IS YOUR PRIMARY MISSION?</h2>
      <div className="mt-4 space-y-2.5">
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
