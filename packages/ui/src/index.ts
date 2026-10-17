/**
 * @file packages/ui/src/index.ts
 * @description Master public API for @vitalai/ui.
 * Exports domain-specific health, fitness, clinical nutrition, and AI reasoning UI primitives.
 */

// Charts & Theming
export * from "./charts/chart-theme";
export * from "./charts/GlycemicTimeline";

// Gauges & Biometrics
export * from "./components/gauges/MultiRingGauge";
export * from "./components/gauges/PurineSafetyGauge";
export * from "./components/gauges/gauge-utils";

// Anatomical Visualizer
export * from "./components/muscle-map/MuscleHeatmap";
export * from "./components/muscle-map/body-svg-paths";

// AI Cognitive & Decision Explanations
export * from "./components/reasoning-trace/ReasoningTrace";
export * from "./components/swap-card/SwapActionCard";
export * from "./components/advisors/AdvisorPersonaCard";
export * from "./components/advisors/AutoTriageBadge";

// Training & Timers
export * from "./components/hud/ActiveWorkoutHUD";
export * from "./components/timer/CountdownTimer";
export * from "./components/timeline/MesocycleTimeline";
export * from "./components/timeline/TrimesterTimeline";

// Health Safeguards
export * from "./components/guardrails/HealthGuardrailBadge";
