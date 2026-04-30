import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

const isCloudinaryConfigured =
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET;

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

function getMockImages(folder: string): string[] {
  const counts: Record<string, number> = {
    infantil: 40,
    "recien-nacido": 30,
    familia: 35,
    embarazo: 25,
    parejas: 20,
    retrato: 30,
    "15-anos": 20,
    mascota: 25,
    evento: 35,
    producto: 40,
  };
  const count = counts[folder] ?? 20;
  return Array.from({ length: count }, (_, i) => {
    const w = 600 + (i % 4) * 150;
    const h = 400 + (i % 5) * 200;
    const seed = `${folder}-${i}`;
    return `https://picsum.photos/seed/${seed}/${w}/${h}`;
  });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const folder = searchParams.get("folder");

  if (!folder || !/^[a-zA-Z0-9_-]+$/.test(folder)) {
    return NextResponse.json([]);
  }

  if (!isCloudinaryConfigured) {
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json([]);
    }
    return NextResponse.json(getMockImages(folder));
  }

  try {
    const result = await cloudinary.search
      .expression(`folder:${folder}`)
      .sort_by("created_at", "desc")
      .max_results(50)
      .execute();

    const images = result.resources.map((img: { secure_url: string }) =>
      img.secure_url.replace("/upload/", "/upload/f_auto,q_auto/")
    );

    return NextResponse.json(images, {
      headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" },
    });
  } catch (error) {
    console.error("Cloudinary search failed for folder:", folder);
    return NextResponse.json([]);
  }
}
