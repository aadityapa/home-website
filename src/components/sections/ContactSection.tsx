import { m, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { type FormEvent, useRef, useState } from "react";
import { SECTION_BACKGROUNDS } from "../../data/backgrounds";
import { BRAND } from "../../data/brand";
import { whatsappUrl } from "../../lib/order";
import { transitionSection, viewportReveal } from "../../lib/motion";
import { Stagger, StaggerItem } from "../motion/Stagger";
import { InternetBackdrop } from "../ui/InternetBackdrop";

const WHATSAPP_ENQUIRY =
  `Hello — I'd like to enquire about ${BRAND.name} (${BRAND.company}) products from Telhara.`;

/** Animated input with floating label feel */
function AnimatedInput({
  label,
  name,
  type = "text",
  placeholder,
  required,
  rows,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  required?: boolean;
  rows?: number;
}) {
  const [focused, setFocused] = useState(false);
  const fieldClass =
    "focus-ring w-full resize-none rounded-xl border bg-white/90 px-4 py-3 font-sans text-sm text-ink transition-all duration-300";
  const fieldStyle = {
    borderColor: focused ? "rgba(180,83,9,0.6)" : "rgba(180,163,140,0.4)",
    boxShadow: focused
      ? "0 0 0 3px rgba(245,158,11,0.1), 0 2px 8px rgba(180,83,9,0.08)"
      : "none",
  } as const;

  return (
    <label className="block">
      <motion.span
        className="block font-sans text-xs font-medium uppercase tracking-wider"
        animate={{ color: focused ? "#b45309" : "#9b9b8e" }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.span>
      <motion.div
        className="relative mt-2"
        animate={{ scale: focused ? 1.005 : 1 }}
        transition={{ duration: 0.2 }}
      >
        {rows ? (
          <textarea
            required={required}
            name={name}
            rows={rows}
            placeholder={placeholder}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={fieldClass}
            style={fieldStyle}
          />
        ) : (
          <input
            required={required}
            name={name}
            type={type}
            placeholder={placeholder}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={fieldClass}
            style={fieldStyle}
          />
        )}
        {/* Focus glow line */}
        <motion.div
          className="absolute inset-x-0 bottom-0 h-[2px] rounded-full origin-left"
          style={{ background: "linear-gradient(90deg, #b45309, #f59e0b)" }}
          animate={{ scaleX: focused ? 1 : 0, opacity: focused ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </label>
  );
}

export function ContactSection() {
  const [sent, setSent] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const reduceMotion = useReducedMotion();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
    window.setTimeout(() => setSent(false), 3200);
    e.currentTarget.reset();
  }

  return (
    <section
      id="contact"
      ref={ref}
      className="section-flow relative overflow-hidden bg-clay-50 py-28 md:py-36"
    >
      <InternetBackdrop
        imageSrc={SECTION_BACKGROUNDS.contact}
        variant="light"
        parallaxY={reduceMotion ? undefined : bgY}
      />
      <div className="pointer-events-none absolute inset-0 bg-warm-radial opacity-40" />

      {/* Ambient glow orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-32 top-1/4 h-64 w-64 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(245,158,11,0.22) 0%, transparent 70%)", filter: "blur(40px)" }}
          animate={{ x: [0, 24, 0], y: [0, -16, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-24 bottom-1/4 h-48 w-48 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(180,83,9,0.18) 0%, transparent 70%)", filter: "blur(36px)" }}
          animate={{ x: [0, -18, 0], y: [0, 20, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div className="relative z-10 mx-auto grid max-w-6xl gap-14 px-4 sm:px-6 md:grid-cols-2 md:gap-20 md:px-10">
        {/* Left: contact info */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewportReveal}
          transition={transitionSection}
        >
          <motion.p
            className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.4em] text-saffron-600"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportReveal}
            transition={{ ...transitionSection, delay: 0.05 }}
          >
            <span className="h-[1px] w-6 bg-saffron-500" />
            Contact
          </motion.p>

          <h2
            className="mt-4 font-display text-4xl text-ink md:text-5xl"
            style={{ textShadow: "0 2px 20px rgba(180,83,9,0.12)" }}
          >
            Let&apos;s talk orders
          </h2>
          <p className="mt-4 font-sans text-base text-clay-600 md:text-lg">
            Wholesale enquiries, festive gifting, or a simple question about our
            range — we&apos;re a phone call away.
          </p>

          <Stagger className="mt-10 space-y-5" slow>
            {/* Phone */}
            <StaggerItem>
              <motion.div
                className="glass-panel rounded-2xl p-5"
                whileHover={{ y: -3, boxShadow: "0 12px 40px -12px rgba(180,83,9,0.2)" }}
                transition={{ duration: 0.3 }}
              >
                <p className="font-sans text-xs uppercase tracking-[0.3em] text-clay-500">Phone</p>
                <a
                  href={`tel:+91${BRAND.phone}`}
                  className="mt-1 block font-display text-2xl text-saffron-700 transition hover:text-saffron-600"
                >
                  {BRAND.phoneDisplay}
                </a>
              </motion.div>
            </StaggerItem>

            {/* WhatsApp */}
            <StaggerItem>
              <motion.a
                href={whatsappUrl(BRAND.whatsappE164, WHATSAPP_ENQUIRY)}
                target="_blank"
                rel="noreferrer"
                className="glass-panel focus-ring flex items-center justify-between gap-4 rounded-2xl border border-emerald-600/15 bg-gradient-to-r from-emerald-50/95 to-white/80 p-5 transition"
                whileHover={{
                  y: -3,
                  borderColor: "rgba(22,163,74,0.4)",
                  boxShadow: "0 12px 40px -12px rgba(22,163,74,0.2)",
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div>
                  <p className="font-sans text-xs uppercase tracking-[0.3em] text-clay-500">WhatsApp</p>
                  <p className="mt-1 font-sans text-base font-medium text-ink">Quick message for orders</p>
                  <p className="mt-0.5 font-sans text-sm text-clay-500">Same number — we reply in business hours</p>
                </motion.div>
                <motion.span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#25D366] text-white shadow-sm"
                  whileHover={{ scale: 1.1, rotate: 8 }}
                  aria-hidden
                >
                  <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </motion.span>
              </motion.a>
            </StaggerItem>

            {/* Location */}
            <StaggerItem>
              <motion.div
                className="glass-panel rounded-2xl p-5"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.3 }}
              >
                <p className="font-sans text-xs uppercase tracking-[0.3em] text-clay-500">Location</p>
                <p className="mt-1 font-sans text-lg text-ink">{BRAND.location}</p>
              </motion.div>
            </StaggerItem>

            <StaggerItem>
              <p className="font-sans text-sm text-clay-500">{BRAND.certification}</p>
            </StaggerItem>
          </Stagger>
        </motion.div>

        {/* Right: contact form */}
        <motion.form
          onSubmit={onSubmit}
          className="glass-panel relative overflow-hidden rounded-3xl p-8 md:p-10"
          initial={{ opacity: 0, x: 32, y: 16 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={viewportReveal}
          transition={{ ...transitionSection, delay: 0.08 }}
          style={{
            boxShadow: "0 32px 64px -24px rgba(120,60,10,0.18), inset 0 1px 0 rgba(255,255,255,0.6)",
          }}
        >
          {/* Decorative orb */}
          <div className="pointer-events-none absolute -right-16 -top-8 h-48 w-48 rounded-full bg-saffron-200/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-amber-200/30 blur-2xl" />

          <Stagger className="relative space-y-5">
            <StaggerItem>
              <AnimatedInput label="Name" name="name" placeholder="Your name" required />
            </StaggerItem>
            <StaggerItem>
              <AnimatedInput label="Phone" name="phone" type="tel" placeholder="10-digit mobile" required />
            </StaggerItem>
            <StaggerItem>
              <AnimatedInput label="Message" name="message" placeholder="Tell us what you need" required rows={4} />
            </StaggerItem>
            <StaggerItem>
              <m.button
                type="submit"
                className="focus-ring relative w-full overflow-hidden rounded-full bg-gradient-to-r from-amber-800 to-saffron-600 py-3.5 font-sans text-sm font-semibold text-white shadow-lg shadow-saffron-500/30 transition duration-300"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.97 }}
                style={{ boxShadow: "0 8px 32px -8px rgba(180,83,9,0.4)" }}
              >
                <span className="relative z-[1]">Send message</span>
                <m.span
                  className="absolute inset-0 bg-white/15"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
              </m.button>
            </StaggerItem>
            {sent ? (
              <StaggerItem>
                <motion.div
                  className="rounded-2xl border border-emerald-500/25 bg-emerald-50/90 p-4 text-center"
                  initial={{ opacity: 0, scale: 0.95, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                >
                  <p className="font-sans text-sm text-emerald-800">
                    ✓ Thank you — we&apos;ll call you back shortly.
                  </p>
                </motion.div>
              </StaggerItem>
            ) : null}
          </Stagger>
        </motion.form>
      </motion.div>
    </section>
  );
}
