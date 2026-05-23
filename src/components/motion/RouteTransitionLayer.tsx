"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { pageVariants, pageVariantsReduced } from "@/lib/motion";

export function RouteTransitionLayer({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const variants = reduceMotion ? pageVariantsReduced : pageVariants;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        className="relative min-h-[50vh] will-change-[opacity,transform]"
        variants={variants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        {/* Google-style top sweep on enter */}
        {!reduceMotion ? (
          <motion.div
            className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-[min(42vh,320px)] origin-top"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(245,158,11,0.08) 28%, transparent 100%)",
            }}
            initial={{ opacity: 0.85, scaleY: 1 }}
            animate={{ opacity: 0, scaleY: 0.55 }}
            transition={{ duration: 0.5, ease: [0.2, 0, 0.2, 1] }}
            aria-hidden
          />
        ) : null}

        <motion.div
          className="relative z-[1]"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.32, delay: reduceMotion ? 0 : 0.06, ease: [0, 0, 0.2, 1] }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
