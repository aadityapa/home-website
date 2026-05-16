import { SceneCanvas } from "./shared/SceneCanvas";
import { FloatingProductFrame } from "./shared/FloatingProductFrame";
import type { Quality3D } from "../../hooks/use3DQuality";

export function ProductCardCanvas({
  imageUrl,
  quality,
}: {
  imageUrl: string;
  quality: Quality3D;
}) {
  return (
    <SceneCanvas
      quality={quality}
      camera={{ position: [0, 0.15, 2.35], fov: 42 }}
      background="#faf6f0"
    >
      <FloatingProductFrame
        imageUrl={imageUrl}
        lite={quality === "lite"}
        interactive
      />
    </SceneCanvas>
  );
}
