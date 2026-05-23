import Link from "next/link";
import { SEO_CONTENT_LINKS } from "@/data/commerce";
import { SectionHeader } from "./SectionHeader";

export function SeoContentHub() {
  return (
    <section className="commerce-section" aria-labelledby="seo-hub">
      <SectionHeader
        id="seo-hub"
        eyebrow="Explore"
        title="Guides, collections & policies"
        subtitle="Internal resources to help you shop smarter and build topical authority."
      />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {SEO_CONTENT_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="framer-surface group rounded-xl p-4 transition hover:border-amber-500/35 md:p-5"
          >
            <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-amber-400/90">
              Resource
            </p>
            <p className="mt-1 font-display text-lg text-white transition group-hover:text-amber-300 md:text-xl">
              {link.label}
            </p>
            <p className="mt-1 font-sans text-xs text-noir-300">{link.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
