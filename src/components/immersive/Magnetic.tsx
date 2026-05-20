import { motion, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

export function Magnetic({ children, className = "", strength = 0.35 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={(e) => {
        if (reduce || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        ref.current.style.transform = `translate(${(e.clientX - cx) * strength}px, ${(e.clientY - cy) * strength}px)`;
      }}
      onMouseLeave={() => {
        if (ref.current) ref.current.style.transform = "translate(0,0)";
      }}
      style={{ transition: reduce ? undefined : "transform 0.35s cubic-bezier(0.16,1,0.3,1)" }}
    >
      {children}
    </motion.div>
  );
}
