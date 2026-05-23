"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AppHeader } from "./Header";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { StickyCartFab } from "@/components/cart/StickyCartFab";
import { CartToast } from "@/components/ui/CartToast";
import { Footer } from "@/components/sections/Footer";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { RouteTransitionLayer } from "@/components/motion/RouteTransitionLayer";
import { NavigationProgress } from "@/components/motion/NavigationProgress";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return (
    <>
      <NavigationProgress />
      {pathname !== "/" && <AmbientBackground />}
      <div className="page-grain" aria-hidden />
      <AppHeader />
      <CartDrawer />
      <CartToast />
      <StickyCartFab />
      <main id="main-content" className="relative isolate overflow-x-hidden">
        <RouteTransitionLayer>{children}</RouteTransitionLayer>
      </main>
      <Footer />
    </>
  );
}
