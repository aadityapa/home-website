"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePageTransition } from "@/context/PageTransitionContext";

export function NavigationProgress() {
  const { isNavigating } = usePageTransition();
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[3px] overflow-hidden"
      aria-hidden
    >
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 shadow-[0_0_12px_rgba(245,158,11,0.55)]"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={
          isNavigating
            ? { scaleX: 0.92, opacity: 1 }
            : { scaleX: 1, opacity: 0 }
        }
        transition={
          isNavigating
            ? { scaleX: { duration: 0.55, ease: [0.2, 0, 0.2, 1] }, opacity: { duration: 0.15 } }
            : { scaleX: { duration: 0.22, ease: [0.4, 0, 1, 1] }, opacity: { duration: 0.35, delay: 0.08 } }
        }
      />
    </div>
  );
}
