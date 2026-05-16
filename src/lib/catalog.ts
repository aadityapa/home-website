import type { ProductCategory, ProductItem } from "../data/brand";

export type CatalogPayload = {
  version?: number;
  updatedAt?: string;
  categories: ProductCategory[];
};

function isProductItem(x: unknown): x is ProductItem {
  if (!x || typeof x !== "object") return false;
  const o = x as Record<string, unknown>;
  return (
    typeof o.id === "string" &&
    typeof o.name === "string" &&
    typeof o.description === "string" &&
    typeof o.image === "string" &&
    typeof o.price === "string"
  );
}

function isCategory(x: unknown): x is ProductCategory {
  if (!x || typeof x !== "object") return false;
  const o = x as Record<string, unknown>;
  if (
    typeof o.id !== "string" ||
    typeof o.title !== "string" ||
    typeof o.blurb !== "string" ||
    !Array.isArray(o.items)
  ) {
    return false;
  }
  return o.items.every(isProductItem);
}

/** Validates JSON from `/data/catalog.json` or a CMS payload. */
export function parseCatalogPayload(data: unknown): ProductCategory[] | null {
  if (!data || typeof data !== "object") return null;
  const root = data as Record<string, unknown>;
  const raw = root.categories ?? root.data ?? root;
  if (!Array.isArray(raw)) return null;
  if (!raw.every(isCategory)) return null;
  return raw as ProductCategory[];
}
