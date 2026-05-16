import { useFrame, useThree } from "@react-three/fiber";
import { Float, ContactShadows, Sparkles } from "@react-three/drei";
import { useMemo, useRef } from "react";
import type { Group, Mesh } from "three";
import * as THREE from "three";
import { useAppScroll } from "../../context/ScrollContext";
import { FloatingImagePlane } from "./shared/FloatingImagePlane";
import { TexturedJar3D } from "./shared/TexturedJar3D";
import { HERO_PRODUCT_IMAGES } from "../../lib/product3d";
import type { Quality3D } from "../../hooks/use3DQuality";

function SpiceOrb({
  position,
  color,
  scale = 1,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
}) {
  const ref = useRef<Mesh>(null);
  useFrame((s) => {
    if (!ref.current) return;
    const t = s.clock.elapsedTime;
    ref.current.rotation.x = t * 0.14 + position[0] * 0.4;
    ref.current.rotation.y = t * 0.22 + position[2];
  });
  return (
    <Float speed={1.1} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={ref} position={position} scale={scale} castShadow>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial
          color={color}
          roughness={0.35}
          metalness={0.2}
          emissive={color}
          emissiveIntensity={0.06}
        />
      </mesh>
    </Float>
  );
}

function HeroKnot() {
  const ref = useRef<Mesh>(null);
  useFrame((s) => {
    if (!ref.current) return;
    const t = s.clock.elapsedTime;
    ref.current.rotation.x = t * 0.07;
    ref.current.rotation.y = t * 0.11;
  });
  return (
    <Float speed={0.45} rotationIntensity={0.12} floatIntensity={0.2}>
      <mesh ref={ref} castShadow>
        <torusKnotGeometry args={[0.55, 0.17, 80, 12, 2, 3]} />
        <meshStandardMaterial
          color="#c45f00"
          roughness={0.28}
          metalness={0.55}
          emissive="#7a3000"
          emissiveIntensity={0.12}
        />
      </mesh>
    </Float>
  );
}

function OrbitalRing({
  radius,
  rotation,
  color,
}: {
  radius: number;
  rotation: [number, number, number];
  color: string;
}) {
  const ref = useRef<Mesh>(null);
  useFrame((s) => {
    if (ref.current) ref.current.rotation.z = s.clock.elapsedTime * 0.05;
  });
  return (
    <mesh ref={ref} rotation={rotation}>
      <torusGeometry args={[radius, 0.016, 6, 48]} />
      <meshStandardMaterial
        color={color}
        roughness={0.1}
        metalness={0.9}
        emissive={color}
        emissiveIntensity={0.2}
        transparent
        opacity={0.65}
      />
    </mesh>
  );
}

const heroPlanes: {
  url: string;
  position: [number, number, number];
  scale: number;
}[] = [
  { url: HERO_PRODUCT_IMAGES[0], position: [-2.4, 0.9, -0.8], scale: 0.72 },
  { url: HERO_PRODUCT_IMAGES[1], position: [2.35, 0.5, -0.5], scale: 0.68 },
  { url: HERO_PRODUCT_IMAGES[2], position: [-1.2, -0.5, 1.6], scale: 0.62 },
  { url: HERO_PRODUCT_IMAGES[3], position: [1.5, -0.35, 1.35], scale: 0.65 },
];

export function HeroScene({ quality }: { quality: Quality3D }) {
  const { progress } = useAppScroll();
  const group = useRef<Group>(null);
  const { camera } = useThree();
  const sparkleCount = quality === "full" ? 70 : quality === "lite" ? 40 : 20;

  const spices = useMemo(
    () => [
      { pos: [-2.2, 0.6, -0.5] as [number, number, number], color: "#c45f00" },
      { pos: [2.1, 0.4, 0.2] as [number, number, number], color: "#e6a01a" },
      { pos: [-0.8, -0.2, 1.7] as [number, number, number], color: "#d4a017" },
      { pos: [1.4, -0.4, -1.4] as [number, number, number], color: "#8b4513" },
    ],
    [],
  );

  useFrame(() => {
    const p = progress;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 7.0 - p * 3.0, 0.07);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.4 + p * 1.2, 0.05);
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        p * 1.0,
        0.04,
      );
      group.current.position.y = THREE.MathUtils.lerp(
        group.current.position.y,
        -p * 0.4,
        0.05,
      );
    }
  });

  return (
    <group ref={group}>
      <HeroKnot />

      {heroPlanes.map((p) => (
        <FloatingImagePlane
          key={p.url}
          imageUrl={p.url}
          position={p.position}
          scale={p.scale}
        />
      ))}

      <group position={[-1.15, -0.85, 0.5]}>
        <TexturedJar3D
          imageUrl={HERO_PRODUCT_IMAGES[0]}
          accent="#f59e0b"
          scale={0.85}
        />
      </group>
      <group position={[1.35, -0.85, -0.4]}>
        <TexturedJar3D
          imageUrl={HERO_PRODUCT_IMAGES[1]}
          accent="#d97706"
          scale={0.85}
        />
      </group>

      <OrbitalRing radius={2.5} rotation={[Math.PI / 3, 0.2, 0]} color="#c45f00" />

      {spices.map((s) => (
        <SpiceOrb key={s.pos.join()} position={s.pos} color={s.color} scale={0.9} />
      ))}

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.25, 0]} receiveShadow>
        <circleGeometry args={[5, 32]} />
        <meshStandardMaterial color="#f5e6d3" roughness={0.9} />
      </mesh>

      <ContactShadows
        position={[0, -1.24, 0]}
        opacity={0.4}
        scale={10}
        blur={2.5}
        far={4}
        color="#4a3020"
      />

      <Sparkles
        count={sparkleCount}
        scale={7}
        size={2}
        speed={0.4}
        color="#ffd899"
        position={[0, 0.4, 0]}
        opacity={0.6}
      />
    </group>
  );
}
