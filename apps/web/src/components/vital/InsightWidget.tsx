"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useVital } from "@/lib/store";

export function InsightWidget({ text }: { text: string }) {
  const router = useRouter();
  const setCtx = useVital((s) => s.setCoachContext);
  return (
    <div className="glass relative overflow-hidden p-4 md:p-5">
      <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-primary/15 blur-3xl" />
      <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
          <Sparkles className="size-5" />
        </div>
        <div className="flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
            VitalAI Insight
          </p>
          <p className="mt-1 text-sm leading-relaxed text-foreground/90">{text}</p>
        </div>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            setCtx(text);
            router.push("/advisor");
          }}
          className="rounded-full border border-primary/40 px-4 py-2 text-xs font-semibold text-primary transition hover:bg-primary/10"
        >
          Ask AI Coach
        </motion.button>
      </div>
    </div>
  );
}
