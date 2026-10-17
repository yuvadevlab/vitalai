/**
 * @file packages/ui/src/components/gauges/gauge-utils.ts
 * @description Mathematics and SVG helpers for concentric biometric progress rings.
 */

export interface RingSegment {
  readonly id: string;
  readonly label: string;
  readonly current: number;
  readonly target: number;
  readonly unit: string;
  readonly color: string;
  readonly radius: number;
  readonly strokeWidth: number;
}

export function calculateRingOffset(
  radius: number,
  current: number,
  target: number,
): { circumference: number; offset: number; percent: number } {
  const circumference = 2 * Math.PI * radius;
  const safeTarget = target > 0 ? target : 1;
  const percent = Math.min(100, Math.max(0, (current / safeTarget) * 100));
  const progressRatio = Math.min(1, Math.max(0, current / safeTarget));
  const offset = circumference * (1 - progressRatio);
  return { circumference, offset, percent };
}

export function formatMacroValue(value: number, unit: string): string {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k ${unit}`;
  }
  return `${Math.round(value)} ${unit}`;
}
