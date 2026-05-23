"use client";

import { useEffect, useState } from "react";
import type { CatalogProduct } from "@/lib/catalog-utils";
import type { ProductCategory } from "@/data/brand";

const STORAGE_KEY = "ulu-recently-viewed-v1";

function readIds() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [] as string[];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function writeIds(ids: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // no-op (private mode/quota)
  }
}

export function useRecentlyViewed(currentId?: string) {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    setIds(readIds());
  }, []);

  useEffect(() => {
    if (!currentId) return;
    const existing = readIds().filter((id) => id !== currentId);
    const next = [currentId, ...existing].slice(0, 8);
    writeIds(next);
    setIds(next);
  }, [currentId]);

  return ids;
}

export function mapRecentlyViewedProducts(
  categories: readonly ProductCategory[],
  ids: readonly string[],
  currentId?: string,
) {
  const table = new Map<string, CatalogProduct>();
  for (const cat of categories) {
    for (const item of cat.items) {
      table.set(item.id, {
        ...item,
        categoryId: cat.id,
        categoryTitle: cat.title,
      });
    }
  }
  return ids
    .filter((id) => id !== currentId)
    .map((id) => table.get(id))
    .filter((x): x is CatalogProduct => Boolean(x))
    .slice(0, 4);
}
