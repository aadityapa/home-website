"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BRAND } from "@/data/brand";

const links = [
  { href: "/", label: "Home", exact: true },
  { href: "/shop", label: "Shop", exact: false },
  { href: "/about", label: "About", exact: false },
  { href: "/journey", label: "Journey", exact: false },
  { href: "/contact", label: "Contact", exact: false },
];

type Props = {
  open: boolean;
  onClose: () => void;
};

export function FullscreenMenu({ open, onClose }: Props) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col bg-noir-950/98 backdrop-blur-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(circle at 70% 30%, rgba(245,158,11,0.2), transparent 55%)",
            }}
          />
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              background:
                "linear-gradient(110deg, transparent 15%, rgba(139,92,246,0.18) 45%, rgba(245,158,11,0.16) 72%, transparent 100%)",
            }}
            animate={{ x: ["-4%", "4%", "-4%"] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative flex items-center justify-between px-6 py-6 md:px-12">
            <p className="font-sans text-xs uppercase tracking-[0.4em] text-amber-500/80">
              Menu
            </p>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-white/10 px-4 py-2 font-sans text-sm text-noir-200 hover:border-amber-500/40"
              aria-label="Close menu"
            >
              Close
            </button>
          </div>

          <div className="relative grid flex-1 items-center gap-10 px-8 py-4 md:grid-cols-[1.1fr_0.9fr] md:px-16">
          <nav className="relative flex flex-col justify-center gap-2">
            {links.map((l, i) => {
              const active = l.exact
                ? pathname === l.href
                : pathname.startsWith(l.href) && l.href !== "/";
              return (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={l.href}
                    onClick={onClose}
                    className={`group relative inline-block overflow-hidden font-display text-4xl transition md:text-6xl ${
                      active
                        ? "text-amber-400"
                        : "text-white/90 hover:text-amber-300"
                    }`}
                  >
                    <span className="block translate-y-0 transition-transform duration-500 group-hover:-translate-y-full">
                      {l.label}
                    </span>
                    <span
                      aria-hidden
                      className="absolute left-0 top-full block text-amber-300 transition-transform duration-500 group-hover:-translate-y-full"
                    >
                      {l.label}
                    </span>
                    <span className="pointer-events-none absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-amber-400/90 to-transparent transition-all duration-500 group-hover:w-full" />
                  </Link>
                </motion.div>
              );
            })}
          </nav>
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="hidden rounded-3xl border border-white/[0.1] bg-white/[0.03] p-6 md:block"
          >
            <p className="font-sans text-[10px] uppercase tracking-[0.36em] text-amber-400/85">
              Immersive Commerce
            </p>
            <h3 className="mt-3 font-display text-3xl text-white">
              Cinematic navigation surface
            </h3>
            <p className="mt-4 font-sans text-sm leading-relaxed text-noir-300">
              Designed for fluid route discovery with tactile transitions, premium typography, and motion-led hierarchy.
            </p>
            <div className="mt-6 space-y-3">
              {["3D ready routes", "Luxury interaction language", "Conversion-focused flow"].map((point) => (
                <div key={point} className="flex items-center gap-2 text-noir-200">
                  <span className="text-amber-400">✦</span>
                  <span className="font-sans text-sm">{point}</span>
                </div>
              ))}
            </div>
          </motion.aside>
          </div>

          <div className="relative border-t border-white/[0.06] px-8 py-8 md:px-16">
            <p className="font-display text-xl text-white">{BRAND.name}</p>
            <p className="mt-1 font-sans text-sm text-noir-400">{BRAND.phoneDisplay}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
