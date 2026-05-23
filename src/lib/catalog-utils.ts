import {
  PRODUCT_CATEGORIES,
  type ProductCategory,
  type ProductItem,
} from "@/data/brand";

export type CatalogProduct = ProductItem & {
  categoryId: string;
  categoryTitle: string;
};

export function getAllCategories(): ProductCategory[] {
  return PRODUCT_CATEGORIES.map((c) => ({
    ...c,
    items: [...c.items],
  }));
}

export function flattenCatalog(
  categories: readonly ProductCategory[] = PRODUCT_CATEGORIES,
): CatalogProduct[] {
  return categories.flatMap((cat) =>
    cat.items.map((item) => ({
      ...item,
      categoryId: cat.id,
      categoryTitle: cat.title,
    })),
  );
}

export function findProductById(id: string) {
  return findProductByIdInCategories(id, PRODUCT_CATEGORIES);
}

export function findProductByIdInCategories(
  id: string,
  categories: readonly ProductCategory[],
) {
  for (const cat of categories) {
    const item = cat.items.find((i) => i.id === id || i.handle === id);
    if (item) return { item, category: cat };
  }
  return null;
}

export function findCategoryById(id: string) {
  return PRODUCT_CATEGORIES.find((c) => c.id === id) ?? null;
}

export function findCategoryByIdInCategories(
  id: string,
  categories: readonly ProductCategory[],
) {
  return categories.find((c) => c.id === id) ?? null;
}

export function getBestSellers(limit = 6): CatalogProduct[] {
  return flattenCatalog().slice(0, limit);
}

export function getTrendingProducts(limit = 4): CatalogProduct[] {
  const all = flattenCatalog();
  return [...all].reverse().slice(0, limit);
}
