import { useTexture, ContactShadows } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import type { Group } from "three";
import * as THREE from "three";

function FrameInner({
  imageUrl,
  interactive = false,
}: {
  imageUrl: string;
  interactive?: boolean;
}) {
  const group = useRef<Group>(null);
  const map = useTexture(imageUrl);
  map.colorSpace = THREE.SRGBColorSpace;

  useFrame((s) => {
    if (!group.current) return;
    const t = s.clock.elapsedTime;
    group.current.rotation.y = interactive
      ? Math.sin(t * 0.5) * 0.35
      : Math.sin(t * 0.28) * 0.18;
    group.current.position.y = Math.sin(t * 0.45) * 0.04;
  });

  return (
    <group ref={group}>
      <mesh position={[0, 0, -0.08]} receiveShadow>
        <boxGeometry args={[1.65, 1.65, 0.12]} />
        <meshStandardMaterial color="#ebe0d0" roughness={0.9} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0, 0.02]} castShadow>
        <planeGeometry args={[1.45, 1.45]} />
        <meshStandardMaterial
          map={map}
          roughness={0.5}
          metalness={0.06}
          emissive="#fff9f0"
          emissiveIntensity={0.05}
        />
      </mesh>
      <mesh position={[0, -0.92, 0.05]} rotation={[-0.2, 0, 0]}>
        <boxGeometry args={[1.5, 0.08, 0.35]} />
        <meshStandardMaterial color="#d4c4b0" roughness={0.95} />
      </mesh>
    </group>
  );
}

export function FloatingProductFrame({
  imageUrl,
  lite = false,
  interactive = true,
}: {
  imageUrl: string;
  lite?: boolean;
  interactive?: boolean;
}) {
  return (
  <>
      <Suspense
        fallback={
          <mesh>
            <boxGeometry args={[1.4, 1.4, 0.1]} />
            <meshStandardMaterial color="#f5e6d3" />
          </mesh>
        }
      >
        <FrameInner imageUrl={imageUrl} interactive={interactive && !lite} />
      </Suspense>
      {!lite && (
        <ContactShadows
          position={[0, -1.05, 0]}
          opacity={0.35}
          scale={2.8}
          blur={2}
          far={2}
          color="#4a3020"
        />
      )}
    </>
  );
}
