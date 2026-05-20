import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
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
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !pinRef.current || !showcaseRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: pinRef.current,
        start: "top top",
        end: "+=120%",
        pin: true,
        pinSpacing: true,
      });

      gsap.from(showcaseRef.current!.querySelectorAll("[data-reveal]"), {
        scrollTrigger: {
          trigger: showcaseRef.current,
          start: "top 70%",
          end: "bottom 20%",
          scrub: 1,
        },
        y: 80,
        opacity: 0,
        stagger: 0.08,
        ease: "power3.out",
      });
    });

    return () => ctx.revert();
  }, [reduce]);

  return (
    <div className="theme-immersive relative min-h-screen bg-noir-950 text-noir-50">
      <CinematicHeroCanvas />

      {/* Hero copy */}
      <section className="relative z-10 flex min-h-[100dvh] flex-col justify-end px-6 pb-28 pt-32 md:px-14 md:pb-36">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          <p className="font-sans text-[10px] font-medium uppercase tracking-[0.55em] text-amber-400/80">
            Immersive experience · Telhara
          </p>
          <h1 className="mt-4 font-display text-5xl leading-[1.02] tracking-tight text-white md:text-7xl lg:text-8xl">
            {BRAND.name.split(" ").slice(0, 2).join(" ")}
            <span className="block bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent">
              {BRAND.name.split(" ").slice(2).join(" ")}
            </span>
          </h1>
          <p className="mt-6 max-w-md font-sans text-base font-light leading-relaxed text-noir-200/90 md:text-lg">
            {BRAND.tagline} — cinematic craft from Maharashtra, presented in real-time 3D.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Magnetic>
              <Link
                to="/shop"
                className="glass-btn-primary inline-flex items-center gap-2 rounded-full px-8 py-4 font-sans text-sm font-semibold uppercase tracking-wider text-noir-950"
              >
                Explore collection
              </Link>
            </Magnetic>
            <Magnetic strength={0.2}>
              <Link to="/journey" className="glass-btn-ghost rounded-full px-8 py-4 font-sans text-sm font-medium text-white/90">
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

      {/* Pinned showcase — property-style product grid */}
      <div ref={pinRef} className="relative z-10">
        <section
          ref={showcaseRef}
          className="relative min-h-[100dvh] px-6 py-24 md:px-14"
        >
          <div className="mb-16 max-w-xl" data-reveal>
            <p className="font-sans text-xs uppercase tracking-[0.45em] text-amber-500/90">
              3D Showcase
            </p>
            <h2 className="mt-3 font-display text-4xl text-white md:text-5xl">
              Curated <span className="text-amber-400">selection</span>
            </h2>
            <p className="mt-4 font-sans text-sm text-noir-300">
              Each product rendered live — drag, explore, and order.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((item, i) => (
              <GlassCard key={item.id} delay={i * 0.05}>
                <div data-reveal>
                  <Link to={`/shop/${item.id}`} className="block">
                    <div className="mb-4 aspect-[4/3] overflow-hidden rounded-xl">
                      <ProductCard3D image={item.image} alt={item.name} />
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.35em] text-amber-500/80">
                      {item.category}
                    </p>
                    <h3 className="mt-2 font-display text-2xl text-white">{item.name}</h3>
                    <p className="mt-2 font-display text-xl text-amber-400">{item.price}</p>
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
            <Link to="/about" className="glass-btn-ghost mt-8 inline-block rounded-full px-6 py-3 text-sm">
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
              { v: "3D", l: "Live renders" },
              { v: "Telhara", l: "Origin" },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-md"
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
    </div>
  );
}
