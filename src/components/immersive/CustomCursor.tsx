import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { useMouseParallax } from "../../hooks/useMouseParallax";

export function CustomCursor() {
  const { x, y } = useMouseParallax();
  const reduce = useReducedMotion();
  const [interactive, setInteractive] = useState(false);

  if (reduce || typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  useEffect(() => {
    const selector =
      'a,button,input,textarea,select,[role="button"],[data-cursor-interactive="true"]';
    function onMove(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      setInteractive(Boolean(target?.closest(selector)));
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[200] mix-blend-difference"
        animate={{ x: x - 6, y: y - 6 }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.2 }}
      >
        <div className="h-3 w-3 rounded-full bg-white" />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[199] rounded-full border border-amber-400/40"
        animate={{
          x: x - (interactive ? 26 : 20),
          y: y - (interactive ? 26 : 20),
          width: interactive ? 52 : 40,
          height: interactive ? 52 : 40,
          borderColor: interactive ? "rgba(251,191,36,0.62)" : "rgba(251,191,36,0.36)",
          boxShadow: interactive
            ? "0 0 36px -8px rgba(245,158,11,0.7)"
            : "0 0 0 rgba(0,0,0,0)",
        }}
        transition={{ type: "spring", stiffness: 120, damping: 18, mass: 0.4 }}
      />
    </>
  );
}
