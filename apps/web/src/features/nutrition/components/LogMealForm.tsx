"use client";

import React from "react";

export interface LogMealFormProps {
  readonly mealName: string;
  readonly calories: number;
  readonly protein: number;
  readonly carbs: number;
  readonly fats: number;
  readonly purineMg: number;
  readonly onMealNameChange: (val: string) => void;
  readonly onCaloriesChange: (val: number) => void;
  readonly onProteinChange: (val: number) => void;
  readonly onCarbsChange: (val: number) => void;
  readonly onFatsChange: (val: number) => void;
  readonly onPurineChange: (val: number) => void;
  readonly errors: Record<string, string>;
}

export const LogMealForm: React.FC<LogMealFormProps> = ({
  mealName,
  calories,
  protein,
  carbs,
  fats,
  purineMg,
  onMealNameChange,
  onCaloriesChange,
  onProteinChange,
  onCarbsChange,
  onFatsChange,
  onPurineChange,
  errors,
}) => {
  return (
    <div className="space-y-4 text-xs">
      <div className="space-y-1.5">
        <label className="text-foreground text-xs font-semibold">Meal or Recipe Name</label>
        <input
          type="text"
          value={mealName}
          onChange={(e) => onMealNameChange(e.target.value)}
          placeholder="e.g. Greek Yogurt with Chia Seeds & Honey"
          className="bg-surface-2 border-border/40 text-foreground placeholder:text-muted-foreground focus:ring-primary w-full rounded-xl border px-3.5 py-2.5 text-xs focus:ring-1 focus:outline-none"
        />
        {errors.mealName && (
          <p className="mt-0.5 font-mono text-[11px] text-rose-400">{errors.mealName}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-muted-foreground text-xs font-medium">Calories (kcal)</label>
          <input
            type="number"
            value={calories || ""}
            onChange={(e) => onCaloriesChange(Number(e.target.value))}
            placeholder="450"
            className="bg-surface-2 border-border/40 text-foreground focus:ring-primary w-full rounded-xl border px-3 py-2 font-mono text-xs focus:ring-1 focus:outline-none"
          />
        </div>

        <div className="space-y-1">
          <label className="text-muted-foreground text-xs font-medium">Protein (g)</label>
          <input
            type="number"
            value={protein || ""}
            onChange={(e) => onProteinChange(Number(e.target.value))}
            placeholder="35"
            className="bg-surface-2 border-border/40 text-foreground focus:ring-primary w-full rounded-xl border px-3 py-2 font-mono text-xs focus:ring-1 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1">
          <label className="text-muted-foreground text-xs font-medium">Carbs (g)</label>
          <input
            type="number"
            value={carbs || ""}
            onChange={(e) => onCarbsChange(Number(e.target.value))}
            placeholder="45"
            className="bg-surface-2 border-border/40 text-foreground focus:ring-primary w-full rounded-xl border px-3 py-2 font-mono text-xs focus:ring-1 focus:outline-none"
          />
        </div>

        <div className="space-y-1">
          <label className="text-muted-foreground text-xs font-medium">Fats (g)</label>
          <input
            type="number"
            value={fats || ""}
            onChange={(e) => onFatsChange(Number(e.target.value))}
            placeholder="12"
            className="bg-surface-2 border-border/40 text-foreground focus:ring-primary w-full rounded-xl border px-3 py-2 font-mono text-xs focus:ring-1 focus:outline-none"
          />
        </div>

        <div className="space-y-1">
          <label className="text-muted-foreground text-xs font-medium">Purines (mg)</label>
          <input
            type="number"
            value={purineMg || ""}
            onChange={(e) => onPurineChange(Number(e.target.value))}
            placeholder="25"
            className="bg-surface-2 border-border/40 text-foreground focus:ring-primary w-full rounded-xl border px-3 py-2 font-mono text-xs focus:ring-1 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};
