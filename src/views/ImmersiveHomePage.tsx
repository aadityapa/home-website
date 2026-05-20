import { useEffect, useMemo, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND, PRODUCT_CATEGORIES } from "../data/brand";
import { CinematicHeroCanvas } from "../components/immersive/cinematic/CinematicHeroCanvas";
import { GlassCard } from "../components/immersive/GlassCard";
import { Magnetic } from "../components/immersive/Magnetic";
import { ProductCard3D } from "../components/three/ProductCard3D";

gsap.registerPlugin(ScrollTrigger);

const featured = PRODUCT_CATEGORIES.flatMap((c) =>
  c.items.map((item) => ({ ...item, category: c.title })),
).slice(0, 6);

export default function ImmersiveHomePage() {
  const showcaseRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const runwayRef = useRef<HTMLDivElement>(null);
  const chaptersRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const heroWords = useMemo(() => BRAND.name.split(" "), []);

  useEffect(() => {
    if (reduce || !pinRef.current || !showcaseRef.current || !heroRef.current) return;

    const ctx = gsap.context(() => {
      const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } });
      heroTl
        .fromTo(
          heroRef.current!.querySelectorAll("[data-kinetic-word]"),
          { yPercent: 130, rotateX: 40, opacity: 0 },
          { yPercent: 0, rotateX: 0, opacity: 1, stagger: 0.06, duration: 1.35 },
        )
        .fromTo(
          heroRef.current!.querySelectorAll("[data-kinetic-sub]"),
          { y: 22, opacity: 0, filter: "blur(14px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", stagger: 0.08, duration: 0.8 },
          "-=0.7",
        );

      ScrollTrigger.create({
        trigger: pinRef.current,
        start: "top top",
        end: "+=180%",
        pin: true,
        pinSpacing: true,
        scrub: 0.6,
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: showcaseRef.current,
            start: "top top",
            end: "bottom+=80% top",
            scrub: 1.2,
          },
        })
        .fromTo(
          showcaseRef.current!.querySelectorAll("[data-story-line]"),
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.8 },
          0,
        )
        .fromTo(
          showcaseRef.current!.querySelectorAll("[data-orbit-card]"),
          { y: 90, opacity: 0, rotateX: 14, scale: 0.96 },
          { y: 0, opacity: 1, rotateX: 0, scale: 1, stagger: 0.08, duration: 1 },
          0.06,
        );

      if (runwayRef.current) {
        gsap.to(runwayRef.current, {
          xPercent: -22,
          ease: "none",
          scrollTrigger: {
            trigger: runwayRef.current,
            start: "top 82%",
            end: "bottom top",
            scrub: 1.1,
          },
        });
      }

      if (chaptersRef.current) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: chaptersRef.current,
              start: "top 72%",
              end: "bottom 25%",
              scrub: 1.1,
            },
          })
          .fromTo(
            chaptersRef.current.querySelectorAll("[data-chapter]"),
            { y: 88, opacity: 0, rotateX: 16, scale: 0.95 },
            {
              y: 0,
              opacity: 1,
              rotateX: 0,
              scale: 1,
              stagger: 0.14,
              duration: 1,
              ease: "power3.out",
            },
          )
          .fromTo(
            chaptersRef.current.querySelectorAll("[data-chapter-line]"),
            { width: "0%" },
            { width: "100%", stagger: 0.15, duration: 0.9 },
            0.2,
          );
      }
    });

    return () => ctx.revert();
  }, [reduce]);

  return (
    <div className="theme-immersive relative min-h-screen bg-noir-950 text-noir-50">
      <CinematicHeroCanvas />

      {/* Hero copy */}
      <section className="relative z-10 flex min-h-[100dvh] flex-col justify-end px-6 pb-28 pt-32 md:px-14 md:pb-36">
        <motion.div
          ref={heroRef}
          className="max-w-2xl"
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          <p
            data-kinetic-sub
            className="font-sans text-[10px] font-medium uppercase tracking-[0.55em] text-amber-400/80"
          >
            Immersive experience · Telhara
          </p>
          <h1 className="mt-4 font-display text-5xl leading-[1.02] tracking-tight md:text-7xl lg:text-8xl">
            <span className="kinetic-line block overflow-hidden text-white">
              {heroWords.slice(0, 2).map((word) => (
                <span key={word} data-kinetic-word className="kinetic-word inline-block pr-[0.25em]">
                  {word}
                </span>
              ))}
            </span>
            <span className="kinetic-line block overflow-hidden bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent">
              {heroWords.slice(2).map((word) => (
                <span key={word} data-kinetic-word className="kinetic-word inline-block pr-[0.25em]">
                  {word}
                </span>
              ))}
            </span>
          </h1>
          <p
            data-kinetic-sub
            className="mt-6 max-w-md font-sans text-base font-light leading-relaxed text-noir-200/90 md:text-lg"
          >
            {BRAND.tagline} — cinematic craft from Maharashtra, presented in real-time 3D.
          </p>
          <div data-kinetic-sub className="mt-10 flex flex-wrap gap-4">
            <Magnetic>
              <Link
                href="/shop"
                className="glass-btn-primary inline-flex items-center gap-2 rounded-full px-8 py-4 font-sans text-sm font-semibold uppercase tracking-wider text-noir-950"
              >
                Explore collection
              </Link>
            </Magnetic>
            <Magnetic strength={0.2}>
              <Link href="/journey" className="glass-btn-ghost rounded-full px-8 py-4 font-sans text-sm font-medium text-white/90">
                Our journey
              </Link>
            </Magnetic>
          </div>
        </motion.div>
        <motion.div
          className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-noir-400">Scroll</span>
          <div className="h-12 w-px bg-gradient-to-b from-amber-500/80 to-transparent" />
        </motion.div>
      </section>

      {/* Pinned cinematic runway */}
      <div ref={pinRef} className="relative z-10">
        <section ref={showcaseRef} className="relative min-h-[100dvh] overflow-hidden px-6 py-24 md:px-14">
          <div className="mb-16 max-w-xl">
            <p className="font-sans text-xs uppercase tracking-[0.45em] text-amber-500/90">
              3D Showcase
            </p>
            <h2 data-story-line className="mt-3 font-display text-4xl text-white md:text-5xl">
              Curated <span className="text-amber-400">selection</span>
            </h2>
            <p data-story-line className="mt-4 max-w-lg font-sans text-sm text-noir-300">
              Scroll through a cinematic runway where each product appears as an illuminated object,
              not a static card. Hover to activate spotlight cues and open immersive details.
            </p>
          </div>

          <div ref={runwayRef} className="-ml-6 flex w-[130%] gap-8 pr-8 md:-ml-14">
            {featured.map((item, i) => (
              <GlassCard key={item.id} delay={i * 0.05}>
                <div data-orbit-card className="cinematic-card group relative w-[320px] shrink-0 md:w-[360px]">
                  <Link href={`/shop/${item.id}`} className="block">
                    <div className="cinematic-glow mb-4 aspect-[4/3] overflow-hidden rounded-xl">
                      <ProductCard3D image={item.image} alt={item.name} />
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.35em] text-amber-500/80">
                      {item.category}
                    </p>
                    <h3 className="mt-2 font-display text-2xl text-white">{item.name}</h3>
                    <p className="mt-2 font-display text-xl tabular-nums text-amber-300">{item.price}</p>
                    <p className="mt-2 font-sans text-xs text-noir-300">
                      Hover and drag to inspect form, texture, and highlights.
                    </p>
                  </Link>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>
      </div>

      {/* Story strip */}
      <section className="relative z-10 border-t border-white/[0.06] px-6 py-32 md:px-14">
        <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-2 md:items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-display text-4xl text-white md:text-5xl">
              Crafted in <span className="text-amber-400">3D motion</span>
            </h2>
            <p className="mt-6 font-sans text-base leading-relaxed text-noir-300">
              Scroll-driven cameras, volumetric light, and glass interfaces — a premium digital
              experience for {BRAND.company}.
            </p>
            <Link href="/about" className="glass-btn-ghost mt-8 inline-block rounded-full px-6 py-3 text-sm">
              About us →
            </Link>
          </motion.div>
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            {[
              { v: "100%", l: "Vegetarian" },
              { v: "FSSAI", l: "Licensed" },
              { v: "60 FPS", l: "Adaptive render" },
              { v: "Telhara", l: "Origin" },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.06] to-white/[0.01] p-6 backdrop-blur-md"
              >
                <p className="font-display text-3xl text-amber-400">{s.v}</p>
                <p className="mt-1 font-sans text-xs uppercase tracking-widest text-noir-400">
                  {s.l}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section ref={chaptersRef} className="relative z-10 border-t border-white/[0.06] px-6 py-28 md:px-14">
        <div className="mx-auto max-w-6xl">
          <p className="font-sans text-xs uppercase tracking-[0.45em] text-amber-400/85">
            Cinematic chapters
          </p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl text-white md:text-5xl">
            A luxury commerce narrative designed like a short film.
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                t: "Atmosphere",
                b: "Volumetric lighting, parallax depth, and real-time post FX create a premium digital stage.",
              },
              {
                t: "Product presence",
                b: "Each product appears as a floating hero object with spotlight behavior and tactile motion.",
              },
              {
                t: "Conversion rhythm",
                b: "Quick-view, magnetic CTAs, and cinematic pacing guide users from emotion to checkout intent.",
              },
            ].map((chapter) => (
              <div
                key={chapter.t}
                data-chapter
                className="rounded-2xl border border-white/[0.1] bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-6"
              >
                <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-amber-400/80">
                  {chapter.t}
                </p>
                <div data-chapter-line className="mt-3 h-px bg-gradient-to-r from-amber-400/80 to-transparent" />
                <p className="mt-4 font-sans text-sm leading-relaxed text-noir-300">{chapter.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
