"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Zap } from "lucide-react";
import { useVital } from "@/lib/store";
import {
  OptionCard,
  BiometricsForm,
  GOALS,
  FOCUS,
  LEVELS,
  LEVEL_SUB,
  EQUIP,
} from "@/components/vital/ProfileFields";
import { OnboardingGeneratingStep } from "./OnboardingGeneratingStep";
import { OnboardingScheduleStep } from "./OnboardingScheduleStep";

const titles = [
  "Primary Goal",
  "Target Focus",
  "Fitness Level",
  "Equipment",
  "Schedule",
  "Biometrics",
  "Generating",
];

export function OnboardingWizard() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const { profile, setProfile, completeOnboarding } = useVital();
  const router = useRouter();

  const go = (d: number) => {
    setDir(d);
    setStep((s) => Math.max(0, Math.min(6, s + d)));
  };

  const finish = () => {
    completeOnboarding();
    router.push("/");
  };

  return (
    <div className="vt-onboarding">
      <div className="vt-onboarding__header">
        <div className="vt-onboarding__logo-icon vt-gradient-volt">
          <Zap
            style={{ width: "1.25rem", height: "1.25rem" }}
            color="var(--primaryForeground)"
            fill="currentColor"
          />
        </div>
        <span className="vt-font-display vt-onboarding__brand">VitalAI</span>
        <span className="vt-tabular vt-onboarding__step-count">{Math.min(step + 1, 6)} / 6</span>
      </div>

      <div className="vt-onboarding__progress">
        {titles.slice(0, 6).map((_, i) => (
          <div key={i} className="vt-onboarding__progress-track">
            <motion.div
              className="vt-onboarding__progress-fill"
              initial={false}
              animate={{ width: i <= step ? "100%" : "0%" }}
              transition={{ duration: 0.4 }}
            />
          </div>
        ))}
      </div>

      <div className="vt-onboarding__body">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            initial={{ x: 35 * dir, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -35 * dir, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            {step < 6 && <h1 className="vt-font-display vt-onboarding__title">{titles[step]}</h1>}

            {step === 0 && (
              <div className="vt-onboarding__list">
                {GOALS.map((g) => (
                  <OptionCard
                    key={g}
                    label={g}
                    active={profile.goal === g}
                    onClick={() => setProfile({ goal: g })}
                  />
                ))}
              </div>
            )}

            {step === 1 && (
              <div className="vt-onboarding__list">
                {FOCUS.map((f) => (
                  <OptionCard
                    key={f}
                    label={f}
                    active={profile.focus.includes(f)}
                    onClick={() =>
                      setProfile({
                        focus: profile.focus.includes(f)
                          ? profile.focus.filter((x) => x !== f)
                          : [...profile.focus, f],
                      })
                    }
                  />
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="vt-onboarding__list">
                {LEVELS.map((l) => (
                  <OptionCard
                    key={l}
                    label={l}
                    sub={LEVEL_SUB[l]}
                    active={profile.level === l}
                    onClick={() => setProfile({ level: l })}
                  />
                ))}
              </div>
            )}

            {step === 3 && (
              <div className="vt-onboarding__list">
                {EQUIP.map((e) => (
                  <OptionCard
                    key={e}
                    label={e}
                    active={profile.equipment === e}
                    onClick={() => setProfile({ equipment: e })}
                  />
                ))}
              </div>
            )}

            {step === 4 && <OnboardingScheduleStep />}

            {step === 5 && <BiometricsForm />}

            {step === 6 && <OnboardingGeneratingStep onDone={finish} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {step < 6 && (
        <div className="vt-onboarding__footer">
          {step > 0 && (
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => go(-1)}
              className="vt-onboarding__back-btn"
              aria-label="Previous step"
            >
              <ArrowLeft style={{ width: "1.25rem", height: "1.25rem" }} />
            </motion.button>
          )}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => go(1)}
            className="vt-onboarding__next-btn vt-glow-volt"
          >
            {step === 5 ? "Generate My Plan" : "Continue"}{" "}
            <ArrowRight style={{ width: "1.25rem", height: "1.25rem" }} />
          </motion.button>
        </div>
      )}
    </div>
  );
}
