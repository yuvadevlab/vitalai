"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { useVital } from "@/lib/store";
import { COMMON_COPY } from "@/lib/ui-copy";

export function InsightWidget({ text }: { text: string }) {
  const router = useRouter();
  const setCtx = useVital((s) => s.setCoachContext);
  return (
    <div className="vt-glass vt-insight-widget">
      <div className="vt-insight-widget__glow" />
      <div className="vt-insight-widget__body">
        <div className="vt-insight-widget__icon-wrap">
          <Sparkles className="vt-insight-widget__icon" />
        </div>
        <div className="vt-insight-widget__content">
          <p className="vt-insight-widget__badge">{COMMON_COPY.insight.badge}</p>
          <p className="vt-insight-widget__text">{text}</p>
        </div>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            setCtx(text);
            router.push("/advisor");
          }}
          className="vt-insight-widget__btn"
        >
          {COMMON_COPY.insight.askCoach}
          <ArrowRight style={{ width: "0.875rem", height: "0.875rem" }} />
        </motion.button>
      </div>
    </div>
  );
}
