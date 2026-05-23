"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ScrollContextValue = {
  scroll: number;
  progress: number;
  lenis: null;
};

const ScrollContext = createContext<ScrollContextValue>({
  scroll: 0,
  progress: 0,
  lenis: null,
});

export function ScrollProvider({ children }: { children: ReactNode }) {
  const [scroll, setScroll] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    let frame = 0;

    const commitScroll = () => {
      frame = 0;
      setScroll(window.scrollY);
      ScrollTrigger.update();
    };

    const requestScrollSync = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(commitScroll);
    };

    const onResize = () => {
      setViewportHeight(window.innerHeight);
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        requestScrollSync();
        requestAnimationFrame(() => ScrollTrigger.refresh());
      }
    };

    onResize();
    requestScrollSync();
    window.addEventListener("scroll", requestScrollSync, { passive: true });
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestScrollSync);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  const progress = useMemo(() => {
    if (typeof document === "undefined") return 0;
    const max = document.documentElement.scrollHeight - viewportHeight;
    return max > 0 ? scroll / max : 0;
  }, [scroll, viewportHeight]);

  const value = useMemo(
    () => ({ scroll, progress, lenis: null }),
    [scroll, progress],
  );

  return (
    <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
  );
}

export function useAppScroll() {
  return useContext(ScrollContext);
}
