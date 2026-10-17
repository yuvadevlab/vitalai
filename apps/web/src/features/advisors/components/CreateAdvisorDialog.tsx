"use client";

import React, { useState } from "react";
import { X, Check, Loader2, Bot } from "lucide-react";
import { z } from "zod";
import { CreateAdvisorForm } from "./CreateAdvisorForm";
import { ADVISORS_COPY } from "@/lib/ui-copy";

const advisorSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  title: z.string().min(5, "Title must be at least 5 characters"),
  specialty: z.string().min(10, "Specialty must be at least 10 characters"),
  tone: z.string().min(2),
  modelSlug: z.string().min(2),
});

export interface CreateAdvisorDialogProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onAdvisorCreated: (record: {
    name: string;
    title: string;
    specialty: string;
    tone: string;
    modelSlug: string;
  }) => void;
}

export const CreateAdvisorDialog: React.FC<CreateAdvisorDialogProps> = ({
  isOpen,
  onClose,
  onAdvisorCreated,
}) => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [tone, setTone] = useState("scientific_analytical");
  const [modelSlug, setModelSlug] = useState("qwen3:14b");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = advisorSchema.safeParse({ name, title, specialty, tone, modelSlug });
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
      onAdvisorCreated({ name, title, specialty, tone, modelSlug });
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
              <Bot className="size-4" />
            </div>
            <div>
              <h3 className="text-foreground text-sm font-bold">{ADVISORS_COPY.dialogTitle}</h3>
              <p className="text-muted-foreground text-[11px]">{ADVISORS_COPY.dialogSubtitle}</p>
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
          <CreateAdvisorForm
            name={name}
            title={title}
            specialty={specialty}
            tone={tone}
            modelSlug={modelSlug}
            onNameChange={setName}
            onTitleChange={setTitle}
            onSpecialtyChange={setSpecialty}
            onToneChange={setTone}
            onModelSlugChange={setModelSlug}
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
                  <span>Synthesizing Persona...</span>
                </>
              ) : (
                <>
                  <Check className="size-3.5" />
                  <span>Deploy Advisor</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
