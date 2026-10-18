# VitalAI — Master Implementation Roadmap (Phased Execution)

> **Execution Strategy**: Progressive delivery across verified milestones with strict type-safety and testing at every stage.

---

## Milestone Overview

```mermaid
gantt
    title VitalAI v2 Execution Timeline
    dateFormat  YYYY-MM-DD
    section Phase 1: Foundation
    Polyglot Monorepo & Tooling Setup           :done,    p1, 2026-10-17, 1d
    Contracts & Shared Schemas                 :done,    p2, 2026-10-17, 1d
    Design System & Kinesthetic Shell          :done,    p3, 2026-10-17, 1d
    section Phase 2: Python Core Engine
    FastAPI App & UV Dependency Synchronization :active,  p4, 2026-10-18, 2d
    SQLModel Database & Asyncpg Models         :         p5, after p4, 2d
    LiteLLM Gateway & Provider Router          :         p6, after p5, 2d
    section Phase 3: AI Intelligence & Agents
    Instructor Structured Plan Generation       :         p7, after p6, 2d
    SSE Streaming Advisor Chat                 :         p8, after p7, 2d
    ReAct Coach Agent & Biomechanical Tools    :         p9, after p8, 2d
    section Phase 4: Frontend & API Integration
    TanStack Query & Hono/FastAPI Client Wireup :         p10, after p9, 3d
    Active Workout HUD Live Set Sync           :         p11, after p10, 2d
    Universal AI Page Widget Context Hooks     :         p12, after p11, 2d
    section Phase 5: Verification & Production
    End-to-End Testing (Pytest + Vitest)       :         p13, after p12, 2d
    Containerization & Production Deployment    :         p14, after p13, 2d
```

---

## Detailed Milestone Objectives

### Phase 1: Polyglot Foundation & Monorepo Redesign (Current Milestone - Ready to Merge)

- [x] Establish polyglot monorepo structure with Turborepo 2 + pnpm + UV.
- [x] Design `@vitalai/shared-types` with canonical Zod schemas matching backend specifications.
- [x] Design `@vitalai/ui` with Muscle Monster OKLCH theme tokens (Volt Green, Cyber Cyan, Ember Flame, Obsidian Carbon).
- [x] Scaffold `@vitalai/web` with kinetic motion, onboarding wizard, command center, active HUD, and universal insight widget.
- [x] Establish root automation (`Makefile`, `docker-compose.yml`, `.env.example`).
- [x] Update Staff-level documentation (`docs/ARCHITECTURE.md`, `docs/API_SPEC.md`, `docs/MASTER_ROADMAP.md`).

### Phase 2: Python AI Core Engine (`apps/api`)

- [ ] Initialize FastAPI ASGI app with CORS, lifespan handlers, and structured JSON logging.
- [ ] Implement SQLModel database models for `Profile`, `WorkoutPlan`, `Exercise`, `SessionLog`.
- [ ] Configure `LiteLLM` router supporting local Ollama (`llama3.2`, `deepseek-r1`) and cloud models (Gemini 2.0, Claude 3.5).
- [ ] Add unit tests verifying database migrations and mock provider calls.

### Phase 3: AI Intelligence, Structured Outputs & SSE Streaming

- [ ] Implement `Instructor` structured plan generator guaranteeing typed JSON Pydantic outputs.
- [ ] Implement Server-Sent Events (SSE) token streamer for real-time coach feedback.
- [ ] Build ReAct Agent loop equipped with biomechanical calculation tools (1RM, volume landmarks).

### Phase 4: Full-Stack Integration & Telemetry Wireup

- [ ] Connect `apps/web` TanStack Query hooks to live FastAPI endpoints.
- [ ] Wire active workout HUD set completions to live backend session logger.
- [ ] Wire dynamic profile editor to trigger real-time AI workout plan recalibration.

### Phase 5: Hardening & Production Release

- [ ] Comprehensive test suite: `uv run pytest` (backend) + `pnpm test` (frontend).
- [ ] Production Dockerfile with multi-stage build.
- [ ] Continuous Integration (GitHub Actions) running lint, typecheck, and test suites.
