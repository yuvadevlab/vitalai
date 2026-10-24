"use client";

interface FrequencyProps {
  days: number;
  onSelect: (days: number) => void;
}

export function OnboardingFrequencyStep({ days, onSelect }: FrequencyProps) {
  return (
    <div>
      <h2 className="font-display-x text-3xl">TRAINING FREQUENCY</h2>
      <div className="mt-4 grid grid-cols-4 gap-2">
        {[3, 4, 5, 6].map((d) => (
          <button
            key={d}
            onClick={() => onSelect(d)}
            className={`rounded-2xl border p-4 text-center font-display-x text-3xl transition ${
              days === d ? "border-volt bg-volt/15 text-volt" : "border-border bg-card"
            }`}
          >
            {d} <span className="block text-xs font-sans text-muted-foreground">DAYS/WK</span>
          </button>
        ))}
      </div>
    </div>
  );
}
