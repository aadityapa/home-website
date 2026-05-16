import { useEffect, useState } from "react";

export type Quality3D = "full" | "lite" | "off";

function compute(): Quality3D {
  if (typeof window === "undefined") return "lite";
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const nav = navigator as Navigator & { deviceMemory?: number };
  const lowMem =
    typeof nav.deviceMemory === "number" && nav.deviceMemory <= 2;
  if (reduceMotion || lowMem) return "off";

  const narrow = window.innerWidth < 640;
  const medMem =
    typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4;
  if (narrow || medMem) return "lite";

  return "full";
}

/** `full` = post-processing + rich scenes; `lite` = textures, fewer particles; `off` = 2D fallback */
export function use3DQuality(): Quality3D {
  const [quality, setQuality] = useState<Quality3D>(compute);

  useEffect(() => {
    const evaluate = () => setQuality(compute());
    evaluate();
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    mq.addEventListener("change", evaluate);
    window.addEventListener("resize", evaluate);
    return () => {
      mq.removeEventListener("change", evaluate);
      window.removeEventListener("resize", evaluate);
    };
  }, []);

  return quality;
}
