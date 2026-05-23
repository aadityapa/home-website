"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useCatalog } from "@/hooks/useCatalog";
import type { CatalogProduct } from "@/lib/catalog-utils";

type SearchOverlayProps = {
  open: boolean;
  onClose: () => void;
};

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { categories } = useCatalog();

  const products = useMemo<CatalogProduct[]>(
    () =>
      categories.flatMap((c) =>
        c.items.map((item) => ({
          ...item,
          categoryId: c.id,
          categoryTitle: c.title,
        })),
      ),
    [categories],
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products.slice(0, 6);
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.categoryTitle.toLowerCase().includes(q),
    );
  }, [query, products]);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    const t = window.setTimeout(() => inputRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[120] flex flex-col bg-noir-950/95 backdrop-blur-xl" role="dialog" aria-modal="true" aria-label="Search products">
      <div className="mx-auto flex w-full max-w-2xl items-center gap-3 border-b border-white/10 px-6 py-5">
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products, categories…"
          className="flex-1 bg-transparent font-sans text-lg text-white placeholder:text-noir-400 focus:outline-none"
        />
        <button type="button" onClick={onClose} className="font-sans text-xs uppercase tracking-[0.2em] text-noir-300 hover:text-white">
          Esc
        </button>
      </div>
      <div className="mx-auto w-full max-w-2xl flex-1 overflow-y-auto px-6 py-6">
        <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-noir-400">
          {query ? `${results.length} results` : "Popular products"}
        </p>
        <ul className="mt-4 divide-y divide-white/8">
          {results.map((p) => (
            <li key={p.id}>
              <Link
                href={`/shop/${p.id}`}
                onClick={onClose}
                className="flex items-center justify-between gap-4 py-4 transition hover:text-amber-300"
              >
                <span>
                  <span className="block font-display text-lg text-white">{p.name}</span>
                  <span className="font-sans text-xs text-noir-400">{p.categoryTitle}</span>
                </span>
                <span className="font-display text-amber-300">{p.price}</span>
              </Link>
            </li>
          ))}
        </ul>
        {results.length === 0 ? (
          <p className="mt-8 font-sans text-sm text-noir-300">No products match your search.</p>
        ) : null}
        {query.trim() ? (
          <Link
            href={`/shop?q=${encodeURIComponent(query.trim())}`}
            onClick={onClose}
            className="mt-6 inline-flex rounded-full border border-amber-500/40 bg-amber-500/10 px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-amber-200 transition hover:bg-amber-500/20"
          >
            View all results in shop
          </Link>
        ) : null}
      </div>
    </div>
  );
}
