"use client";

import React, { useState } from "react";
import { X, Send, Bot, Loader2 } from "lucide-react";
import { AutoTriageBadge, ReasoningTrace, SwapActionCard } from "@vitalai/ui";
import { useAdvisorChat } from "../api/useAdvisorChat";
import { CHAT_COPY } from "@/lib/ui-copy";

export interface FloatingAdvisorDrawerProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export const FloatingAdvisorDrawer: React.FC<FloatingAdvisorDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const { messages, isStreaming, sendMessage } = useAdvisorChat();
  const [input, setInput] = useState("");
  const [selectedAdvisor, setSelectedAdvisor] = useState("auto");

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;
    sendMessage(input, selectedAdvisor === "auto" ? undefined : selectedAdvisor);
    setInput("");
  };

  return (
    <div className="bg-card/95 border-border/50 animate-in slide-in-from-right fixed inset-y-0 right-0 z-50 flex w-full max-w-lg flex-col justify-between border-l shadow-2xl backdrop-blur-2xl duration-300">
      {/* Header */}
      <div className="border-border/40 flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2.5">
          <div className="bg-primary/20 text-primary rounded-xl p-2">
            <Bot className="size-5" />
          </div>
          <div>
            <h3 className="text-foreground text-sm font-bold tracking-tight">
              {CHAT_COPY.drawerTitle}
            </h3>
            <div className="mt-0.5 flex items-center gap-2">
              <select
                value={selectedAdvisor}
                onChange={(e) => setSelectedAdvisor(e.target.value)}
                className="bg-surface-2 border-border/40 text-foreground rounded-lg border px-2 py-0.5 font-mono text-[11px] focus:outline-none"
              >
                <option value="auto">{CHAT_COPY.triageOptionAuto}</option>
                <option value="elena">Dr. Elena Rostova (Nutrition)</option>
                <option value="marcus">Coach Marcus Vance (Strength)</option>
                <option value="julian">Dr. Julian Thorne (Longevity)</option>
                <option value="sarah">Sarah Jenkins (Mindset)</option>
              </select>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="hover:bg-surface-2 text-muted-foreground hover:text-foreground rounded-xl p-1.5 transition-colors"
        >
          <X className="size-5" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
          >
            {msg.role === "assistant" && msg.advisorName && (
              <div className="mb-1.5">
                <AutoTriageBadge
                  advisorName={msg.advisorName}
                  advisorTitle={msg.advisorTitle}
                  reason={msg.triageReason}
                />
              </div>
            )}

            <div
              className={`max-w-[90%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-tr-sm font-medium shadow-md"
                  : "bg-surface-2/70 text-foreground border-border/30 rounded-tl-sm border shadow-sm"
              }`}
            >
              {msg.content}
            </div>

            {/* Inline Reasoning Trace */}
            {msg.reasoningSteps && msg.reasoningSteps.length > 0 && (
              <div className="mt-2 w-full">
                <ReasoningTrace
                  advisorName={msg.advisorName || "Clinical Engine"}
                  latencyMs={msg.latencyMs || 220}
                  formulaUsed={msg.formulaUsed}
                  steps={msg.reasoningSteps}
                  contraindicationsChecked={msg.contraindicationsChecked}
                />
              </div>
            )}

            {/* Inline Two-Phase Write Proposal */}
            {msg.swapProposal && (
              <div className="mt-2 w-full">
                <SwapActionCard
                  title={msg.swapProposal.title}
                  before={msg.swapProposal.before}
                  after={msg.swapProposal.after}
                  rationale={msg.swapProposal.rationale}
                  safetyBenefit={msg.swapProposal.safetyBenefit}
                  onAccept={() => alert("Exercise substitution applied to active mesocycle.")}
                  onDecline={() => alert("Original exercise retained.")}
                />
              </div>
            )}
          </div>
        ))}

        {isStreaming && (
          <div className="text-primary flex items-center gap-2 p-2 font-mono text-xs">
            <Loader2 className="size-4 animate-spin" />
            <span>{CHAT_COPY.streamingStatus}</span>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form
        onSubmit={handleSend}
        className="border-border/40 bg-surface/40 flex items-center gap-2 border-t p-3"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={CHAT_COPY.placeholder}
          className="bg-surface-2 border-border/40 text-foreground placeholder:text-muted-foreground focus:ring-primary flex-1 rounded-xl border px-3.5 py-2 text-xs focus:ring-1 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!input.trim() || isStreaming}
          className="bg-primary text-primary-foreground rounded-xl p-2 shadow-md transition-all hover:brightness-110 disabled:opacity-40"
        >
          <Send className="size-4" />
        </button>
      </form>
    </div>
  );
};
