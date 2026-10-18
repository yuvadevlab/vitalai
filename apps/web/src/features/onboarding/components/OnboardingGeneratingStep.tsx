"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap } from "lucide-react";

interface OnboardingGeneratingStepProps {
  onDone?: () => void;
}

const phases = [
  "Analyzing biometrics...",
  "Optimizing weekly volume & recovery...",
  "Generating periodized Push/Pull/Legs routine...",
];

export function OnboardingGeneratingStep({ onDone }: OnboardingGeneratingStepProps) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((x) => Math.min(x + 1, 3)), 1300);
    return () => clearInterval(t);
  }, []);

  const done = i >= 3;

  return (
    <div className="flex flex-col items-center pt-10 text-center">
      <div className="relative grid size-48 place-items-center">
        {[0, 1, 2].map((k) => (
          <motion.span
            key={k}
            className="absolute inset-0 rounded-full border-2 border-primary"
            animate={{ scale: [0.6, 1.3], opacity: [0.8, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: k * 0.66 }}
          />
        ))}
        <div className="grid size-24 place-items-center rounded-full bg-gradient-volt glow-volt">
          <Zap className="size-10 text-primary-foreground" fill="currentColor" />
        </div>
      </div>
      <div className="mt-10 h-16">
        <AnimatePresence mode="wait">
          <motion.p
            key={i}
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -30, opacity: 0 }}
            className="font-display-x text-2xl"
          >
            {done ? "Your plan is ready." : phases[i]}
          </motion.p>
        </AnimatePresence>
      </div>
      <div className="h-1 w-64 overflow-hidden rounded-full bg-secondary">
        <motion.div className="h-full bg-primary" animate={{ width: `${(i / 3) * 100}%` }} />
      </div>
      {done && onDone && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileTap={{ scale: 0.97 }}
          onClick={onDone}
          className="mt-10 rounded-2xl bg-primary px-8 py-4 font-display-x text-xl text-primary-foreground glow-volt"
        >
          Enter VitalAI / Start Journey
        </motion.button>
      )}
    </div>
  );
}
