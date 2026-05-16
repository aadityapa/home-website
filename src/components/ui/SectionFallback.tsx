import { motion } from "framer-motion";

export function SectionFallback({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4">
      <motion.div
        className="h-12 w-12 rounded-full border-2 border-saffron-500/30 border-t-saffron-600"
        animate={{ rotate: 360 }}
        transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
      />
      <p className="font-sans text-sm text-clay-500">{label}</p>
    </div>
  );
}
