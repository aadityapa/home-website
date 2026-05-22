"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AppHeader } from "./Header";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { StickyCartFab } from "@/components/cart/StickyCartFab";
import { CartToast } from "@/components/ui/CartToast";
import { Footer } from "@/components/sections/Footer";
import { SeoJsonLd } from "@/components/seo/SeoJsonLd";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { RouteTransitionLayer } from "@/components/immersive/RouteTransitionLayer";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const loaderDone = true;

  useEffect(() => {
    if (!loaderDone) return;
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [loaderDone, pathname]);

  return (
    <>
      <SeoJsonLd />
      {!isHome && <AmbientBackground />}
      <div className="page-grain" aria-hidden />
      <AppHeader />
      <CartDrawer />
      <CartToast />
      <StickyCartFab />
      <div style={{ opacity: loaderDone ? 1 : 0, transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1)" }}>
        <RouteTransitionLayer routeKey={pathname}>
          {children}
          {!isHome && <Footer />}
        </RouteTransitionLayer>
      </div>
    </>
  );
}
