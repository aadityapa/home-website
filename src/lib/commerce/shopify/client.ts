import type { ShopifyConfig } from "../config";

type GraphqlResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

export async function shopifyStorefront<T>(
  config: ShopifyConfig,
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const endpoint = `https://${config.storeDomain}/api/${config.apiVersion}/graphql.json`;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": config.storefrontAccessToken,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error(`Shopify HTTP ${res.status}`);
  }

  const json = (await res.json()) as GraphqlResponse<T>;
  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join("; "));
  }
  if (!json.data) {
    throw new Error("Shopify returned empty data");
  }
  return json.data;
}
