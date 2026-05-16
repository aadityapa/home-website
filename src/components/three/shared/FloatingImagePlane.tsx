import { useTexture } from "@react-three/drei";
import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import type { Mesh } from "three";
import * as THREE from "three";

function Plane({
  imageUrl,
  scale = 1,
}: {
  imageUrl: string;
  scale?: number;
}) {
  const ref = useRef<Mesh>(null);
  const map = useTexture(imageUrl);
  map.colorSpace = THREE.SRGBColorSpace;

  useFrame((s) => {
    if (!ref.current) return;
    const t = s.clock.elapsedTime;
    ref.current.rotation.y = Math.sin(t * 0.32) * 0.18;
    ref.current.rotation.x = Math.sin(t * 0.2) * 0.05;
  });

  return (
    <mesh ref={ref} scale={scale} castShadow>
      <planeGeometry args={[1.2, 1.2]} />
      <meshStandardMaterial
        map={map}
        roughness={0.5}
        metalness={0.05}
        emissive="#fff8e7"
        emissiveIntensity={0.03}
        side={THREE.DoubleSide}
        transparent
      />
    </mesh>
  );
}

export function FloatingImagePlane({
  imageUrl,
  position,
  scale = 1,
  speed = 1,
  framed = true,
}: {
  imageUrl: string;
  position: [number, number, number];
  scale?: number;
  speed?: number;
  /** Grey pedestal frame — off for hero (cleaner) */
  framed?: boolean;
}) {
  return (
    <Float speed={speed} rotationIntensity={0.2} floatIntensity={0.35}>
      <group position={position}>
        {framed && (
          <mesh position={[0, 0, -0.02]}>
            <boxGeometry args={[1.35, 1.35, 0.05]} />
            <meshStandardMaterial
              color="#ebe0d0"
              roughness={0.88}
              metalness={0.1}
            />
          </mesh>
        )}
        <Suspense fallback={null}>
          <Plane imageUrl={imageUrl} scale={scale} />
        </Suspense>
      </group>
    </Float>
  );
}
