import { useQuery } from "@tanstack/react-query";
import type { ProductCategory } from "../data/brand";
import { PRODUCT_CATEGORIES } from "../data/brand";
import { parseCatalogPayload } from "../lib/catalog";
import { getClientCommerceProvider } from "../lib/commerce/config";

type Status = "loading" | "live" | "fallback";
type CatalogApiResponse = {
  categories?: ProductCategory[];
  provider?: string;
};

function cloneCategories(cats: readonly ProductCategory[]): ProductCategory[] {
  return cats.map((c) => ({
    ...c,
    items: [...c.items],
  }));
}

/**
 * Loads catalog from `/api/catalog` (Shopify or local) with JSON fallback.
 */
export function useCatalog() {
  const provider = getClientCommerceProvider();
  const customUrl = process.env.NEXT_PUBLIC_CATALOG_URL?.trim();
  const url = customUrl || "/api/catalog";

  const query = useQuery({
    queryKey: ["catalog", url, provider],
    queryFn: async () => {
      const res = await fetch(url, {
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = (await res.json()) as unknown;
      const parsed =
        parseCatalogPayload(json) ??
        parseCatalogPayload((json as CatalogApiResponse).categories);
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
    provider,
    isShopify: provider === "shopify",
  };
}
