"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Bot, CalendarDays, LayoutDashboard, LineChart, User, Zap } from "lucide-react";
import type { ReactNode } from "react";
import { InsightWidget } from "./InsightWidget";
import { ThemeSwitch } from "./ThemeSwitch";

const nav = [
  { to: "/", label: "Home", icon: LayoutDashboard },
  { to: "/plan", label: "Plan", icon: CalendarDays },
  { to: "/analytics", label: "Stats", icon: LineChart },
  { to: "/advisor", label: "Coach", icon: Bot },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function PageSlide({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ x: 35, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -35, opacity: 0 }}
      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function AppShell({ children, insight }: { children: ReactNode; insight: string }) {
  const pathname = usePathname();
  return (
    <div className="min-h-screen pb-28 md:pb-10 md:pl-24">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-24 flex-col items-center gap-3 border-r bg-surface/60 py-6 backdrop-blur md:flex">
        <Link
          href="/"
          className="mb-6 grid size-11 place-items-center rounded-xl bg-gradient-volt glow-volt"
        >
          <Zap className="size-6 text-primary-foreground" fill="currentColor" />
        </Link>
        {nav.map(({ to, label, icon: Icon }) => {
          const active = pathname === to;
          return (
            <Link
              key={to}
              href={to}
              className={`flex w-16 flex-col items-center gap-1 rounded-xl py-2.5 text-[11px] font-medium transition ${
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="size-5" />
              {label}
            </Link>
          );
        })}
        <div className="mt-auto flex w-12 justify-center border-t border-border/40 pt-4">
          <ThemeSwitch />
        </div>
      </aside>

      <main className="mx-auto max-w-6xl px-4 pt-5 md:px-8 md:pt-8">
        <PageSlide key={pathname}>
          {children}
          <div className="mt-6">
            <InsightWidget text={insight} />
          </div>
        </PageSlide>
      </main>

      <nav className="fixed inset-x-3 bottom-3 z-30 flex justify-around rounded-2xl border bg-surface/90 p-1.5 backdrop-blur md:hidden">
        {nav.map(({ to, label, icon: Icon }) => {
          const active = pathname === to;
          return (
            <Link
              key={to}
              href={to}
              className="relative flex flex-1 flex-col items-center gap-0.5 py-2 text-[10px] font-medium"
            >
              {active && (
                <motion.span
                  layoutId="navpill"
                  className="absolute inset-0 rounded-xl bg-primary/12 ring-1 ring-primary/40"
                />
              )}
              <Icon
                className={`relative size-5 ${active ? "text-primary" : "text-muted-foreground"}`}
              />
              <span className={`relative ${active ? "text-primary" : "text-muted-foreground"}`}>
                {label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
