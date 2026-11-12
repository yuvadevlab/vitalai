"use client";

import { useTheme } from "@/hooks/useTheme";
import { Sun, Moon, Monitor } from "lucide-react";
import { motion } from "framer-motion";

interface ThemeSwitchProps {
  variant?: "icon" | "segmented";
  className?: string;
  style?: React.CSSProperties;
}

export function ThemeSwitch({ variant = "icon", className = "", style }: ThemeSwitchProps) {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();

  if (variant === "segmented") {
    const options = [
      { id: "light" as const, label: "Light", icon: Sun },
      { id: "dark" as const, label: "Dark", icon: Moon },
      { id: "system" as const, label: "System", icon: Monitor },
    ];

    return (
      <div className={`vt-theme-switch-segmented ${className}`} style={style}>
        {options.map(({ id, label, icon: Icon }) => {
          const active = theme === id;
          return (
            <button
              key={id}
              onClick={() => setTheme(id)}
              className={`vt-theme-switch-btn ${active ? "vt-theme-switch-btn--active" : ""}`}
            >
              {active && (
                <motion.span
                  layoutId="theme-pill"
                  className="vt-theme-switch-pill"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}
              <Icon className="vt-theme-switch-icon" />
              <span>{label}</span>
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
      className={`vt-theme-switch-toggle ${className}`}
    >
      <motion.div
        key={resolvedTheme}
        initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
        transition={{ duration: 0.2 }}
      >
        {resolvedTheme === "dark" ? (
          <Sun className="vt-theme-switch-toggle-icon vt-theme-switch-toggle-icon--dark" />
        ) : (
          <Moon className="vt-theme-switch-toggle-icon vt-theme-switch-toggle-icon--light" />
        )}
      </motion.div>
    </button>
  );
}
