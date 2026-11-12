"use client";

import { Pill, FOCUS } from "@/components/vital/ProfileFields";

interface OnboardingFocusStepProps {
  selectedFocus: string[];
  onToggleFocus: (focusItem: string) => void;
}

export function OnboardingFocusStep({ selectedFocus, onToggleFocus }: OnboardingFocusStepProps) {
  return (
    <div>
      <h2 className="vt-font-display" style={{ fontSize: "1.875rem", margin: 0 }}>
        TARGET FOCUS AREAS
      </h2>
      <div
        style={{
          marginTop: "1rem",
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: "0.5rem",
        }}
      >
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
