"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
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
  const pendingRef = useRef(children);
  const [displayChildren, setDisplayChildren] = useState(children);

  useEffect(() => {
    pendingRef.current = children;
    if (pathname === committedPath.current) {
      setDisplayChildren(children);
    }
  }, [pathname, children]);

  const handleExitComplete = () => {
    flushSync(() => {
      committedPath.current = pathname;
      setDisplayChildren(pendingRef.current);
    });
  };

  if (reduceMotion) {
    return <div className="relative w-full">{children}</div>;
  }

  return (
    <div className="relative isolate w-full overflow-x-hidden">
      <AnimatePresence mode="wait" initial={false} onExitComplete={handleExitComplete}>
        <motion.div
          key={pathname}
          className="relative w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.18, ease: [0.4, 0, 0.2, 1] },
          }}
          transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: "relative",
            width: "100%",
          }}
        >
          {displayChildren}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
