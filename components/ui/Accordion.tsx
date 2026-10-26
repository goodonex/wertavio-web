"use client";

import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useId, useState } from "react";
import { cn, motionEase } from "@/lib/utils";

export interface AccordionItemData {
  id: string;
  question: string;
  answer: string;
}

export interface AccordionProps {
  items: AccordionItemData[];
}

export function Accordion({ items }: AccordionProps): JSX.Element {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);
  const baseId = useId();

  return (
    <div className="border-b border-wertavio-border">
      {items.map((item) => {
        const isOpen = openId === item.id;
        const headerId = `${baseId}-${item.id}-h`;
        const panelId = `${baseId}-${item.id}-p`;

        return (
          <div key={item.id} className="border-t border-wertavio-border">
            <h3>
              <button
                type="button"
                id={headerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full items-center justify-between gap-6 py-5 text-left font-display text-lg font-semibold text-wertavio-slate transition-colors hover:text-wertavio-slate/75"
                onClick={() => setOpenId(isOpen ? null : item.id)}
              >
                <span>{item.question}</span>
                <Plus
                  aria-hidden
                  className={cn(
                    "h-5 w-5 shrink-0 text-wertavio-gold-ink transition-transform duration-300",
                    isOpen && "rotate-45",
                  )}
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={headerId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: motionEase }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[62ch] pb-6 leading-relaxed text-wertavio-muted">{item.answer}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
