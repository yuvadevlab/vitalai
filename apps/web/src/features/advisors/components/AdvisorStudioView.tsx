"use client";

import React, { useState } from "react";
import { Sparkles, Plus } from "lucide-react";
import { AdvisorPersonaCard } from "@vitalai/ui";
import { useAdvisors } from "../api";
import { CreateAdvisorDialog } from "./CreateAdvisorDialog";
import { FloatingAdvisorDrawer } from "./FloatingAdvisorDrawer";
import { ADVISORS_COPY } from "@/lib/ui-copy";

export const AdvisorStudioView: React.FC = () => {
  const { data: advisors } = useAdvisors();
  const [selectedAdvisorId, setSelectedAdvisorId] = useState<string>("adv-elena");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  if (!advisors) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-foreground font-display text-2xl font-bold tracking-tight">
            {ADVISORS_COPY.title}
          </h2>
          <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
            {ADVISORS_COPY.subtitle}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsCreateOpen(true)}
          className="bg-primary text-primary-foreground inline-flex items-center gap-2 self-start rounded-xl px-4 py-2 text-xs font-semibold shadow-md transition-all hover:brightness-110 sm:self-auto"
        >
          <Plus className="size-3.5" />
          <span>{ADVISORS_COPY.customAdvisorBtn}</span>
        </button>
      </div>

      {/* Smart Triage Banner */}
      <div className="from-primary/15 via-primary/10 to-card border-primary/30 flex flex-col justify-between gap-4 rounded-2xl border bg-linear-to-r p-5 shadow-sm sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="bg-primary text-primary-foreground shadow-primary/20 rounded-2xl p-2.5 shadow-md">
            <Sparkles className="size-5" />
          </div>
          <div>
            <h4 className="text-foreground font-display text-sm font-bold">
              {ADVISORS_COPY.triageTitle}
            </h4>
            <p className="text-muted-foreground mt-0.5 max-w-xl text-xs leading-relaxed">
              {ADVISORS_COPY.triageDescription}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIsDrawerOpen(true)}
          className="bg-surface-2 hover:bg-surface border-border/40 text-foreground shrink-0 rounded-xl border px-4 py-2 font-mono text-xs font-semibold transition-all"
        >
          Open Chat Drawer
        </button>
      </div>

      {/* Specialist Gallery Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {advisors.map((adv) => (
          <AdvisorPersonaCard
            key={adv.id}
            id={adv.id}
            name={adv.name}
            title={adv.title}
            avatar={adv.avatar}
            tone={adv.tone}
            modelSlug={adv.modelSlug}
            toolCount={adv.toolCount}
            isSelected={selectedAdvisorId === adv.id}
            isDefault={adv.isDefault}
            onSelect={() => {
              setSelectedAdvisorId(adv.id);
              setIsDrawerOpen(true);
            }}
          />
        ))}
      </div>

      {/* 2-File Create Advisor Modal */}
      <CreateAdvisorDialog
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onAdvisorCreated={(adv) => {
          alert(`Advisor synthesized: ${adv.name} (${adv.title})`);
          setIsCreateOpen(false);
        }}
      />

      {/* Persistent Drawer */}
      <FloatingAdvisorDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </div>
  );
};
