import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/data/commerce";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { ImmersivePageLayout } from "@/components/layout/ImmersivePageLayout";
import { SectionHeader } from "@/components/commerce/SectionHeader";

export const metadata: Metadata = buildPageMetadata({
  title: "Buying guides & recipes | Uma Laghoo Udyog",
  description:
    "SEO-friendly guides on chai masala, achaar storage, and shrikhand serving — from Uma Laghoo Udyog.",
  path: "/blog",
});

export default function BlogIndexPage() {
  return (
    <ImmersivePageLayout className="pt-20">
      <div className="commerce-section">
        <SectionHeader
          id="blog-index"
          eyebrow="Journal"
          title="Buying guides & kitchen stories"
          subtitle="Expert tips to help you choose, store, and serve our products."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-amber-500/30"
            >
              <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-noir-400">
                {post.date} · {post.readMinutes} min read
              </p>
              <h2 className="mt-3 font-display text-2xl text-white">
                <Link href={`/blog/${post.slug}`} className="hover:text-amber-300">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 font-sans text-sm text-noir-200">{post.excerpt}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-5 inline-flex font-sans text-xs uppercase tracking-[0.2em] text-amber-300"
              >
                Read guide →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </ImmersivePageLayout>
  );
}
