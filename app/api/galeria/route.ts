import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";

// In-memory rate limiter (per IP, resets every 60s)
const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 10;
const WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);

  if (!entry || now > entry.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > MAX_ATTEMPTS;
}

function hashCode(code: string): string {
  return createHash("sha256").update(code).digest("hex");
}

/**
 * Mock galleries for local development (when GALLERY_CODES is not set).
 * Codes: "emma", "sample", "evento"
 */
const MOCK_GALLERIES: Record<string, string> = {
  emma: "https://tuna-118349.pixellu.gallery/emma",
  sample: "https://pixellu-17244.pixellu.gallery/sample/all",
  evento: "https://pixellu-17244.pixellu.gallery/sample/all",
};

/**
 * Parses GALLERY_CODES env var.
 * Format: "hash1:url1,hash2:url2,..."
 */
function getGalleries(): Map<string, string> {
  const raw = process.env.GALLERY_CODES ?? "";
  const map = new Map<string, string>();

  if (!raw) return map;

  for (const entry of raw.split(",")) {
    const separatorIdx = entry.indexOf(":");
    if (separatorIdx === -1) continue;
    const hash = entry.slice(0, separatorIdx).trim();
    const url = entry.slice(separatorIdx + 1).trim();
    if (hash && url) map.set(hash, url);
  }

  return map;
}

const useMock = !process.env.GALLERY_CODES && process.env.NODE_ENV !== "production";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Demasiados intentos. Esperá un momento." },
      { status: 429 }
    );
  }

  let body: { code?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  }

  const code = typeof body.code === "string" ? body.code.trim().toLowerCase() : "";

  if (!code) {
    return NextResponse.json({ error: "Código requerido" }, { status: 400 });
  }

  // Mock mode: match plain-text codes directly
  if (useMock) {
    const mockUrl = MOCK_GALLERIES[code];
    if (mockUrl) return NextResponse.json({ url: mockUrl });
    return NextResponse.json({ error: "Código incorrecto" }, { status: 401 });
  }

  // Production: match hashed codes
  const galleries = getGalleries();
  const hashed = hashCode(code);
  const url = galleries.get(hashed);

  if (url) {
    return NextResponse.json({ url });
  }

  return NextResponse.json({ error: "Código incorrecto" }, { status: 401 });
}
