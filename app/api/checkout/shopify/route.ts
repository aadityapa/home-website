import { NextResponse } from "next/server";
import { getShopifyConfig, isShopifyConfigured } from "@/lib/commerce/config";
import { createShopifyCheckout } from "@/lib/commerce/shopify/create-checkout";

type Body = {
  lines?: { variantId?: string; quantity?: number }[];
};

export async function POST(req: Request) {
  if (!isShopifyConfigured()) {
    return NextResponse.json(
      { error: "Shopify checkout is not configured" },
      { status: 503 },
    );
  }

  const config = getShopifyConfig();
  if (!config) {
    return NextResponse.json({ error: "Invalid Shopify config" }, { status: 503 });
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const lines = (body.lines ?? [])
    .filter((l): l is { variantId: string; quantity: number } =>
      Boolean(l?.variantId && typeof l.quantity === "number"),
    )
    .map((l) => ({
      variantId: l.variantId,
      quantity: Math.max(1, Math.min(99, Math.floor(l.quantity))),
    }));

  if (!lines.length) {
    return NextResponse.json({ error: "No valid cart lines" }, { status: 400 });
  }

  try {
    const checkoutUrl = await createShopifyCheckout(config, lines);
    return NextResponse.json({ checkoutUrl });
  } catch (err) {
    console.error("[api/checkout/shopify]", err);
    const message = err instanceof Error ? err.message : "Checkout failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
