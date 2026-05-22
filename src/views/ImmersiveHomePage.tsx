import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { BRAND } from "../data/brand";
import { useCatalog } from "../hooks/useCatalog";
import { Magnetic } from "../components/immersive/Magnetic";
import { HeroBackdrop2D } from "../components/immersive/HeroBackdrop2D";
import { CampaignSwiper } from "../components/immersive/CampaignSwiper";
import { MotionImage } from "../components/motion/MotionImage";
import { trackEvent } from "../lib/analytics";

const heroEase = [0.16, 1, 0.3, 1] as const;

export default function ImmersiveHomePage() {
  const reduce = useReducedMotion();
  const { categories } = useCatalog();
  const [heroVariant, setHeroVariant] = useState<"A" | "B">("A");

  const heroProducts = useMemo(
    () =>
      categories
        .flatMap((cat) => cat.items.map((item) => ({ ...item, category: cat.title })))
        .slice(0, 8),
    [categories],
  );

  const heroCopy = useMemo(
    () =>
      heroVariant === "A"
        ? {
            preline: "Campaign drop - crafted in Telhara",
            line1: ["Bold", "Taste", "Engineered"],
            line2: ["For", "Modern", "India"],
            body:
              "A premium direct-to-consumer food brand experience with editorial storytelling, giant product moments, and conversion-ready shopping flow.",
            primaryCta: "Shop collection",
            secondaryCta: "Brand story",
            primaryHref: "/shop?campaign=drop-a",
            secondaryHref: "/about",
          }
        : {
            preline: "Limited batch - direct from kitchen",
            line1: ["Authentic", "Flavor", "Reimagined"],
            line2: ["For", "Everyday", "Celebrations"],
            body:
              "Discover best-selling jars and spice blends through an immersive campaign flow designed to convert quickly on mobile and desktop.",
            primaryCta: "Shop best sellers",
            secondaryCta: "See our journey",
            primaryHref: "/shop?campaign=drop-b",
            secondaryHref: "/journey",
          },
    [heroVariant],
  );

  useEffect(() => {
    const key = "ulu-hero-variant-v1";
    const saved =
      typeof window !== "undefined" ? window.localStorage.getItem(key) : null;
    if (saved === "A" || saved === "B") {
      setHeroVariant(saved);
      return;
    }
    const chosen = Math.random() > 0.5 ? "A" : "B";
    setHeroVariant(chosen);
    if (typeof window !== "undefined") window.localStorage.setItem(key, chosen);
  }, []);

  useEffect(() => {
    trackEvent("hero_variant_impression", {
      variant: heroVariant,
      productCount: heroProducts.length,
    });
  }, [heroVariant, heroProducts.length]);

  const heroLead = heroProducts[0];

  return (
    <div className="theme-immersive relative min-h-screen bg-noir-950 text-noir-50">
      <HeroBackdrop2D />

      <section className="relative z-10 grid min-h-[100dvh] items-end gap-10 px-6 pb-20 pt-28 md:grid-cols-[1.05fr_0.95fr] md:px-14 md:pb-24">
        <div className="max-w-3xl">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: heroEase }}
            className="font-sans text-[10px] uppercase tracking-[0.52em] text-amber-400/80"
          >
            {heroCopy.preline}
          </motion.p>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: heroEase }}
            className="mt-2 font-sans text-[10px] uppercase tracking-[0.28em] text-noir-400"
          >
            Conversion variant {heroVariant}
          </motion.p>
          <h1 className="mt-4 font-display text-5xl leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
            <span className="block overflow-hidden text-white">
              {heroCopy.line1.map((word, i) => (
                <motion.span
                  key={word}
                  className="inline-block pr-[0.24em]"
                  initial={reduce ? false : { y: "110%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.75, delay: 0.08 + i * 0.06, ease: heroEase }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
            <span className="block overflow-hidden bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent">
              {heroCopy.line2.map((word, i) => (
                <motion.span
                  key={word}
                  className="inline-block pr-[0.24em]"
                  initial={reduce ? false : { y: "110%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.75, delay: 0.22 + i * 0.06, ease: heroEase }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </h1>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.35, ease: heroEase }}
            className="mt-6 max-w-lg font-sans text-base leading-relaxed text-noir-200/90 md:text-lg"
          >
            {heroCopy.body}
          </motion.p>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.45, ease: heroEase }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Magnetic>
              <Link
                href={heroCopy.primaryHref}
                onClick={() =>
                  trackEvent("hero_primary_cta_click", {
                    variant: heroVariant,
                    cta: heroCopy.primaryCta,
                    href: heroCopy.primaryHref,
                  })
                }
                className="glass-btn-primary rounded-full px-8 py-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-noir-950"
              >
                {heroCopy.primaryCta}
              </Link>
            </Magnetic>
            <Magnetic strength={0.2}>
              <Link
                href={heroCopy.secondaryHref}
                onClick={() =>
                  trackEvent("hero_secondary_cta_click", {
                    variant: heroVariant,
                    cta: heroCopy.secondaryCta,
                    href: heroCopy.secondaryHref,
                  })
                }
                className="glass-btn-ghost rounded-full px-8 py-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-white"
              >
                {heroCopy.secondaryCta}
              </Link>
            </Magnetic>
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.15, ease: heroEase }}
          className="rounded-[2rem] border border-white/[0.12] bg-gradient-to-b from-white/[0.1] to-black/35 p-5"
        >
          <div className="relative h-[360px] overflow-hidden rounded-[1.5rem] md:h-[500px]">
            {heroLead ? (
              <MotionImage
                src={heroLead.image}
                alt={heroLead.name}
                width={1200}
                height={1200}
                priority
                imageClassName="object-cover"
              />
            ) : null}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/[0.15] bg-black/35 p-4 backdrop-blur-md">
              <p className="font-sans text-[10px] uppercase tracking-[0.34em] text-amber-300/80">Flagship drop</p>
              <h2 className="mt-1 font-display text-3xl text-white">{heroLead?.name ?? BRAND.name}</h2>
              <p className="mt-1 font-sans text-sm text-noir-200">{heroLead?.price ?? "Premium pricing"}</p>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="relative z-10 border-y border-white/[0.08] bg-black/25 py-5">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-6 md:grid-cols-4 md:px-14">
          {[
            { v: "4", l: "Category worlds" },
            { v: "10+", l: "Hero SKUs" },
            { v: "FSSAI", l: "Certified" },
            { v: "D2C", l: "Brand-first UX" },
          ].map((item, i) => (
            <motion.div
              key={item.l}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.45 }}
              className="rounded-xl border border-white/[0.1] bg-white/[0.04] p-4"
            >
              <p className="font-display text-2xl text-amber-300">{item.v}</p>
              <p className="font-sans text-[11px] uppercase tracking-[0.26em] text-noir-300">{item.l}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative z-10 py-16 md:py-20">
        <div className="mb-8 max-w-3xl px-6 md:mb-10 md:px-14">
          <p className="font-sans text-[11px] uppercase tracking-[0.4em] text-amber-400/85">Campaign storytelling</p>
          <h3 className="mt-4 font-display text-4xl text-white md:text-6xl">Swipe through every taste world</h3>
          <p className="mt-4 font-sans text-sm text-noir-300 md:text-base">
            Smooth horizontal browsing — no empty scroll gaps, just fast 2D product motion.
          </p>
        </div>
        <div className="horizontal-scroll-track flex gap-5 px-6 pb-2 md:gap-8 md:px-14">
          {categories.map((cat, i) => {
            const lead = cat.items[0];
            return (
              <motion.article
                key={cat.id}
                initial={reduce ? false : { opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ delay: i * 0.04, duration: 0.5, ease: heroEase }}
                className="campaign-slide-card w-[82vw] shrink-0 snap-start rounded-[1.7rem] border border-white/[0.12] bg-gradient-to-b from-white/[0.08] to-black/35 p-5 md:w-[36vw]"
              >
                {lead ? (
                  <div className="h-56 overflow-hidden rounded-2xl md:h-72">
                    <MotionImage src={lead.image} alt={lead.name} width={800} height={640} />
                  </div>
                ) : null}
                <p className="mt-4 font-sans text-[10px] uppercase tracking-[0.32em] text-amber-400/80">{cat.title}</p>
                <h4 className="mt-2 font-display text-3xl text-white">{lead?.name ?? cat.title}</h4>
                <p className="mt-2 line-clamp-2 font-sans text-sm text-noir-300">{cat.blurb}</p>
                <Link
                  href={`/shop?cat=${cat.id}`}
                  className="mt-5 inline-flex rounded-full border border-amber-400/45 px-4 py-2 font-sans text-xs uppercase tracking-[0.2em] text-amber-300"
                >
                  Explore drop
                </Link>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="relative z-10 px-6 py-20 md:px-14 md:py-24">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="font-sans text-[11px] uppercase tracking-[0.38em] text-amber-400/85">Shop the campaign</p>
            <h3 className="mt-2 font-display text-4xl text-white md:text-5xl">Best sellers this week</h3>
          </div>
          <Link
            href="/shop"
            className="hidden rounded-full border border-white/[0.16] px-5 py-2 font-sans text-xs uppercase tracking-[0.22em] text-noir-100 md:inline-flex"
          >
            View all
          </Link>
        </div>
        <CampaignSwiper products={heroProducts} />
      </section>
    </div>
  );
}
