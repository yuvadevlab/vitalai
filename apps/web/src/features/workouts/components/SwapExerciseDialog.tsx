"use client";

import React, { useState } from "react";
import { X, Check, Loader2, Sparkles } from "lucide-react";
import { z } from "zod";
import { SwapExerciseForm } from "./SwapExerciseForm";
import { WORKOUTS_COPY } from "@/lib/ui-copy";

const swapSchema = z.object({
  substituteName: z.string().min(3, "Substitute exercise must be at least 3 characters"),
  reason: z.string().min(5, "Clinical reason must be at least 5 characters"),
  targetMover: z.string().min(2, "Muscle group is required"),
});

export interface SwapExerciseDialogProps {
  readonly isOpen: boolean;
  readonly currentExerciseName: string;
  readonly onClose: () => void;
  readonly onConfirmSwap: (substituteName: string, reason: string) => void;
}

export const SwapExerciseDialog: React.FC<SwapExerciseDialogProps> = ({
  isOpen,
  currentExerciseName,
  onClose,
  onConfirmSwap,
}) => {
  const [substituteName, setSubstituteName] = useState("");
  const [reason, setReason] = useState("");
  const [targetMover, setTargetMover] = useState("quadriceps");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = swapSchema.safeParse({ substituteName, reason, targetMover });
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
      onConfirmSwap(substituteName, reason);
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
              <Sparkles className="size-4" />
            </div>
            <div>
              <h3 className="text-foreground text-sm font-bold">{WORKOUTS_COPY.dialogTitle}</h3>
              <p className="text-muted-foreground text-[11px]">{WORKOUTS_COPY.dialogSubtitle}</p>
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
          <SwapExerciseForm
            currentExerciseName={currentExerciseName}
            substituteName={substituteName}
            reason={reason}
            targetMover={targetMover}
            onSubstituteChange={setSubstituteName}
            onReasonChange={setReason}
            onTargetMoverChange={setTargetMover}
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
                  <span>Verifying Safety...</span>
                </>
              ) : (
                <>
                  <Check className="size-3.5" />
                  <span>Confirm Substitution</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
