import type { ProductCategory } from "@/data/brand";
import type { ShopifyConfig } from "../config";
import { shopifyStorefront } from "./client";
import { mapShopifyToCategories, type ShopifyCatalogData } from "./map-catalog";
import { COLLECTIONS_CATALOG_QUERY } from "./queries";

export async function fetchShopifyCatalog(
  config: ShopifyConfig,
): Promise<ProductCategory[]> {
  const data = await shopifyStorefront<ShopifyCatalogData>(
    config,
    COLLECTIONS_CATALOG_QUERY,
    { first: 24, productsFirst: 48 },
  );

  const categories = mapShopifyToCategories(data);
  if (!categories.length) {
    throw new Error("Shopify returned no published collections/products");
  }
  return categories;
}
