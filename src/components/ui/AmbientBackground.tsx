import { motion, useReducedMotion } from "framer-motion";

/** 
 * Lightweight ambient background — CSS-only orbs + static grain.
 * No per-particle DOM animations (was 55 Framer Motion nodes).
 */
export function AmbientBackground() {
  const reduce = useReducedMotion();

  return (
    <div className="pointer-events-none fixed inset-0 -z-[1] overflow-hidden" aria-hidden>
      {/* Static base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 60% 30%, #fff7e8 0%, #fdf3e3 35%, #f5e6cc 70%, #ecdfc8 100%)",
        }}
      />

      {/* Just 3 slow CSS-animated orbs (no Framer JS animations) */}
      {!reduce && (
        <>
          <motion.div
            className="absolute rounded-full"
            style={{
              width: "50vmin", height: "50vmin",
              left: "-8%", top: "5%",
              background: "radial-gradient(circle, rgba(245,158,11,0.28) 0%, transparent 72%)",
              filter: "blur(36px)",
            }}
            animate={{ x: [0, 40, 0], y: [0, 24, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute rounded-full"
            style={{
              width: "44vmin", height: "44vmin",
              right: "-6%", top: "35%",
              background: "radial-gradient(circle, rgba(180,83,9,0.18) 0%, transparent 75%)",
              filter: "blur(44px)",
            }}
            animate={{ x: [0, -30, 0], y: [0, 18, 0] }}
            transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute rounded-full"
            style={{
              width: "56vmin", height: "38vmin",
              left: "12%", bottom: "-6%",
              background: "radial-gradient(ellipse, rgba(253,186,116,0.18) 0%, transparent 72%)",
              filter: "blur(40px)",
            }}
            animate={{ x: [0, 16, 0] }}
            transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Static grain texture — no animation */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `repeating-linear-gradient(128deg, rgba(180,83,9,0.5) 0px, rgba(180,83,9,0.5) 1px, transparent 1px, transparent 16px)`,
            }}
          />
        </>
      )}

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 58%, rgba(110,55,8,0.07) 100%)",
        }}
      />
    </div>
  );
}
