import { OrbitControls, ContactShadows, Sparkles } from "@react-three/drei";
import { SceneCanvas } from "./shared/SceneCanvas";
import { TexturedJar3D } from "./shared/TexturedJar3D";
import type { Quality3D } from "../../hooks/use3DQuality";

export function ProductViewerCanvas({
  imageUrl,
  accent,
  quality,
}: {
  imageUrl: string;
  accent: string;
  quality: Quality3D;
}) {
  return (
    <SceneCanvas
      quality={quality}
      camera={{ position: [0, 0.35, 3.8], fov: 38 }}
      background="#faf6f0"
      shadows
    >
      <TexturedJar3D
        imageUrl={imageUrl}
        accent={accent}
        autoRotate={quality === "lite"}
        scale={1}
      />
      <OrbitControls
        enablePan={false}
        minDistance={2.5}
        maxDistance={5.5}
        autoRotate={quality === "full"}
        autoRotateSpeed={0.65}
      />
      <ContactShadows
        position={[0, -0.95, 0]}
        opacity={0.4}
        scale={4.5}
        blur={2.2}
        color="#4a3020"
      />
      <Sparkles
        count={quality === "full" ? 28 : 12}
        scale={3.5}
        size={1.4}
        speed={0.28}
        color="#ffd899"
        opacity={0.45}
      />
    </SceneCanvas>
  );
}
