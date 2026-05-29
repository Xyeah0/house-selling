import type { Property } from "../types/property";
import { PropertyImage } from "./PropertyImage";
import {
  formatPrice,
  propertyTypeLabel,
  statusLabel,
} from "../lib/properties";
import { getPropertyCover } from "../lib/propertyImages";
import { propertyHref } from "../lib/route";

interface PropertyCardProps {
  property: Property;
  index: number;
}

export function PropertyCard({ property, index }: PropertyCardProps) {
  const status = property.status ?? "available";
  const cover = getPropertyCover(property);

  return (
    <article
      className={`property-card reveal reveal-delay-${(index % 4) + 1}`}
      style={{ "--card-index": index } as React.CSSProperties}
    >
      <a
        className="property-card__hit"
        href={propertyHref(property.id)}
        aria-label={`查看 ${property.title}`}
      >
        <div className="property-card__media">
          <PropertyImage src={cover} alt={property.title} />
          <div className="property-card__shade" />
          <span className={`tag tag-status tag-${status}`}>
            {statusLabel(status)}
          </span>
        </div>

        <div className="property-card__body">
          <div className="property-card__meta">
            <span>{property.city}</span>
            <span>{propertyTypeLabel(property.property_type)}</span>
          </div>
          <h3>{property.title}</h3>
          <p className="property-card__address">{property.address}</p>
          <div className="property-card__facts">
            {property.bedrooms != null && <span>{property.bedrooms} 卧</span>}
            {property.bathrooms != null && <span>{property.bathrooms} 卫</span>}
            {property.area_sqm != null && <span>{property.area_sqm} ㎡</span>}
          </div>
          <div className="property-card__footer">
            <strong>{formatPrice(property.price)}</strong>
            <span className="property-card__cta">详情 →</span>
          </div>
        </div>
      </a>
    </article>
  );
}
