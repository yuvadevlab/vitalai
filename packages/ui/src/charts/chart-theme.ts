/**
 * @file packages/ui/src/charts/chart-theme.ts
 * @description Master chart theme tokens, palettes, and styling utilities for VitalAI.
 * Formats Recharts visual components with dark-mode glassmorphism, OKLCH gradients,
 * borderless floating tooltips, and tabular typography.
 */

export const VITAL_CHART_COLORS = {
  primary: "oklch(0.8 0.13 180)",
  protein: "oklch(0.8 0.13 180)",
  carbs: "oklch(0.85 0.14 90)",
  fats: "oklch(0.74 0.16 350)",
  calories: "oklch(0.76 0.16 50)",
  vital: "oklch(0.82 0.16 160)",
  water: "oklch(0.74 0.13 235)",
  muted: "oklch(0.68 0.02 210)",
  grid: "oklch(1 0 0 / 6%)",
  border: "oklch(1 0 0 / 10%)",
} as const;

export const MACRO_PIE_COLORS = [
  VITAL_CHART_COLORS.protein,
  VITAL_CHART_COLORS.carbs,
  VITAL_CHART_COLORS.fats,
];

export const CHART_PALETTE = [
  VITAL_CHART_COLORS.primary,
  VITAL_CHART_COLORS.vital,
  VITAL_CHART_COLORS.carbs,
  VITAL_CHART_COLORS.calories,
  VITAL_CHART_COLORS.fats,
  VITAL_CHART_COLORS.water,
];

export const axisProps = {
  stroke: "oklch(0.68 0.02 210 / 50%)",
  fontSize: 11,
  tickLine: false,
  axisLine: false,
  fontFamily: "var(--font-mono, ui-monospace, monospace)",
};

export const gridProps = {
  stroke: VITAL_CHART_COLORS.grid,
  strokeDasharray: "3 3",
  vertical: false,
};

export function tooltipStyle() {
  return {
    contentStyle: {
      backgroundColor: "oklch(0.18 0.02 228 / 92%)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      border: "1px solid oklch(1 0 0 / 12%)",
      borderRadius: 12,
      color: "oklch(0.95 0.01 200)",
      fontSize: 12,
      padding: "10px 14px",
      boxShadow: "0 12px 32px -8px oklch(0 0 0 / 60%)",
    },
    labelStyle: {
      color: "oklch(0.75 0.02 210)",
      fontSize: 11,
      fontWeight: 600,
      marginBottom: "4px",
      letterSpacing: "0.02em",
    },
    itemStyle: {
      color: "oklch(0.95 0.01 200)",
      fontSize: 12,
      fontFamily: "var(--font-mono, ui-monospace, monospace)",
      padding: "2px 0",
    },
  };
}
