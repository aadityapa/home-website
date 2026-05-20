import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function GlassCard({ children, className = "", delay = 0 }: Props) {
  return (
    <motion.div
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xl ${className}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,200,120,0.12) 0%, transparent 50%, rgba(255,255,255,0.06) 100%)",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
      {children}
    </motion.div>
  );
}
