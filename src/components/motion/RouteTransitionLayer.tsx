"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * Freezes outgoing page content until exit completes.
 * Prevents Next.js from swapping `children` mid-transition (ghost overlap bug).
 */
export function RouteTransitionLayer({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const committedPath = useRef(pathname);
  const [displayChildren, setDisplayChildren] = useState(children);

  useEffect(() => {
    if (pathname === committedPath.current) {
      setDisplayChildren(children);
    }
  }, [pathname, children]);

  const handleExitComplete = () => {
    committedPath.current = pathname;
    setDisplayChildren(children);
  };

  if (reduceMotion) {
    return <div className="relative w-full">{children}</div>;
  }

  return (
    <div className="relative isolate w-full overflow-x-hidden">
      <AnimatePresence mode="wait" initial={false} onExitComplete={handleExitComplete}>
        <motion.div
          key={pathname}
          className="relative w-full bg-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
          style={{ pointerEvents: "auto" }}
        >
          {displayChildren}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
