"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Bot, CalendarDays, LayoutDashboard, LineChart, User, Zap } from "lucide-react";
import type { ReactNode } from "react";
import { AppRoutePath } from "@vitalai/shared-types";
import { InsightWidget } from "./InsightWidget";
import { ThemeSwitch } from "./ThemeSwitch";

const nav = [
  { to: AppRoutePath.HOME, label: "Home", icon: LayoutDashboard },
  { to: AppRoutePath.PLAN, label: "Plan", icon: CalendarDays },
  { to: AppRoutePath.ANALYTICS, label: "Stats", icon: LineChart },
  { to: AppRoutePath.ADVISOR, label: "Coach", icon: Bot },
  { to: AppRoutePath.PROFILE, label: "Profile", icon: User },
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
    <div className="vt-shell">
      <aside className="vt-sidebar">
        <Link
          href={AppRoutePath.HOME}
          className="vt-sidebar__logo vt-gradient-volt vt-glow-volt"
          aria-label="VitalAI Home"
        >
          <Zap className="vt-sidebar__logo-icon" fill="currentColor" />
        </Link>
        {nav.map(({ to, label, icon: Icon }) => {
          const active = pathname === to;
          return (
            <Link
              key={to}
              href={to}
              className={`vt-sidebar__nav-link ${active ? "vt-sidebar__nav-link--active" : ""}`}
            >
              <Icon className="vt-sidebar__nav-icon" />
              {label}
            </Link>
          );
        })}
        <div className="vt-sidebar__footer">
          <ThemeSwitch />
        </div>
      </aside>

      <main className="vt-shell__main">
        <PageSlide key={pathname}>
          {children}
          <div className="vt-shell__insight">
            <InsightWidget text={insight} />
          </div>
        </PageSlide>
      </main>

      <nav className="vt-mobile-nav">
        {nav.map(({ to, label, icon: Icon }) => {
          const active = pathname === to;
          return (
            <Link key={to} href={to} className="vt-mobile-nav__link">
              {active && <motion.span layoutId="navpill" className="vt-mobile-nav__active-pill" />}
              <Icon
                className={`vt-mobile-nav__icon ${active ? "vt-mobile-nav__icon--active" : "vt-mobile-nav__icon--inactive"}`}
              />
              <span
                className={`vt-mobile-nav__label ${active ? "vt-mobile-nav__label--active" : "vt-mobile-nav__label--inactive"}`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
