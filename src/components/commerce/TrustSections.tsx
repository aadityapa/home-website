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
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8"
          >
            <p className="font-sans text-sm leading-relaxed text-noir-100/90 md:text-base">&ldquo;{t.quote}&rdquo;</p>
            <footer className="mt-6 flex items-center justify-between gap-2">
              <div>
                <cite className="not-italic font-sans text-sm font-semibold text-white">{t.name}</cite>
                <p className="font-sans text-xs text-noir-300">{t.location}</p>
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
          <p className="mt-6 max-w-xl font-sans text-sm leading-relaxed text-noir-100/90 md:text-base">{BRAND_STORY.body}</p>
          <Link href={BRAND_STORY.href} className="commerce-btn-ghost mt-8 inline-flex rounded-full px-8 py-3.5 font-sans text-xs uppercase tracking-[0.2em] text-white">
            {BRAND_STORY.cta}
          </Link>
        </div>
        <div className="rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 to-transparent p-8 md:p-10">
          <p className="font-display text-5xl text-amber-300 md:text-6xl">Since Telhara</p>
          <p className="mt-4 font-sans text-sm text-noir-200">Homemade · Vegetarian · FSSAI licensed</p>
        </div>
      </div>
    </section>
  );
}

export function FAQSection() {
  return (
    <section className="commerce-section" aria-labelledby="home-faq">
      <SectionHeader id="home-faq" eyebrow="Support" title="Frequently asked questions" />
      <div className="mx-auto max-w-3xl divide-y divide-white/10 rounded-2xl border border-white/10">
        {HOME_FAQS.map((faq) => (
          <details key={faq.question} className="group px-6 py-5">
            <summary className="cursor-pointer list-none font-sans text-sm font-medium text-white marker:content-none md:text-base">
              <span className="flex items-center justify-between gap-4">
                {faq.question}
                <span className="text-amber-400 transition group-open:rotate-45">+</span>
              </span>
            </summary>
            <p className="mt-3 font-sans text-sm leading-relaxed text-noir-200">{faq.answer}</p>
          </details>
        ))}
      </div>
      <p className="mt-6 text-center font-sans text-sm text-noir-300">
        More answers on our <Link href="/faq" className="text-amber-300 underline-offset-4 hover:underline">FAQ page</Link>.
      </p>
    </section>
  );
}
