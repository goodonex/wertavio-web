"use client";

import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useId, useState } from "react";
import { cn } from "@/lib/utils";

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
  const headingId = useId();

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, index) => {
        const isOpen = openId === item.id;
        const headerId = `${headingId}-${item.id}-h`;
        const panelId = `${headingId}-${item.id}-p`;

        return (
          <div key={item.id} className="card-surface overflow-hidden p-0">
            <h3 className="text-base font-semibold text-wertavio-slate">
              <button
                type="button"
                id={headerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left text-base font-semibold text-wertavio-slate transition-colors hover:bg-wertavio-cream/60"
                onClick={() => setOpenId(isOpen ? null : item.id)}
              >
                <span className="pr-2">
                  {index + 1}. {item.question}
                </span>
                <ChevronDown
                  aria-hidden
                  className={cn(
                    "h-5 w-5 shrink-0 text-wertavio-muted transition-transform duration-300",
                    isOpen ? "rotate-180" : "rotate-0",
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
                  transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
                  className="overflow-hidden px-6"
                >
                  <p className="pb-5 text-sm leading-relaxed text-wertavio-muted">
                    {item.answer}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
