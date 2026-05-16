import { SceneCanvas } from "./shared/SceneCanvas";
import { TexturedJar3D } from "./shared/TexturedJar3D";
import type { Quality3D } from "../../hooks/use3DQuality";

export function CategoryOrbCanvas({
  imageUrl,
  quality,
}: {
  imageUrl: string;
  quality: Quality3D;
}) {
  return (
    <SceneCanvas
      quality={quality}
      camera={{ position: [0, 0.2, 2.6], fov: 38 }}
      background="transparent"
    >
      <color attach="background" args={["#00000000"]} />
      <TexturedJar3D imageUrl={imageUrl} accent="#d97706" scale={0.72} autoRotate />
    </SceneCanvas>
  );
}
