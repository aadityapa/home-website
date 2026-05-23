import type { ShopifyConfig } from "../config";
import { shopifyStorefront } from "./client";
import { CART_CREATE_MUTATION } from "./queries";

export type CheckoutLineInput = {
  variantId: string;
  quantity: number;
};

type CartCreateData = {
  cartCreate: {
    cart: { id: string; checkoutUrl: string } | null;
    userErrors: { field: string[] | null; message: string }[];
  };
};

export async function createShopifyCheckout(
  config: ShopifyConfig,
  lines: CheckoutLineInput[],
): Promise<string> {
  const cartLines = lines.map((line) => ({
    merchandiseId: line.variantId,
    quantity: Math.max(1, Math.min(99, Math.floor(line.quantity))),
  }));

  const data = await shopifyStorefront<CartCreateData>(config, CART_CREATE_MUTATION, {
    lines: cartLines,
  });

  const errors = data.cartCreate.userErrors;
  if (errors.length) {
    throw new Error(errors.map((e) => e.message).join("; "));
  }

  const checkoutUrl = data.cartCreate.cart?.checkoutUrl;
  if (!checkoutUrl) {
    throw new Error("Shopify did not return a checkout URL");
  }

  return checkoutUrl;
}
