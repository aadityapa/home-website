import { lazy, Suspense } from "react";
import { use3DQuality } from "../../hooks/use3DQuality";

const SiteBackdropCanvas = lazy(() =>
  import("./SiteBackdropCanvas").then((m) => ({ default: m.SiteBackdropCanvas })),
);

/** Subtle fixed WebGL spice field behind the whole site (desktop / tablet). */
export function SiteBackdrop3D() {
  const quality = use3DQuality();
  // Keep this effect only on strong devices to avoid extra startup/render cost.
  if (quality !== "full") return null;

  return (
    <div className="pointer-events-none fixed inset-0 -z-[2] opacity-[0.12]">
      <Suspense fallback={null}>
        <SiteBackdropCanvas quality={quality} />
      </Suspense>
    </div>
  );
}
