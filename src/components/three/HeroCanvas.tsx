import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { HeroScene } from "./HeroScene";

export function HeroCanvas() {
  return (
    <Canvas
      className="h-full w-full touch-none"
      shadows           /* soft shadows removed — standard shadows */
      camera={{ position: [0, 0.35, 7.5], fov: 42 }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      }}
      dpr={[1, 1.4]}    /* was [1,1.8] — saves ~60% GPU on retina */
    >
      <color attach="background" args={["#faf3e8"]} />
      <fog attach="fog" args={["#f5e8d0", 12, 24]} />
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>
    </Canvas>
  );
}
