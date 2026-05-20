import { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
// useLocation also used in App root for immersive home
import { AnimatePresence, motion } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CartProvider } from "./context/CartContext";
import { ScrollProvider } from "./context/ScrollContext";
import { CartDrawer } from "./components/cart/CartDrawer";
import { StickyCartFab } from "./components/cart/StickyCartFab";
import { CartToast } from "./components/ui/CartToast";
import { AmbientBackground } from "./components/ui/AmbientBackground";
import { SiteBackdrop3D } from "./components/three/SiteBackdrop3D";
import { CustomCursor } from "./components/immersive/CustomCursor";
import { AppHeader } from "./components/layout/Header";
import { LoadingScreen } from "./components/ui/LoadingScreen";
import { Footer } from "./components/sections/Footer";
import { SeoJsonLd } from "./components/seo/SeoJsonLd";
import { SectionFallback } from "./components/ui/SectionFallback";

const ImmersiveHomePage  = lazy(() => import("./pages/ImmersiveHomePage"));
const ShopPage           = lazy(() => import("./pages/ShopPage"));
const ProductDetailPage  = lazy(() => import("./pages/ProductDetailPage"));
const AboutPage          = lazy(() => import("./pages/AboutPage"));
const JourneyPage        = lazy(() => import("./pages/JourneyPage"));
const ContactPage        = lazy(() => import("./pages/ContactPage"));

/** Smooth page fade transition */
function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function AppRoutes() {
  const location = useLocation();

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Suspense fallback={<SectionFallback label="Loading…" />}><ImmersiveHomePage /></Suspense></PageTransition>} />
        <Route path="/shop" element={<PageTransition><Suspense fallback={<SectionFallback label="Loading shop…" />}><ShopPage /></Suspense></PageTransition>} />
        <Route path="/shop/:id" element={<PageTransition><Suspense fallback={<SectionFallback label="Loading product…" />}><ProductDetailPage /></Suspense></PageTransition>} />
        <Route path="/about" element={<PageTransition><Suspense fallback={<SectionFallback label="Loading about…" />}><AboutPage /></Suspense></PageTransition>} />
        <Route path="/journey" element={<PageTransition><Suspense fallback={<SectionFallback label="Loading journey…" />}><JourneyPage /></Suspense></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Suspense fallback={<SectionFallback label="Loading contact…" />}><ContactPage /></Suspense></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [loaderDone, setLoaderDone] = useState(false);
  const location = useLocation();
  const isImmersiveHome = location.pathname === "/";

  useEffect(() => {
    if (!loaderDone) return;
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [loaderDone]);

  return (
    <CartProvider>
      <ScrollProvider>
        <SeoJsonLd />
        {!isImmersiveHome && <AmbientBackground />}
        {!isImmersiveHome && <SiteBackdrop3D />}
        {isImmersiveHome && loaderDone && <CustomCursor />}
        <div className="page-grain" aria-hidden />
        {!loaderDone && <LoadingScreen onDone={() => setLoaderDone(true)} />}
        <AppHeader />
        <CartDrawer />
        <CartToast />
        <StickyCartFab />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: loaderDone ? 1 : 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: loaderDone ? 0.05 : 0 }}
        >
          <AppRoutes />
          {!isImmersiveHome && <Footer />}
        </motion.div>
      </ScrollProvider>
    </CartProvider>
  );
}
