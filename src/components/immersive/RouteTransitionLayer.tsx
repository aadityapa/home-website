"use client";

import { AnimatePresence, motion } from "framer-motion";

export function RouteTransitionLayer({
  routeKey,
  children,
}: {
  routeKey: string;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={routeKey}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="pointer-events-none fixed inset-x-0 top-0 z-[48] h-[46vh] origin-top"
          style={{
            background:
              "linear-gradient(180deg, rgba(245,158,11,0.14) 0%, rgba(15,15,25,0.24) 32%, transparent 100%)",
          }}
          initial={{ scaleY: 1, opacity: 0.9 }}
          animate={{ scaleY: 0, opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.7, 0, 0.2, 1] }}
        />
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
