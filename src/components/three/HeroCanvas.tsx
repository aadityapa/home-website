import { Suspense } from "react";
import { HeroScene } from "./HeroScene";
import { SceneCanvas } from "./shared/SceneCanvas";
import { use3DQuality } from "../../hooks/use3DQuality";

export function HeroCanvas() {
  const quality = use3DQuality();

  return (
    <SceneCanvas
      quality={quality}
      className="h-full w-full touch-none"
      shadows
      camera={{ position: [0, 0.35, 7.5], fov: 42 }}
      background="#faf3e8"
      fog={["#f5e8d0", 12, 24]}
    >
      <Suspense fallback={null}>
        <HeroScene quality={quality} />
      </Suspense>
    </SceneCanvas>
  );
}
