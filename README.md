# VitalAI — AI Health, Clinical Nutrition & Fitness Intelligence Monorepo

VitalAI is an enterprise-grade, full-stack AI platform combining clinical nutrition therapy, life-stage advisory (maternal & prenatal care), and exercise science into a unified health intelligence system.

Powered by advanced Code-First GraphQL, NestJS, Next.js 15, and modular AI engines, VitalAI delivers personalized, science-backed guidance with deterministic medical safety guardrails.

---

## Workspace Navigation & Implementation Roadmap

- 📋 **[Master Implementation Plan & Live Progress Tracker](IMPLEMENTATION_PLAN.md)**: Current phase status, completed tasks, and upcoming implementation specifications for AI agents and developers.
- 🎨 **[Design System & UI Architecture Dossier](DESIGN_SYSTEM_AND_UI_ARCHITECTURE.md)**: Master UI component hierarchy, package boundaries (@yuva-devlab/ui vs @vitalai/ui), page specifications, and visual tokens.
- 📐 **[Agent Guidelines & Architecture Standards](AGENTS.md)**: Coding standards, package boundaries, GraphQL rules, and universal invariants.
- 🏛️ **[Master Technical Dossier](PROJECT_INFO.md)**: Deep architectural dossier, database models, and persona design.

---

## Workspace Coding Standards & Agent Guidelines (`.agents/AGENTS.md`)

Before writing or modifying code in VitalAI, review the official [**`VitalAI Coding Standards & Agent Guidelines`**](.agents/AGENTS.md):

- 📐 **2-File Feature Modal Pattern**: `<Entity>Form.tsx` (pure presentation) + `<Entity>Dialog.tsx` (Zod validation, GraphQL mutations).
- 🧮 **Pure Science Engine**: `@vitalai/vital-engine` MUST contain **zero side-effects, zero network, and zero I/O**.
- 📡 **Advanced GraphQL**: Code-First schema resolution (`@nestjs/graphql`), DataLoader batching to prevent N+1 queries, and SSE streaming for AI token delivery.
- ✅ **Centralized Validation**: ALL validation schemas MUST reside in `@vitalai/validation` and use `.safeParse()`.
- 🔄 **State & Cache**: Feature hooks under `src/features/<name>/api/` using `@tanstack/react-query` generated via GraphQL Code Generator.
- 🎨 **Styling**: Tailwind CSS semantic color tokens (`bg-card`, `bg-background`, `border-border`, `text-primary`) and `@yuva-devlab/tokens`.

---

## Modular Architecture & Rulebooks (`.agents/rules/`)

This monorepo follows a strict modular architecture governed by topic-specific rulebooks:

- 🏛️ **[`00-core-invariants.md`](.agents/rules/00-core-invariants.md)**: Monorepo package boundaries, hard 250-line rule, branch protection, and seed safeguards.
- 💻 **[`01-frontend-web.md`](.agents/rules/01-frontend-web.md)**: SSR boundaries, GraphQL hooks, React Query caching, and `@vitalai/ui`.
- ⚙️ **[`02-backend-api.md`](.agents/rules/02-backend-api.md)**: 5-layer NestJS architecture, Code-First GraphQL resolvers, DataLoaders, and SSE streaming.
- 🤖 **[`03-ai-advisor.md`](.agents/rules/03-ai-advisor.md)**: Multi-persona ReAct agent loop, clinical guardrails, and two-phase write confirmations.
- 🧪 **[`04-testing-standards.md`](.agents/rules/04-testing-standards.md)**: Vitest unit testing, mock contracts, and zero test side-effects.

---

## Workspace Directory Map

```text
vitalai/
├── apps/
│   ├── web/                     # Next.js 15 App Router Frontend (Port 3000)
│   └── api/                     # NestJS 11 GraphQL API Gateway & AI Orchestrator (Port 4000)
│
├── packages/
│   ├── ai-engine/               # Clinical Personas, Prompt Templates & ReAct Tool Planning
│   ├── constants/               # Exercise Database, Food Nutrition & Purine Tables, Contraindications
│   ├── database/                # Prisma ORM Engine, PostgreSQL Schema & Migrations
│   ├── shared-types/            # Canonical Enums, DTO Interfaces, QUERY_KEYS, API_ENDPOINTS
│   ├── ui/                      # Shared React UI Primitives, Muscle Heatmap & Macro Gauges
│   ├── validation/              # Centralized Zod Validation Schemas
│   └── vital-engine/            # Deterministic Exercise Science & Clinical Nutrition Math
│
├── .agents/
│   ├── AGENTS.md                # Agent Guidelines Index
│   └── rules/                   # Modular Architectural Rulebooks
│
├── .github/
│   ├── actions/                 # Composite GitHub Actions (setup-node-env)
│   └── workflows/               # CI Pipeline & Pull Request Validation
│
├── DESIGN_SYSTEM_AND_UI_ARCHITECTURE.md # Master UI Architecture & Component Catalog
├── IMPLEMENTATION_PLAN.md       # Master Roadmap & Progress Tracker
├── package.json                 # Root Workspace Scripts & Tooling
├── pnpm-workspace.yaml          # Monorepo Workspace Configuration & Package Overrides
└── turbo.json                   # Turborepo Build & Task Cache Engine
```

---

## Getting Started

### Prerequisites

- **Node.js**: `>= 24.16.0`
- **Package Manager**: `pnpm >= 10.0.0`
- **Ollama**: Model runner listening on port `11434` with models installed (`qwen3:14b` / `qwen3:8b`)

### Development Commands

```bash
# Install all dependencies across the monorepo
pnpm install

# Start all applications in watch mode (Web: 3000, API: 4000)
pnpm dev

# Run comprehensive workspace verification (lint, typecheck, tests)
pnpm check

# Generate GraphQL types and client hooks from schema
pnpm codegen

# Build all applications and packages for production
pnpm build
```
