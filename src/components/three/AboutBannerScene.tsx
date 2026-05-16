import { Sparkles } from "@react-three/drei";
import { SceneCanvas } from "./shared/SceneCanvas";
import { KitchenBackdrop } from "./shared/KitchenBackdrop";
import { FloatingImagePlane } from "./shared/FloatingImagePlane";
import { HERO_PRODUCT_IMAGES } from "../../lib/product3d";
import type { Quality3D } from "../../hooks/use3DQuality";

const positions: [number, number, number][] = [
  [-2.0, 0.4, 0.3],
  [2.1, -0.2, 0],
  [0, 1.0, -0.4],
];

export function AboutBannerScene({ quality }: { quality: Quality3D }) {
  return (
    <SceneCanvas
      quality={quality}
      camera={{ position: [0, 0.15, 5], fov: 50 }}
      background="#3d2208"
    >
      <KitchenBackdrop opacity={0.55} />
      {HERO_PRODUCT_IMAGES.slice(0, 3).map((url, i) => (
        <FloatingImagePlane
          key={url}
          imageUrl={url}
          position={positions[i] ?? [0, 0, 0]}
          scale={0.75}
          speed={0.9 + i * 0.15}
        />
      ))}
      <Sparkles
        count={quality === "full" ? 40 : 18}
        scale={6}
        size={1.6}
        speed={0.3}
        color="#ffd899"
        opacity={0.5}
      />
    </SceneCanvas>
  );
}
