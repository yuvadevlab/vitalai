"use client";

import React, { useCallback, useEffect, useMemo, useSyncExternalStore } from "react";
import { ThemeContext, type Theme, type ResolvedTheme } from "./theme-context";

const STORAGE_KEY = "vitalai-theme";

let listeners: Array<() => void> = [];

function subscribe(callback: () => void) {
  listeners.push(callback);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) callback();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners = listeners.filter((l) => l !== callback);
    window.removeEventListener("storage", onStorage);
  };
}

function notify() {
  listeners.forEach((l) => l());
}

function getClientSnapshot(): Theme {
  try {
    const val = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (val === "dark" || val === "light" || val === "system") {
      return val;
    }
  } catch {
    // ignore
  }
  return "dark";
}

function getServerSnapshot(): Theme {
  return "dark";
}

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyToDOM(resolved: ResolvedTheme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (resolved === "dark") {
    root.classList.add("dark");
    root.setAttribute("data-theme", "vitalai");
  } else {
    root.classList.remove("dark");
    root.setAttribute("data-theme", "vitalai-light");
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  const resolvedTheme = useMemo<ResolvedTheme>(() => {
    if (theme === "system") return getSystemTheme();
    return theme;
  }, [theme]);

  useEffect(() => {
    applyToDOM(resolvedTheme);
  }, [resolvedTheme]);

  useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      applyToDOM(e.matches ? "dark" : "light");
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    try {
      localStorage.setItem(STORAGE_KEY, next);
      notify();
    } catch {
      // ignore
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(next);
  }, [resolvedTheme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
