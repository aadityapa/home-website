import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BRAND } from "../../data/brand";
import { easeOut } from "../../lib/motion";

type Props = { onDone: () => void };

function CounterDigit({ value, max }: { value: number; max: number }) {
  const pct = (value / max) * 100;
  return (
    <motion.span
      className="tabular-nums"
      key={value}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.15, ease: easeOut }}
    >
      {String(Math.floor(pct)).padStart(3, "0")}
    </motion.span>
  );
}

export function LoadingScreen({ onDone }: Props) {
  const [exit, setExit] = useState(false);
  const [count, setCount] = useState(0);
  const [glitch, setGlitch] = useState(false);
  const total = 120; // steps
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let step = 0;
    intervalRef.current = setInterval(() => {
      step += 1;
      setCount(step);
      // glitch flash at 50 and 90
      if (step === 60 || step === 108) setGlitch(true);
      setTimeout(() => setGlitch(false), 80);
      if (step >= total) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setTimeout(() => setExit(true), 280);
      }
    }, 14);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const pct = Math.floor((count / total) * 100);

  return (
    <AnimatePresence mode="wait" onExitComplete={onDone}>
      {!exit && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden"
          style={{
            background: "radial-gradient(ellipse at 60% 40%, #1a0e05 0%, #0d0804 60%, #000 100%)",
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7, ease: easeOut }}
        >
          {/* Animated grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(230,160,26,0.6) 1px, transparent 1px),
                linear-gradient(90deg, rgba(230,160,26,0.6) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />

          {/* Glowing orbs */}
          <motion.div
            className="pointer-events-none absolute left-1/4 top-1/4 h-64 w-64 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(230,130,30,0.18) 0%, transparent 70%)" }}
            animate={{ scale: [1, 1.15, 1], x: [0, 20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="pointer-events-none absolute right-1/4 bottom-1/3 h-48 w-48 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(180,80,0,0.15) 0%, transparent 70%)" }}
            animate={{ scale: [1, 1.2, 1], y: [0, -16, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Brand name */}
          <motion.div
            className="relative text-center"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: easeOut }}
          >
            <motion.p
              className="font-display text-[11px] uppercase tracking-[0.55em] text-amber-400/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {BRAND.company}
            </motion.p>
            <motion.h1
              className={`mt-3 font-display text-5xl tracking-[0.18em] text-amber-100 md:text-6xl ${
                glitch ? "translate-x-[2px] text-amber-300" : ""
              }`}
              style={{
                textShadow: glitch
                  ? "2px 0 0 rgba(255,100,50,0.8), -2px 0 0 rgba(50,150,255,0.5)"
                  : "0 0 40px rgba(230,160,30,0.3)",
                transition: "text-shadow 0.05s, transform 0.05s",
              }}
            >
              {BRAND.name}
            </motion.h1>
            <motion.p
              className="mt-2 font-sans text-sm font-light tracking-[0.3em] text-amber-200/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {BRAND.tagline}
            </motion.p>
          </motion.div>

          {/* Progress bar + counter */}
          <motion.div
            className="mt-16 flex w-72 flex-col items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {/* Bar track */}
            <div className="relative h-[2px] w-full overflow-hidden rounded-full bg-amber-900/40">
              <motion.div
                className="absolute left-0 top-0 h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #b45309, #f59e0b, #e6a01a)",
                  boxShadow: "0 0 12px rgba(245,158,11,0.7)",
                }}
                initial={{ width: "0%" }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.12 }}
              />
              {/* Shimmer */}
              <motion.div
                className="absolute inset-y-0 w-16 rounded-full"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                  left: `${Math.max(0, pct - 12)}%`,
                }}
              />
            </div>

            {/* Counter */}
            <div className="flex items-baseline gap-1">
              <span
                className="font-mono text-3xl font-thin text-amber-300/80"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                <CounterDigit value={count} max={total} />
              </span>
              <span className="font-mono text-sm text-amber-600/60">%</span>
            </div>

            <motion.p
              className="text-center font-sans text-[10px] uppercase tracking-[0.4em] text-amber-700/50"
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Crafting tradition…
            </motion.p>
          </motion.div>

          {/* Corner decorations */}
          {["top-4 left-4", "top-4 right-4", "bottom-4 left-4", "bottom-4 right-4"].map((pos, i) => (
            <motion.div
              key={i}
              className={`absolute ${pos} h-6 w-6`}
              style={{
                borderTop: i < 2 ? "1px solid rgba(245,158,11,0.4)" : "none",
                borderBottom: i >= 2 ? "1px solid rgba(245,158,11,0.4)" : "none",
                borderLeft: i % 2 === 0 ? "1px solid rgba(245,158,11,0.4)" : "none",
                borderRight: i % 2 === 1 ? "1px solid rgba(245,158,11,0.4)" : "none",
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
