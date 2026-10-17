"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Dumbbell,
  Utensils,
  ShieldAlert,
  Bot,
  Settings,
  Sparkles,
  ShieldCheck,
  Activity,
} from "lucide-react";
import { usePlatformNav } from "@/features/platform/api";
import { NAVIGATION_COPY } from "@/lib/ui-copy";

const ICON_MAP: Record<string, React.ElementType> = {
  LayoutDashboard,
  Dumbbell,
  Utensils,
  ShieldAlert,
  Bot,
  Settings,
};

export interface SidebarProps {
  readonly onOpenAdvisorDrawer?: () => void;
  readonly className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ onOpenAdvisorDrawer, className = "" }) => {
  const pathname = usePathname();
  const { data: navItems } = usePlatformNav();

  return (
    <aside
      className={`border-border/40 bg-card/60 sticky top-0 flex h-screen w-64 shrink-0 flex-col justify-between border-r p-4 backdrop-blur-xl ${className}`}
    >
      <div className="space-y-6">
        {/* Brand Header */}
        <Link href="/" className="group flex items-center gap-3 px-2">
          <div className="from-primary text-primary-foreground shadow-primary/20 flex size-10 items-center justify-center rounded-2xl bg-linear-to-tr to-cyan-400 shadow-lg transition-transform group-hover:scale-105">
            <Activity className="stroke-2.5 size-5" />
          </div>
          <div>
            <h2 className="font-display text-foreground flex items-center gap-1.5 text-base font-bold tracking-tight">
              <span>{NAVIGATION_COPY.brandName}</span>
              <span className="py-0.2 bg-primary/20 text-primary border-primary/30 rounded-full border px-1.5 font-mono text-[10px]">
                PRO
              </span>
            </h2>
            <p className="text-muted-foreground max-w-[130px] truncate text-[11px]">
              {NAVIGATION_COPY.brandSubtitle}
            </p>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="space-y-1.5">
          {navItems?.map((item) => {
            const Icon = ICON_MAP[item.icon ?? ""] || LayoutDashboard;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.id}
                href={item.href}
                className={`relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-primary/15 text-primary border-primary/30 border shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-surface-2/60"
                }`}
              >
                <Icon
                  className={`size-4 shrink-0 ${isActive ? "text-primary" : "text-muted-foreground"}`}
                />
                <span className="truncate">{item.label}</span>
                {isActive && (
                  <span className="bg-primary absolute right-2 size-1.5 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Advisor Drawer & Clinical Guardrail Action */}
      <div className="border-border/30 space-y-3 border-t pt-4">
        <button
          type="button"
          onClick={onOpenAdvisorDrawer}
          className="from-primary/15 via-primary/10 border-primary/30 hover:border-primary/50 group flex w-full items-center justify-between rounded-2xl border bg-linear-to-r to-transparent p-3 text-left transition-all"
        >
          <div className="flex items-center gap-2.5">
            <div className="bg-primary text-primary-foreground rounded-xl p-1.5 shadow-md">
              <Sparkles className="size-3.5" />
            </div>
            <div>
              <p className="text-foreground group-hover:text-primary text-xs font-bold transition-colors">
                {NAVIGATION_COPY.aiDrawerTrigger}
              </p>
              <p className="text-muted-foreground font-mono text-[10px]">Real-time ReAct</p>
            </div>
          </div>
        </button>

        <div className="text-muted-foreground flex items-center gap-2 px-2 py-1 font-mono text-[11px]">
          <ShieldCheck className="size-3.5 shrink-0 text-emerald-400" />
          <span className="truncate">Tier-1 Safety Active</span>
        </div>
      </div>
    </aside>
  );
};
