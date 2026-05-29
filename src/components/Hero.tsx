import type { Property } from "../types/property";
import { formatPrice, propertyTypeLabel } from "../lib/properties";
import { getPropertyCover } from "../lib/propertyImages";
import { propertyHref } from "../lib/route";

interface HeroProps {
  featured: Property | null;
  onExplore: () => void;
}

export function Hero({ featured, onExplore }: HeroProps) {
  return (
    <section className="hero" id="top">
      <div className="hero__grid">
        <div className="hero__copy reveal">
          <p className="hero__eyebrow">Private Collection · 2026</p>
          <h1 className="hero__title">
            为少数人
            <br />
            <span>甄选</span>理想居所
          </h1>
          <p className="hero__lead">
            栖居以编辑式策展思维，从城市核心到自然边界，为您呈现兼具资产价值与生活美学的稀缺房源。
          </p>
          <div className="hero__actions">
            <button className="btn btn-primary" type="button" onClick={onExplore}>
              浏览臻选
            </button>
            <a className="btn btn-ghost" href="#contact">
              私人顾问
            </a>
          </div>
        </div>

        {featured && (
          <a className="hero__spotlight reveal reveal-delay-2" href={propertyHref(featured.id)}>
            <div className="hero__spotlight-image">
              <img src={getPropertyCover(featured) ?? ""} alt={featured.title} loading="eager" />
              <div className="hero__spotlight-overlay" />
            </div>
            <div className="hero__spotlight-card">
              <span className="tag tag-gold">本周臻选</span>
              <h2>{featured.title}</h2>
              <p>{featured.city} · {propertyTypeLabel(featured.property_type)}</p>
              <strong>{formatPrice(featured.price)}</strong>
            </div>
          </a>
        )}
      </div>

      <div className="hero__stats reveal reveal-delay-3">
        <div>
          <span>12+</span>
          <small>核心城市</small>
        </div>
        <div>
          <span>180+</span>
          <small>在售臻品</small>
        </div>
        <div>
          <span>98%</span>
          <small>客户满意度</small>
        </div>
      </div>
    </section>
  );
}
