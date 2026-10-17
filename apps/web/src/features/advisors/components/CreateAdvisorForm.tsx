"use client";

import React from "react";

export interface CreateAdvisorFormProps {
  readonly name: string;
  readonly title: string;
  readonly specialty: string;
  readonly tone: string;
  readonly modelSlug: string;
  readonly onNameChange: (val: string) => void;
  readonly onTitleChange: (val: string) => void;
  readonly onSpecialtyChange: (val: string) => void;
  readonly onToneChange: (val: string) => void;
  readonly onModelSlugChange: (val: string) => void;
  readonly errors: Record<string, string>;
}

export const CreateAdvisorForm: React.FC<CreateAdvisorFormProps> = ({
  name,
  title,
  specialty,
  tone,
  modelSlug,
  onNameChange,
  onTitleChange,
  onSpecialtyChange,
  onToneChange,
  onModelSlugChange,
  errors,
}) => {
  return (
    <div className="space-y-4 text-xs">
      <div className="space-y-1.5">
        <label className="text-foreground text-xs font-semibold">Specialist Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="e.g. Dr. Soren Lindqvist"
          className="bg-surface-2 border-border/40 text-foreground placeholder:text-muted-foreground focus:ring-primary w-full rounded-xl border px-3.5 py-2.5 text-xs focus:ring-1 focus:outline-none"
        />
        {errors.name && <p className="mt-0.5 font-mono text-[11px] text-rose-400">{errors.name}</p>}
      </div>

      <div className="space-y-1.5">
        <label className="text-foreground text-xs font-semibold">Clinical Title / Department</label>
        <input
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="e.g. Endocrine & Insulin Sensitivity Specialist"
          className="bg-surface-2 border-border/40 text-foreground placeholder:text-muted-foreground focus:ring-primary w-full rounded-xl border px-3.5 py-2.5 text-xs focus:ring-1 focus:outline-none"
        />
        {errors.title && (
          <p className="mt-0.5 font-mono text-[11px] text-rose-400">{errors.title}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-foreground text-xs font-semibold">Clinical Tone</label>
          <select
            value={tone}
            onChange={(e) => onToneChange(e.target.value)}
            className="bg-surface-2 border-border/40 text-foreground focus:ring-primary w-full rounded-xl border px-3 py-2 text-xs focus:ring-1 focus:outline-none"
          >
            <option value="scientific_analytical">Scientific & Analytical</option>
            <option value="direct_tough_love">Direct & Tough Love</option>
            <option value="empathetic_nurturing">Empathetic & Nurturing</option>
            <option value="stoic_concise">Stoic & Concise</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-foreground text-xs font-semibold">Backbone Model</label>
          <select
            value={modelSlug}
            onChange={(e) => onModelSlugChange(e.target.value)}
            className="bg-surface-2 border-border/40 text-foreground focus:ring-primary w-full rounded-xl border px-3 py-2 font-mono text-xs focus:ring-1 focus:outline-none"
          >
            <option value="qwen3:14b">qwen3:14b (Local Ollama)</option>
            <option value="qwen3:8b">qwen3:8b (Fast Triage)</option>
            <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-foreground text-xs font-semibold">
          Clinical Domain & Core Scope
        </label>
        <textarea
          rows={3}
          value={specialty}
          onChange={(e) => onSpecialtyChange(e.target.value)}
          placeholder="e.g. Continuous glucose monitoring interpretation, reactive hypoglycemia avoidance, and intra-workout carbohydrate timing."
          className="bg-surface-2 border-border/40 text-foreground placeholder:text-muted-foreground focus:ring-primary w-full rounded-xl border px-3.5 py-2.5 text-xs leading-relaxed focus:ring-1 focus:outline-none"
        />
        {errors.specialty && (
          <p className="mt-0.5 font-mono text-[11px] text-rose-400">{errors.specialty}</p>
        )}
      </div>
    </div>
  );
};
