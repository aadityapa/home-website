"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Avoids SSR/client mismatches from `useReducedMotion()` and Framer `initial` props.
 * Until mounted, skip motion `initial` so server HTML matches the first client paint.
 */
export function useMotionReady() {
  const [mounted, setMounted] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  const skipInitial = !mounted || Boolean(reduceMotion);

  return {
    mounted,
    reduceMotion: Boolean(reduceMotion),
    skipInitial,
  };
}
