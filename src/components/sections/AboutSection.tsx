import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef } from "react";
import { SECTION_BACKGROUNDS } from "../../data/backgrounds";
import { BRAND } from "../../data/brand";
import { InternetBackdrop } from "../ui/InternetBackdrop";
import { transitionSection, viewportReveal } from "../../lib/motion";

/** 3D tilt card with mouse tracking */
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const springRotX = useSpring(rotX, { stiffness: 200, damping: 20 });
  const springRotY = useSpring(rotY, { stiffness: 200, damping: 20 });
  const reduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      style={
        reduce
          ? {}
          : {
              rotateX: springRotX,
              rotateY: springRotY,
              transformStyle: "preserve-3d",
              perspective: 1200,
            }
      }
      onMouseMove={(e) => {
        if (reduce || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        rotY.set((px - 0.5) * 18);
        rotX.set((0.5 - py) * 14);
      }}
      onMouseLeave={() => {
        rotX.set(0);
        rotY.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/** Floating 3D shape decorations */
function FloatingShape({
  delay = 0,
  size,
  x,
  y,
  color,
  shape = "circle",
}: {
  delay?: number;
  size: number;
  x: string;
  y: string;
  color: string;
  shape?: "circle" | "square" | "diamond";
}) {
  const shapeClass =
    shape === "diamond"
      ? "rotate-45"
      : shape === "square"
      ? "rounded-md"
      : "rounded-full";

  return (
    <motion.div
      className={`pointer-events-none absolute ${shapeClass}`}
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        background: color,
        filter: `blur(${size > 24 ? 8 : 2}px)`,
        boxShadow: `0 0 ${size * 2}px ${color}`,
      }}
      animate={{
        y: [0, -16, 0],
        x: [0, 8, 0],
        rotate: shape === "diamond" ? [45, 70, 45] : [0, 15, 0],
        opacity: [0.5, 0.9, 0.5],
      }}
      transition={{
        duration: 7 + delay,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yText = useTransform(scrollYProgress, [0, 1], [52, -52]);
  const yCard = useTransform(scrollYProgress, [0, 1], [32, -32]);
  const xGlow = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const bgParallax = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scaleProgress = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 0.98]);
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      ref={ref}
      className="section-flow relative overflow-hidden bg-clay-50 py-28 md:py-40"
    >
      <InternetBackdrop
        imageSrc={SECTION_BACKGROUNDS.about}
        variant="light"
        parallaxY={reduceMotion ? undefined : bgParallax}
        expanded
      />
      <div className="pointer-events-none absolute inset-0 bg-warm-radial opacity-50" />

      {/* Floating shapes decoration */}
      {!reduceMotion && (
        <>
          <FloatingShape delay={0} size={14} x="8%" y="15%" color="rgba(245,158,11,0.4)" shape="circle" />
          <FloatingShape delay={1.5} size={8} x="12%" y="70%" color="rgba(180,83,9,0.5)" shape="diamond" />
          <FloatingShape delay={0.8} size={20} x="88%" y="25%" color="rgba(230,160,26,0.3)" shape="circle" />
          <FloatingShape delay={2.2} size={10} x="82%" y="75%" color="rgba(154,52,18,0.45)" shape="square" />
          <FloatingShape delay={1.2} size={6} x="50%" y="10%" color="rgba(253,186,116,0.6)" shape="diamond" />
        </>
      )}

      <div className="relative z-10 mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 md:grid-cols-2 md:items-center md:gap-20 md:px-10">
        {/* Left: text block */}
        <motion.div style={{ y: yText, scale: scaleProgress }}>
          <motion.p
            className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.4em] text-saffron-600"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportReveal}
            transition={{ ...transitionSection, delay: 0.05 }}
          >
            <span className="h-[1px] w-8 bg-saffron-500" />
            Our story
          </motion.p>

          <motion.h2
            className="mt-4 font-display text-4xl text-ink md:text-5xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportReveal}
            transition={{ ...transitionSection, delay: 0.1 }}
            style={{ textShadow: "0 2px 20px rgba(180,83,9,0.12)" }}
          >
            Homemade heart,
            <span className="block text-gradient-gold" style={{ filter: "drop-shadow(0 1px 8px rgba(230,160,26,0.3))" }}>
              trusted craft
            </span>
          </motion.h2>

          <motion.p
            className="mt-6 font-sans text-base leading-relaxed text-clay-600 md:text-lg"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportReveal}
            transition={{ ...transitionSection, delay: 0.15 }}
          >
            <span className="font-medium text-ink">{BRAND.company}</span> brings
            you Uma Laghoo Udyog — from our kitchen in{" "}
            <span className="font-medium text-ink">Telhara</span>, we prepare
            shrikhand, achaar, chai masala, and aamchur in small batches, honoring
            season, spice, and family recipes passed down with care.
          </motion.p>

          <motion.p
            className="mt-4 font-sans text-base leading-relaxed text-clay-600 md:text-lg"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportReveal}
            transition={{ ...transitionSection, delay: 0.2 }}
          >
            Every jar is a promise: honest ingredients, balanced flavor, and the
            warmth of tradition served without shortcuts.
          </motion.p>

          {/* Decorative timeline dots */}
          <motion.div
            className="mt-10 flex items-center gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportReveal}
            transition={{ delay: 0.3 }}
          >
            {["Farm", "Kitchen", "Your Table"].map((step, i) => (
              <div key={step} className="flex items-center gap-3">
                <div className="flex flex-col items-center gap-1.5">
                  <motion.div
                    className="h-3 w-3 rounded-full bg-saffron-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }}
                  />
                  <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-clay-500">
                    {step}
                  </span>
                </div>
                {i < 2 && <div className="h-[1px] w-8 bg-gradient-to-r from-saffron-400 to-transparent" />}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: 3D tilt card */}
        <div className="relative">
          <motion.div
            className="pointer-events-none absolute -right-4 top-8 h-52 w-52 rounded-full blur-3xl md:-right-8"
            style={{
              x: xGlow,
              background: "radial-gradient(circle, rgba(245,158,11,0.35) 0%, transparent 70%)",
            }}
            aria-hidden
          />

          <TiltCard>
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={viewportReveal}
              transition={{ ...transitionSection, duration: 0.85 }}
              style={{ y: yCard }}
              className="glass-panel relative overflow-hidden rounded-3xl p-8 md:p-10"
            >
              {/* Glow corner */}
              <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-saffron-200/50 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-amber-300/25 blur-2xl" />

              <p className="font-display text-2xl text-ink md:text-3xl">
                Certified quality
              </p>
              <p className="mt-3 font-sans text-clay-600">
                {BRAND.certification} — manufactured with food-safety discipline
                from sourcing to sealing.
              </p>

              {/* Badge */}
              <motion.div
                className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-saffron-500/25 bg-saffron-50/80 px-5 py-3"
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ duration: 0.22 }}
              >
                <motion.span
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-saffron-600 font-display text-lg text-white"
                  animate={{ rotate: [0, 8, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  ✓
                </motion.span>
                <div>
                  <p className="font-sans text-sm font-semibold text-ink">
                    FSSAI compliance
                  </p>
                  <p className="font-sans text-xs text-clay-500">
                    Hygiene · Traceability · Consistency
                  </p>
                </div>
              </motion.div>

              {/* Stat row */}
              <div className="mt-8 grid grid-cols-3 gap-3 border-t border-saffron-200/40 pt-6">
                {[
                  { n: "10+", l: "Products" },
                  { n: "4", l: "Categories" },
                  { n: "∞", l: "Tradition" },
                ].map(({ n, l }) => (
                  <div key={l} className="text-center">
                    <p
                      className="font-display text-2xl text-gradient-gold"
                      style={{ filter: "drop-shadow(0 1px 4px rgba(230,160,26,0.3))" }}
                    >
                      {n}
                    </p>
                    <p className="mt-0.5 font-sans text-[10px] uppercase tracking-[0.25em] text-clay-500">
                      {l}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
