# VitalAI — Enterprise AI Fitness & Health Coaching Platform

<p align="center">
  <img src="https://img.shields.io/badge/Architecture-Polyglot_Monorepo-CCFF00?style=for-the-badge&logo=turborepo&logoColor=black" />
  <img src="https://img.shields.io/badge/Backend-FastAPI_Python_3.12-00F0FF?style=for-the-badge&logo=fastapi&logoColor=black" />
  <img src="https://img.shields.io/badge/Frontend-Next.js_15_/_React_19-white?style=for-the-badge&logo=next.js&logoColor=black" />
  <img src="https://img.shields.io/badge/AI_Engine-LiteLLM_+_Instructor-FF3B30?style=for-the-badge&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Design-Muscle_Monster_Theme-CCFF00?style=for-the-badge" />
</p>

---

## 1. Overview

**VitalAI** is a high-performance AI fitness and health coaching platform engineered for serious athletes and strength enthusiasts. Drawing visual inspiration from the raw, kinetic energy of **Muscle Monster**, VitalAI delivers scientific hypertrophy periodization, live active workout telemetry, real-time AI coach conversations, and page-level contextual intelligence.

---

## 2. System Architecture

```
vitalai/
├── apps/
│   ├── api/                    # Python 3.12+ Enterprise AI Core Engine (FastAPI + Pydantic v2)
│   └── web/                    # High-Performance Kinetic Frontend (React 19 / TanStack / Next.js)
├── packages/
│   ├── shared-types/           # Canonical TypeScript contracts & Zod schemas
│   └── ui/                     # Design system tokens (Muscle Monster OKLCH theme)
├── docs/                       # Staff-level engineering specifications
│   ├── ARCHITECTURE.md         # End-to-end system topology & data flows
│   ├── API_SPEC.md             # OpenAPI v1 & SSE streaming protocols
│   └── MASTER_ROADMAP.md       # Phased implementation plan
├── Makefile                    # Unified developer CLI automation
├── docker-compose.yml          # PostgreSQL 16 (pgvector) + Redis 7
├── turbo.json                  # Turborepo polyglot pipeline
└── pnpm-workspace.yaml         # Node workspace definition
```

---

## 3. Tech Stack

- **Client Tier**: React 19 / Next.js 15, Tailwind CSS v4, Framer Motion, Zustand 5, Radix UI.
- **Design Tokens**: Obsidian Carbon (`#08090C`), High-Voltage Neon Volt Green (`#CCFF00`), Cyber Cyan (`#00F0FF`), Ember Flame (`#FF3B30`).
- **API Gateway Tier**: FastAPI 0.115+ (asynchronous ASGI), Pydantic v2 (Rust-backed validation).
- **AI & Agentic Tier**: LiteLLM (Ollama local + Cloud Gemini 2.0 / Claude 3.5 Sonnet router), Instructor (guaranteed structured outputs), Server-Sent Events (SSE) token streaming.
- **Data & Memory Tier**: PostgreSQL 16 with `pgvector` for hybrid semantic RAG, Redis 7 for ephemeral session caching.

---

## 4. Quickstart

### Prerequisites

- Node.js >= 20 & `pnpm` >= 9
- Python >= 3.11 & `uv` >= 0.5 (`curl -LsSf https://astral.sh/uv/install.sh | sh`)
- Docker & Docker Compose (optional for local PostgreSQL + Redis)

### Setup & Installation

```bash
# Clone and enter the repository
git clone https://github.com/yuvadevlab/vitalai.git
cd vitalai

# Install all dependencies across TypeScript and Python
make install

# Start local infrastructure (Postgres + Redis)
make db-up

# Start the full stack in development mode
make dev
```

### Individual Service Commands

```bash
make api-dev   # Starts FastAPI backend on :4004 with auto-reload
make web-dev   # Starts frontend application on :3004
make test      # Runs backend (pytest) and frontend (vitest) tests
make typecheck # Runs mypy (Python) and tsc (TypeScript)
make lint      # Runs ruff check (Python) and eslint (TypeScript)
```

---

## 5. Engineering Invariants

- **Hard 250-Line Rule**: No source file may exceed 250 lines of code. Files approaching 200 lines are immediately decomposed.
- **Zero Seed Runs**: Database seed commands must never be run automatically by CI or AI agents.
- **Structured Logging**: `.info`, `.warn`, `.error` levels strictly enforced.
