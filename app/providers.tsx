"use client";

import { MotionProvider } from "@/components/motion/MotionProvider";
import { CartProvider } from "@/context/CartContext";
import { ScrollProvider } from "@/context/ScrollContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <ScrollProvider>
        <MotionProvider>{children}</MotionProvider>
      </ScrollProvider>
    </CartProvider>
  );
}
