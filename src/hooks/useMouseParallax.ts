import { useEffect, useState } from "react";

export type MouseParallax = { x: number; y: number; nx: number; ny: number };

/** Normalized pointer −1…1 for camera / UI parallax */
export function useMouseParallax(): MouseParallax {
  const [mouse, setMouse] = useState<MouseParallax>({
    x: 0,
    y: 0,
    nx: 0,
    ny: 0,
  });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      setMouse({ x: e.clientX, y: e.clientY, nx, ny });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return mouse;
}
