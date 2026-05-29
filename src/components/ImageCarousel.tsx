import { Carousel } from "antd";
import { useState } from "react";

interface ImageCarouselProps {
  images: string[];
  alt: string;
}

export function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const [current, setCurrent] = useState(0);

  if (images.length === 0) {
    return (
      <div className="property-carousel property-carousel--empty">
        <span>暂无图片</span>
      </div>
    );
  }

  return (
    <div className="property-carousel">
      <Carousel
        dots={{ className: "property-carousel__dots" }}
        draggable
        infinite={images.length > 1}
        afterChange={setCurrent}
      >
        {images.map((src, index) => (
          <div key={`${src}-${index}`}>
            <div className="property-carousel__slide">
              <img src={src} alt={`${alt} ${index + 1}`} />
            </div>
          </div>
        ))}
      </Carousel>

      {images.length > 1 && (
        <span className="property-carousel__counter">
          {current + 1} / {images.length}
        </span>
      )}
    </div>
  );
}
