import type { SupabaseClient } from "@supabase/supabase-js";

export const PROPERTY_IMAGES_BUCKET = "property-images";

const MIME_BY_EXT: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
};

function guessContentType(file: File): string {
  if (file.type.startsWith("image/")) return file.type;
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  return MIME_BY_EXT[ext] ?? "application/octet-stream";
}

export function verifyImageUrl(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

export async function uploadPropertyImage(
  client: SupabaseClient,
  file: File,
): Promise<{ url: string | null; error: string | null }> {
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${crypto.randomUUID()}.${ext}`;
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
