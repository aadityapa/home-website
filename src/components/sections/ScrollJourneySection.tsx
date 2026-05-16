import { motion, useScroll, useTransform } from "framer-motion";
import { lazy, Suspense, useRef } from "react";
import { SECTION_BACKGROUNDS } from "../../data/backgrounds";
import { useReduced3D } from "../../hooks/useReduced3D";
import { InternetBackdrop } from "../ui/InternetBackdrop";
import { transitionSection, viewportReveal } from "../../lib/motion";

const SpiceJourneyCanvas = lazy(() => import("../three/SpiceJourneyCanvas"));

function JourneyFallback() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <InternetBackdrop
        imageSrc={SECTION_BACKGROUNDS.journey}
        variant="soft"
        kenBurns
        expanded
      />
      {/* Animated rings */}
      {[160, 200, 260].map((size, i) => (
        <motion.div
          key={size}
          className="absolute rounded-full border border-saffron-300/35"
          style={{ width: size, height: size }}
          animate={{ rotate: 360 * (i % 2 === 0 ? 1 : -1), scale: [1, 1.06, 1] }}
          transition={{ duration: 20 + i * 8, repeat: Infinity, ease: "linear" }}
        />
      ))}
      <motion.div
        className="absolute z-[1] h-24 w-24 rounded-full bg-amber-300/40 blur-2xl"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </div>
  );
}

export function ScrollJourneySection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const borderOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const reduced = useReduced3D();

  return (
    <section
      id="journey"
      ref={ref}
      className="section-flow relative overflow-hidden bg-clay-100"
    >
      <InternetBackdrop
        imageSrc={SECTION_BACKGROUNDS.journey}
        variant="journeyStrip"
      />

      {/* Section header */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-10 pt-14 sm:px-6 sm:pt-16 md:px-10 md:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportReveal}
          transition={transitionSection}
          className="max-w-2xl"
        >
          <motion.p
            className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.4em] text-saffron-600"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportReveal}
            transition={{ ...transitionSection, delay: 0.05 }}
          >
            <span className="h-[1px] w-6 bg-saffron-500" />
            Scroll journey
          </motion.p>
          <h2
            className="mt-3 font-display text-4xl text-ink md:text-5xl"
            style={{ textShadow: "0 2px 20px rgba(180,83,9,0.1)" }}
          >
            Spices in motion
          </h2>
          <p className="mt-4 font-sans text-base text-clay-600 md:text-lg">
            Elaichi pods, kesar strands, mango accents, and whole masalas drift
            in rhythm — scroll the page and guide the camera through the field,
            the same way we layer notes in achaar and chai.
          </p>

          {/* Feature tags */}
          <div className="mt-6 flex flex-wrap gap-2">
            {["Interactive", "3D scroll", "React Three Fiber", "Real-time"].map((tag) => (
              <motion.span
                key={tag}
                className="rounded-full border border-saffron-400/30 bg-saffron-50/80 px-3 py-1 font-sans text-[11px] font-medium text-saffron-700 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewportReveal}
                whileHover={{ scale: 1.06, borderColor: "rgba(245,158,11,0.6)" }}
                transition={{ duration: 0.3 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* 3D canvas */}
      <div className="relative z-10 h-[min(90vh,840px)] w-full md:h-[min(92vh,900px)]">
        <div className="absolute inset-x-0 top-0 h-full px-4 md:px-10">
          <motion.div
            className="glass-panel h-full overflow-hidden rounded-[2rem] shadow-2xl shadow-clay-500/18"
            style={{
              boxShadow: "0 32px 80px -24px rgba(120,60,10,0.22), inset 0 1px 0 rgba(255,255,255,0.5)",
            }}
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={viewportReveal}
            transition={{ ...transitionSection, duration: 0.9 }}
          >
            {/* Animated border */}
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-[2rem] z-[1]"
              style={{
                boxShadow: "inset 0 0 0 1px rgba(245,158,11,0.25)",
                opacity: borderOpacity,
              }}
            />
            {reduced ? (
              <JourneyFallback />
            ) : (
              <Suspense fallback={<JourneyFallback />}>
                <SpiceJourneyCanvas />
              </Suspense>
            )}
          </motion.div>
        </div>
      </div>

      <motion.p
        className="relative z-10 mx-auto max-w-6xl px-4 pb-20 pt-8 text-center font-sans text-sm text-clay-500 sm:px-6 md:px-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewportReveal}
        transition={{ delay: 0.3 }}
      >
        Powered by{" "}
        <span className="font-medium text-clay-600">ScrollControls</span> in
        React Three Fiber — scroll the page to steer the scene.
      </motion.p>
    </section>
  );
}
