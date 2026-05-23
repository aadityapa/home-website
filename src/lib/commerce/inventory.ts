import type { ProductItem } from "@/data/brand";

export function getProductStockLabel(product: ProductItem): {
  label: string;
  lowStock: boolean;
  outOfStock: boolean;
} {
  if (product.availableForSale === false) {
    return { label: "Out of stock", lowStock: false, outOfStock: true };
  }

  const qty = product.inventoryQuantity;
  if (typeof qty === "number") {
    if (qty <= 0) {
      return { label: "Out of stock", lowStock: false, outOfStock: true };
    }
    if (qty <= 8) {
      return { label: `Only ${qty} left`, lowStock: true, outOfStock: false };
    }
    return { label: "In stock", lowStock: false, outOfStock: false };
  }

  const pseudo = 4 + ([...product.id].reduce((a, c) => a + c.charCodeAt(0), 0) % 14);
  return {
    label: pseudo <= 8 ? `Only ${pseudo} left` : "In stock",
    lowStock: pseudo <= 8,
    outOfStock: false,
  };
}
