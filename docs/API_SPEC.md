# VitalAI — OpenAPI v1 & Streaming Protocols Specification

> **Base URL (Local)**: `http://localhost:4004`  
> **Protocol**: HTTP/1.1 & HTTP/2 with Server-Sent Events (SSE)  
> **Serialization**: Strict JSON / Pydantic v2 schemas

---

## 1. System & Health Endpoints

### `GET /health`

Liveness probe for container orchestrators.

- **Response `200 OK`**:
  ```json
  {
    "status": "healthy",
    "version": "0.2.0",
    "timestamp": "2026-10-17T18:00:00Z"
  }
  ```

### `GET /health/ready`

Readiness probe verifying PostgreSQL, Redis, and LLM gateway connectivity.

- **Response `200 OK`**:
  ```json
  {
    "status": "ready",
    "database": "connected",
    "redis": "connected",
    "llm_provider": "ollama"
  }
  ```

---

## 2. Onboarding & AI Plan Generation

### `POST /api/v1/onboarding/generate-plan`

Generates a periodized multi-week workout program based on user inputs.

- **Request Body**:
  ```json
  {
    "name": "Athlete",
    "goal": "Hypertrophy",
    "focus": ["Chest & Arms"],
    "level": "Intermediate",
    "equipment": "Full Commercial Gym",
    "days": 4,
    "sessionLength": 60,
    "age": 27,
    "gender": "Male",
    "height": 180,
    "weight": 78,
    "targetWeight": 81,
    "injuries": ["None"]
  }
  ```
- **Response `200 OK`**:
  ```json
  {
    "planId": "plan-ppl-wk3-v1",
    "title": "Hypertrophy Push A (Chest, Shoulders & Triceps)",
    "split": "Push/Pull/Legs",
    "durationMins": 52,
    "targetRir": 2,
    "exercises": [
      {
        "name": "Incline Barbell Bench Press",
        "sets": 3,
        "reps": "8-10",
        "loadKg": 85,
        "targetRir": 2,
        "cues": ["Retract scapula", "3s eccentric", "Drive feet into floor"],
        "alternatives": ["Incline Dumbbell Press", "Smith Machine Incline Press"]
      }
    ]
  }
  ```

---

## 3. Active Workout HUD Endpoints

### `POST /api/v1/workouts/active/set`

Records completion of an individual set during an active session.

- **Request Body**:
  ```json
  {
    "sessionId": "active-session-101",
    "exerciseId": "ex-incline-bench",
    "setNumber": 1,
    "repsCompleted": 10,
    "loadKg": 85.0,
    "actualRir": 2
  }
  ```
- **Response `200 OK`**:
  ```json
  {
    "status": "logged",
    "volumeContributionKg": 850.0,
    "recommendedRestSeconds": 90,
    "isPr": false
  }
  ```

### `POST /api/v1/workouts/active/finish`

Finalizes an active workout session and persists volume telemetry.

- **Request Body**:
  ```json
  {
    "sessionId": "active-session-101",
    "durationMinutes": 48,
    "perceivedEffortRpe": 8.5
  }
  ```
- **Response `200 OK`**:
  ```json
  {
    "sessionId": "active-session-101",
    "totalVolumeKg": 14280.0,
    "completedSets": 18,
    "newPrCount": 1,
    "streakDays": 19
  }
  ```

---

## 4. AI Advisor Streaming Protocol (SSE)

### `POST /api/v1/advisor/chat/stream`

Streams conversational tokens from the AI Health & Fitness Advisor.

- **Headers**:
  - `Accept: text/event-stream`
  - `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "message": "How should I warm up for today's 85kg incline bench press?",
    "pageContext": "Dashboard - Readiness 92%"
  }
  ```
- **Streaming Response (`text/event-stream`)**:
  ```
  event: token
  data: {"text": "For"}

  event: token
  data: {"text": " an"}

  event: token
  data: {"text": " 85kg"}

  event: token
  data: {"text": " working set, ramp up as follows:"}

  event: done
  data: {"suggestedPrompts": ["Alternative warmup without barbell", "What if my shoulder aches?"]}
  ```

---

## 5. Universal Page Insight Endpoint

### `GET /api/v1/insights/{page_name}`

Synthesizes telemetry on the specified screen and produces a real-time coaching tip.

- **Parameters**: `page_name` (e.g. `dashboard`, `plan`, `workout_active`, `analytics`, `profile`)
- **Response `200 OK`**:
  ```json
  {
    "page": "dashboard",
    "insightText": "Readiness is peak at 92%. Maintain a 3-second eccentric on Set 1 to maximize mechanical tension.",
    "keyMetric": "92% Readiness",
    "confidencePercent": 98
  }
  ```
