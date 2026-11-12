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
    <div className="vt-generating">
      <div className="vt-generating__pulse-box">
        {[0, 1, 2].map((k) => (
          <motion.span
            key={k}
            className="vt-generating__ring"
            animate={{ scale: [0.6, 1.3], opacity: [0.8, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: k * 0.66 }}
          />
        ))}
        <div className="vt-generating__icon-circle vt-gradient-volt vt-glow-volt">
          <Zap
            style={{ width: "2.5rem", height: "2.5rem" }}
            color="var(--primaryForeground)"
            fill="currentColor"
          />
        </div>
      </div>
      <div className="vt-generating__phase-box">
        <AnimatePresence mode="wait">
          <motion.p
            key={i}
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -30, opacity: 0 }}
            className="vt-font-display vt-generating__phase-text"
          >
            {done ? "Your plan is ready." : phases[i]}
          </motion.p>
        </AnimatePresence>
      </div>
      <div className="vt-generating__track">
        <motion.div className="vt-generating__fill" animate={{ width: `${(i / 3) * 100}%` }} />
      </div>
      {done && onDone && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileTap={{ scale: 0.97 }}
          onClick={onDone}
          className="vt-generating__done-btn vt-glow-volt"
        >
          Enter VitalAI / Start Journey
        </motion.button>
      )}
    </div>
  );
}
