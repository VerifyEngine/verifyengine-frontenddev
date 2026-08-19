"use client";

import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useState, type ReactNode } from "react";

export type AccordionItem = {
  question: string;
  answer: ReactNode;
};

/**
 * Expand/collapse list used for FAQs and any "question → answer" block.
 * Single-open by default (matching the FAQ design); pass allowMultiple to let
 * several panels stay open at once.
 */
export function Accordion({
  items,
  allowMultiple = false,
  defaultOpen = 0,
}: {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpen?: number | null;
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

  return (
    <div className="divide-y divide-slate-200">
      {items.map((item, i) => {
        const isOpen = open.includes(i);
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left"
            >
              <span className="text-base font-semibold text-ink-900">{item.question}</span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.2 }}
                className={`flex size-7 shrink-0 items-center justify-center rounded-full transition-colors ${
                  isOpen ? "bg-teal-500 text-white" : "bg-bg-muted text-slate-500"
                }`}
              >
                <Plus className="size-4" strokeWidth={2.5} />
              </motion.span>
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
                  <div className="pr-11 pb-5 text-sm leading-relaxed text-slate-600">
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
