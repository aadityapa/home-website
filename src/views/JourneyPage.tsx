import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { transitionSection, viewportReveal } from "../lib/motion";
import { use3DQuality } from "../hooks/use3DQuality";
import { SECTION_BACKGROUNDS } from "../data/backgrounds";
import { InternetBackdrop } from "../components/ui/InternetBackdrop";
import { ImmersivePageLayout } from "../components/layout/ImmersivePageLayout";
import { Magnetic } from "../components/immersive/Magnetic";

const SpiceJourneyCanvas = lazy(() => import("../components/three/SpiceJourneyCanvas"));

function JourneyFallback() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#0d0f16]">
      <InternetBackdrop imageSrc={SECTION_BACKGROUNDS.journey} variant="soft" kenBurns expanded />
      {[160, 220, 280].map((size, i) => (
        <motion.div
          key={size}
          className="absolute rounded-full border border-amber-400/25"
          style={{ width: size, height: size }}
          animate={{ rotate: 360 * (i % 2 === 0 ? 1 : -1) }}
          transition={{ duration: 20 + i * 8, repeat: Infinity, ease: "linear" }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20" />
    </div>
  );
}

export default function JourneyPage() {
  const quality = use3DQuality();
  const reduced = quality === "off";

  return (
    <ImmersivePageLayout className="pt-20">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1b0c06] via-[#2f1308] to-[#0a0b14] py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0 opacity-35">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-amber-400/25 blur-3xl"
              style={{ width: 90 + i * 42, height: 90 + i * 42, left: `${6 + i * 15}%`, top: `${16 + (i % 3) * 22}%` }}
              animate={{ scale: [1, 1.16, 1] }}
              transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 }}
            />
          ))}
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center md:px-10">
          <motion.p
            className="font-sans text-xs font-semibold uppercase tracking-[0.45em] text-amber-300/80"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Cinematic process narrative
          </motion.p>
          <motion.h1
            className="mt-3 font-display text-5xl text-white md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ textShadow: "0 4px 32px rgba(0,0,0,0.45)" }}
          >
            Journey of flavor
          </motion.h1>
          <motion.p
            className="mt-4 font-sans text-base text-amber-100/80 md:text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Scroll through a floating spice environment and experience how aroma, craft, and motion connect.
          </motion.p>
          <motion.div
            className="mt-6 flex flex-wrap justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {["Scroll steered", "3D camera", "Immersive depth", "Premium motion"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-amber-300/30 bg-black/35 px-3 py-1 font-sans text-xs text-amber-200 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 md:px-10">
        <motion.div
          className="flex flex-wrap items-center justify-center gap-6 rounded-2xl border border-white/[0.1] bg-white/[0.03] px-6 py-4 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportReveal}
        >
          {[
            { icon: "01", label: "Scroll to navigate scene" },
            { icon: "02", label: "Camera responds to velocity" },
            { icon: "03", label: "Ingredients orbit in depth" },
          ].map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-2">
              <span className="rounded-full border border-amber-400/35 px-2 py-0.5 font-sans text-[10px] tracking-[0.2em] text-amber-300">
                {icon}
              </span>
              <span className="font-sans text-sm text-noir-200">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-8 sm:px-6 md:px-10">
        <motion.div
          className="h-[min(88vh,820px)] overflow-hidden rounded-[2rem] border border-white/[0.12] bg-black/25 shadow-2xl shadow-black/45"
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={viewportReveal}
          transition={{ ...transitionSection, duration: 0.9 }}
        >
          {reduced ? (
            <JourneyFallback />
          ) : (
            <Suspense fallback={<JourneyFallback />}>
              <SpiceJourneyCanvas />
            </Suspense>
          )}
        </motion.div>
      </div>

      <section className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6 md:px-10">
        <motion.div
          className="grid gap-5 md:grid-cols-3"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportReveal}
        >
          {[
            "Raw ingredients are selected for aroma profile and consistency.",
            "Micro-batch process protects texture, oil balance, and shelf character.",
            "Final packs are quality checked before dispatch and WhatsApp fulfillment.",
          ].map((line, index) => (
            <div key={line} className="rounded-2xl border border-white/[0.1] bg-white/[0.03] p-5">
              <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-amber-400/85">Stage {index + 1}</p>
              <p className="mt-3 font-sans text-sm leading-relaxed text-noir-300">{line}</p>
            </div>
          ))}
        </motion.div>
      </section>

      <div className="border-t border-white/[0.08] bg-white/[0.02] py-12">
        <div className="mx-auto flex max-w-lg flex-col items-center gap-4 px-4 text-center">
          <p className="font-display text-2xl text-white">Ready to taste the journey?</p>
          <Magnetic>
            <Link href="/shop" className="glass-btn-primary inline-block rounded-full px-8 py-3 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-noir-950">
              Visit the shop
            </Link>
          </Magnetic>
        </div>
      </div>
    </ImmersivePageLayout>
  );
}
