import type { SupabaseClient } from "@supabase/supabase-js";

export const PROPERTY_IMAGES_BUCKET = "property-images";

const MIME_BY_EXT: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
};

function randomId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    const hex = [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("");
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

function guessContentType(file: File): string {
  if (file.type.startsWith("image/")) return file.type;
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  return MIME_BY_EXT[ext] ?? "application/octet-stream";
}

export function verifyImageUrl(url: string, timeoutMs = 10_000): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    let settled = false;
    const finish = (ok: boolean) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve(ok);
    };
    const timer = setTimeout(() => finish(false), timeoutMs);
    img.onload = () => finish(true);
    img.onerror = () => finish(false);
    img.src = url;
  });
}

export async function uploadPropertyImage(
  client: SupabaseClient,
  file: File,
): Promise<{ url: string | null; error: string | null }> {
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${randomId()}.${ext}`;
  const contentType = guessContentType(file);

  const { error } = await client.storage
    .from(PROPERTY_IMAGES_BUCKET)
    .upload(path, file, { cacheControl: "3600", upsert: false, contentType });

  if (error) {
    const hint = error.message.includes("row-level security")
      ? " → 请在 Supabase SQL Editor 执行 supabase.txt「Storage 权限修复」那段 SQL。"
      : error.message.includes("Bucket not found")
        ? " → 请先创建 Storage 桶 property-images（见 supabase.txt）。"
        : "";
    return { url: null, error: `${error.message}${hint}` };
  }

  const { data } = client.storage.from(PROPERTY_IMAGES_BUCKET).getPublicUrl(path);
  const accessible = await verifyImageUrl(data.publicUrl);

  if (!accessible) {
    return {
      url: null,
      error:
        "图片已上传但无法公开访问。请确认 Storage 桶 property-images 为 Public，并执行 supabase.txt「Storage 权限修复」SQL。",
    };
  }

  return { url: data.publicUrl, error: null };
}
