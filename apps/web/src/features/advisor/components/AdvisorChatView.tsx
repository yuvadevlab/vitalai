"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AppShell } from "@/components/vital/AppShell";
import { useVital } from "@/lib/store";
import { reply, type Msg } from "./advisor-utils";

const prompts = [
  "How should I warm up for 85kg incline bench?",
  "My lower back is fatigued, how should I modify tomorrow's leg day?",
  "Am I lifting enough volume for chest hypertrophy this week?",
  "Suggest a quick high-protein post-workout snack.",
];

function Rich({ text }: { text: string }) {
  return (
    <div className="space-y-1">
      {text.split("\n").map((line, i) => {
        const bullet = line.startsWith("- ");
        const parts = (bullet ? line.slice(2) : line).split(/\*\*(.+?)\*\*/g);
        const content = parts.map((p, j) =>
          j % 2 ? (
            <strong key={j} className="text-primary">
              {p}
            </strong>
          ) : (
            p
          ),
        );
        return bullet ? (
          <div key={i} className="flex gap-2">
            <span className="text-primary">▸</span>
            <span>{content}</span>
          </div>
        ) : (
          <p key={i}>{content}</p>
        );
      })}
    </div>
  );
}

export function AdvisorChatView() {
  const { profile, coachContext, setCoachContext } = useVital();
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "coach",
      text: `Locked in, **${profile.name}**. I know your stats — ${profile.weight}kg, ${profile.goal}, ${profile.equipment}. What are we optimizing today?`,
    },
  ]);
  const [input, setInput] = useState(
    coachContext ? `About this insight: "${coachContext}" — what should I do?` : "",
  );
  const [prevContext, setPrevContext] = useState(coachContext);
  const [typing, setTyping] = useState(false);
  const end = useRef<HTMLDivElement>(null);

  if (coachContext && coachContext !== prevContext) {
    setPrevContext(coachContext);
    setInput(`About this insight: "${coachContext}" — what should I do?`);
  }

  useEffect(() => {
    if (coachContext) {
      setCoachContext(null);
    }
  }, [coachContext, setCoachContext]);

  useEffect(() => {
    end.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing]);

  const send = (q: string) => {
    if (!q.trim()) return;
    setMsgs((m) => [...m, { role: "user", text: q }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, reply(q, profile)]);
    }, 900);
  };

  return (
    <AppShell insight="Ask anything about load, recovery or nutrition — I factor in your injuries and logged tonnage.">
      <div className="flex items-center gap-3">
        <div className="grid size-11 place-items-center rounded-xl bg-gradient-volt glow-volt">
          <Bot className="size-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-display-x text-4xl">AI Coach</h1>
          <p className="text-xs text-muted-foreground">Scientifically rigorous. Zero fluff.</p>
        </div>
      </div>
      <div className="glass mt-5 flex h-[60vh] flex-col p-4">
        <div className="flex-1 space-y-3 overflow-y-auto pr-1">
          <AnimatePresence initial={false}>
            {msgs.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: m.role === "user" ? 30 : -30 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex ${m.role === "user" ? "justify-end" : ""}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    m.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary"
                  }`}
                >
                  {m.role === "user" ? m.text : <Rich text={m.text} />}
                  {m.confidence && (
                    <span className="tabular mt-2 inline-block rounded-full bg-primary/15 px-2 py-0.5 text-[10px] text-primary">
                      {m.confidence}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {typing && (
            <div className="flex gap-1 px-2">
              {[0, 1, 2].map((k) => (
                <motion.span
                  key={k}
                  className="size-2 rounded-full bg-primary"
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 1, repeat: Infinity, delay: k * 0.2 }}
                />
              ))}
            </div>
          )}
          <div ref={end} />
        </div>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {prompts.map((p) => (
            <button
              key={p}
              onClick={() => send(p)}
              className="shrink-0 rounded-full border px-3 py-1.5 text-xs text-muted-foreground hover:border-primary hover:text-primary"
            >
              {p}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="mt-3 flex gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your coach..."
            className="flex-1 rounded-xl border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
          />
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="grid size-12 place-items-center rounded-xl bg-primary text-primary-foreground"
          >
            <Send className="size-5" />
          </motion.button>
        </form>
      </div>
    </AppShell>
  );
}
