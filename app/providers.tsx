"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { CartProvider } from "@/context/CartContext";
import { PageTransitionProvider } from "@/context/PageTransitionContext";
import { ScrollProvider } from "@/context/ScrollContext";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60_000,
            gcTime: 5 * 60_000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <PageTransitionProvider>
          <ScrollProvider>
            <MotionProvider>{children}</MotionProvider>
          </ScrollProvider>
        </PageTransitionProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}
