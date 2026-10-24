-- AlterTable
ALTER TABLE "advisor_personas" ADD COLUMN     "enabled_tools" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "model_config" JSONB DEFAULT '{}',
ADD COLUMN     "slug" TEXT,
ADD COLUMN     "sort_order" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "llm_providers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "provider_type" TEXT NOT NULL,
    "description" TEXT,
    "base_url" TEXT,
    "config" JSONB NOT NULL DEFAULT '{}',
    "is_enabled" BOOLEAN NOT NULL DEFAULT true,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "llm_providers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "llm_models" (
    "id" TEXT NOT NULL,
    "provider_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "model_identifier" TEXT NOT NULL,
    "description" TEXT,
    "capabilities" JSONB NOT NULL DEFAULT '{}',
    "default_config" JSONB NOT NULL DEFAULT '{}',
    "context_window" INTEGER NOT NULL DEFAULT 8192,
    "is_default" BOOLEAN NOT NULL DEFAULT false,
    "is_enabled" BOOLEAN NOT NULL DEFAULT true,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "llm_models_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nav_items" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "icon" TEXT,
    "href" TEXT NOT NULL,
    "roles" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "section" TEXT NOT NULL DEFAULT 'main',
    "is_visible" BOOLEAN NOT NULL DEFAULT true,
    "is_enabled" BOOLEAN NOT NULL DEFAULT true,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "nav_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "platform_configs" (
    "id" TEXT NOT NULL,
    "namespace" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "platform_configs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_prompt_templates" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "version" INTEGER NOT NULL DEFAULT 1,
    "content" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "system_prompt_templates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "llm_providers_slug_key" ON "llm_providers"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "llm_models_provider_id_model_identifier_key" ON "llm_models"("provider_id", "model_identifier");

-- CreateIndex
CREATE UNIQUE INDEX "platform_configs_namespace_key_key" ON "platform_configs"("namespace", "key");

-- CreateIndex
CREATE UNIQUE INDEX "system_prompt_templates_slug_key" ON "system_prompt_templates"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "advisor_personas_slug_key" ON "advisor_personas"("slug");

-- AddForeignKey
ALTER TABLE "llm_models" ADD CONSTRAINT "llm_models_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "llm_providers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

