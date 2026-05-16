import {
  createContext,
  useContext,
  useEffect,
  useMemo,
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
  const [progress, setProgress] = useState(0);
  const [lenis, setLenis] = useState<Lenis | null>(null);

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
            stopInertiaOnNavigate: true,
          }
        : {
            duration: 1.35,
            easing: easeOutExpo,
            lerp: 0.08,
            smoothWheel: true,
            wheelMultiplier: 0.9,
            touchMultiplier: 1.08,
            syncTouch: true,
            syncTouchLerp: 0.075,
            stopInertiaOnNavigate: true,
            anchors: {
              offset: -84,
              duration: 1.35,
              easing: easeOutExpo,
            },
          },
    );

    setLenis(instance);

    let raf = 0;
    const onRaf = (time: number) => {
      instance.raf(time);
      raf = requestAnimationFrame(onRaf);
    };
    raf = requestAnimationFrame(onRaf);

    const onScroll = (e: { scroll: number }) => {
      ScrollTrigger.update();
      setScroll(e.scroll);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? e.scroll / max : 0);
    };

    instance.on("scroll", onScroll);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.documentElement.classList.remove("lenis", "lenis-smooth");
      instance.destroy();
      setLenis(null);
    };
  }, []);

  const value = useMemo(
    () => ({ scroll, progress, lenis }),
    [scroll, progress, lenis],
  );

  return (
    <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
  );
}

export function useAppScroll() {
  return useContext(ScrollContext);
}
