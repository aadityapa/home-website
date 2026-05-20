"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BRAND } from "../../data/brand";
import { transitionSection, viewportReveal } from "../../lib/motion";

const footerLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/journey", label: "Journey" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="theme-immersive relative overflow-hidden border-t border-white/[0.06] bg-noir-950 py-14">
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px]"
        style={{ background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.5), rgba(180,83,9,0.7), rgba(245,158,11,0.5), transparent)" }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-3 md:gap-16 md:px-10">
        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportReveal} transition={transitionSection}
        >
          <p className="font-display text-2xl tracking-[0.08em] text-ink">{BRAND.name}</p>
          <p className="mt-1 font-sans text-sm font-medium text-saffron-800/80">{BRAND.company}</p>
          <p className="mt-2 max-w-xs font-sans text-sm text-clay-500">{BRAND.tagline} · {BRAND.location}</p>
          <motion.div
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-saffron-500/25 bg-saffron-50 px-4 py-2 font-sans text-xs font-medium text-saffron-800"
            whileHover={{ scale: 1.03 }}>
            <motion.span className="h-2 w-2 rounded-full bg-emerald-500"
              animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 2, repeat: Infinity }} />
            {BRAND.certification}
          </motion.div>
        </motion.div>

        {/* Links */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportReveal} transition={{ ...transitionSection, delay: 0.08 }}
        >
          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-clay-500 mb-4">Navigation</p>
          <nav className="flex flex-col gap-2">
            {footerLinks.map(l => (
              <Link key={l.href} href={l.href}
                className="font-sans text-sm text-clay-600 transition hover:text-saffron-600">
                {l.label}
              </Link>
            ))}
          </nav>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportReveal} transition={{ ...transitionSection, delay: 0.12 }}
        >
          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-clay-500 mb-4">Get in touch</p>
          <a href={`tel:+91${BRAND.phone}`} className="block font-display text-xl text-saffron-700 hover:text-saffron-600 transition">
            {BRAND.phoneDisplay}
          </a>
          <a href={`https://wa.me/${BRAND.whatsappE164}`} target="_blank" rel="noreferrer"
            className="mt-2 inline-flex items-center gap-2 font-sans text-sm text-emerald-700 hover:text-emerald-600 transition">
            <span className="text-base">💬</span> WhatsApp order
          </a>
          <p className="mt-4 font-sans text-xs text-clay-500">{BRAND.location}</p>
        </motion.div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl px-4 sm:px-6 md:px-10">
        <div className="h-px bg-gradient-to-r from-transparent via-clay-300/60 to-transparent" />
      </div>

      <p className="mt-6 text-center font-sans text-xs text-clay-500">
        © {new Date().getFullYear()} {BRAND.name} · {BRAND.company}. Crafted with care in India.
      </p>

      {/* Corner accents */}
      {[["left-4 bottom-4", "border-l border-b"], ["right-4 bottom-4", "border-r border-b"]].map(([pos, b]) => (
        <div key={pos} className={`absolute ${pos} h-7 w-7 border-clay-300/40 ${b}`} />
      ))}
    </footer>
  );
}
