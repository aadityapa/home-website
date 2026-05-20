import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { lazy, Suspense, useRef } from "react";
import Link from "next/link";
import { BRAND } from "../data/brand";
import { transitionSection, viewportReveal } from "../lib/motion";
import { ImmersivePageLayout } from "../components/layout/ImmersivePageLayout";
import { use3DQuality } from "../hooks/use3DQuality";
import { Magnetic } from "../components/immersive/Magnetic";

const AboutBannerScene = lazy(() =>
  import("../components/three/AboutBannerScene").then((m) => ({
    default: m.AboutBannerScene,
  })),
);

function TimelineStep({
  year,
  title,
  body,
  index,
}: {
  year: string;
  title: string;
  body: string;
  index: number;
}) {
  return (
    <motion.div
      className="timeline-step flex gap-6"
      initial={{ opacity: 0, x: index % 2 === 0 ? -24 : 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={viewportReveal}
      transition={{ ...transitionSection, delay: index * 0.08 }}
    >
      <div className="flex flex-col items-center gap-1">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/[0.24] bg-white/[0.08] font-display text-sm text-amber-200">
          {index + 1}
        </div>
        <div className="h-full w-px bg-gradient-to-b from-amber-400/65 to-transparent" />
      </div>
      <div className="pb-10">
        <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-amber-400/90">{year}</p>
        <h3 className="mt-1 font-display text-xl text-white">{title}</h3>
        <p className="mt-2 max-w-[52ch] font-sans text-sm leading-relaxed text-noir-300">{body}</p>
      </div>
    </motion.div>
  );
}

export default function AboutPage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], [30, -50]);
  const reduce = useReducedMotion();
  const quality = use3DQuality();

  return (
    <ImmersivePageLayout className="pt-0">
      <section className="relative h-80 overflow-hidden bg-gradient-to-br from-[#1c0c06] via-[#2e1308] to-[#0b0a12] md:h-[30rem]">
        <div className="absolute inset-0">
          {quality !== "off" ? (
            <Suspense fallback={<div className="h-full w-full bg-[#221109]" />}>
              <AboutBannerScene quality={quality} />
            </Suspense>
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-[#321708] to-[#100b0b]" />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
        <div className="relative z-10 flex h-full flex-col justify-center px-6 md:px-16">
          <motion.p
            className="font-sans text-xs font-semibold uppercase tracking-[0.45em] text-amber-300/80"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Heritage in motion
          </motion.p>
          <motion.h1
            className="mt-2 font-display text-4xl text-white md:text-6xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ textShadow: "0 4px 28px rgba(0,0,0,0.45)" }}
          >
            Crafted from memory,
            <span className="block text-amber-300">designed for now</span>
          </motion.h1>
        </div>
      </section>

      <section ref={ref} className="relative overflow-hidden py-24 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 md:grid-cols-2 md:items-center md:gap-20 md:px-10">
          <motion.div style={reduce ? undefined : { y: yText }}>
            <motion.p
              className="font-sans text-xs font-semibold uppercase tracking-[0.4em] text-amber-400/85"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportReveal}
            >
              About us
            </motion.p>
            <motion.h2
              className="mt-4 font-display text-4xl text-white md:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportReveal}
              transition={{ ...transitionSection, delay: 0.05 }}
            >
              From Telhara,
              <span className="block text-gradient-gold">with uncompromising care</span>
            </motion.h2>
            <motion.p
              className="mt-6 font-sans text-base leading-relaxed text-noir-300"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportReveal}
              transition={{ ...transitionSection, delay: 0.1 }}
            >
              <span className="font-semibold text-white">{BRAND.company}</span> is the registered identity of
              Uma Laghoo Udyog, a family kitchen enterprise rooted in Telhara, Maharashtra. We make shrikhand,
              achaar, chai masala, and aamchur in focused small batches with disciplined quality control.
            </motion.p>
            <motion.p
              className="mt-4 font-sans text-base leading-relaxed text-noir-300"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={viewportReveal}
              transition={{ ...transitionSection, delay: 0.15 }}
            >
              Every jar is built around one principle: authentic flavor backed by modern hygiene standards.
              Our process stays artisanal, but our consistency is engineered.
            </motion.p>
            <motion.div
              className="mt-8 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportReveal}
              transition={{ ...transitionSection, delay: 0.2 }}
            >
              <Magnetic>
                <Link href="/shop" className="glass-btn-primary rounded-full px-8 py-3.5 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-noir-950">
                  Shop collection
                </Link>
              </Magnetic>
              <Magnetic strength={0.24}>
                <Link href="/contact" className="glass-btn-ghost rounded-full px-8 py-3.5 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-white">
                  Contact us
                </Link>
              </Magnetic>
            </motion.div>
          </motion.div>

          <motion.div
            className="rounded-3xl border border-white/[0.12] bg-gradient-to-br from-white/[0.09] to-white/[0.02] p-8 md:p-10"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportReveal}
            transition={{ ...transitionSection, delay: 0.1 }}
            whileHover={{ y: -4 }}
          >
            <div className="grid grid-cols-2 gap-6">
              {[
                { n: "4+", l: "Product categories" },
                { n: "10+", l: "Unique products" },
                { n: "FSSAI", l: "Licensed kitchen" },
                { n: "100%", l: "Vegetarian always" },
              ].map(({ n, l }) => (
                <div key={l} className="flex flex-col border-l-2 border-amber-500/40 pl-4">
                  <span className="font-display text-3xl text-amber-300">{n}</span>
                  <span className="mt-1 font-sans text-xs text-noir-300">{l}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border border-white/[0.12] bg-black/25 p-4">
              <p className="font-sans text-sm font-medium text-amber-200">{BRAND.certification}</p>
              <p className="mt-1 font-sans text-xs text-noir-300">Hygiene, traceability, and repeatable flavor architecture</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-white/[0.08] bg-white/[0.02] py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 md:px-10">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportReveal}
          >
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.4em] text-amber-400/85">Timeline</p>
            <h2 className="mt-3 font-display text-4xl text-white">From family kitchen to immersive storefront</h2>
          </motion.div>
          <div>
            {[
              {
                year: "Family roots",
                title: "Generations of recipes",
                body: "Pickling methods, shrikhand balance, and masala precision were passed down through our family kitchen in Telhara.",
              },
              {
                year: "First batch",
                title: "Small-batch production begins",
                body: "Early feedback from local households shaped our current taste profile, texture discipline, and process standards.",
              },
              {
                year: "Certification",
                title: "FSSAI alignment",
                body: "The kitchen formalized compliance and food-safety operations so every batch could scale with confidence.",
              },
              {
                year: "Now",
                title: "Cinematic digital commerce",
                body: "Traditional products now meet modern storytelling with immersive 3D shopping and direct WhatsApp ordering.",
              },
            ].map((step, i) => (
              <TimelineStep key={step.title} {...step} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-10">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportReveal}
          >
            <h2 className="font-display text-4xl text-white">Our operating values</h2>
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: "Vegetarian", title: "Pure vegetarian", body: "No animal-derived additives. Absolute vegetarian integrity across the line." },
              { icon: "Craft", title: "Small-batch quality", body: "Production remains tight and intentional so flavor and texture stay controlled." },
              { icon: "Safety", title: "Certified kitchen", body: "Food-safety, hygiene, and storage standards are enforced end-to-end." },
              { icon: "Seasonal", title: "Ingredient timing", body: "Seasonality guides sourcing for better aroma, acidity, and natural preservation." },
              { icon: "Honest", title: "Transparent labeling", body: "What is on pack is exactly what goes into every jar." },
              { icon: "Trust", title: "Family accountability", body: "Every batch reflects the same standard we serve at our own table." },
            ].map((v, i) => (
              <motion.div
                key={v.title}
                className="rounded-2xl border border-white/[0.1] bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-6"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportReveal}
                transition={{ ...transitionSection, delay: i * 0.06 }}
                whileHover={{ y: -4 }}
              >
                <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-amber-400/90">{v.icon}</span>
                <h3 className="mt-3 font-display text-xl text-white">{v.title}</h3>
                <p className="mt-2 font-sans text-sm text-noir-300">{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </ImmersivePageLayout>
  );
}
