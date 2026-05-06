"use client";

import { motion } from "framer-motion";

export function FormProgress({ progress }: { progress: number }): JSX.Element {
  return (
    <div aria-hidden className="space-y-2">
      <div className="flex justify-between text-xs text-wertavio-muted">
        <span>Fortschritt</span>
        <span>{Math.round(progress)} %</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-wertavio-cream">
        <motion.div
          className="h-full bg-wertavio-gold"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
      </div>
    </div>
  );
}
