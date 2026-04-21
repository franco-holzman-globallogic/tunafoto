import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const folder = searchParams.get("folder");

  if (!folder) return NextResponse.json([]);

  const dirPath = path.join(process.cwd(), "public/fotografia", folder);

  try {
    const files = fs.readdirSync(dirPath);

    const images = files.map((file) => `/fotografia/${folder}/${file}`);

    return NextResponse.json(images);
  } catch {
    return NextResponse.json([]);
  }
}