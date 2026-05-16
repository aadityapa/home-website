import { useTexture } from "@react-three/drei";
import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import type { Mesh } from "three";
import * as THREE from "three";

function Plane({ imageUrl, scale = 1.2 }: { imageUrl: string; scale?: number }) {
  const ref = useRef<Mesh>(null);
  const map = useTexture(imageUrl);
  map.colorSpace = THREE.SRGBColorSpace;

  useFrame((s) => {
    if (!ref.current) return;
    const t = s.clock.elapsedTime;
    ref.current.rotation.y = Math.sin(t * 0.35) * 0.25;
    ref.current.rotation.x = Math.sin(t * 0.22) * 0.08;
  });

  return (
    <mesh ref={ref} scale={scale} castShadow>
      <planeGeometry args={[1.35, 1.35, 1, 1]} />
      <meshStandardMaterial
        map={map}
        roughness={0.55}
        metalness={0.08}
        emissive="#fff8e7"
        emissiveIntensity={0.04}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export function FloatingImagePlane({
  imageUrl,
  position,
  scale = 1.2,
  speed = 1,
}: {
  imageUrl: string;
  position: [number, number, number];
  scale?: number;
  speed?: number;
}) {
  return (
    <Float speed={speed} rotationIntensity={0.35} floatIntensity={0.55}>
      <group position={position}>
        <mesh position={[0, 0, -0.02]}>
          <boxGeometry args={[1.5, 1.5, 0.06]} />
          <meshStandardMaterial color="#f5e6d3" roughness={0.85} metalness={0.15} />
        </mesh>
        <Suspense fallback={null}>
          <Plane imageUrl={imageUrl} scale={scale} />
        </Suspense>
      </group>
    </Float>
  );
}
