"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";

export function CommerceHomeAmbience() {
  const shouldReduceMotion = useReducedMotion();
  const { reduceEffects } = usePerformanceMode();
  const { scrollYProgress } = useScroll();
  const drift = reduceEffects || shouldReduceMotion ? 0 : 1;
  const glowDriftTop = useTransform(scrollYProgress, [0, 1], [0, 120 * drift]);
  const glowDriftBottom = useTransform(scrollYProgress, [0, 1], [0, -96 * drift]);

  if (reduceEffects && shouldReduceMotion) {
    return (
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-50"
        aria-hidden
        style={{
          background:
            "radial-gradient(70% 50% at 50% 0%, rgba(255,209,129,0.12), transparent 70%)",
        }}
      />
    );
  }

  return (
    <>
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-70"
        style={{ y: glowDriftTop }}
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(72% 44% at 18% 10%, rgba(255,244,229,0.18), transparent 64%), radial-gradient(58% 35% at 84% 28%, rgba(255,183,77,0.22), transparent 70%)",
          }}
        />
      </motion.div>
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-75"
        style={{ y: glowDriftBottom }}
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(52% 40% at 78% 72%, rgba(255,137,89,0.17), transparent 72%), radial-gradient(45% 34% at 20% 82%, rgba(255,209,129,0.13), transparent 72%)",
          }}
        />
      </motion.div>
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-35"
        aria-hidden
        style={{
          background:
            "repeating-linear-gradient(128deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 13px)",
        }}
      />
    </>
  );
}
