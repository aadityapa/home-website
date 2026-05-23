"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BRAND } from "@/data/brand";
import { useMotionReady } from "@/hooks/useMotionReady";

export function CommerceHero() {
  const { skipInitial } = useMotionReady();

  return (
    <section className="relative overflow-hidden bg-noir-950">
      <motion.div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        initial={false}
        animate={{ opacity: 1 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_20%,rgba(245,158,11,0.14),transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,6,12,0.2)_0%,rgba(6,6,12,1)_85%)]" />
      </motion.div>

      <motion.div
        className="relative mx-auto grid max-w-7xl items-end gap-12 px-6 pb-16 pt-28 md:grid-cols-2 md:gap-16 md:px-10 md:pb-24 md:pt-32 lg:px-14"
        initial={skipInitial ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div className="max-w-xl md:max-w-2xl">
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.42em] text-amber-400/90">
            {BRAND.company} · {BRAND.location}
          </p>
          <h1 className="mt-4 font-display text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.92] tracking-tight text-white">
            Authentic taste.
            <span className="block bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent">
              Premium pantry.
            </span>
          </h1>
          <p className="mt-6 max-w-lg font-sans text-base leading-relaxed text-noir-100/85 md:text-lg">
            Shop small-batch shrikhand, achaar, chai masala and aamchur — {BRAND.certification},{" "}
            {BRAND.promise.toLowerCase()}, delivered with care.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/shop" className="commerce-btn-primary rounded-full px-8 py-4 font-sans text-xs font-semibold uppercase tracking-[0.2em]">
              Shop all products
            </Link>
            <Link href="/collections/shrikhand" className="commerce-btn-ghost rounded-full px-8 py-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Explore collections
            </Link>
          </div>
        </motion.div>

        <div className="relative mx-auto w-full max-w-md md:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-white/10 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)]">
            <Image
              src="/images/shrikhand-kesar-ilaichi.png"
              alt={`${BRAND.name} flagship shrikhand`}
              fill
              priority
              sizes="(max-width: 768px) 90vw, 45vw"
              className="object-cover"
            />
            <motion.div
              className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6"
              initial={skipInitial ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <p className="font-sans text-[10px] uppercase tracking-[0.34em] text-amber-300/90">Flagship drop</p>
              <p className="mt-1 font-display text-3xl text-white">Kesar Ilaichi Shrikhand</p>
              <p className="mt-1 font-sans text-sm text-noir-200">From ₹ 420 · 500 g</p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
