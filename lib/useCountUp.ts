"use client";

import { animate } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Zählt von 0 bis `target` über `durationMs` (ease-out), sobald `active` true ist.
 * Nutzt Framer Motion `animate` für die Interpolation.
 */
export function useCountUp(target: number, active: boolean, durationMs: number): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }
    const controls = animate(0, target, {
      duration: durationMs / 1000,
      ease: [0.33, 1, 0.68, 1],
      onUpdate: (v) => {
        setValue(v);
      },
    });
    return (): void => controls.stop();
  }, [active, target, durationMs]);

  return value;
}
