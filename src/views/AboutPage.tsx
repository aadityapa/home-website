import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { lazy, Suspense, useRef } from "react";
import { BRAND } from "../data/brand";
import { transitionSection, viewportReveal } from "../lib/motion";
import Link from "next/link";
import { ImmersivePageLayout } from "../components/layout/ImmersivePageLayout";
import { use3DQuality } from "../hooks/use3DQuality";

const AboutBannerScene = lazy(() =>
  import("../components/three/AboutBannerScene").then((m) => ({
    default: m.AboutBannerScene,
  })),
);

/* ── Timeline card ── */
function TimelineStep({ year, title, body, index }: { year: string; title: string; body: string; index: number }) {
  return (
    <motion.div
      className="flex gap-6"
      initial={{ opacity: 0, x: index % 2 === 0 ? -24 : 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={viewportReveal}
      transition={{ ...transitionSection, delay: index * 0.08 }}
    >
      <div className="flex flex-col items-center gap-1">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-saffron-600 font-display text-sm text-white shadow-md shadow-saffron-500/30">
          {index + 1}
        </div>
        <div className="flex-1 w-px bg-gradient-to-b from-saffron-400/50 to-transparent" />
      </div>
      <div className="pb-10">
        <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-saffron-600">{year}</p>
        <h3 className="mt-1 font-display text-xl text-ink">{title}</h3>
        <p className="mt-2 font-sans text-sm leading-relaxed text-clay-600">{body}</p>
      </div>
    </motion.div>
  );
}

export default function AboutPage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const reduce = useReducedMotion();
  const quality = use3DQuality();

  return (
    <ImmersivePageLayout className="pt-0">
      {/* Hero banner with 3D scene */}
      <section className="relative h-72 overflow-hidden bg-gradient-to-br from-amber-800 to-saffron-700 md:h-96">
        <div className="absolute inset-0">
          {quality !== "off" ? (
            <Suspense fallback={<div className="h-full w-full bg-amber-900/80" />}>
              <AboutBannerScene quality={quality} />
            </Suspense>
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-amber-800 to-saffron-700" />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/85 to-amber-800/40" />
        <div className="relative z-10 flex h-full flex-col justify-center px-6 md:px-16">
          <motion.p className="font-sans text-xs font-semibold uppercase tracking-[0.45em] text-amber-300/80"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            Our Story
          </motion.p>
          <motion.h1 className="mt-2 font-display text-4xl text-white md:text-6xl"
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ textShadow: "0 4px 24px rgba(0,0,0,0.4)" }}>
            Homemade heart,<br />
            <span className="text-amber-300">trusted craft</span>
          </motion.h1>
        </div>
      </section>

      {/* Brand story */}
      <section ref={ref} className="relative py-24 overflow-hidden md:py-32">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 md:grid-cols-2 md:items-center md:gap-20 md:px-10">
          <motion.div style={reduce ? {} : { y: yText }}>
            <motion.p className="font-sans text-xs font-semibold uppercase tracking-[0.4em] text-saffron-600"
              initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={viewportReveal}>
              — About us
            </motion.p>
            <motion.h2 className="mt-4 font-display text-4xl text-ink md:text-5xl"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportReveal} transition={{ ...transitionSection, delay: 0.05 }}>
              From Telhara,<span className="block text-gradient-gold">with love</span>
            </motion.h2>
            <motion.p className="mt-6 font-sans text-base leading-relaxed text-clay-600"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportReveal} transition={{ ...transitionSection, delay: 0.1 }}>
              <span className="font-semibold text-ink">{BRAND.company}</span> is the registered identity of Uma Laghoo Udyog —
              a family kitchen enterprise rooted in Telhara, Maharashtra. We prepare shrikhand, achaar, chai masala,
              and aamchur in small batches, honoring seasonal ingredients and family recipes passed down with care.
            </motion.p>
            <motion.p className="mt-4 font-sans text-base leading-relaxed text-clay-600"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={viewportReveal} transition={{ ...transitionSection, delay: 0.15 }}>
              Every jar is a promise: honest ingredients, balanced flavour, and the warmth of tradition served without shortcuts.
              Our FSSAI license ensures that every step — from sourcing to sealing — meets food-safety discipline.
            </motion.p>
            <motion.div className="mt-8 flex gap-4"
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportReveal} transition={{ ...transitionSection, delay: 0.2 }}>
              <Link href="/shop" className="btn-primary">Shop now</Link>
              <Link href="/contact" className="btn-secondary">Contact us</Link>
            </motion.div>
          </motion.div>

          {/* Stats card */}
          <motion.div
            className="glass-panel rounded-3xl p-8 md:p-10"
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={viewportReveal}
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
                <div key={l} className="flex flex-col border-l-2 border-saffron-300/50 pl-4">
                  <span className="font-display text-3xl text-gradient-gold">{n}</span>
                  <span className="mt-1 font-sans text-xs text-clay-500">{l}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border border-saffron-200/50 bg-saffron-50/80 p-4">
              <p className="font-sans text-sm font-medium text-saffron-800">🏅 {BRAND.certification}</p>
              <p className="mt-1 font-sans text-xs text-clay-500">Hygiene · Traceability · Consistency</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-clay-100/70 py-20 md:py-28">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 md:px-10">
          <motion.div className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportReveal}>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.4em] text-saffron-600">How it began</p>
            <h2 className="mt-3 font-display text-4xl text-ink">Our journey</h2>
          </motion.div>
          <div>
            {[
              { year: "Family roots", title: "Generations of recipes", body: "Passed down through the kitchen of Telhara — masalas, pickling techniques, and shrikhand traditions born from our family." },
              { year: "First batch", title: "Small-batch production begins", body: "We started sharing our products with neighbours and local customers, receiving feedback that drove us to perfect every recipe." },
              { year: "FSSAI license", title: "Official certification", body: "Registered under FSSAI to ensure every product meets strict food-safety and hygiene standards before reaching your home." },
              { year: "Today", title: "Pan-India shipping", body: "We now deliver across India by phone and WhatsApp order — the same homemade quality, directly to your door." },
            ].map((step, i) => (
              <TimelineStep key={step.title} {...step} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-10">
          <motion.div className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportReveal}>
            <h2 className="font-display text-4xl text-ink">What we stand for</h2>
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: "🌿", title: "Pure vegetarian", body: "No animal-derived additives. Every product is 100% vegetarian, always." },
              { icon: "🏠", title: "Homemade quality", body: "Small batches in a certified kitchen. Never scaled to sacrifice quality." },
              { icon: "✅", title: "FSSAI certified", body: "Licensed food manufacturer. Safety and hygiene are non-negotiable." },
              { icon: "🌾", title: "Seasonal ingredients", body: "We use produce in season for the best flavour and natural preservation." },
              { icon: "📦", title: "Honest packaging", body: "What's on the label is exactly what's inside. No surprises." },
              { icon: "🤝", title: "Family trust", body: "Generations of recipes — the same ones served at our family table." },
            ].map((v, i) => (
              <motion.div
                key={v.title}
                className="glass-panel rounded-2xl p-6"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportReveal}
                transition={{ ...transitionSection, delay: i * 0.06 }}
                whileHover={{ y: -4, boxShadow: "0 16px 48px -16px rgba(120,60,10,0.2)" }}
              >
                <span className="text-3xl">{v.icon}</span>
                <h3 className="mt-3 font-display text-xl text-ink">{v.title}</h3>
                <p className="mt-2 font-sans text-sm text-clay-600">{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </ImmersivePageLayout>
  );
}
