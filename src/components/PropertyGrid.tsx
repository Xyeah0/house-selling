import { useMemo, useState } from "react";
import type { Property, PropertyFilters } from "../types/property";
import { PropertyCard } from "./PropertyCard";

interface PropertyGridProps {
  properties: Property[];
}

const INITIAL_FILTERS: PropertyFilters = {
  city: "",
  type: "",
  minPrice: "",
  maxPrice: "",
};

export function PropertyGrid({ properties }: PropertyGridProps) {
  const [filters, setFilters] = useState<PropertyFilters>(INITIAL_FILTERS);

  const cities = useMemo(
    () => [...new Set(properties.map((p) => p.city))].sort(),
    [properties],
  );

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (filters.city && p.city !== filters.city) return false;
      if (filters.type && p.property_type !== filters.type) return false;
      if (filters.minPrice && p.price < Number(filters.minPrice) * 10000) return false;
      if (filters.maxPrice && p.price > Number(filters.maxPrice) * 10000) return false;
      return true;
    });
  }, [properties, filters]);

  return (
    <section className="collection" id="collection">
      <div className="section-head reveal">
        <p className="section-eyebrow">Curated Listings</p>
        <h2>臻选房源</h2>
        <p>每一套房源均经过实地勘验与资产评估，确保信息真实、体验可感。</p>
      </div>

      <div className="filters reveal reveal-delay-1">
        <label>
          城市
          <select
            value={filters.city}
            onChange={(e) => setFilters((f) => ({ ...f, city: e.target.value }))}
          >
            <option value="">全部</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </label>

        <label>
          类型
          <select
            value={filters.type}
            onChange={(e) => setFilters((f) => ({ ...f, type: e.target.value }))}
          >
            <option value="">全部</option>
            <option value="apartment">精品公寓</option>
            <option value="villa">独栋别墅</option>
            <option value="townhouse">联排宅邸</option>
            <option value="penthouse">顶层大平层</option>
          </select>
        </label>

        <label>
          最低价（万）
          <input
            type="number"
            placeholder="300"
            value={filters.minPrice}
            onChange={(e) =>
              setFilters((f) => ({ ...f, minPrice: e.target.value }))
            }
          />
        </label>

        <label>
          最高价（万）
          <input
            type="number"
            placeholder="1500"
            value={filters.maxPrice}
            onChange={(e) =>
              setFilters((f) => ({ ...f, maxPrice: e.target.value }))
            }
          />
        </label>

        <button
          className="btn btn-ghost btn-sm"
          type="button"
          onClick={() => setFilters(INITIAL_FILTERS)}
        >
          重置
        </button>
      </div>

      <p className="collection__count reveal reveal-delay-2">
        共 {filtered.length} 套房源
      </p>

      <div className="property-grid">
        {filtered.map((property, index) => (
          <PropertyCard
            key={property.id}
            property={property}
            index={index}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state reveal">
          <p>暂无符合筛选条件的房源，请调整筛选或联系顾问为您定制找房。</p>
        </div>
      )}
    </section>
  );
}
