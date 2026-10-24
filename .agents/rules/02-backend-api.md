# Backend Python API Rules — FastAPI & AI Engine

1. **Architecture & Framework**:
   - Framework: FastAPI 0.115+ running on Uvicorn ASGI.
   - Dependency Manager: `uv` (never run raw global pip commands).
   - Validation & Data Engine: Pydantic v2 with strict typing.
   - Database ORM: SQLModel (asyncpg) for asynchronous PostgreSQL queries.

2. **AI & LLM Integration Standards**:
   - Use `LiteLLM` router for all model invocations; never hardcode provider-specific SDK clients.
   - Default to local `ollama/llama3.2` for offline testing; failover to `gemini/gemini-1.5-flash` or `claude-3-5-sonnet`.
   - All structured workout generation must use `Instructor` to guarantee Pydantic schema validation.
   - All chat endpoints must stream tokens via Server-Sent Events (`text/event-stream`).

3. **Logging & Diagnostics**:
   - Structured JSON logging using `.info`, `.warn`, `.error` only.
