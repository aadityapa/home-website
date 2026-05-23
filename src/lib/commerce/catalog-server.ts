import { PRODUCT_CATEGORIES, type ProductCategory } from "@/data/brand";
import { getCommerceProvider, getShopifyConfig } from "./config";
import { fetchShopifyCatalog } from "./shopify/fetch-catalog";

let cachedCatalog: ProductCategory[] | null = null;
let cacheAt = 0;
const CACHE_MS = 5 * 60 * 1000;

/**
 * Server-only catalog resolver: Shopify Storefront when configured, else embedded JSON/brand data.
 */
export async function getServerCatalog(): Promise<ProductCategory[]> {
  const now = Date.now();
  if (cachedCatalog && now - cacheAt < CACHE_MS) {
    return cachedCatalog;
  }

  if (getCommerceProvider() === "shopify") {
    const config = getShopifyConfig();
    if (config) {
      try {
        cachedCatalog = await fetchShopifyCatalog(config);
        cacheAt = now;
        return cachedCatalog;
      } catch (err) {
        console.error("[commerce] Shopify catalog failed, using local fallback:", err);
      }
    }
  }

  cachedCatalog = PRODUCT_CATEGORIES.map((c) => ({
    ...c,
    items: [...c.items],
  }));
  cacheAt = now;
  return cachedCatalog;
}
