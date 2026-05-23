import Link from "next/link";
import Image from "next/image";
import type { ProductCategory } from "@/data/brand";
import { SectionHeader } from "./SectionHeader";

export function FeaturedCollections({
  categories,
}: {
  categories: readonly ProductCategory[];
}) {
  return (
    <section className="commerce-section" aria-labelledby="featured-collections">
      <SectionHeader
        id="featured-collections"
        eyebrow="Shop by collection"
        title="Featured collections"
        subtitle="Curated worlds of flavour — from celebratory shrikhand to bold Telhara achaar."
      />
      <div className="commerce-grid-3">
        {categories.map((cat) => {
          const lead = cat.items[0];
          return (
            <Link
              key={cat.id}
              href={`/collections/${cat.id}`}
              className="group relative overflow-hidden rounded-2xl border border-white/10"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                {lead ? (
                  <Image
                    src={lead.image}
                    alt={cat.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <p className="font-sans text-[10px] uppercase tracking-[0.32em] text-amber-300/90">
                  {cat.items.length} products
                </p>
                <h3 className="mt-2 font-display text-3xl text-white md:text-4xl">{cat.title}</h3>
                <p className="mt-2 line-clamp-2 max-w-md font-sans text-sm text-noir-200">{cat.blurb}</p>
                <span className="mt-4 inline-flex font-sans text-xs uppercase tracking-[0.22em] text-amber-300">
                  Shop collection →
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
