import { useEffect, useState } from "react";
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
  const [categories, setCategories] = useState<ProductCategory[]>(() =>
    cloneCategories(PRODUCT_CATEGORIES),
  );
  const [catalogReady, setCatalogReady] = useState(false);
  const [status, setStatus] = useState<Status>("loading");
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const url =
      process.env.NEXT_PUBLIC_CATALOG_URL?.trim() ||
      "/data/catalog.json";

    let cancelled = false;

    async function load() {
      setStatus("loading");
      setFetchError(null);
      try {
        const res = await fetch(url, {
          headers: { Accept: "application/json" },
          cache: "no-store",
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json: unknown = await res.json();
        const parsed = parseCatalogPayload(json);
        if (!parsed?.length) throw new Error("Invalid catalog shape");
        if (!cancelled) {
          setCategories(cloneCategories(parsed));
          setStatus("live");
        }
      } catch (e) {
        if (!cancelled) {
          setCategories(cloneCategories(PRODUCT_CATEGORIES));
          setStatus("fallback");
          setFetchError(e instanceof Error ? e.message : "Unknown error");
        }
      } finally {
        if (!cancelled) setCatalogReady(true);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return {
    categories,
    catalogReady,
    status,
    isLiveCatalog: status === "live",
    fetchError,
  };
}
