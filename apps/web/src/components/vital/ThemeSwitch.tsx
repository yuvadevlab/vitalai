"use client";

import { useTheme } from "@/hooks/useTheme";
import { Sun, Moon, Monitor } from "lucide-react";
import { motion } from "framer-motion";

interface ThemeSwitchProps {
  variant?: "icon" | "segmented";
  className?: string;
}

export function ThemeSwitch({ variant = "icon", className = "" }: ThemeSwitchProps) {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();

  if (variant === "segmented") {
    const options = [
      { id: "light" as const, label: "Light", icon: Sun },
      { id: "dark" as const, label: "Dark", icon: Moon },
      { id: "system" as const, label: "System", icon: Monitor },
    ];

    return (
      <div className={`flex rounded-xl border border-border bg-card p-1 ${className}`}>
        {options.map(({ id, label, icon: Icon }) => {
          const active = theme === id;
          return (
            <button
              key={id}
              onClick={() => setTheme(id)}
              className={`relative flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition ${
                active ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="theme-pill"
                  className="absolute inset-0 rounded-lg bg-volt"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}
              <Icon className="relative size-3.5" />
              <span className="relative">{label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
      className={`group relative grid size-10 place-items-center rounded-xl border border-border bg-card transition hover:border-volt hover:bg-volt/10 ${className}`}
    >
      <motion.div
        key={resolvedTheme}
        initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
        transition={{ duration: 0.2 }}
      >
        {resolvedTheme === "dark" ? (
          <Sun className="size-5 text-volt transition group-hover:scale-110" />
        ) : (
          <Moon className="size-5 text-foreground transition group-hover:scale-110" />
        )}
      </motion.div>
    </button>
  );
}
