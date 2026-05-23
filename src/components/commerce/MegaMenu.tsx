"use client";

import Link from "next/link";
import Image from "next/image";
import { useCatalog } from "@/hooks/useCatalog";

type MegaMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function MegaMenu({ open, onClose }: MegaMenuProps) {
  const { categories } = useCatalog();

  if (!open) return null;

  return (
    <>
      {/* Dim page so hero + collections do not show through the menu */}
      <button
        type="button"
        className="fixed inset-0 top-14 z-[45] hidden bg-noir-950/75 backdrop-blur-[2px] lg:block"
        aria-label="Close shop menu"
        onClick={onClose}
      />
      <div
        className="absolute left-0 right-0 top-full z-[48] hidden max-h-[min(78vh,720px)] overflow-y-auto border-b border-white/10 bg-noir-950 shadow-2xl lg:block"
        onMouseLeave={onClose}
        role="navigation"
        aria-label="Shop categories"
      >
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-6 md:grid-cols-4 md:gap-8 md:px-8 md:py-8">
          {categories.map((cat) => {
            const lead = cat.items[0];
            return (
              <div key={cat.id}>
                <Link
                  href={`/collections/${cat.id}`}
                  onClick={onClose}
                  className="group block"
                >
                  {lead ? (
                    <div className="relative mb-3 aspect-[4/3] overflow-hidden rounded-xl">
                      <Image
                        src={lead.image}
                        alt=""
                        fill
                        sizes="200px"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : null}
                  <p className="font-display text-xl text-white group-hover:text-amber-300">{cat.title}</p>
                  <p className="mt-1 line-clamp-2 font-sans text-xs text-noir-300">{cat.blurb}</p>
                </Link>
                <ul className="mt-3 space-y-1">
                  {cat.items.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={`/shop/${item.id}`}
                        onClick={onClose}
                        className="font-sans text-sm text-noir-200 transition hover:text-amber-300"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
          <div className="flex flex-col justify-between rounded-xl border border-amber-500/20 bg-amber-500/5 p-6">
            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-amber-400">Campaign</p>
              <p className="mt-2 font-display text-2xl text-white">Shop all products</p>
              <p className="mt-2 font-sans text-sm text-noir-300">
                Browse the full catalog with filters and quick add.
              </p>
            </div>
            <Link
              href="/shop"
              onClick={onClose}
              className="commerce-btn-primary mt-6 rounded-full px-5 py-2.5 text-center font-sans text-xs font-semibold uppercase tracking-[0.18em]"
            >
              View shop
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
