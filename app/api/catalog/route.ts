import { NextResponse } from "next/server";
import { getCommerceProvider } from "@/lib/commerce/config";
import { getServerCatalog } from "@/lib/commerce/catalog-server";

export const revalidate = 300;

export async function GET() {
  try {
    const categories = await getServerCatalog();
    return NextResponse.json(
      {
        version: 2,
        updatedAt: new Date().toISOString(),
        provider: getCommerceProvider(),
        categories,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      },
    );
  } catch (err) {
    console.error("[api/catalog]", err);
    return NextResponse.json(
      { error: "Failed to load catalog" },
      { status: 500 },
    );
  }
}
