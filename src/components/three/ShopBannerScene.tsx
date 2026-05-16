import { Sparkles } from "@react-three/drei";
import { SceneCanvas } from "./shared/SceneCanvas";
import { FloatingImagePlane } from "./shared/FloatingImagePlane";
import { SHOP_BANNER_IMAGES } from "../../lib/product3d";
import type { Quality3D } from "../../hooks/use3DQuality";

const positions: [number, number, number][] = [
  [-2.1, 0.35, 0.2],
  [2.0, -0.25, 0],
  [0.2, 1.05, -0.6],
  [-0.9, -0.75, 0.45],
  [1.15, 0.85, 0.55],
];

export function ShopBannerScene({ quality }: { quality: Quality3D }) {
  const sparkleCount = quality === "full" ? 45 : 22;

  return (
    <SceneCanvas
      quality={quality}
      camera={{ position: [0, 0.2, 5.2], fov: 48 }}
      background="#3d2208"
    >
      {SHOP_BANNER_IMAGES.map((url, i) => (
        <FloatingImagePlane
          key={url}
          imageUrl={url}
          position={positions[i] ?? [0, 0, 0]}
          scale={quality === "full" ? 0.95 : 0.78}
          speed={0.85 + i * 0.1}
        />
      ))}
      <Sparkles
        count={sparkleCount}
        scale={6}
        size={quality === "full" ? 2 : 1.4}
        speed={0.35}
        color="#ffd899"
        opacity={0.55}
      />
    </SceneCanvas>
  );
}
