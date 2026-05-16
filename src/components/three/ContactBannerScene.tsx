import { Sparkles } from "@react-three/drei";
import { SceneCanvas } from "./shared/SceneCanvas";
import { FloatingImagePlane } from "./shared/FloatingImagePlane";
import { SHOP_BANNER_IMAGES } from "../../lib/product3d";
import type { Quality3D } from "../../hooks/use3DQuality";

const positions: [number, number, number][] = [
  [-1.9, 0.5, 0.2],
  [1.9, -0.35, 0.1],
  [0.1, 1.1, -0.5],
];

export function ContactBannerScene({ quality }: { quality: Quality3D }) {
  return (
    <SceneCanvas
      quality={quality}
      camera={{ position: [0, 0.1, 5], fov: 48 }}
      background="#2d1a06"
    >
      {SHOP_BANNER_IMAGES.slice(0, 3).map((url, i) => (
        <FloatingImagePlane
          key={url}
          imageUrl={url}
          position={positions[i] ?? [0, 0, 0]}
          scale={0.7}
          speed={1 + i * 0.12}
        />
      ))}
      <mesh position={[0, 0, 0.2]} rotation={[0.15, 0.35, 0]}>
        <boxGeometry args={[1.5, 0.95, 0.1]} />
        <meshStandardMaterial
          color="#c45f00"
          roughness={0.35}
          metalness={0.4}
          emissive="#7a3000"
          emissiveIntensity={0.12}
        />
      </mesh>
      <Sparkles count={28} scale={5} size={1.5} speed={0.32} color="#ffd899" opacity={0.48} />
    </SceneCanvas>
  );
}
