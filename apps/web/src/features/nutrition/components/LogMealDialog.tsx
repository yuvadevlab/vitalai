"use client";

import React, { useState } from "react";
import { X, Check, Loader2, Utensils } from "lucide-react";
import { z } from "zod";
import { LogMealForm } from "./LogMealForm";
import { NUTRITION_COPY } from "@/lib/ui-copy";

const mealSchema = z.object({
  mealName: z.string().min(3, "Meal name must be at least 3 characters"),
  calories: z.number().min(10, "Calories must be positive"),
  protein: z.number().min(0),
  carbs: z.number().min(0),
  fats: z.number().min(0),
  purineMg: z.number().min(0),
});

export interface LogMealDialogProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onMealLogged: (meal: {
    mealName: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    purineMg: number;
  }) => void;
}

export const LogMealDialog: React.FC<LogMealDialogProps> = ({ isOpen, onClose, onMealLogged }) => {
  const [mealName, setMealName] = useState("");
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fats, setFats] = useState(0);
  const [purineMg, setPurineMg] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = mealSchema.safeParse({ mealName, calories, protein, carbs, fats, purineMg });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setTimeout(() => {
      onMealLogged({ mealName, calories, protein, carbs, fats, purineMg });
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  return (
    <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm duration-200">
      <div className="bg-card border-border/50 w-full max-w-md space-y-4 overflow-hidden rounded-2xl border p-5 shadow-2xl">
        {/* Header */}
        <div className="border-border/30 flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-2">
            <div className="bg-primary/20 text-primary rounded-xl p-1.5">
              <Utensils className="size-4" />
            </div>
            <div>
              <h3 className="text-foreground text-sm font-bold">{NUTRITION_COPY.dialogTitle}</h3>
              <p className="text-muted-foreground text-[11px]">{NUTRITION_COPY.dialogSubtitle}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground hover:bg-surface-2 rounded-lg p-1 transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* 2-File Presentation Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <LogMealForm
            mealName={mealName}
            calories={calories}
            protein={protein}
            carbs={carbs}
            fats={fats}
            purineMg={purineMg}
            onMealNameChange={setMealName}
            onCaloriesChange={setCalories}
            onProteinChange={setProtein}
            onCarbsChange={setCarbs}
            onFatsChange={setFats}
            onPurineChange={setPurineMg}
            errors={errors}
          />

          {/* Footer Actions */}
          <div className="border-border/30 flex items-center justify-end gap-2.5 border-t pt-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="text-muted-foreground hover:text-foreground hover:bg-surface-2 rounded-xl px-3.5 py-1.5 text-xs font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary text-primary-foreground flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold shadow-sm transition-all hover:brightness-110"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-3.5 animate-spin" />
                  <span>Logging...</span>
                </>
              ) : (
                <>
                  <Check className="size-3.5" />
                  <span>Log Meal</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
