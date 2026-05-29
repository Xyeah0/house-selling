export type PropertyStatus = "available" | "pending" | "sold";

export type PropertyType = "apartment" | "villa" | "townhouse" | "penthouse";

export interface Property {
  id: string;
  title: string;
  description: string | null;
  price: number;
  address: string;
  city: string;
  bedrooms: number | null;
  bathrooms: number | null;
  area_sqm: number | null;
  property_type: PropertyType | string | null;
  image_url: string | null;
  image_urls?: string[] | null;
  featured: boolean | null;
  status: PropertyStatus | string | null;
  created_at?: string | null;
}

export interface PropertyFilters {
  city: string;
  type: string;
  minPrice: string;
  maxPrice: string;
}
