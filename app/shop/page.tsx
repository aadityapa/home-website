"use client";

import { Suspense } from "react";
import ShopPage from "@/views/ShopPage";

export default function ShopRoute() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-noir-950 pt-32 text-center text-noir-300">Loading shop…</div>}>
      <ShopPage />
    </Suspense>
  );
}
