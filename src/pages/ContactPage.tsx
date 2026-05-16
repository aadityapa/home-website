import { motion } from "framer-motion";
import { FormEvent, useState } from "react";
import { BRAND } from "../data/brand";
import { whatsappUrl } from "../lib/order";
import { Stagger, StaggerItem } from "../components/motion/Stagger";
import { transitionSection, viewportReveal } from "../lib/motion";
import { Canvas } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

/* ── 3D contact banner scene ── */
function EnvelopeShape() {
  const ref = useRef<Mesh>(null);
  useFrame(s => {
    if (!ref.current) return;
    ref.current.rotation.x = s.clock.elapsedTime * 0.15;
    ref.current.rotation.y = s.clock.elapsedTime * 0.25;
  });
  return (
    <Float speed={0.8} floatIntensity={0.5}>
      <mesh ref={ref} castShadow>
        <boxGeometry args={[1.4, 0.9, 0.08]} />
        <meshStandardMaterial color="#c45f00" roughness={0.3} metalness={0.4} emissive="#7a3000" emissiveIntensity={0.1} />
      </mesh>
    </Float>
  );
}

function ContactScene3D() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 48 }} dpr={[1, 1.2]} gl={{ antialias: false }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 3]} intensity={1.2} color="#fff4e0" />
      {[
        { pos: [-2.2, 0.4, 0] as [number, number, number] },
        { pos: [2.2, -0.4, 0] as [number, number, number] },
        { pos: [0, 1.4, -0.5] as [number, number, number] },
      ].map((s, i) => (
        <Float key={i} speed={0.9 + i * 0.2} floatIntensity={0.5}>
          <mesh position={s.pos}>
            <icosahedronGeometry args={[0.22, 0]} />
            <meshStandardMaterial color={["#e6a01a", "#c45f00", "#d97706"][i]} roughness={0.3} metalness={0.35} emissive={["#b47000", "#7a3000", "#a05000"][i]} emissiveIntensity={0.12} />
          </mesh>
        </Float>
      ))}
      <EnvelopeShape />
      <Sparkles count={20} scale={4} size={1.5} speed={0.3} color="#ffd899" opacity={0.5} />
    </Canvas>
  );
}

function InputField({ label, name, type = "text", placeholder, required }: { label: string; name: string; type?: string; placeholder: string; required?: boolean }) {
  const [focused, setFocused] = useState(false);
  return (
    <label className="block">
      <motion.span
        className="block font-sans text-xs font-medium uppercase tracking-wider"
        animate={{ color: focused ? "#b45309" : "#9b9b8e" }}
        transition={{ duration: 0.2 }}>
        {label}
      </motion.span>
      <motion.input
        required={required} name={name} type={type} placeholder={placeholder}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        className="mt-2 w-full rounded-xl border bg-white/90 px-4 py-3 font-sans text-sm text-ink transition-all duration-300 focus:outline-none"
        animate={{
          borderColor: focused ? "rgba(180,83,9,0.6)" : "rgba(180,163,140,0.4)",
          boxShadow: focused ? "0 0 0 3px rgba(245,158,11,0.12)" : "none",
        }}
      />
    </label>
  );
}

const WHATSAPP_MSG = `Hello — I'd like to enquire about ${BRAND.name} (${BRAND.company}) products from Telhara.`;

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3200);
    e.currentTarget.reset();
  }

  return (
    <div className="min-h-screen bg-clay-50 pt-20">
      {/* 3D banner */}
      <section className="relative h-56 overflow-hidden bg-gradient-to-br from-amber-900 via-saffron-800 to-amber-700 md:h-72">
        <div className="absolute inset-0"><ContactScene3D /></div>
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/85 to-transparent" />
        <div className="relative z-10 flex h-full flex-col justify-center px-6 md:px-16">
          <motion.p className="font-sans text-xs font-semibold uppercase tracking-[0.45em] text-amber-300/80"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            {BRAND.company}
          </motion.p>
          <motion.h1 className="mt-2 font-display text-4xl text-white md:text-5xl"
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
            style={{ textShadow: "0 4px 24px rgba(0,0,0,0.4)" }}>
            Let&apos;s talk orders
          </motion.h1>
          <motion.p className="mt-2 font-sans text-sm text-amber-100/80"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.28 }}>
            Wholesale · gifting · everyday orders
          </motion.p>
        </div>
      </section>

      {/* Main grid */}
      <div className="mx-auto grid max-w-6xl gap-14 px-4 py-20 sm:px-6 md:grid-cols-2 md:gap-20 md:px-10">
        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={viewportReveal} transition={transitionSection}
        >
          <Stagger className="space-y-5" slow>
            <StaggerItem>
              <motion.div className="glass-panel rounded-2xl p-6" whileHover={{ y: -3 }}>
                <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-clay-500">📞 Phone</p>
                <a href={`tel:+91${BRAND.phone}`} className="mt-1 block font-display text-2xl text-saffron-700 hover:text-saffron-600">
                  {BRAND.phoneDisplay}
                </a>
              </motion.div>
            </StaggerItem>
            <StaggerItem>
              <motion.a
                href={whatsappUrl(BRAND.whatsappE164, WHATSAPP_MSG)}
                target="_blank" rel="noreferrer"
                className="glass-panel flex items-center justify-between gap-4 rounded-2xl border border-emerald-600/15 bg-gradient-to-r from-emerald-50/95 to-white/80 p-6 transition"
                whileHover={{ y: -3, borderColor: "rgba(22,163,74,0.35)" }}>
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-clay-500">💬 WhatsApp</p>
                  <p className="mt-1 font-sans text-base font-medium text-ink">Quick message for orders</p>
                  <p className="mt-0.5 font-sans text-sm text-clay-500">Replies in business hours</p>
                </div>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#25D366] text-white shadow">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </span>
              </motion.a>
            </StaggerItem>
            <StaggerItem>
              <motion.div className="glass-panel rounded-2xl p-6" whileHover={{ y: -3 }}>
                <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-clay-500">📍 Location</p>
                <p className="mt-1 font-sans text-lg text-ink">{BRAND.location}</p>
              </motion.div>
            </StaggerItem>
            <StaggerItem>
              <div className="rounded-2xl border border-saffron-200/50 bg-saffron-50/80 p-4">
                <p className="font-sans text-sm text-saffron-800">✅ {BRAND.certification}</p>
                <p className="mt-1 font-sans text-xs text-clay-500">Retail & wholesale · COD / UPI / card</p>
              </div>
            </StaggerItem>
          </Stagger>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={onSubmit}
          className="glass-panel relative overflow-hidden rounded-3xl p-8 md:p-10"
          initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={viewportReveal} transition={{ ...transitionSection, delay: 0.08 }}>
          <div className="pointer-events-none absolute -right-12 -top-8 h-40 w-40 rounded-full bg-saffron-200/35 blur-3xl" />
          <h2 className="mb-6 font-display text-2xl text-ink">Send a message</h2>
          <Stagger className="relative space-y-5">
            <StaggerItem><InputField label="Name" name="name" placeholder="Your name" required /></StaggerItem>
            <StaggerItem><InputField label="Phone" name="phone" type="tel" placeholder="10-digit mobile" required /></StaggerItem>
            <StaggerItem>
              <label className="block">
                <motion.span className="block font-sans text-xs font-medium uppercase tracking-wider text-clay-400">Message</motion.span>
                <textarea name="message" rows={4} required placeholder="Tell us what you need"
                  className="mt-2 w-full resize-none rounded-xl border border-clay-200/60 bg-white/90 px-4 py-3 font-sans text-sm text-ink transition focus:outline-none focus:ring-2 focus:ring-saffron-500/30" />
              </label>
            </StaggerItem>
            <StaggerItem>
              <motion.button type="submit"
                className="relative w-full overflow-hidden rounded-full bg-gradient-to-r from-amber-800 to-saffron-600 py-3.5 font-sans text-sm font-semibold text-white shadow-lg shadow-saffron-500/25"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                Send message
              </motion.button>
            </StaggerItem>
            {sent && (
              <motion.div className="rounded-2xl border border-emerald-500/25 bg-emerald-50/90 p-4 text-center"
                initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
                <p className="font-sans text-sm text-emerald-800">✓ We&apos;ll call you back shortly!</p>
              </motion.div>
            )}
          </Stagger>
        </motion.form>
      </div>
    </div>
  );
}
