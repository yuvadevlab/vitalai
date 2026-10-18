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
    <div className="mx-auto flex min-h-screen max-w-xl flex-col px-5 py-6">
      <div className="flex items-center gap-3">
        <div className="grid size-9 place-items-center rounded-lg bg-gradient-volt">
          <Zap className="size-5 text-primary-foreground" fill="currentColor" />
        </div>
        <span className="font-display-x text-2xl">VitalAI</span>
        <span className="tabular ml-auto text-xs text-muted-foreground">
          {Math.min(step + 1, 6)} / 6
        </span>
      </div>

      <div className="mt-4 flex gap-1.5">
        {titles.slice(0, 6).map((_, i) => (
          <div key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-secondary">
            <motion.div
              className="h-full bg-primary"
              initial={false}
              animate={{ width: i <= step ? "100%" : "0%" }}
              transition={{ duration: 0.4 }}
            />
          </div>
        ))}
      </div>

      <div className="relative mt-8 flex-1">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            initial={{ x: 35 * dir, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -35 * dir, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            {step < 6 && <h1 className="font-display-x mb-6 text-5xl">{titles[step]}</h1>}

            {step === 0 && (
              <div className="space-y-3">
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
              <div className="space-y-3">
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
              <div className="space-y-3">
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
              <div className="space-y-3">
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
        <div className="mt-8 flex gap-3">
          {step > 0 && (
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => go(-1)}
              className="grid size-14 place-items-center rounded-2xl border"
            >
              <ArrowLeft className="size-5" />
            </motion.button>
          )}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => go(1)}
            className="flex h-14 flex-1 items-center justify-center gap-2 rounded-2xl bg-primary font-display-x text-xl text-primary-foreground glow-volt"
          >
            {step === 5 ? "Generate My Plan" : "Continue"} <ArrowRight className="size-5" />
          </motion.button>
        </div>
      )}
    </div>
  );
}
