# VitalAI — Python AI Core Engine

Enterprise-grade asynchronous FastAPI backend for VitalAI. Powered by Pydantic v2, SQLModel (asyncpg), LiteLLM multi-provider gateway, and Instructor for guaranteed structured output generation.

## Quickstart

```bash
# 1. Install dependencies via uv
uv sync

# 2. Run local development server (:4004)
uv run uvicorn src.main:app --reload --port 4004
```

## Architecture

- `src/api/v1/`: Versioned API endpoints (REST & SSE streaming).
- `src/ai/`: Multi-model LLM gateway (Ollama local + Cloud Gemini/Claude) with ReAct agent loops.
- `src/domain/`: Pure fitness mathematics (volume landmarks, progressive overload math, RIR).
- `src/db/`: Async PostgreSQL models via SQLModel and asyncpg.
- `src/core/`: Application settings, telemetry, and structured JSON logging.
