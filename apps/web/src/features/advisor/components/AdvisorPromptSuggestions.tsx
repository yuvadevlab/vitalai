"use client";

import { ADVISOR_COPY } from "@/lib/ui-copy";

interface SuggestionsProps {
  onSelect: (prompt: string) => void;
}

export function AdvisorPromptSuggestions({ onSelect }: SuggestionsProps) {
  return (
    <div className="vt-advisor-prompts">
      {ADVISOR_COPY.chips.map((chip) => (
        <button key={chip} onClick={() => onSelect(chip)} className="vt-advisor-prompt-chip">
          {chip}
        </button>
      ))}
    </div>
  );
}
