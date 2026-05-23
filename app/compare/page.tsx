import type { Metadata } from "next";
import Link from "next/link";
import { COMPARISON_PAGES } from "@/data/commerce";
import { ImmersivePageLayout } from "@/components/layout/ImmersivePageLayout";
import { SectionHeader } from "@/components/commerce/SectionHeader";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Product comparisons | Uma Laghoo Udyog",
  description:
    "Compare popular pantry categories with practical use-cases, flavor profiles, and buying guidance.",
  path: "/compare",
});

export default function CompareIndexPage() {
  return (
    <ImmersivePageLayout className="pt-20">
      <section className="commerce-section">
        <SectionHeader
          id="compare-index"
          eyebrow="Comparison guides"
          title="Choose the right product for the right moment"
          subtitle="SEO-focused comparison pages to help shoppers decide faster."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {COMPARISON_PAGES.map((page) => (
            <article
              key={page.slug}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <h2 className="font-display text-3xl text-white">
                <Link href={`/compare/${page.slug}`} className="hover:text-amber-300">
                  {page.title}
                </Link>
              </h2>
              <p className="mt-3 font-sans text-sm leading-relaxed text-noir-200">{page.excerpt}</p>
              <Link
                href={`/compare/${page.slug}`}
                className="mt-5 inline-flex font-sans text-xs uppercase tracking-[0.2em] text-amber-300"
              >
                Read comparison →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </ImmersivePageLayout>
  );
}
