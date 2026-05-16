import { useFrame, useThree } from "@react-three/fiber";
import { Float, ContactShadows, Sparkles } from "@react-three/drei";
import { useMemo, useRef } from "react";
import type { Group, Mesh } from "three";
import * as THREE from "three";
import { useAppScroll } from "../../context/ScrollContext";

/** Simple spice orb — single mesh, no transmission */
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
        <meshStandardMaterial color={color} roughness={0.35} metalness={0.2} emissive={color} emissiveIntensity={0.06} />
      </mesh>
    </Float>
  );
}

/** Jar — replaced MeshTransmissionMaterial with simple meshPhysicalMaterial (no render-double) */
function Jar({ position, accent, index }: { position: [number, number, number]; accent: string; index: number }) {
  const group = useRef<Group>(null);
  useFrame((s) => {
    if (!group.current) return;
    const t = s.clock.elapsedTime;
    group.current.rotation.y = Math.sin(t * 0.35 + index) * 0.28;
    group.current.position.y = position[1] + Math.sin(t * 0.5 + index) * 0.05;
  });
  return (
    <group ref={group} position={position}>
      <Float speed={0.6} rotationIntensity={0.1} floatIntensity={0.25}>
        {/* Body — cheap glass */}
        <mesh castShadow position={[0, 0.38, 0]}>
          <cylinderGeometry args={[0.44, 0.5, 0.96, 24]} />
          <meshStandardMaterial color="#fff0d0" roughness={0.08} metalness={0.05} transparent opacity={0.72} />
        </mesh>
        {/* Lid */}
        <mesh castShadow position={[0, 0.96, 0]}>
          <cylinderGeometry args={[0.24, 0.24, 0.14, 16]} />
          <meshStandardMaterial color="#c49a6c" roughness={0.4} metalness={0.4} />
        </mesh>
        {/* Label */}
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.456, 0.456, 0.36, 24, 1, true]} />
          <meshStandardMaterial color={accent} roughness={0.8} transparent opacity={0.32} />
        </mesh>
      </Float>
    </group>
  );
}

/** Torus knot hero — reduced segments for performance */
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
        {/* Was 180,24 — now 80,12 (5× less geometry) */}
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

/** Single thin orbital ring */
function OrbitalRing({ radius, rotation, color }: { radius: number; rotation: [number, number, number]; color: string }) {
  const ref = useRef<Mesh>(null);
  useFrame((s) => { if (ref.current) ref.current.rotation.z = s.clock.elapsedTime * 0.05; });
  return (
    <mesh ref={ref} rotation={rotation}>
      {/* Was 120 segments — now 48 */}
      <torusGeometry args={[radius, 0.016, 6, 48]} />
      <meshStandardMaterial color={color} roughness={0.1} metalness={0.9} emissive={color} emissiveIntensity={0.2} transparent opacity={0.65} />
    </mesh>
  );
}

export function HeroScene() {
  const { progress } = useAppScroll();
  const group = useRef<Group>(null);
  const { camera } = useThree();

  const spices = useMemo(() => [
    { pos: [-2.2, 0.6, -0.5] as [number, number, number], color: "#c45f00" },
    { pos: [2.1, 0.4, 0.2]  as [number, number, number], color: "#e6a01a" },
    { pos: [-0.8, -0.2, 1.7] as [number, number, number], color: "#d4a017" },
    { pos: [1.4, -0.4, -1.4] as [number, number, number], color: "#8b4513" },
  ], []);

  useFrame(() => {
    const p = progress;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 7.0 - p * 3.0, 0.07);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.4 + p * 1.2, 0.05);
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, p * 1.0, 0.04);
      group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, -p * 0.4, 0.05);
    }
  });

  return (
    <group ref={group}>
      <ambientLight intensity={0.55} />
      <directionalLight
        castShadow
        position={[6, 10, 4]}
        intensity={1.4}
        color="#fff4e0"
        shadow-mapSize={[512, 512]}   /* was 2048 — 16× cheaper */
        shadow-camera-far={20}
        shadow-bias={-0.002}
      />
      <pointLight position={[-4, 2, -3]} intensity={0.7} color="#ffb347" />

      <HeroKnot />
      <Jar position={[-1.15, -0.85, 0.5]} accent="#f59e0b" index={0} />
      <Jar position={[1.35, -0.85, -0.4]} accent="#d97706" index={1} />
      <OrbitalRing radius={2.5} rotation={[Math.PI / 3, 0.2, 0]} color="#c45f00" />

      {spices.map((s) => (
        <SpiceOrb key={s.pos.join()} position={s.pos} color={s.color} scale={0.9} />
      ))}

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.25, 0]} receiveShadow>
        <circleGeometry args={[5, 32]} />   {/* was 64 segments */}
        <meshStandardMaterial color="#f5e6d3" roughness={0.9} />
      </mesh>

      <ContactShadows position={[0, -1.24, 0]} opacity={0.4} scale={10} blur={2.5} far={4} color="#4a3020" />

      {/* Was 120+50=170 — now 50 total */}
      <Sparkles count={50} scale={7} size={2} speed={0.4} color="#ffd899" position={[0, 0.4, 0]} opacity={0.6} />
    </group>
  );
}
