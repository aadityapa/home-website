"use client";

type SortKey = "default" | "price-asc" | "price-desc" | "name";

type Props = {
  productCount: number;
  sort: SortKey;
  onSortChange: (sort: SortKey) => void;
  inStockOnly: boolean;
  onInStockChange: (value: boolean) => void;
};

export function CollectionProductToolbar({
  productCount,
  sort,
  onSortChange,
  inStockOnly,
  onInStockChange,
}: Props) {
  return (
    <div className="mb-5 flex flex-col gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] p-3 sm:flex-row sm:items-center sm:justify-between md:mb-6 md:rounded-2xl md:p-4">
      <p className="font-sans text-xs text-noir-300">
        <span className="font-semibold text-white">{productCount}</span> products
        {inStockOnly ? " · in stock only" : ""}
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <label className="flex cursor-pointer items-center gap-2 rounded-full border border-white/12 px-3 py-1.5 font-sans text-[10px] uppercase tracking-[0.14em] text-noir-200">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => onInStockChange(e.target.checked)}
            className="accent-amber-500"
          />
          In stock
        </label>
        <label className="font-sans text-[10px] uppercase tracking-[0.14em] text-noir-400">
          Sort
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortKey)}
            className="ml-2 rounded-full border border-white/12 bg-noir-900/80 px-3 py-1.5 text-[10px] uppercase tracking-[0.12em] text-white outline-none focus:ring-2 focus:ring-amber-500/40"
            aria-label="Sort products"
          >
            <option value="default">Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="name">Name A–Z</option>
          </select>
        </label>
      </div>
    </div>
  );
}

export type { SortKey };
