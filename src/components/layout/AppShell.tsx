"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AppHeader } from "./Header";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { StickyCartFab } from "@/components/cart/StickyCartFab";
import { CartToast } from "@/components/ui/CartToast";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { Footer } from "@/components/sections/Footer";
import { SeoJsonLd } from "@/components/seo/SeoJsonLd";
import { CustomCursor } from "@/components/immersive/CustomCursor";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { SiteBackdrop3D } from "@/components/three/SiteBackdrop3D";
import { RouteTransitionLayer } from "@/components/immersive/RouteTransitionLayer";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [loaderDone, setLoaderDone] = useState(false);

  useEffect(() => {
    if (!loaderDone) return;
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [loaderDone, pathname]);

  return (
    <>
      <SeoJsonLd />
      {!isHome && <AmbientBackground />}
      {!isHome && <SiteBackdrop3D />}
      <div className="page-grain" aria-hidden />
      {!loaderDone && <LoadingScreen onDone={() => setLoaderDone(true)} />}
      <AppHeader />
      <CartDrawer />
      <CartToast />
      <StickyCartFab />
      {isHome && loaderDone && <CustomCursor />}
      <div style={{ opacity: loaderDone ? 1 : 0, transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1)" }}>
        <RouteTransitionLayer routeKey={pathname}>
          {children}
          {!isHome && <Footer />}
        </RouteTransitionLayer>
      </div>
    </>
  );
}
