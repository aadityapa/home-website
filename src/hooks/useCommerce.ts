"use client";

import { getClientCommerceProvider } from "@/lib/commerce/config";

export function useCommerce() {
  const provider = getClientCommerceProvider();
  return {
    provider,
    isShopify: provider === "shopify",
    isLocal: provider === "local",
  };
}
