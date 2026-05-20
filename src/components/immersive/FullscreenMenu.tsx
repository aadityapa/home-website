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

          <nav className="relative flex flex-1 flex-col justify-center gap-2 px-8 md:px-16">
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
                    className={`block font-display text-4xl transition md:text-6xl ${
                      active
                        ? "text-amber-400"
                        : "text-white/90 hover:text-amber-300"
                    }`}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          <div className="relative border-t border-white/[0.06] px-8 py-8 md:px-16">
            <p className="font-display text-xl text-white">{BRAND.name}</p>
            <p className="mt-1 font-sans text-sm text-noir-400">{BRAND.phoneDisplay}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
