import { Canvas, type CanvasProps } from "@react-three/fiber";
import { Suspense, type ReactNode } from "react";
import type { Quality3D } from "../../../hooks/use3DQuality";
import { PostEffects } from "./PostEffects";

type SceneCanvasProps = {
  children: ReactNode;
  className?: string;
  quality?: Quality3D;
  background?: string;
  fog?: [string, number, number];
  camera?: CanvasProps["camera"];
  shadows?: boolean;
  dpr?: [number, number];
};

export function SceneCanvas({
  children,
  className = "h-full w-full touch-none",
  quality = "lite",
  background = "#faf3e8",
  fog,
  camera = { position: [0, 0.35, 5], fov: 45 },
  shadows = false,
  dpr,
}: SceneCanvasProps) {
  const resolvedDpr: [number, number] =
    dpr ?? (quality === "full" ? [1, 1.6] : [1, 1.25]);

  return (
    <Canvas
      className={className}
      camera={camera}
      shadows={shadows}
      dpr={resolvedDpr}
      gl={{
        antialias: quality === "full",
        alpha: false,
        powerPreference: "high-performance",
      }}
    >
      <color attach="background" args={[background]} />
      {fog && <fog attach="fog" args={fog} />}
      <ambientLight intensity={0.52} />
      <directionalLight
        position={[6, 10, 5]}
        intensity={quality === "full" ? 1.35 : 1.1}
        color="#fff4e0"
        castShadow={shadows}
        shadow-mapSize={shadows ? [512, 512] : undefined}
      />
      <pointLight position={[-4, 2, -2]} intensity={0.55} color="#ffb347" />
      <pointLight position={[3, -1, 4]} intensity={0.35} color="#fde68a" />
      <Suspense fallback={null}>{children}</Suspense>
      {quality === "full" && <PostEffects />}
    </Canvas>
  );
}
