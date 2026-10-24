"use client";

import { ADVISOR_COPY } from "@/lib/ui-copy";

interface SuggestionsProps {
  onSelect: (prompt: string) => void;
}

export function AdvisorPromptSuggestions({ onSelect }: SuggestionsProps) {
  return (
    <div className="flex flex-wrap gap-2 pt-2">
      {ADVISOR_COPY.chips.map((chip) => (
        <button
          key={chip}
          onClick={() => onSelect(chip)}
          className="rounded-full border border-border bg-card/60 px-3.5 py-1.5 text-xs text-foreground transition hover:border-volt hover:bg-card"
        >
          {chip}
        </button>
      ))}
    </div>
  );
}
