"use client";

import React from "react";
import { Check, Wrench, ArrowRight } from "lucide-react";

export interface AdvisorPersonaCardProps {
  readonly id: string;
  readonly name: string;
  readonly title: string;
  readonly avatar?: string | null;
  readonly tone: string;
  readonly modelSlug?: string;
  readonly toolCount?: number;
  readonly isSelected?: boolean;
  readonly isDefault?: boolean;
  readonly onSelect?: () => void;
  readonly className?: string;
}

export const AdvisorPersonaCard: React.FC<AdvisorPersonaCardProps> = ({
  name,
  title,
  avatar,
  tone,
  modelSlug = "qwen3:14b",
  toolCount = 4,
  isSelected = false,
  isDefault = false,
  onSelect,
  className = "",
}) => {
  const formatTone = (t: string) => t.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div
      onClick={onSelect}
      className={`relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border p-5 transition-all ${
        isSelected
          ? "bg-primary/10 border-primary ring-primary/40 shadow-primary/10 shadow-lg ring-2"
          : "bg-card/60 border-border/40 hover:border-primary/40 hover:bg-card/80 backdrop-blur-md"
      } ${className}`}
    >
      {isDefault && (
        <div className="absolute top-3 right-3 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-cyan-400">
          Default Specialist
        </div>
      )}

      <div>
        <div className="mb-3 flex items-center gap-3">
          <div className="from-primary/30 text-primary flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-linear-to-tr to-violet-500/30 font-mono text-xl font-bold shadow-inner">
            {avatar ? (
              <img src={avatar} alt={name} className="size-full rounded-2xl object-cover" />
            ) : (
              name.slice(0, 2).toUpperCase()
            )}
          </div>
          <div>
            <h4 className="text-foreground text-base font-bold tracking-tight">{name}</h4>
            <p className="text-muted-foreground line-clamp-1 text-xs">{title}</p>
          </div>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <span className="bg-surface-2 border-border/30 text-foreground rounded-md border px-2 py-0.5 font-mono text-[10px] font-medium">
            {formatTone(tone)}
          </span>
          <span className="bg-surface-2 border-border/30 text-muted-foreground rounded-md border px-2 py-0.5 font-mono text-[10px]">
            {modelSlug}
          </span>
          <span className="bg-surface-2 border-border/30 text-muted-foreground flex items-center gap-1 rounded-md border px-2 py-0.5 font-mono text-[10px]">
            <Wrench className="text-primary size-2.5" />
            {toolCount} tools
          </span>
        </div>
      </div>

      <div className="border-border/30 mt-5 flex items-center justify-between border-t pt-3 text-xs">
        <span className="text-muted-foreground font-medium">
          {isSelected ? "Active in Chat" : "Available for consult"}
        </span>
        <button
          type="button"
          className={`flex items-center gap-1 rounded-xl px-3 py-1 text-xs font-semibold transition-all ${
            isSelected ? "bg-primary text-primary-foreground" : "text-primary hover:bg-primary/10"
          }`}
        >
          {isSelected ? (
            <>
              <Check className="size-3.5" />
              <span>Selected</span>
            </>
          ) : (
            <>
              <span>Consult</span>
              <ArrowRight className="size-3.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
