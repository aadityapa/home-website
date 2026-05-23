import { TESTIMONIALS, HOME_FAQS, BRAND_STORY } from "@/data/commerce";
import Link from "next/link";
import { SectionHeader } from "./SectionHeader";

export function TestimonialsSection() {
  return (
    <section className="commerce-section bg-white/[0.02]" aria-labelledby="testimonials">
      <SectionHeader id="testimonials" eyebrow="Social proof" title="Loved by home cooks across India" />
      <div className="commerce-grid-3">
        {TESTIMONIALS.map((t) => (
          <blockquote
            key={t.id}
            className="framer-surface rounded-xl p-4 md:rounded-2xl md:p-8"
          >
            <p className="font-sans text-xs leading-relaxed text-noir-100/90 md:text-base">&ldquo;{t.quote}&rdquo;</p>
            <footer className="mt-4 flex items-center justify-between gap-2 md:mt-6">
              <div>
                <cite className="not-italic font-sans text-xs font-semibold text-white md:text-sm">{t.name}</cite>
                <p className="font-sans text-[11px] text-noir-300 md:text-xs">{t.location}</p>
              </div>
              <p className="font-sans text-amber-300" aria-label={`${t.rating} out of 5 stars`}>
                {"★".repeat(t.rating)}
              </p>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}

export function BrandStorySection() {
  return (
    <section className="commerce-section" aria-labelledby="brand-story">
      <div className="commerce-split items-center">
        <div>
          <SectionHeader id="brand-story" eyebrow="Our story" title={BRAND_STORY.headline} />
          <p className="mt-3 max-w-xl font-sans text-xs leading-relaxed text-noir-100/90 md:mt-6 md:text-base">{BRAND_STORY.body}</p>
          <Link href={BRAND_STORY.href} className="commerce-btn-ghost mt-4 inline-flex rounded-full px-4 py-2.5 font-sans text-[10px] uppercase tracking-[0.12em] text-white md:mt-8 md:px-8 md:py-3.5 md:text-xs md:tracking-[0.2em]">
            {BRAND_STORY.cta}
          </Link>
        </div>
        <div className="framer-surface rounded-xl p-5 md:rounded-2xl md:p-10">
          <p className="font-display text-3xl text-amber-300 md:text-6xl">Since Telhara</p>
          <p className="mt-2 font-sans text-xs text-noir-200 md:mt-4 md:text-sm">Homemade · Vegetarian · FSSAI licensed</p>
        </div>
      </div>
    </section>
  );
}

export function FAQSection() {
  return (
    <section className="commerce-section" aria-labelledby="home-faq">
      <SectionHeader id="home-faq" eyebrow="Support" title="Frequently asked questions" />
      <div className="framer-surface mx-auto max-w-3xl divide-y divide-white/10 rounded-xl md:rounded-2xl">
        {HOME_FAQS.map((faq) => (
          <details key={faq.question} className="group px-4 py-3.5 md:px-6 md:py-5">
            <summary className="cursor-pointer list-none font-sans text-xs font-medium text-white marker:content-none md:text-base">
              <span className="flex items-center justify-between gap-4">
                {faq.question}
                <span className="text-amber-400 transition group-open:rotate-45">+</span>
              </span>
            </summary>
            <p className="mt-2 font-sans text-xs leading-relaxed text-noir-200 md:mt-3 md:text-sm">{faq.answer}</p>
          </details>
        ))}
      </div>
      <p className="mt-4 text-center font-sans text-xs text-noir-300 md:mt-6 md:text-sm">
        More answers on our <Link href="/faq" className="text-amber-300 underline-offset-4 hover:underline">FAQ page</Link>.
      </p>
    </section>
  );
}
