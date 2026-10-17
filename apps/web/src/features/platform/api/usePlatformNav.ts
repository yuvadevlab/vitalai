"use client";

import { useQuery } from "@tanstack/react-query";
import { NavItemDto } from "@vitalai/shared-types";
import { APP_ROUTES, API_ROUTES } from "@/lib/routes";

export const DEFAULT_NAV_ITEMS: readonly NavItemDto[] = [
  {
    id: "nav-dash",
    label: "Dashboard",
    icon: "LayoutDashboard",
    href: APP_ROUTES.DASHBOARD,
    roles: ["user", "admin"],
    section: "core",
    isVisible: true,
    isEnabled: true,
    sortOrder: 1,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "nav-workouts",
    label: "Training & Workouts",
    icon: "Dumbbell",
    href: APP_ROUTES.WORKOUTS,
    roles: ["user", "admin"],
    section: "core",
    isVisible: true,
    isEnabled: true,
    sortOrder: 2,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "nav-nutrition",
    label: "Clinical Nutrition",
    icon: "Utensils",
    href: APP_ROUTES.NUTRITION,
    roles: ["user", "admin"],
    section: "core",
    isVisible: true,
    isEnabled: true,
    sortOrder: 3,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "nav-health-vault",
    label: "Health Vault",
    icon: "ShieldAlert",
    href: APP_ROUTES.HEALTH_VAULT,
    roles: ["user", "admin"],
    section: "clinical",
    isVisible: true,
    isEnabled: true,
    sortOrder: 4,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "nav-advisors",
    label: "Advisor Studio",
    icon: "Bot",
    href: APP_ROUTES.ADVISORS,
    roles: ["user", "admin"],
    section: "clinical",
    isVisible: true,
    isEnabled: true,
    sortOrder: 5,
    createdAt: "",
    updatedAt: "",
  },
];

export function getPlatformNavQueryKey() {
  return ["platform", "nav"] as const;
}

export function usePlatformNav() {
  return useQuery({
    queryKey: getPlatformNavQueryKey(),
    queryFn: async (): Promise<readonly NavItemDto[]> => {
      try {
        const res = await fetch(`http://localhost:4004${API_ROUTES.PLATFORM.NAV}`);
        if (!res.ok) return DEFAULT_NAV_ITEMS;
        const data = await res.json();
        return Array.isArray(data) && data.length > 0 ? data : DEFAULT_NAV_ITEMS;
      } catch {
        return DEFAULT_NAV_ITEMS;
      }
    },
    initialData: DEFAULT_NAV_ITEMS,
    staleTime: 60 * 1000,
  });
}
