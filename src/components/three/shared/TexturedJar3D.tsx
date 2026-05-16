import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, Suspense } from "react";
import type { Group } from "three";
import * as THREE from "three";

function JarMesh({
  imageUrl,
  accent,
  autoRotate = true,
  scale = 1,
}: {
  imageUrl: string;
  accent: string;
  autoRotate?: boolean;
  scale?: number;
}) {
  const group = useRef<Group>(null);
  const map = useTexture(imageUrl);
  map.colorSpace = THREE.SRGBColorSpace;

  useFrame((s) => {
    if (!group.current || !autoRotate) return;
    group.current.rotation.y = s.clock.elapsedTime * 0.42;
  });

  return (
    <group ref={group} scale={scale}>
      <mesh position={[0, 0.05, 0]} castShadow>
        <cylinderGeometry args={[0.58, 0.65, 1.15, 32]} />
        <meshPhysicalMaterial
          color="#fff8eb"
          roughness={0.06}
          metalness={0.02}
          transmission={0.55}
          thickness={0.4}
          transparent
          opacity={0.88}
        />
      </mesh>
      <mesh position={[0, 0.78, 0]} castShadow>
        <cylinderGeometry args={[0.32, 0.32, 0.16, 20]} />
        <meshStandardMaterial color="#c49a6c" roughness={0.35} metalness={0.45} />
      </mesh>
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.59, 0.59, 0.52, 32, 1, true]} />
        <meshStandardMaterial map={map} roughness={0.75} metalness={0.05} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, -0.08, 0]}>
        <cylinderGeometry args={[0.48, 0.54, 0.75, 24]} />
        <meshStandardMaterial color={accent} roughness={0.65} transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

function JarFallback({ accent }: { accent: string }) {
  const ref = useRef<Group>(null);
  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.35;
  });
  return (
    <group ref={ref}>
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.55, 0.62, 1.1, 24]} />
        <meshStandardMaterial color="#fff5e0" roughness={0.12} transparent opacity={0.8} />
      </mesh>
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.56, 0.56, 0.48, 24, 1, true]} />
        <meshStandardMaterial color={accent} roughness={0.8} transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

export function TexturedJar3D({
  imageUrl,
  accent,
  autoRotate = true,
  scale = 1,
}: {
  imageUrl: string;
  accent: string;
  autoRotate?: boolean;
  scale?: number;
}) {
  return (
    <Suspense fallback={<JarFallback accent={accent} />}>
      <JarMesh imageUrl={imageUrl} accent={accent} autoRotate={autoRotate} scale={scale} />
    </Suspense>
  );
}
