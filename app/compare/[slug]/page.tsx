import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { COMPARISON_PAGES } from "@/data/commerce";
import { ImmersivePageLayout } from "@/components/layout/ImmersivePageLayout";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/schema";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return COMPARISON_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = COMPARISON_PAGES.find((p) => p.slug === slug);
  if (!page) return { title: "Comparison not found" };
  return buildPageMetadata({
    title: `${page.title} | Uma Laghoo Udyog`,
    description: page.excerpt,
    path: `/compare/${page.slug}`,
  });
}

export default async function CompareDetailPage({ params }: Props) {
  const { slug } = await params;
  const page = COMPARISON_PAGES.find((p) => p.slug === slug);
  if (!page) notFound();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Compare", path: "/compare" },
            { name: page.title, path: `/compare/${page.slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: page.title,
            description: page.excerpt,
            author: { "@type": "Organization", name: "Uma Laghoo Udyog" },
          },
        ]}
      />
      <ImmersivePageLayout className="pt-20">
        <article className="commerce-section mx-auto max-w-3xl">
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-noir-400">Comparison guide</p>
          <h1 className="commerce-title mt-4">{page.title}</h1>
          <p className="commerce-subtitle mt-4">{page.excerpt}</p>
          <div className="mt-10 space-y-4 font-sans text-sm leading-relaxed text-noir-100/90 md:text-base">
            <p>
              This comparison guide helps shoppers pick based on flavor profile, everyday usage, and
              serving context. Use it to decide what to add to your monthly pantry.
            </p>
            <p>
              Need personalized recommendations? Visit our{" "}
              <Link href="/shop" className="text-amber-300 hover:underline">
                full catalog
              </Link>{" "}
              or contact us on WhatsApp for bulk and curated bundles.
            </p>
          </div>
          <Link
            href="/shop"
            className="commerce-btn-primary mt-8 inline-flex rounded-full px-8 py-3.5 font-sans text-xs font-semibold uppercase tracking-[0.2em]"
          >
            Shop now
          </Link>
        </article>
      </ImmersivePageLayout>
    </>
  );
}
