"use client";

import { useEffect, useState } from "react";

type PerformanceMode = {
  reduceEffects: boolean;
  ready: boolean;
};

export function usePerformanceMode(): PerformanceMode {
  const [mode, setMode] = useState<PerformanceMode>({
    reduceEffects: false,
    ready: false,
  });

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const lowMemory =
      "deviceMemory" in navigator &&
      (navigator as Navigator & { deviceMemory?: number }).deviceMemory !== undefined &&
      ((navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8) <= 4;
    const lowCpu = navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 4;
    const saveData =
      "connection" in navigator &&
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;

    setMode({
      reduceEffects: Boolean(reduceMotion || coarsePointer || lowMemory || lowCpu || saveData),
      ready: true,
    });
  }, []);

  return mode;
}
