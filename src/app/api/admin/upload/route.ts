import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { isAuthenticated } from "@/lib/admin-auth";
import { usesBlobStorage } from "@/lib/content";

const MAX_BYTES = 12 * 1024 * 1024;
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

/**
 * Upload d'une photo depuis l'admin : redimensionnée (max 1600 px) et convertie en JPEG.
 * Stockée dans Vercel Blob quand il est configuré (Vercel), sinon dans `public/uploads/`.
 */
export async function POST(req: Request) {
  if (!(await isAuthenticated())) return NextResponse.json({ ok: false, message: "Non autorisé" }, { status: 401 });

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return NextResponse.json({ ok: false, message: "Fichier manquant" }, { status: 400 });
  if (file.size > MAX_BYTES) return NextResponse.json({ ok: false, message: "Fichier trop lourd (12 Mo max)" }, { status: 413 });
  if (!file.type.startsWith("image/")) return NextResponse.json({ ok: false, message: "Seules les images sont acceptées" }, { status: 415 });

  const buffer = Buffer.from(await file.arrayBuffer());
  const base = file.name
    .replace(/\.[^.]+$/, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "photo";
  const name = `${base}-${Date.now().toString(36)}.jpg`;

  const pipeline = sharp(buffer)
    .rotate()
    .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true });

  if (usesBlobStorage()) {
    const { put } = await import("@vercel/blob");
    const blob = await put(`uploads/${name}`, await pipeline.toBuffer(), {
      access: "public",
      contentType: "image/jpeg",
      addRandomSuffix: false,
    });
    return NextResponse.json({ ok: true, url: blob.url });
  }

  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  await pipeline.toFile(path.join(UPLOAD_DIR, name));
  return NextResponse.json({ ok: true, url: `/uploads/${name}` });
}
