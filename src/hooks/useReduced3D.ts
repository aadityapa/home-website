import { useEffect, useState } from "react";

function computeReduced(): boolean {
  if (typeof window === "undefined") return false;
  const narrow = window.innerWidth < 768;
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const nav = navigator as Navigator & { deviceMemory?: number };
  const lowMem =
    typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4;
  return narrow || reduceMotion || lowMem;
}

/**
 * Disables heavy Canvas scenes on small screens, reduced motion,
 * or reportedly low device memory when exposed by the browser.
 */
export function useReduced3D(): boolean {
  const [reduced, setReduced] = useState(computeReduced);

  useEffect(() => {
    const evaluate = () => setReduced(computeReduced());
    evaluate();
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    mq.addEventListener("change", evaluate);
    window.addEventListener("resize", evaluate);
    return () => {
      mq.removeEventListener("change", evaluate);
      window.removeEventListener("resize", evaluate);
    };
  }, []);

  return reduced;
}
