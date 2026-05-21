import { useEffect, useMemo, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { BRAND } from "../data/brand";
import { useCatalog } from "../hooks/useCatalog";
import { CinematicHeroCanvas } from "../components/immersive/cinematic/CinematicHeroCanvas";
import { Magnetic } from "../components/immersive/Magnetic";
import { ProductCard3D } from "../components/three/ProductCard3D";

gsap.registerPlugin(ScrollTrigger);

export default function ImmersiveHomePage() {
  const reduce = useReducedMotion();
  const { categories } = useCatalog();

  const heroProducts = useMemo(
    () => categories.flatMap((cat) => cat.items.map((item) => ({ ...item, category: cat.title }))).slice(0, 8),
    [categories],
  );

  const storyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce || !storyRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-hero-word]",
        { yPercent: 120, opacity: 0, rotateX: 25 },
        { yPercent: 0, opacity: 1, rotateX: 0, stagger: 0.06, duration: 1.1, ease: "power4.out" },
      );

      gsap.fromTo(
        "[data-hero-sub]",
        { y: 22, opacity: 0, filter: "blur(8px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", stagger: 0.08, duration: 0.8, ease: "power3.out", delay: 0.2 },
      );

      ScrollTrigger.create({
        trigger: storyRef.current,
        start: "top top",
        end: "+=150%",
        pin: true,
        pinSpacing: true,
        scrub: 0.8,
      });

      gsap.to(trackRef.current, {
        xPercent: -44,
        ease: "none",
        scrollTrigger: {
          trigger: storyRef.current,
          start: "top top",
          end: "+=150%",
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, [reduce]);

  const heroLead = heroProducts[0];

  return (
    <div className="theme-immersive relative min-h-screen bg-noir-950 text-noir-50">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-70">
        <CinematicHeroCanvas />
      </div>

      <section className="relative z-10 grid min-h-[100dvh] items-end gap-10 px-6 pb-20 pt-28 md:grid-cols-[1.05fr_0.95fr] md:px-14 md:pb-24">
        <div className="max-w-3xl">
          <p data-hero-sub className="font-sans text-[10px] uppercase tracking-[0.52em] text-amber-400/80">
            Campaign drop · crafted in Telhara
          </p>
          <h1 className="mt-4 font-display text-5xl leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
            <span className="block overflow-hidden text-white">
              {["Bold", "Taste", "Engineered"].map((word) => (
                <span key={word} data-hero-word className="inline-block pr-[0.24em]">
                  {word}
                </span>
              ))}
            </span>
            <span className="block overflow-hidden bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent">
              {["For", "Modern", "India"].map((word) => (
                <span key={word} data-hero-word className="inline-block pr-[0.24em]">
                  {word}
                </span>
              ))}
            </span>
          </h1>
          <p data-hero-sub className="mt-6 max-w-lg font-sans text-base leading-relaxed text-noir-200/90 md:text-lg">
            A premium direct-to-consumer food brand experience with editorial storytelling,
            giant product moments, and conversion-ready shopping flow.
          </p>
          <div data-hero-sub className="mt-9 flex flex-wrap gap-3">
            <Magnetic>
              <Link href="/shop" className="glass-btn-primary rounded-full px-8 py-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-noir-950">
                Shop collection
              </Link>
            </Magnetic>
            <Magnetic strength={0.2}>
              <Link href="/about" className="glass-btn-ghost rounded-full px-8 py-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-white">
                Brand story
              </Link>
            </Magnetic>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-[2rem] border border-white/[0.12] bg-gradient-to-b from-white/[0.1] to-black/35 p-5"
        >
          <div className="relative overflow-hidden rounded-[1.5rem]">
            {heroLead ? (
              <Image
                src={heroLead.image}
                alt={heroLead.name}
                width={1200}
                height={1200}
                className="h-[360px] w-full object-cover md:h-[500px]"
                priority
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
          ].map((item) => (
            <div key={item.l} className="rounded-xl border border-white/[0.1] bg-white/[0.04] p-4">
              <p className="font-display text-2xl text-amber-300">{item.v}</p>
              <p className="font-sans text-[11px] uppercase tracking-[0.26em] text-noir-300">{item.l}</p>
            </div>
          ))}
        </div>
      </section>

      <section ref={storyRef} className="relative z-10 min-h-[100dvh] overflow-hidden px-6 py-20 md:px-14">
        <div className="mb-10 max-w-3xl">
          <p className="font-sans text-[11px] uppercase tracking-[0.4em] text-amber-400/85">Campaign storytelling</p>
          <h3 className="mt-4 font-display text-4xl text-white md:text-6xl">Scroll to reveal every taste world</h3>
          <p className="mt-4 font-sans text-sm text-noir-300 md:text-base">
            This is not a static grid. Each category is treated like a campaign chapter with oversized visual focus and purchasing intent.
          </p>
        </div>
        <div ref={trackRef} className="flex w-[170%] gap-6 md:gap-8">
          {categories.map((cat) => {
            const lead = cat.items[0];
            return (
              <article key={cat.id} className="campaign-slide-card w-[82vw] shrink-0 rounded-[1.7rem] border border-white/[0.12] bg-gradient-to-b from-white/[0.08] to-black/35 p-5 md:w-[36vw]">
                {lead ? (
                  <Image src={lead.image} alt={lead.name} width={800} height={640} className="h-56 w-full rounded-2xl object-cover md:h-72" />
                ) : null}
                <p className="mt-4 font-sans text-[10px] uppercase tracking-[0.32em] text-amber-400/80">{cat.title}</p>
                <h4 className="mt-2 font-display text-3xl text-white">{lead?.name ?? cat.title}</h4>
                <p className="mt-2 line-clamp-2 font-sans text-sm text-noir-300">{cat.blurb}</p>
                <Link href={`/shop?cat=${cat.id}`} className="mt-5 inline-flex rounded-full border border-amber-400/45 px-4 py-2 font-sans text-xs uppercase tracking-[0.2em] text-amber-300">
                  Explore drop
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className="relative z-10 px-6 py-24 md:px-14">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="font-sans text-[11px] uppercase tracking-[0.38em] text-amber-400/85">Shop the campaign</p>
            <h3 className="mt-2 font-display text-4xl text-white md:text-5xl">Best sellers this week</h3>
          </div>
          <Link href="/shop" className="hidden rounded-full border border-white/[0.16] px-5 py-2 font-sans text-xs uppercase tracking-[0.22em] text-noir-100 md:inline-flex">
            View all
          </Link>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          spaceBetween={18}
          pagination={{ clickable: true }}
          breakpoints={{
            0: { slidesPerView: 1.12 },
            640: { slidesPerView: 2.1 },
            1024: { slidesPerView: 3.15 },
          }}
          className="campaign-swiper pb-12"
        >
          {heroProducts.slice(0, 9).map((item) => (
            <SwiperSlide key={item.id}>
              <article className="group overflow-hidden rounded-3xl border border-white/[0.12] bg-gradient-to-b from-white/[0.08] to-black/30 p-4">
                <div className="h-56 overflow-hidden rounded-2xl md:h-64">
                  <ProductCard3D image={item.image} alt={item.name} />
                </div>
                <p className="mt-3 font-sans text-[10px] uppercase tracking-[0.28em] text-amber-400/80">{item.category}</p>
                <h4 className="mt-1 font-display text-2xl text-white transition group-hover:text-amber-300">{item.name}</h4>
                <div className="mt-4 flex items-center justify-between">
                  <p className="font-display text-2xl text-amber-300">{item.price}</p>
                  <Link href={`/shop/${item.id}`} className="rounded-full border border-white/[0.18] px-3 py-1.5 font-sans text-[11px] uppercase tracking-[0.18em] text-white">
                    Quick buy
                  </Link>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
}

