import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/data/commerce";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { ImmersivePageLayout } from "@/components/layout/ImmersivePageLayout";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Article not found" };
  return buildPageMetadata({
    title: `${post.title} | Uma Laghoo Udyog`,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Guides", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            author: { "@type": "Organization", name: "Uma Laghoo Udyog" },
          },
        ]}
      />
      <ImmersivePageLayout className="pt-20">
        <article className="commerce-section mx-auto max-w-3xl">
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-noir-400">
            {post.date} · {post.readMinutes} min read
          </p>
          <h1 className="commerce-title mt-4">{post.title}</h1>
          <p className="commerce-subtitle mt-4">{post.excerpt}</p>
          <div className="prose-commerce mt-10 space-y-4 font-sans text-sm leading-relaxed text-noir-100/90 md:text-base">
            <p>
              This guide helps you get the most from our products — from choosing the right pack size to
              storage and everyday serving ideas. For orders, browse our{" "}
              <Link href="/shop" className="text-amber-300 hover:underline">
                shop
              </Link>{" "}
              or message us on WhatsApp.
            </p>
            <p>
              We craft in small batches in Telhara with FSSAI-licensed processes and 100% vegetarian
              ingredients. Questions? Visit our{" "}
              <Link href="/faq" className="text-amber-300 hover:underline">
                FAQ
              </Link>{" "}
              or contact page.
            </p>
          </div>
          <Link
            href="/shop"
            className="commerce-btn-primary mt-10 inline-flex rounded-full px-8 py-3.5 font-sans text-xs font-semibold uppercase tracking-[0.2em]"
          >
            Shop products
          </Link>
        </article>
      </ImmersivePageLayout>
    </>
  );
}
