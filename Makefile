.PHONY: help dev api-dev web-dev install test lint typecheck format db-up db-down clean

help:
	@echo "VitalAI v2 Polyglot Monorepo Commands:"
	@echo "  make install      - Install both Node (pnpm) and Python (uv) dependencies"
	@echo "  make dev          - Start full stack (FastAPI backend + Next.js frontend)"
	@echo "  make api-dev      - Start FastAPI backend (:4004) with auto-reload"
	@echo "  make web-dev      - Start Next.js frontend (:3000) with Turbopack"
	@echo "  make test         - Run backend (pytest) and frontend (vitest) tests"
	@echo "  make lint         - Lint codebase (ruff for Python, eslint for TS)"
	@echo "  make typecheck    - Typecheck codebase (mypy for Python, tsc for TS)"
	@echo "  make format       - Format codebase (ruff format + prettier)"
	@echo "  make db-up        - Start PostgreSQL (pgvector) and Redis via Docker"
	@echo "  make db-down      - Stop background databases"

install:
	pnpm install
	cd apps/api && uv sync

dev:
	pnpm dev

api-dev:
	cd apps/api && uv run uvicorn src.main:app --reload --host 0.0.0.0 --port 4004

web-dev:
	pnpm --filter @vitalai/web dev

test:
	cd apps/api && uv run pytest
	pnpm test

lint:
	cd apps/api && uv run ruff check .
	pnpm lint

typecheck:
	cd apps/api && uv run mypy src
	pnpm typecheck

format:
	cd apps/api && uv run ruff format .
	pnpm format

db-up:
	docker compose up -d

db-down:
	docker compose down

clean:
	pnpm clean
	find . -type d -name "__pycache__" -exec rm -rf {} +
	find . -type d -name ".pytest_cache" -exec rm -rf {} +
	find . -type d -name ".mypy_cache" -exec rm -rf {} +
	find . -type d -name ".ruff_cache" -exec rm -rf {} +
