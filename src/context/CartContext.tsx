"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { ProductItem } from "../data/brand";
import { parseInrRupees } from "../lib/price";
import { trackEvent } from "../lib/analytics";

export type CartLine = {
  productId: string;
  name: string;
  priceLabel: string;
  priceRupees: number;
  image: string;
  unit?: string;
  categoryLabel: string;
  quantity: number;
};

const STORAGE_KEY = "ulu-ecom-cart-v1";

function readStoredLines(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const p = JSON.parse(raw) as unknown;
    if (!Array.isArray(p)) return [];
    return p.filter(
      (l): l is CartLine =>
        !!l &&
        typeof l === "object" &&
        typeof (l as CartLine).productId === "string" &&
        typeof (l as CartLine).quantity === "number" &&
        typeof (l as CartLine).priceRupees === "number",
    );
  } catch {
    return [];
  }
}

type CartContextValue = {
  lines: CartLine[];
  itemCount: number;
  subtotalRupees: number;
  drawerOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  cartToast: string | null;
  dismissCartToast: () => void;
  addItem: (product: ProductItem, categoryLabel: string, qty?: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeLine: (productId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cartToast, setCartToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setLines(readStoredLines());
  }, []);

  const openCart = useCallback(() => {
    setDrawerOpen(true);
    trackEvent("cart_opened");
  }, []);
  const closeCart = useCallback(() => setDrawerOpen(false), []);

  const dismissCartToast = useCallback(() => {
    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
      toastTimer.current = null;
    }
    setCartToast(null);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* quota / private mode */
    }
  }, [lines]);

  const addItem = useCallback(
    (product: ProductItem, categoryLabel: string, qty = 1) => {
      const priceRupees = parseInrRupees(product.price);
      setLines((prev) => {
        const i = prev.findIndex((l) => l.productId === product.id);
        if (i >= 0) {
          const next = [...prev];
          next[i] = {
            ...next[i],
            quantity: Math.min(99, next[i].quantity + qty),
          };
          return next;
        }
        return [
          ...prev,
          {
            productId: product.id,
            name: product.name,
            priceLabel: product.price,
            priceRupees,
            image: product.image,
            unit: product.unit,
            categoryLabel,
            quantity: qty,
          },
        ];
      });
      trackEvent("add_to_cart", {
        productId: product.id,
        productName: product.name,
        category: categoryLabel,
        quantity: qty,
        priceRupees,
      });
      setCartToast(`${product.name} · added to cart`);
      if (toastTimer.current) clearTimeout(toastTimer.current);
      toastTimer.current = setTimeout(() => setCartToast(null), 3200);
    },
    [],
  );

  const setQuantity = useCallback((productId: string, quantity: number) => {
    const q = Math.max(0, Math.min(99, Math.floor(quantity)));
    setLines((prev) => {
      if (q === 0) return prev.filter((l) => l.productId !== productId);
      return prev.map((l) =>
        l.productId === productId ? { ...l, quantity: q } : l,
      );
    });
  }, []);

  const removeLine = useCallback((productId: string) => {
    setLines((prev) => prev.filter((l) => l.productId !== productId));
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const subtotalRupees = useMemo(
    () =>
      lines.reduce((sum, l) => sum + l.priceRupees * l.quantity, 0),
    [lines],
  );

  const itemCount = useMemo(
    () => lines.reduce((n, l) => n + l.quantity, 0),
    [lines],
  );

  const value = useMemo(
    () => ({
      lines,
      itemCount,
      subtotalRupees,
      drawerOpen,
      openCart,
      closeCart,
      cartToast,
      dismissCartToast,
      addItem,
      setQuantity,
      removeLine,
      clearCart,
    }),
    [
      lines,
      itemCount,
      subtotalRupees,
      drawerOpen,
      openCart,
      closeCart,
      cartToast,
      dismissCartToast,
      addItem,
      setQuantity,
      removeLine,
      clearCart,
    ],
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
