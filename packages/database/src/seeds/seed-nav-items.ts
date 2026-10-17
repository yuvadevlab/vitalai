/**
 * @file packages/database/src/seeds/seed-nav-items.ts
 * @description Idempotent database seeder for application navigation and menu items.
 * @module @vitalai/database/seeds
 */

import { PrismaClient } from "@prisma/client";

export const SEED_NAV_ITEMS = [
  {
    label: "Dashboard",
    icon: "LayoutDashboard",
    href: "/dashboard",
    roles: [],
    section: "main",
    isVisible: true,
    isEnabled: true,
    sortOrder: 1,
  },
  {
    label: "Workouts",
    icon: "Dumbbell",
    href: "/workouts",
    roles: [],
    section: "main",
    isVisible: true,
    isEnabled: true,
    sortOrder: 2,
  },
  {
    label: "Nutrition",
    icon: "UtensilsCrossed",
    href: "/nutrition",
    roles: [],
    section: "main",
    isVisible: true,
    isEnabled: true,
    sortOrder: 3,
  },
  {
    label: "Health Vault",
    icon: "ShieldAlert",
    href: "/health-vault",
    roles: [],
    section: "main",
    isVisible: true,
    isEnabled: true,
    sortOrder: 4,
  },
  {
    label: "AI Advisor",
    icon: "Bot",
    href: "/advisor",
    roles: [],
    section: "main",
    isVisible: true,
    isEnabled: true,
    sortOrder: 5,
  },
  {
    label: "Analytics",
    icon: "Activity",
    href: "/analytics",
    roles: [],
    section: "main",
    isVisible: true,
    isEnabled: true,
    sortOrder: 6,
  },
  {
    label: "Settings",
    icon: "Settings",
    href: "/settings",
    roles: [],
    section: "bottom",
    isVisible: true,
    isEnabled: true,
    sortOrder: 7,
  },
];

/**
 * Seeds application navigation and menu items idempotently.
 *
 * @param prisma - PrismaClient instance
 */
export async function seedNavItems(prisma: PrismaClient): Promise<void> {
  for (const item of SEED_NAV_ITEMS) {
    const existing = await prisma.navItem.findFirst({
      where: { href: item.href },
    });

    if (existing) {
      await prisma.navItem.update({
        where: { id: existing.id },
        data: {
          label: item.label,
          icon: item.icon,
          roles: item.roles,
          section: item.section,
          isVisible: item.isVisible,
          isEnabled: item.isEnabled,
          sortOrder: item.sortOrder,
        },
      });
    } else {
      await prisma.navItem.create({
        data: {
          label: item.label,
          icon: item.icon,
          href: item.href,
          roles: item.roles,
          section: item.section,
          isVisible: item.isVisible,
          isEnabled: item.isEnabled,
          sortOrder: item.sortOrder,
        },
      });
    }
  }
}
