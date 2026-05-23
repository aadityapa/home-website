# Shopify Storefront API setup

This project supports **Shopify Storefront API** for live catalog, inventory, and hosted checkout, with automatic fallback to local `catalog.json` when Shopify is not configured.

## 1. Create a Storefront API token

1. In Shopify Admin → **Settings** → **Apps and sales channels** → **Develop apps**
2. Create an app → configure **Storefront API** scopes:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_write_checkouts` (for cart/checkout)
3. Install the app and copy the **Storefront API access token**

## 2. Environment variables

Add to Vercel (or `.env.local` for development):

```env
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_storefront_token
SHOPIFY_API_VERSION=2024-10
NEXT_PUBLIC_COMMERCE_PROVIDER=shopify
```

Keep `SHOPIFY_STOREFRONT_ACCESS_TOKEN` **server-only**. Never prefix it with `NEXT_PUBLIC_`.

## 3. Collections

Products are loaded from **Shopify Collections**. Create collections that match your merchandising (e.g. Shrikhand, Achaar) and assign products to them.

Product URLs use the Shopify **handle**: `/shop/[handle]`.

## 4. Checkout flow

When Shopify is enabled:

- Cart shows **Secure Shopify checkout** → creates a Storefront cart and redirects to Shopify hosted checkout
- **Order via WhatsApp / COD** remains available as a fallback

## 5. Local development without Shopify

Omit Shopify env vars. The site uses:

- `GET /api/catalog` → embedded `PRODUCT_CATEGORIES` / `public/data/catalog.json`
- WhatsApp checkout in the cart drawer

## 6. Verify

```bash
npm run build
curl http://localhost:3000/api/catalog
```

Response should include `"provider": "shopify"` when configured.
