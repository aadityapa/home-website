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
import { usePathname } from "next/navigation";

type PageTransitionContextValue = {
  isNavigating: boolean;
  startNavigation: () => void;
  completeNavigation: () => void;
};

const PageTransitionContext = createContext<PageTransitionContextValue | null>(null);

function isInternalHref(href: string | null): boolean {
  if (!href) return false;
  if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return false;
  }
  if (href.startsWith("/")) return true;
  try {
    const url = new URL(href, window.location.origin);
    return url.origin === window.location.origin;
  } catch {
    return false;
  }
}

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const prevPath = useRef(pathname);
  const completeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const completeNavigation = useCallback(() => {
    if (completeTimer.current) clearTimeout(completeTimer.current);
    completeTimer.current = setTimeout(() => setIsNavigating(false), 120);
  }, []);

  const startNavigation = useCallback(() => {
    if (completeTimer.current) clearTimeout(completeTimer.current);
    setIsNavigating(true);
  }, []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as HTMLElement | null)?.closest("a");
      if (!anchor) return;
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!isInternalHref(href)) return;

      const nextPath = href!.startsWith("/")
        ? href!.split("?")[0].split("#")[0]
        : new URL(href!, window.location.origin).pathname;

      if (nextPath === pathname) return;
      startNavigation();
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname, startNavigation]);

  useEffect(() => {
    if (prevPath.current === pathname) {
      completeNavigation();
      return;
    }

    prevPath.current = pathname;
    window.scrollTo(0, 0);
    completeNavigation();
  }, [pathname, completeNavigation]);

  useEffect(
    () => () => {
      if (completeTimer.current) clearTimeout(completeTimer.current);
    },
    [],
  );

  const value = useMemo(
    () => ({ isNavigating, startNavigation, completeNavigation }),
    [isNavigating, startNavigation, completeNavigation],
  );

  return (
    <PageTransitionContext.Provider value={value}>{children}</PageTransitionContext.Provider>
  );
}

export function usePageTransition() {
  const ctx = useContext(PageTransitionContext);
  if (!ctx) {
    throw new Error("usePageTransition must be used within PageTransitionProvider");
  }
  return ctx;
}
