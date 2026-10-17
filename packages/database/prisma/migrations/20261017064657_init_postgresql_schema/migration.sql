-- CreateEnum
CREATE TYPE "BiologicalSex" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "ActivityLevel" AS ENUM ('SEDENTARY', 'LIGHTLY_ACTIVE', 'MODERATELY_ACTIVE', 'VERY_ACTIVE', 'EXTRA_ACTIVE');

-- CreateEnum
CREATE TYPE "CaloricGoal" AS ENUM ('MAINTENANCE', 'DEFICIT', 'SURPLUS');

-- CreateEnum
CREATE TYPE "LifeStage" AS ENUM ('GENERAL_ADULT', 'PRECONCEPTION', 'PREGNANCY_FIRST_TRIMESTER', 'PREGNANCY_SECOND_TRIMESTER', 'PREGNANCY_THIRD_TRIMESTER', 'POSTPARTUM_EARLY', 'POSTPARTUM_RECOVERY', 'LACTATION', 'MASTERS_ATHLETE');

-- CreateEnum
CREATE TYPE "ConditionCategory" AS ENUM ('ORTHOPEDIC', 'METABOLIC', 'CARDIOVASCULAR', 'HORMONAL', 'AUTOIMMUNE', 'DIGESTIVE');

-- CreateEnum
CREATE TYPE "ConditionSeverity" AS ENUM ('OBSERVE', 'CAUTION', 'STRICT_CONTRAINDICATION');

-- CreateEnum
CREATE TYPE "MuscleGroup" AS ENUM ('CHEST', 'BACK', 'SHOULDERS', 'BICEPS', 'TRICEPS', 'QUADS', 'HAMSTRINGS', 'GLUTES', 'CALVES', 'CORE');

-- CreateEnum
CREATE TYPE "MesocyclePhase" AS ENUM ('BASELINE', 'OVERLOAD', 'PEAK', 'DELOAD');

-- CreateEnum
CREATE TYPE "ExerciseCategory" AS ENUM ('COMPOUND', 'ACCESSORY', 'ISOLATION');

-- CreateEnum
CREATE TYPE "SwapReason" AS ENUM ('MACHINE_OCCUPIED', 'JOINT_DISCOMFORT', 'TIME_CONSTRAINED', 'EQUIPMENT_MISSING');

-- CreateEnum
CREATE TYPE "MealType" AS ENUM ('BREAKFAST', 'LUNCH', 'DINNER', 'SNACK', 'POST_WORKOUT');

-- CreateEnum
CREATE TYPE "MessageRole" AS ENUM ('USER', 'ASSISTANT', 'SYSTEM');

-- CreateEnum
CREATE TYPE "AdvisorSpecialty" AS ENUM ('CLINICAL_NUTRITION', 'HYPERTROPHY_PERIODIZATION', 'MATERNAL_OBSTETRICS', 'ORTHOPEDIC_REHAB');

-- CreateEnum
CREATE TYPE "AdvisorTone" AS ENUM ('SCIENTIFIC_ANALYTICAL', 'EMPATHIC_NURTURING', 'DIRECT_TOUGH_LOVE');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar_url" TEXT,
    "biological_sex" "BiologicalSex",
    "age" INTEGER,
    "height_cm" DOUBLE PRECISION,
    "weight_kg" DOUBLE PRECISION,
    "activity_level" "ActivityLevel",
    "caloric_goal" "CaloricGoal",
    "life_stage" "LifeStage" NOT NULL DEFAULT 'GENERAL_ADULT',
    "available_equipment" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "is_home_gym" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "health_conditions" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "category" "ConditionCategory" NOT NULL,
    "severity" "ConditionSeverity" NOT NULL,
    "notes" TEXT NOT NULL DEFAULT '',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "blacklisted_movements" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "blacklisted_ingredients" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "diagnosed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "health_conditions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mesocycles" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "current_week" INTEGER NOT NULL DEFAULT 1,
    "total_weeks" INTEGER NOT NULL DEFAULT 6,
    "phase" "MesocyclePhase" NOT NULL DEFAULT 'BASELINE',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mesocycles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workout_sessions" (
    "id" UUID NOT NULL,
    "mesocycle_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "week_number" INTEGER NOT NULL,
    "day_number" INTEGER NOT NULL,
    "phase" "MesocyclePhase" NOT NULL,
    "estimated_duration_mins" INTEGER NOT NULL DEFAULT 60,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "completed_at" TIMESTAMP(3),
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workout_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prescribed_exercises" (
    "id" UUID NOT NULL,
    "session_id" UUID NOT NULL,
    "exercise_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "target_muscle" "MuscleGroup" NOT NULL,
    "category" "ExerciseCategory" NOT NULL,
    "order_index" INTEGER NOT NULL DEFAULT 0,
    "tempo" TEXT NOT NULL DEFAULT '3-0-1-0',
    "rest_seconds" INTEGER NOT NULL DEFAULT 90,
    "notes" TEXT,

    CONSTRAINT "prescribed_exercises_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "set_logs" (
    "id" UUID NOT NULL,
    "prescribed_exercise_id" UUID NOT NULL,
    "set_number" INTEGER NOT NULL,
    "target_reps" INTEGER NOT NULL,
    "actual_reps" INTEGER,
    "target_rir" DOUBLE PRECISION NOT NULL,
    "actual_rir" DOUBLE PRECISION,
    "weight_kg" DOUBLE PRECISION,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "rest_seconds" INTEGER NOT NULL DEFAULT 90,
    "completed_at" TIMESTAMP(3),

    CONSTRAINT "set_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exercise_swaps" (
    "id" UUID NOT NULL,
    "prescribed_exercise_id" UUID NOT NULL,
    "original_exercise_id" TEXT NOT NULL,
    "proposed_exercise_id" TEXT NOT NULL,
    "original_name" TEXT NOT NULL,
    "proposed_name" TEXT NOT NULL,
    "reason" "SwapReason" NOT NULL,
    "biomechanical_rationale" TEXT NOT NULL,
    "fatigue_reduction_factor" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "accepted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "exercise_swaps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "daily_meal_plans" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "date" DATE NOT NULL,
    "target_calories" DOUBLE PRECISION NOT NULL,
    "target_protein" DOUBLE PRECISION NOT NULL,
    "target_carbs" DOUBLE PRECISION NOT NULL,
    "target_fats" DOUBLE PRECISION NOT NULL,
    "target_water_ml" DOUBLE PRECISION NOT NULL,
    "water_logged_ml" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "daily_meal_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meal_items" (
    "id" UUID NOT NULL,
    "daily_meal_plan_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "meal_type" "MealType" NOT NULL,
    "calories" DOUBLE PRECISION NOT NULL,
    "protein" DOUBLE PRECISION NOT NULL,
    "carbs" DOUBLE PRECISION NOT NULL,
    "fats" DOUBLE PRECISION NOT NULL,
    "purine_mg" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "glycemic_load" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "meal_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "advisor_personas" (
    "id" UUID NOT NULL,
    "user_id" UUID,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "specialty" "AdvisorSpecialty" NOT NULL,
    "tone" "AdvisorTone" NOT NULL,
    "specialties" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "system_instructions" TEXT NOT NULL,
    "is_prebuilt" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "advisor_personas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chat_messages" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "advisor_id" UUID,
    "role" "MessageRole" NOT NULL,
    "content" TEXT NOT NULL,
    "auto_assigned" BOOLEAN NOT NULL DEFAULT false,
    "reasoning_trace" JSONB,
    "action_proposal" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chat_messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "health_conditions_user_id_active_idx" ON "health_conditions"("user_id", "active");

-- CreateIndex
CREATE INDEX "mesocycles_user_id_active_idx" ON "mesocycles"("user_id", "active");

-- CreateIndex
CREATE INDEX "workout_sessions_mesocycle_id_week_number_idx" ON "workout_sessions"("mesocycle_id", "week_number");

-- CreateIndex
CREATE INDEX "prescribed_exercises_session_id_order_index_idx" ON "prescribed_exercises"("session_id", "order_index");

-- CreateIndex
CREATE INDEX "set_logs_prescribed_exercise_id_set_number_idx" ON "set_logs"("prescribed_exercise_id", "set_number");

-- CreateIndex
CREATE INDEX "exercise_swaps_prescribed_exercise_id_idx" ON "exercise_swaps"("prescribed_exercise_id");

-- CreateIndex
CREATE INDEX "daily_meal_plans_user_id_date_idx" ON "daily_meal_plans"("user_id", "date");

-- CreateIndex
CREATE UNIQUE INDEX "daily_meal_plans_user_id_date_key" ON "daily_meal_plans"("user_id", "date");

-- CreateIndex
CREATE INDEX "meal_items_daily_meal_plan_id_idx" ON "meal_items"("daily_meal_plan_id");

-- CreateIndex
CREATE INDEX "advisor_personas_user_id_is_active_idx" ON "advisor_personas"("user_id", "is_active");

-- CreateIndex
CREATE INDEX "chat_messages_user_id_created_at_idx" ON "chat_messages"("user_id", "created_at");

-- AddForeignKey
ALTER TABLE "health_conditions" ADD CONSTRAINT "health_conditions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mesocycles" ADD CONSTRAINT "mesocycles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_sessions" ADD CONSTRAINT "workout_sessions_mesocycle_id_fkey" FOREIGN KEY ("mesocycle_id") REFERENCES "mesocycles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prescribed_exercises" ADD CONSTRAINT "prescribed_exercises_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "workout_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "set_logs" ADD CONSTRAINT "set_logs_prescribed_exercise_id_fkey" FOREIGN KEY ("prescribed_exercise_id") REFERENCES "prescribed_exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise_swaps" ADD CONSTRAINT "exercise_swaps_prescribed_exercise_id_fkey" FOREIGN KEY ("prescribed_exercise_id") REFERENCES "prescribed_exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "daily_meal_plans" ADD CONSTRAINT "daily_meal_plans_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meal_items" ADD CONSTRAINT "meal_items_daily_meal_plan_id_fkey" FOREIGN KEY ("daily_meal_plan_id") REFERENCES "daily_meal_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "advisor_personas" ADD CONSTRAINT "advisor_personas_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_messages" ADD CONSTRAINT "chat_messages_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_messages" ADD CONSTRAINT "chat_messages_advisor_id_fkey" FOREIGN KEY ("advisor_id") REFERENCES "advisor_personas"("id") ON DELETE SET NULL ON UPDATE CASCADE;
