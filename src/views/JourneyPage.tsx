import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { transitionSection, viewportReveal } from "../lib/motion";
import { use3DQuality } from "../hooks/use3DQuality";
import { SECTION_BACKGROUNDS } from "../data/backgrounds";
import { InternetBackdrop } from "../components/ui/InternetBackdrop";
import Link from "next/link";
import { ImmersivePageLayout } from "../components/layout/ImmersivePageLayout";

const SpiceJourneyCanvas = lazy(() => import("../components/three/SpiceJourneyCanvas"));

function JourneyFallback() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-clay-100">
      <InternetBackdrop imageSrc={SECTION_BACKGROUNDS.journey} variant="soft" kenBurns expanded />
      {[160, 200, 260].map((size, i) => (
        <motion.div key={size} className="absolute rounded-full border border-saffron-300/30"
          style={{ width: size, height: size }}
          animate={{ rotate: 360 * (i % 2 === 0 ? 1 : -1) }}
          transition={{ duration: 20 + i * 8, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
}

export default function JourneyPage() {
  const quality = use3DQuality();
  const reduced = quality === "off";

  return (
    <ImmersivePageLayout className="pt-20">
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-800 to-saffron-700 py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0 opacity-20">
          {[...Array(6)].map((_, i) => (
            <motion.div key={i} className="absolute rounded-full bg-amber-300/30 blur-2xl"
              style={{ width: 80 + i * 40, height: 80 + i * 40, left: `${10 + i * 15}%`, top: `${20 + (i % 3) * 20}%` }}
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 }}
            />
          ))}
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center md:px-10">
          <motion.p className="font-sans text-xs font-semibold uppercase tracking-[0.45em] text-amber-300/80"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            Interactive · 3D · Scroll-driven
          </motion.p>
          <motion.h1 className="mt-3 font-display text-5xl text-white md:text-6xl"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ textShadow: "0 4px 32px rgba(0,0,0,0.4)" }}>
            Spices in motion
          </motion.h1>
          <motion.p className="mt-4 font-sans text-base text-amber-100/80 md:text-lg"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            Elaichi pods, kesar strands, mango accents, and whole masalas drift in rhythm.
            Scroll the page and guide the camera through the field.
          </motion.p>
          <motion.div className="mt-6 flex flex-wrap justify-center gap-2"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            {["Interactive", "3D scroll", "React Three Fiber", "Real-time render"].map(tag => (
              <span key={tag} className="rounded-full border border-amber-300/30 bg-amber-900/40 px-3 py-1 font-sans text-xs text-amber-200 backdrop-blur-sm">
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Instructions */}
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 md:px-10">
        <motion.div className="flex flex-wrap items-center justify-center gap-6 text-center"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={viewportReveal}>
          {[
            { icon: "🖱️", label: "Scroll down" },
            { icon: "🎥", label: "Camera moves" },
            { icon: "🌀", label: "Scene rotates" },
          ].map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-2">
              <span className="text-2xl">{icon}</span>
              <span className="font-sans text-sm text-clay-600">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* 3D Canvas */}
      <div className="mx-auto max-w-6xl px-4 pb-8 sm:px-6 md:px-10">
        <motion.div
          className="glass-panel h-[min(88vh,820px)] overflow-hidden rounded-[2rem] shadow-2xl shadow-clay-500/18"
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={viewportReveal}
          transition={{ ...transitionSection, duration: 0.9 }}>
          {reduced
            ? <JourneyFallback />
            : <Suspense fallback={<JourneyFallback />}><SpiceJourneyCanvas /></Suspense>
          }
        </motion.div>
      </div>

      <p className="mx-auto max-w-lg px-4 pb-16 pt-6 text-center font-sans text-sm text-clay-500">
        Powered by <span className="font-medium text-clay-600">ScrollControls</span> in React Three Fiber.
        Scroll this page to steer the scene.
      </p>

      {/* CTA */}
      <div className="border-t border-clay-200/60 bg-clay-100/80 py-12">
        <div className="mx-auto flex max-w-lg flex-col items-center gap-4 px-4 text-center">
          <p className="font-display text-2xl text-ink">Ready to explore our products?</p>
          <Link href="/shop" className="glass-btn-primary inline-block rounded-full px-8 py-3">
            Visit the shop →
          </Link>
        </div>
      </div>
    </ImmersivePageLayout>
  );
}
