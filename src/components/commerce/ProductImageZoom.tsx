"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MotionImage } from "@/components/motion/MotionImage";

type ProductImageZoomProps = {
  src: string;
  alt: string;
  priority?: boolean;
};

export function ProductImageZoom({ src, alt, priority }: ProductImageZoomProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative block h-full w-full overflow-hidden rounded-2xl border border-white/[0.14] bg-gradient-to-br from-[#1f1110] via-[#0e1019] to-[#09090f] shadow-2xl shadow-black/45 md:rounded-3xl"
        aria-label={`Zoom ${alt}`}
      >
        <MotionImage
          src={src}
          alt={alt}
          width={1200}
          height={900}
          priority={priority}
          imageClassName="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute bottom-3 right-3 rounded-full border border-white/20 bg-black/50 px-3 py-1 font-sans text-[10px] uppercase tracking-[0.16em] text-white backdrop-blur-md">
          Tap to zoom
        </span>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={`${alt} zoomed`}
          >
            <motion.div
              className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl border border-white/15"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <MotionImage src={src} alt={alt} width={1600} height={1200} imageClassName="object-contain" />
            </motion.div>
            <button
              type="button"
              className="absolute right-4 top-4 rounded-full border border-white/20 bg-black/60 px-3 py-1.5 font-sans text-xs text-white"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
