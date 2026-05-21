import { useQuery } from "@tanstack/react-query";
import type { ProductCategory } from "../data/brand";
import { PRODUCT_CATEGORIES } from "../data/brand";
import { parseCatalogPayload } from "../lib/catalog";

type Status = "loading" | "live" | "fallback";

function cloneCategories(cats: readonly ProductCategory[]): ProductCategory[] {
  return cats.map((c) => ({
    ...c,
    items: [...c.items],
  }));
}

/**
 * Loads the storefront catalog from JSON (`/data/catalog.json` by default).
 * Override with `NEXT_PUBLIC_CATALOG_URL`. Falls back to embedded data if fetch fails.
 */
export function useCatalog() {
  const url = process.env.NEXT_PUBLIC_CATALOG_URL?.trim() || "/data/catalog.json";
  const query = useQuery({
    queryKey: ["catalog", url],
    queryFn: async () => {
      const res = await fetch(url, {
        headers: { Accept: "application/json" },
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json: unknown = await res.json();
      const parsed = parseCatalogPayload(json);
      if (!parsed?.length) throw new Error("Invalid catalog shape");
      return cloneCategories(parsed);
    },
  });

  const categories = query.data ?? cloneCategories(PRODUCT_CATEGORIES);
  const status: Status = query.isLoading
    ? "loading"
    : query.isError
      ? "fallback"
      : "live";
  const fetchError = query.error instanceof Error ? query.error.message : null;

  return {
    categories,
    catalogReady: !query.isLoading,
    status,
    isLiveCatalog: status === "live",
    fetchError,
  };
}
