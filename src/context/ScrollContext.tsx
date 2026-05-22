"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const easeOutExpo: (t: number) => number = (t) =>
  Math.min(1, 1.001 - Math.pow(2, -10 * t));

type ScrollContextValue = {
  scroll: number;
  progress: number;
  lenis: Lenis | null;
};

const ScrollContext = createContext<ScrollContextValue>({
  scroll: 0,
  progress: 0,
  lenis: null,
});

export function ScrollProvider({ children }: { children: ReactNode }) {
  const [scroll, setScroll] = useState(0);
  const scrollRef = useRef(0);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    document.documentElement.classList.add("lenis", "lenis-smooth");

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const instance = new Lenis(
      reduceMotion
        ? {
            lerp: 1,
            smoothWheel: false,
            syncTouch: false,
            wheelMultiplier: 1,
            touchMultiplier: 1,
          }
        : {
            duration: 0.85,
            easing: easeOutExpo,
            lerp: 0.12,
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 1,
            syncTouch: true,
            syncTouchLerp: 0.1,
          },
    );

    lenisRef.current = instance;

    instance.on("scroll", ({ scroll: s }) => {
      scrollRef.current = s;
      ScrollTrigger.update();
    });

    const lenisRaf = (time: number) => {
      instance.raf(time);
    };

    let lastHeaderSync = 0;
    const syncHeaderScroll = () => {
      const now = performance.now();
      if (now - lastHeaderSync < 100) return;
      lastHeaderSync = now;
      setScroll(scrollRef.current);
    };

    gsap.ticker.add(lenisRaf);
    gsap.ticker.add(syncHeaderScroll);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length && typeof value === "number") {
          instance.scrollTo(value, { immediate: true });
        }
        return scrollRef.current;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      gsap.ticker.remove(lenisRaf);
      gsap.ticker.remove(syncHeaderScroll);
      window.removeEventListener("resize", onResize);
      ScrollTrigger.scrollerProxy(document.documentElement, {});
      document.documentElement.classList.remove("lenis", "lenis-smooth");
      instance.destroy();
      lenisRef.current = null;
    };
  }, []);

  const progress = useMemo(() => {
    if (typeof document === "undefined") return 0;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    return max > 0 ? scroll / max : 0;
  }, [scroll]);

  const value = useMemo(
    () => ({ scroll, progress, lenis: lenisRef.current }),
    [scroll, progress],
  );

  return (
    <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
  );
}

export function useAppScroll() {
  return useContext(ScrollContext);
}
