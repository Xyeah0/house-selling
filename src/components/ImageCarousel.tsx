import { useCallback, useEffect, useState } from "react";

interface ImageCarouselProps {
  images: string[];
  alt: string;
}

export function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [images]);

  const go = useCallback(
    (delta: number) => {
      setIndex((current) => (current + delta + images.length) % images.length);
    },
    [images.length],
  );

  if (images.length === 0) {
    return (
      <div className="image-carousel image-carousel--empty">
        <span>暂无图片</span>
      </div>
    );
  }

  return (
    <div className="image-carousel">
      <div className="image-carousel__viewport">
        <img src={images[index]} alt={`${alt} ${index + 1}`} />
      </div>

      {images.length > 1 && (
        <>
          <button
            className="image-carousel__nav image-carousel__nav--prev"
            type="button"
            aria-label="上一张"
            onClick={() => go(-1)}
          >
            ‹
          </button>
          <button
            className="image-carousel__nav image-carousel__nav--next"
            type="button"
            aria-label="下一张"
            onClick={() => go(1)}
          >
            ›
          </button>
          <div className="image-carousel__dots">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                className={i === index ? "active" : undefined}
                aria-label={`第 ${i + 1} 张`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
          <span className="image-carousel__counter">
            {index + 1} / {images.length}
          </span>
        </>
      )}
    </div>
  );
}
