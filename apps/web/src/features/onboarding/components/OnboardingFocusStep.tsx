"use client";

import { Pill, FOCUS } from "@/components/vital/ProfileFields";

interface OnboardingFocusStepProps {
  selectedFocus: string[];
  onToggleFocus: (focusItem: string) => void;
}

export function OnboardingFocusStep({ selectedFocus, onToggleFocus }: OnboardingFocusStepProps) {
  return (
    <div>
      <h2 className="font-display-x text-3xl">TARGET FOCUS AREAS</h2>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {FOCUS.map((f) => {
          const on = selectedFocus.includes(f);
          return (
            <Pill key={f} active={on} onClick={() => onToggleFocus(f)}>
              {f}
            </Pill>
          );
        })}
      </div>
    </div>
  );
}
