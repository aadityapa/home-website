import { useParams, Link } from "react-router-dom";
import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Float, Sparkles, ContactShadows } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import type { Group, Mesh } from "three";
import { PRODUCT_CATEGORIES } from "../data/brand";
import { useCart } from "../context/CartContext";
import { transitionSection } from "../lib/motion";

/* ── 3D Product Viewer ── */
function ProductJar({ color }: { color: string }) {
  const group = useRef<Group>(null);
  const lid = useRef<Mesh>(null);
  const body = useRef<Mesh>(null);
  useFrame((s) => {
    if (!group.current) return;
    const t = s.clock.elapsedTime;
    group.current.rotation.y = t * 0.35;
    if (lid.current) lid.current.rotation.y = t * 0.5;
    if (body.current) {
      body.current.rotation.x = Math.sin(t * 0.4) * 0.06;
    }
  });
  return (
    <Float speed={0.7} floatIntensity={0.4}>
      <group ref={group}>
        {/* Jar body */}
        <mesh ref={body} position={[0, 0.1, 0]} castShadow>
          <cylinderGeometry args={[0.55, 0.62, 1.2, 32]} />
          <meshStandardMaterial color="#fff5e0" roughness={0.1} metalness={0.05} transparent opacity={0.8} />
        </mesh>
        {/* Lid */}
        <mesh ref={lid} position={[0, 0.78, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.3, 0.18, 24]} />
          <meshStandardMaterial color="#c49a6c" roughness={0.35} metalness={0.45} />
        </mesh>
        {/* Label */}
        <mesh position={[0, 0.0, 0]}>
          <cylinderGeometry args={[0.565, 0.565, 0.48, 32, 1, true]} />
          <meshStandardMaterial color={color} roughness={0.85} transparent opacity={0.45} />
        </mesh>
        {/* Inner content visible through glass */}
        <mesh position={[0, -0.05, 0]}>
          <cylinderGeometry args={[0.49, 0.55, 0.9, 24]} />
          <meshStandardMaterial color={color} roughness={0.7} metalness={0} transparent opacity={0.5} />
        </mesh>
      </group>
    </Float>
  );
}

const productColors: Record<string, string> = {
  "kesar-ilaichi": "#f59e0b",
  "kaju-badam":    "#d97706",
  "aam-ka-achar":  "#84cc16",
  "laswe-ka-achar":"#65a30d",
  "kair-ka-achar": "#4d7c0f",
  "chai-masala-blend": "#b45309",
  "aamchur-powder":"#a3e635",
};

function ProductViewer3D({ productId }: { productId: string }) {
  const color = productColors[productId] ?? "#d97706";
  return (
    <Canvas camera={{ position: [0, 0.5, 4], fov: 40 }} dpr={[1, 1.4]} shadows gl={{ antialias: true }}>
      <color attach="background" args={["#faf6f0"]} />
      <ambientLight intensity={0.55} />
      <directionalLight castShadow position={[5, 8, 4]} intensity={1.3} color="#fff4e0" shadow-mapSize={[512, 512]} shadow-bias={-0.002} />
      <pointLight position={[-3, 2, 2]} intensity={0.5} color="#ffb347" />
      <ProductJar color={color} />
      <ContactShadows position={[0, -0.85, 0]} opacity={0.38} scale={5} blur={2} color="#4a3020" />
      <Sparkles count={20} scale={3.5} size={1.5} speed={0.3} color="#ffd899" opacity={0.5} />
    </Canvas>
  );
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const { item, category } = useMemo(() => {
    for (const cat of PRODUCT_CATEGORIES) {
      const found = cat.items.find(i => i.id === id);
      if (found) return { item: found, category: cat };
    }
    return { item: null, category: null };
  }, [id]);

  if (!item || !category) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 pt-24">
        <p className="font-display text-2xl text-ink">Product not found</p>
        <Link to="/shop" className="btn-primary">Back to shop</Link>
      </div>
    );
  }

  function handleAdd() {
    if (!item || !category) return;
    for (let i = 0; i < qty; i++) addItem({ id: item.id, name: item.name, description: item.description, image: item.image, price: item.price, unit: item.unit }, category.title, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  }

  const related = category.items.filter(i => i.id !== id);

  return (
    <div className="min-h-screen bg-clay-50 pt-20">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 md:px-10">
        <nav className="flex items-center gap-2 font-sans text-xs text-clay-500">
          <Link to="/" className="hover:text-saffron-600 transition">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-saffron-600 transition">Shop</Link>
          <span>/</span>
          <span className="text-ink">{item.name}</span>
        </nav>
      </div>

      {/* Main product layout */}
      <div className="mx-auto grid max-w-6xl gap-12 px-4 pb-24 sm:px-6 md:grid-cols-2 md:items-start md:gap-16 md:px-10">
        {/* 3D Viewer */}
        <motion.div
          className="sticky top-24"
          initial={{ opacity: 0, x: -32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={transitionSection}
        >
          <div className="relative h-96 overflow-hidden rounded-3xl border border-white/60 bg-gradient-to-br from-amber-50 to-orange-50 shadow-2xl shadow-clay-400/15 md:h-[480px]">
            <ProductViewer3D productId={item.id} />
            {/* Floating badge */}
            <div className="pointer-events-none absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1.5 font-sans text-xs font-medium text-saffron-700 backdrop-blur-sm shadow-sm">
              360° View
            </div>
          </div>
          {/* Real image below */}
          <div className="mt-4 overflow-hidden rounded-2xl border border-clay-200/60">
            <img src={item.image} alt={item.name} className="h-48 w-full object-cover" />
          </div>
        </motion.div>

        {/* Product info */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...transitionSection, delay: 0.1 }}
        >
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.4em] text-saffron-600">{category.title}</p>
          <h1 className="mt-2 font-display text-4xl text-ink md:text-5xl" style={{ textShadow: "0 2px 16px rgba(180,83,9,0.12)" }}>
            {item.name}
          </h1>
          <p className="mt-4 font-sans text-base leading-relaxed text-clay-600">{item.description}</p>

          {/* Price */}
          <div className="mt-8 rounded-2xl border border-saffron-200/60 bg-gradient-to-br from-saffron-50/90 to-amber-50/50 p-5">
            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.25em] text-clay-500">MRP (incl. taxes)</p>
            <p className="font-display text-4xl tabular-nums text-saffron-800 mt-1">{item.price}</p>
            {item.unit && <p className="mt-1 font-sans text-sm text-clay-600">{item.unit}</p>}
          </div>

          {/* Quantity */}
          <div className="mt-6 flex items-center gap-4">
            <p className="font-sans text-sm text-clay-600">Quantity</p>
            <div className="flex items-center gap-2 rounded-full border border-clay-200 bg-white/80">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="flex h-9 w-9 items-center justify-center rounded-full font-sans text-lg text-clay-600 hover:bg-clay-100">−</button>
              <span className="w-8 text-center font-display text-lg text-ink">{qty}</span>
              <button onClick={() => setQty(q => q + 1)} className="flex h-9 w-9 items-center justify-center rounded-full font-sans text-lg text-clay-600 hover:bg-clay-100">+</button>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-6 flex flex-wrap gap-3">
            <motion.button
              type="button"
              onClick={handleAdd}
              className="btn-primary flex-1"
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              {added ? "✓ Added!" : "Add to cart"}
            </motion.button>
            <motion.a
              href={`https://wa.me/91${import.meta.env.VITE_PHONE ?? "9423431674"}?text=Hi, I want to order ${qty}x ${item.name}`}
              target="_blank" rel="noreferrer"
              className="flex-1 text-center btn-secondary"
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              WhatsApp order
            </motion.a>
          </div>

          {/* Features */}
          <div className="mt-8 space-y-2">
            {["100% vegetarian", "FSSAI Licensed", "Small batch crafted in Telhara", "No artificial preservatives"].map(f => (
              <div key={f} className="flex items-center gap-2 font-sans text-sm text-clay-600">
                <span className="text-emerald-500">✓</span> {f}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="border-t border-clay-200/60 bg-clay-100/60 py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-10">
            <h2 className="font-display text-2xl text-ink mb-8">More from {category.title}</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <motion.div key={r.id} whileHover={{ y: -4 }}>
                  <Link to={`/shop/${r.id}`} className="group block overflow-hidden rounded-2xl border border-white/60 bg-white/80 shadow-md">
                    <img src={r.image} alt={r.name} className="h-40 w-full object-cover transition duration-500 group-hover:scale-105" />
                    <div className="p-4">
                      <p className="font-display text-lg text-ink">{r.name}</p>
                      <p className="font-display text-xl text-saffron-700 mt-1">{r.price}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
