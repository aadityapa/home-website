import { LazyMotion, domAnimation } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Lazy-loads Framer Motion DOM features (~40% smaller than full `motion` bundle).
 * Use `m` from `framer-motion` inside this tree for animated elements.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
