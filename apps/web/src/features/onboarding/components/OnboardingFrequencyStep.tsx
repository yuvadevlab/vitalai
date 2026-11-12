"use client";

interface FrequencyProps {
  days: number;
  onSelect: (days: number) => void;
}

export function OnboardingFrequencyStep({ days, onSelect }: FrequencyProps) {
  return (
    <div>
      <h2 className="vt-font-display" style={{ fontSize: "1.875rem", margin: 0 }}>
        TRAINING FREQUENCY
      </h2>
      <div className="vt-frequency-grid">
        {[3, 4, 5, 6].map((d) => (
          <button
            key={d}
            onClick={() => onSelect(d)}
            className={`vt-frequency-btn vt-font-display ${
              days === d ? "vt-frequency-btn--active" : ""
            }`}
          >
            {d} <span className="vt-frequency-btn__sub">DAYS/WK</span>
          </button>
        ))}
      </div>
    </div>
  );
}
