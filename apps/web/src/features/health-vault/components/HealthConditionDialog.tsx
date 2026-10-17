"use client";

import React, { useState } from "react";
import { X, Check, Loader2, ShieldPlus } from "lucide-react";
import { z } from "zod";
import { HealthConditionForm } from "./HealthConditionForm";
import { HEALTH_VAULT_COPY } from "@/lib/ui-copy";

const conditionSchema = z.object({
  name: z.string().min(3, "Condition name must be at least 3 characters"),
  category: z.enum(["orthopedic", "metabolic", "gestational", "cardiovascular"]),
  severity: z.enum(["mild", "moderate", "severe"]),
  clinicalGuidance: z.string().min(5, "Clinical guidance must be at least 5 characters"),
});

export interface HealthConditionDialogProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onConditionAdded: (record: {
    name: string;
    category: "orthopedic" | "metabolic" | "gestational" | "cardiovascular";
    severity: "mild" | "moderate" | "severe";
    clinicalGuidance: string;
  }) => void;
}

export const HealthConditionDialog: React.FC<HealthConditionDialogProps> = ({
  isOpen,
  onClose,
  onConditionAdded,
}) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<
    "orthopedic" | "metabolic" | "gestational" | "cardiovascular"
  >("orthopedic");
  const [severity, setSeverity] = useState<"mild" | "moderate" | "severe">("moderate");
  const [clinicalGuidance, setClinicalGuidance] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = conditionSchema.safeParse({ name, category, severity, clinicalGuidance });
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
      onConditionAdded({ name, category, severity, clinicalGuidance });
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
              <ShieldPlus className="size-4" />
            </div>
            <div>
              <h3 className="text-foreground text-sm font-bold">{HEALTH_VAULT_COPY.dialogTitle}</h3>
              <p className="text-muted-foreground text-[11px]">
                {HEALTH_VAULT_COPY.dialogSubtitle}
              </p>
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
          <HealthConditionForm
            name={name}
            category={category}
            severity={severity}
            clinicalGuidance={clinicalGuidance}
            onNameChange={setName}
            onCategoryChange={(val) =>
              setCategory(val as "orthopedic" | "metabolic" | "gestational" | "cardiovascular")
            }
            onSeverityChange={(val) => setSeverity(val as "mild" | "moderate" | "severe")}
            onClinicalGuidanceChange={setClinicalGuidance}
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
                  <span>Enforcing Guardrails...</span>
                </>
              ) : (
                <>
                  <Check className="size-3.5" />
                  <span>Save Health Memory</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
