export type CommerceProvider = "local" | "shopify";

export type ShopifyConfig = {
  storeDomain: string;
  storefrontAccessToken: string;
  apiVersion: string;
};

export function getCommerceProvider(): CommerceProvider {
  if (isShopifyConfigured()) return "shopify";
  return "local";
}

export function isShopifyConfigured(): boolean {
  return Boolean(
    process.env.SHOPIFY_STORE_DOMAIN?.trim() &&
      process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN?.trim(),
  );
}

/** Safe for client bundles — set `NEXT_PUBLIC_COMMERCE_PROVIDER=shopify` when Storefront is live. */
export function getClientCommerceProvider(): CommerceProvider {
  if (process.env.NEXT_PUBLIC_COMMERCE_PROVIDER === "shopify") return "shopify";
  return "local";
}

export function getShopifyConfig(): ShopifyConfig | null {
  const storeDomain = process.env.SHOPIFY_STORE_DOMAIN?.trim();
  const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN?.trim();
  if (!storeDomain || !storefrontAccessToken) return null;
  return {
    storeDomain: storeDomain.replace(/^https?:\/\//, "").replace(/\/$/, ""),
    storefrontAccessToken,
    apiVersion: process.env.SHOPIFY_API_VERSION?.trim() || "2024-10",
  };
}
