import type { ProductCategory, ProductItem } from "@/data/brand";

type ShopifyMoney = { amount: string; currencyCode: string };

type ShopifyVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  quantityAvailable: number | null;
  price: ShopifyMoney;
  selectedOptions: { name: string; value: string }[];
};

type ShopifyProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  availableForSale: boolean;
  totalInventory: number | null;
  featuredImage: { url: string; altText: string | null } | null;
  priceRange: { minVariantPrice: ShopifyMoney };
  variants: { edges: { node: ShopifyVariant }[] };
};

type ShopifyCollection = {
  id: string;
  handle: string;
  title: string;
  description: string;
  products: { edges: { node: ShopifyProduct }[] };
};

export type ShopifyCatalogData = {
  collections: { edges: { node: ShopifyCollection }[] };
};

function formatInrLabel(amount: string, currencyCode: string): string {
  const value = Number.parseFloat(amount);
  if (currencyCode === "INR" || Number.isNaN(value)) {
    return `₹ ${Math.round(value).toLocaleString("en-IN")}`;
  }
  return `${currencyCode} ${value.toFixed(2)}`;
}

function pickVariant(product: ShopifyProduct): ShopifyVariant | null {
  const variants = product.variants.edges.map((e) => e.node);
  if (!variants.length) return null;
  const available = variants.find((v) => v.availableForSale);
  return available ?? variants[0];
}

function variantUnit(variant: ShopifyVariant): string | undefined {
  const size = variant.selectedOptions.find(
    (o) => o.name.toLowerCase() === "size" || o.name.toLowerCase() === "weight",
  );
  return size?.value;
}

function mapProduct(product: ShopifyProduct, categoryTitle: string): ProductItem | null {
  const variant = pickVariant(product);
  if (!variant) return null;

  const image = product.featuredImage?.url ?? "/images/shrikhand-kesar-ilaichi.png";
  const unit =
    variantUnit(variant) ??
    (variant.title !== "Default Title" ? variant.title : undefined);

  return {
    id: product.handle,
    handle: product.handle,
    name: product.title,
    description: product.description?.trim() || `${product.title} from ${categoryTitle}.`,
    image,
    price: formatInrLabel(variant.price.amount, variant.price.currencyCode),
    unit,
    variantId: variant.id,
    availableForSale: variant.availableForSale && product.availableForSale,
    inventoryQuantity: variant.quantityAvailable ?? product.totalInventory,
  };
}

export function mapShopifyToCategories(data: ShopifyCatalogData): ProductCategory[] {
  const categories: ProductCategory[] = [];

  for (const edge of data.collections.edges) {
    const collection = edge.node;
    const items: ProductItem[] = [];

    for (const productEdge of collection.products.edges) {
      const mapped = mapProduct(productEdge.node, collection.title);
      if (mapped) items.push(mapped);
    }

    if (items.length === 0) continue;

    categories.push({
      id: collection.handle,
      title: collection.title,
      blurb:
        collection.description?.trim() ||
        `Shop ${collection.title} from our premium pantry.`,
      items,
    });
  }

  return categories;
}
