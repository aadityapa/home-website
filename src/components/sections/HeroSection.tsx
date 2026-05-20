import { m, useReducedMotion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { lazy, Suspense } from "react";
import { SECTION_BACKGROUNDS } from "../../data/backgrounds";
import { PureVegMark } from "../brand/PureVegMark";
import { BRAND } from "../../data/brand";
import { use3DQuality } from "../../hooks/use3DQuality";
import { InternetBackdrop } from "../ui/InternetBackdrop";
import { heroItem, heroStagger } from "../../lib/motion";
import Link from "next/link";

const HeroCanvas = lazy(() =>
  import("../three/HeroCanvas").then((mod) => ({ default: mod.HeroCanvas })),
);

function HeroFallback() {
  const reduce = useReducedMotion();
  return (
    <div className="absolute inset-0 overflow-hidden">
      <InternetBackdrop imageSrc={SECTION_BACKGROUNDS.hero} variant="soft" kenBurns expanded />
      {!reduce && (
        <>
          <m.div
            className="absolute -left-1/4 top-1/4 h-72 w-72 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(245,158,11,0.3) 0%, transparent 70%)" }}
            animate={{ x: [0, 24, 0], y: [0, 18, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <m.div
            className="absolute -right-1/4 bottom-0 h-80 w-80 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(180,83,9,0.25) 0%, transparent 70%)" }}
            animate={{ x: [0, -18, 0], y: [0, -14, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}
    </div>
  );
}

function ScrollHint() {
  return (
    <m.div
      className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.4, duration: 0.7 }}
    >
      <span className="font-sans text-[10px] uppercase tracking-[0.45em] text-clay-500">Scroll</span>
      <m.div
        className="h-10 w-[1px] origin-top bg-gradient-to-b from-saffron-500/80 to-transparent"
        animate={{ scaleY: [0, 1, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />
    </m.div>
  );
}

export function HeroSection() {
  const quality = use3DQuality();
  const reduced = quality === "off";
  const reduceMotion = useReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const smx = useSpring(mx, { stiffness: 40, damping: 20 });
  const smy = useSpring(my, { stiffness: 40, damping: 20 });
  const textX = useTransform(smx, [0, 1], [-6, 6]);
  const textY = useTransform(smy, [0, 1], [-3, 3]);

  return (
    <section
      id="top"
      className="relative min-h-[100dvh] overflow-hidden bg-clay-50"
      onMouseMove={(e) => {
        if (reduceMotion) return;
        mx.set(e.clientX / window.innerWidth);
        my.set(e.clientY / window.innerHeight);
      }}
    >
      <div className="absolute inset-0">
        {reduced ? <HeroFallback /> : (
          <Suspense fallback={<HeroFallback />}><HeroCanvas /></Suspense>
        )}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-clay-50/98 via-clay-50/30 to-transparent" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, #fdf8f0 0%, #fdf8f0 42%, rgba(253,248,240,0.92) 52%, rgba(253,248,240,0.45) 68%, transparent 85%)",
        }}
      />

      <m.div
        className="relative z-10 mx-auto flex min-h-[100dvh] max-w-6xl flex-col justify-end px-4 pb-24 pt-28 sm:px-6 md:px-10 md:pb-32"
        style={reduceMotion ? {} : { x: textX, y: textY }}
      >
        <m.div
          className="pointer-events-auto max-w-xl"
          variants={reduceMotion ? undefined : heroStagger}
          initial={reduceMotion ? false : "hidden"}
          animate={reduceMotion ? undefined : "visible"}
        >
          <m.div variants={reduceMotion ? undefined : heroItem}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-saffron-500/30 bg-saffron-50/80 px-4 py-1.5 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(34,197,94,0.7)]" />
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.4em] text-saffron-700/90">Telhara · Maharashtra</span>
          </m.div>

          <m.h1 variants={reduceMotion ? undefined : heroItem}
            className="font-display text-5xl leading-[1.04] text-ink md:text-7xl"
            style={{ textShadow: "0 4px 32px rgba(180,83,9,0.16)" }}>
            {BRAND.name.split(" ").slice(0, 2).join(" ")}
            <span className="block text-gradient-gold">{BRAND.name.split(" ").slice(2).join(" ")}</span>
          </m.h1>

          <m.p variants={reduceMotion ? undefined : heroItem}
            className="mt-4 font-sans text-sm font-semibold uppercase tracking-[0.35em] text-clay-600">
            {BRAND.company}
          </m.p>
          <m.p variants={reduceMotion ? undefined : heroItem}
            className="mt-5 max-w-md font-sans text-lg font-light leading-relaxed text-clay-600 md:text-xl">
            {BRAND.tagline}
          </m.p>

          <m.div variants={reduceMotion ? undefined : heroItem} className="mt-5 flex flex-wrap items-center gap-3">
            <PureVegMark />
            <span className="font-sans text-sm text-clay-600">{BRAND.promise}</span>
          </m.div>

          <m.div variants={reduceMotion ? undefined : heroItem} className="mt-10 flex flex-wrap items-center gap-4">
            <m.div whileHover={{ scale: 1.04, y: -1 }} whileTap={{ scale: 0.96 }}>
              <Link href="/shop" className="btn-primary">Shop now</Link>
            </m.div>
            <m.a href={`tel:+91${BRAND.phone}`} className="btn-secondary"
              whileHover={{ scale: 1.04, y: -1 }} whileTap={{ scale: 0.96 }}>
              {BRAND.phoneDisplay}
            </m.a>
          </m.div>

          <m.div variants={reduceMotion ? undefined : heroItem} className="mt-10 flex flex-wrap gap-8">
            {[{ value: "100%", label: "Vegetarian" }, { value: "FSSAI", label: "Licensed" }, { value: "Small", label: "Batch crafted" }].map(({ value, label }) => (
              <div key={label} className="flex flex-col">
                <span className="font-display text-2xl text-gradient-gold">{value}</span>
                <span className="mt-0.5 font-sans text-[11px] uppercase tracking-[0.3em] text-clay-500">{label}</span>
              </div>
            ))}
          </m.div>
        </m.div>
      </m.div>
      <ScrollHint />
    </section>
  );
}
