import Image from "next/image";
import Link from "next/link";
import type { ProductCategory } from "@/data/brand";

export function CollectionBanner({ category }: { category: ProductCategory }) {
  const heroImage = category.items[0]?.image ?? "/images/shrikhand-kesar-ilaichi.png";

  return (
    <section className="relative min-h-[200px] overflow-hidden md:min-h-[280px]">
      <Image src={heroImage} alt="" fill className="object-cover" priority sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1a120e]/90 via-[#1a120e]/55 to-transparent" />
      <div className="relative mx-auto flex max-w-7xl flex-col justify-end px-4 py-10 md:px-10 md:py-14 lg:px-14">
        <p className="font-sans text-[10px] uppercase tracking-[0.32em] text-amber-400/90">Collection</p>
        <h1 className="mt-2 max-w-2xl font-display text-3xl text-white md:text-5xl">{category.title}</h1>
        <p className="mt-3 max-w-xl font-sans text-sm text-noir-200 md:text-base">{category.blurb}</p>
        <p className="mt-4 font-sans text-xs text-noir-300">{category.items.length} products</p>
        <Link
          href={`/shop?cat=${category.id}`}
          className="commerce-btn-primary mt-5 inline-flex w-fit rounded-full px-6 py-3 font-sans text-xs font-semibold uppercase tracking-[0.16em]"
        >
          Filter in shop
        </Link>
      </div>
    </section>
  );
}
