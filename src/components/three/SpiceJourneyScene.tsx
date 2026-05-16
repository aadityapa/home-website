import { useFrame } from "@react-three/fiber";
import { Float, ScrollControls, useScroll, Sparkles } from "@react-three/drei";
import { useMemo, useRef } from "react";
import type { Group } from "three";
import * as THREE from "three";
import { KitchenBackdrop } from "./shared/KitchenBackdrop";
import { FloatingImagePlane } from "./shared/FloatingImagePlane";
import { HERO_PRODUCT_IMAGES } from "../../lib/product3d";

type IngredientKind = "elaichi" | "kesar" | "mango" | "spice" | "star";

function IngredientMesh({
  kind,
  color,
}: {
  kind: IngredientKind;
  color: string;
}) {
  switch (kind) {
    case "elaichi":
      return (
        <mesh castShadow>
          <boxGeometry args={[0.16, 0.24, 0.32]} />
          <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
        </mesh>
      );
    case "kesar":
      return (
        <group>
          {[0, 1, 2].map((i) => (
            <mesh
              key={i}
              position={[i * 0.07 - 0.07, 0, 0]}
              rotation={[0.5 + i * 0.12, 0.3, 0.18]}
            >
              <capsuleGeometry args={[0.02, 0.42, 4, 8]} />
              <meshStandardMaterial
                color={color}
                roughness={0.3}
                metalness={0.12}
                emissive={color}
                emissiveIntensity={0.05}
              />
            </mesh>
          ))}
        </group>
      );
    case "mango":
      return (
        <mesh castShadow>
          <dodecahedronGeometry args={[0.25, 0]} />
          <meshStandardMaterial
            color={color}
            roughness={0.45}
            metalness={0.06}
            emissive={color}
            emissiveIntensity={0.06}
          />
        </mesh>
      );
    case "star":
      return (
        <group>
          <mesh castShadow>
            <torusGeometry args={[0.18, 0.04, 6, 6]} />
            <meshStandardMaterial color={color} roughness={0.25} metalness={0.5} emissive={color} emissiveIntensity={0.15} />
          </mesh>
          <mesh>
            <boxGeometry args={[0.08, 0.36, 0.08]} />
            <meshStandardMaterial color={color} roughness={0.25} metalness={0.5} emissive={color} emissiveIntensity={0.15} />
          </mesh>
        </group>
      );
    default:
      return (
        <mesh castShadow>
          <octahedronGeometry args={[0.24, 0]} />
          <meshStandardMaterial
            color={color}
            roughness={0.28}
            metalness={0.22}
            emissive={color}
            emissiveIntensity={0.08}
          />
        </mesh>
      );
  }
}

function FloatingIngredient({
  position,
  color,
  kind,
  speed = 1,
}: {
  position: [number, number, number];
  color: string;
  kind: IngredientKind;
  speed?: number;
}) {
  const root = useRef<Group>(null);
  useFrame((s) => {
    if (!root.current) return;
    const t = s.clock.elapsedTime * speed;
    root.current.rotation.x = t * 0.55 + position[0];
    root.current.rotation.z = t * 0.32;
    root.current.rotation.y = t * 0.18;
  });
  return (
    <Float speed={1.5 * speed} rotationIntensity={0.5} floatIntensity={0.6}>
      <group ref={root} position={position}>
        <IngredientMesh kind={kind} color={color} />
      </group>
    </Float>
  );
}

/** Central rotating DNA helix of spices */
function SpiceDNA() {
  const group = useRef<Group>(null);
  const count = 24;

  const points = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const t = (i / count) * Math.PI * 4;
        const r = 1.1;
        return {
          a: [Math.cos(t) * r, (i / count) * 5 - 2.5, Math.sin(t) * r] as [number, number, number],
          b: [Math.cos(t + Math.PI) * r, (i / count) * 5 - 2.5, Math.sin(t + Math.PI) * r] as [number, number, number],
          color: ["#c45f00", "#e6a01a", "#7a4b2d", "#d97706", "#8b4513", "#f59e0b"][i % 6],
        };
      }),
    [],
  );

  useFrame((s) => {
    if (!group.current) return;
    group.current.rotation.y = s.clock.elapsedTime * 0.14;
  });

  return (
    <group ref={group}>
      {points.map((p, i) => (
        <group key={i}>
          <mesh position={p.a}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshStandardMaterial color={p.color} emissive={p.color} emissiveIntensity={0.2} roughness={0.3} metalness={0.3} />
          </mesh>
          <mesh position={p.b}>
            <sphereGeometry args={[0.065, 8, 8]} />
            <meshStandardMaterial color={p.color} emissive={p.color} emissiveIntensity={0.15} roughness={0.35} metalness={0.25} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function JourneyContent() {
  const scroll = useScroll();
  const root = useRef<Group>(null);

  const palette = useMemo(
    () => ["#b45309", "#c2410c", "#92400e", "#ca8a04", "#7c2d12", "#ea580c", "#d97706"],
    [],
  );

  const kinds: IngredientKind[] = useMemo(
    () => ["elaichi", "kesar", "mango", "spice", "star", "elaichi", "mango", "spice", "kesar", "star"],
    [],
  );

  const ingredients = useMemo(() => {
    return Array.from({ length: 52 }, (_, i) => {
      const t = (i / 52) * Math.PI * 2;
      const r = 1.4 + (i % 6) * 0.28;
      const kind = kinds[i % kinds.length];
      return {
        pos: [Math.cos(t) * r, (i % 8) * 0.22 - 0.88, Math.sin(t) * r] as [number, number, number],
        color: palette[i % palette.length],
        kind,
        speed: 0.7 + Math.random() * 0.6,
      };
    });
  }, [kinds, palette]);

  useFrame(() => {
    if (!root.current) return;
    const p = scroll.offset;
    root.current.rotation.y = THREE.MathUtils.lerp(
      root.current.rotation.y,
      p * Math.PI * 2.5,
      0.07,
    );
    root.current.position.z = THREE.MathUtils.lerp(
      root.current.position.z,
      -p * 3.5,
      0.05,
    );
    root.current.rotation.x = THREE.MathUtils.lerp(
      root.current.rotation.x,
      p * 0.4,
      0.05,
    );
    root.current.position.y = THREE.MathUtils.lerp(
      root.current.position.y,
      -p * 0.8,
      0.05,
    );
  });

  const journeyProducts = useMemo(
    () =>
      HERO_PRODUCT_IMAGES.map((url, i) => ({
        url,
        pos: [
          Math.cos((i / 4) * Math.PI * 2) * 2.8,
          0.5 + i * 0.35,
          Math.sin((i / 4) * Math.PI * 2) * 2.8 - 1,
        ] as [number, number, number],
      })),
    [],
  );

  return (
    <group ref={root}>
      <KitchenBackdrop opacity={0.38} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 2]} intensity={1.2} color="#fff1dd" />
      <pointLight position={[-2, 1, 2]} intensity={0.7} color="#fbbf24" />
      <pointLight position={[3, -2, -3]} intensity={0.4} color="#f97316" />

      {journeyProducts.map((p) => (
        <FloatingImagePlane
          key={p.url}
          imageUrl={p.url}
          position={p.pos}
          scale={0.68}
          speed={0.8}
        />
      ))}

      <SpiceDNA />

      {ingredients.map((s, i) => (
        <FloatingIngredient
          key={i}
          position={s.pos}
          color={s.color}
          kind={s.kind}
          speed={s.speed}
        />
      ))}

      <Sparkles count={60} scale={5} size={2} speed={0.4} color="#ffd899" opacity={0.6} />
    </group>
  );
}

export function SpiceJourneyScrollScene() {
  return (
    <ScrollControls pages={3.5} damping={0.15} infinite={false}>
      <JourneyContent />
    </ScrollControls>
  );
}
