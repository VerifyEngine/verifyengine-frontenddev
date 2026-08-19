"use client";

import { AnimatePresence, motion } from "motion/react";
import { Plus, ChevronDown } from "lucide-react";
import { useState, type ReactNode } from "react";

export type AccordionItem = {
  question: string;
  answer: ReactNode;
};

/**
 * Expand/collapse list used for FAQs and any "question → answer" block.
 *
 * Two looks, both in the supplied designs: `divided` is a plain list split by
 * hairlines; `cards` gives each row its own bordered card and tints the open
 * one, matching the FAQ page.
 */
export function Accordion({
  items,
  allowMultiple = false,
  defaultOpen = 0,
  variant = "divided",
  icon = "chevron",
}: {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpen?: number | null;
  variant?: "divided" | "cards";
  icon?: "plus" | "chevron";
}) {
  const [open, setOpen] = useState<number[]>(defaultOpen === null ? [] : [defaultOpen]);

  function toggle(i: number) {
    setOpen((current) => {
      const isOpen = current.includes(i);
      if (allowMultiple) {
        return isOpen ? current.filter((v) => v !== i) : [...current, i];
      }
      return isOpen ? [] : [i];
    });
  }

  const isCards = variant === "cards";

  return (
    <div className={isCards ? "space-y-3" : "divide-y divide-slate-200"}>
      {items.map((item, i) => {
        const isOpen = open.includes(i);
        return (
          <div
            key={item.question}
            className={
              isCards
                ? `overflow-hidden rounded-xl border transition-colors ${
                    isOpen ? "border-teal-500/30 bg-bg-mint-50" : "border-slate-200 bg-white"
                  }`
                : undefined
            }
          >
            <button
              type="button"
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              className={`flex w-full cursor-pointer items-center justify-between gap-4 text-left ${
                isCards ? "px-5 py-4" : "py-5"
              }`}
            >
              <span
                className={`text-base font-semibold ${
                  isCards && isOpen ? "text-teal-700" : "text-ink-900"
                }`}
              >
                {item.question}
              </span>

              {icon === "plus" ? (
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex size-7 shrink-0 items-center justify-center rounded-full transition-colors ${
                    isOpen ? "bg-teal-500 text-white" : "bg-bg-muted text-slate-500"
                  }`}
                >
                  <Plus className="size-4" strokeWidth={2.5} />
                </motion.span>
              ) : (
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className={`shrink-0 ${isOpen ? "text-teal-600" : "text-slate-400"}`}
                >
                  <ChevronDown className="size-5" strokeWidth={2} />
                </motion.span>
              )}
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div
                    className={`text-sm leading-relaxed text-slate-600 ${
                      isCards ? "px-5 pb-5" : "pr-11 pb-5"
                    }`}
                  >
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
