import { useEffect, useState } from "react";

const SECTION_IDS = ["about", "products", "journey", "contact"] as const;

/** Which anchor section is nearest the middle of the viewport (for nav highlight). */
export function useActiveSection(): string | undefined {
  const [active, setActive] = useState<string | undefined>();

  useEffect(() => {
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (elements.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = visible[0];
        if (top?.target.id) setActive(top.target.id);
      },
      {
        root: null,
        rootMargin: "-38% 0px -38% 0px",
        threshold: [0.08, 0.15, 0.25, 0.4],
      },
    );

    elements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return active;
}
