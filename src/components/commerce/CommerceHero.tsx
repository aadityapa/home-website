"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BRAND } from "@/data/brand";
import { useMotionReady } from "@/hooks/useMotionReady";

export function CommerceHero() {
  const { skipInitial } = useMotionReady();

  return (
    <section className="relative min-h-[70vh] overflow-hidden md:min-h-screen">
      <motion.div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        initial={false}
        animate={{ opacity: 1 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_20%,rgba(245,158,11,0.14),transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(48,34,25,0.12)_0%,rgba(19,14,11,0.62)_82%)]" />
      </motion.div>

      <motion.div
        className="relative mx-auto grid max-w-7xl items-end gap-6 px-4 pb-8 pt-20 md:grid-cols-2 md:gap-16 md:px-10 md:pb-24 md:pt-32 lg:px-14"
        initial={skipInitial ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div className="max-w-xl md:max-w-2xl">
          <p className="font-sans text-[9px] font-medium uppercase tracking-[0.24em] text-amber-400/90 md:text-[11px] md:tracking-[0.42em]">
            {BRAND.company} · {BRAND.location}
          </p>
          <h1 className="mt-2 font-display text-[clamp(1.95rem,7.2vw,5.5rem)] leading-[0.96] tracking-tight text-white md:mt-4 md:leading-[0.92]">
            Authentic taste.
            <span className="block bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent">
              Premium pantry.
            </span>
          </h1>
          <p className="mt-3 max-w-lg font-sans text-sm leading-relaxed text-noir-100/85 md:mt-6 md:text-lg">
            Shop small-batch shrikhand, achaar, chai masala and aamchur — {BRAND.certification},{" "}
            {BRAND.promise.toLowerCase()}, delivered with care.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 md:mt-9 md:gap-3">
            <Link href="/shop" className="commerce-btn-primary rounded-full px-4 py-2.5 font-sans text-[10px] font-semibold uppercase tracking-[0.12em] md:px-8 md:py-4 md:text-xs md:tracking-[0.2em]">
              Shop all products
            </Link>
            <Link href="/collections/shrikhand" className="commerce-btn-ghost rounded-full px-4 py-2.5 font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-white md:px-8 md:py-4 md:text-xs md:tracking-[0.2em]">
              Explore collections
            </Link>
          </div>
        </motion.div>

        <div className="relative mx-auto w-full max-w-sm md:max-w-none">
          <div className="framer-surface relative aspect-[4/4.1] max-h-[48vh] overflow-hidden rounded-2xl shadow-[0_24px_56px_-32px_rgba(0,0,0,0.8)] md:aspect-[4/5] md:max-h-none md:rounded-[1.75rem] md:shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)]">
            <Image
              src="/images/shrikhand-kesar-ilaichi.png"
              alt={`${BRAND.name} flagship shrikhand`}
              fill
              priority
              sizes="(max-width: 768px) 90vw, 45vw"
              className="object-cover"
            />
            <motion.div
              className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1b130f]/52 via-[#1b130f]/14 to-transparent p-4 md:p-6"
              initial={skipInitial ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <p className="font-sans text-[9px] uppercase tracking-[0.16em] text-amber-300/90 md:text-[10px] md:tracking-[0.34em]">Flagship drop</p>
              <p className="mt-1 font-display text-2xl text-white md:text-3xl">Kesar Ilaichi Shrikhand</p>
              <p className="mt-1 font-sans text-xs text-noir-200 md:text-sm">From ₹ 420 · 500 g</p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
