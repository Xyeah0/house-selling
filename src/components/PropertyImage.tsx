import { useState } from "react";

interface PropertyImageProps {
  src: string | null | undefined;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
}

export function PropertyImage({ src, alt, className, loading = "lazy" }: PropertyImageProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className={`property-image-fallback ${className ?? ""}`.trim()} aria-hidden="true">
        <span>暂无图片</span>
      </div>
    );
  }

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      loading={loading}
      onError={() => setFailed(true)}
    />
  );
}
