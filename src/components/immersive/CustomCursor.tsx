import { motion, useReducedMotion } from "framer-motion";
import { useMouseParallax } from "../../hooks/useMouseParallax";

export function CustomCursor() {
  const { x, y } = useMouseParallax();
  const reduce = useReducedMotion();

  if (reduce || typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

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
        animate={{ x: x - 20, y: y - 20 }}
        transition={{ type: "spring", stiffness: 120, damping: 18, mass: 0.4 }}
        style={{ width: 40, height: 40 }}
      />
    </>
  );
}
