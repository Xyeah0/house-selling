import type { Property } from "../../types/property";

export type PropertyFormValues = {
  title: string;
  city: string;
  address: string;
  price: number;
  bedrooms?: number;
  bathrooms?: number;
  area_sqm?: number;
  property_type: string;
  image_urls?: string[];
  description?: string;
  featured?: boolean;
  status: string;
};

export const defaultPropertyFormValues: PropertyFormValues = {
  title: "",
  city: "",
  address: "",
  price: 0,
  property_type: "apartment",
  image_urls: [],
  featured: false,
  status: "available",
};

export function propertyToFormValues(property: Property): PropertyFormValues {
  const urls =
    property.image_urls?.length
      ? property.image_urls.filter(Boolean)
      : property.image_url
        ? [property.image_url]
        : [];

  return {
    title: property.title,
    city: property.city,
    address: property.address,
    price: property.price >= 10000 ? property.price / 10000 : property.price,
    bedrooms: property.bedrooms ?? undefined,
    bathrooms: property.bathrooms ?? undefined,
    area_sqm: property.area_sqm ?? undefined,
    property_type: property.property_type ?? "apartment",
    image_urls: urls,
    description: property.description ?? undefined,
    featured: !!property.featured,
    status: property.status ?? "available",
  };
}

export function formValuesToPayload(values: PropertyFormValues) {
  const urls = (values.image_urls ?? []).map((url) => url.trim()).filter(Boolean);

  return {
    title: values.title.trim(),
    description: values.description?.trim() || null,
    price: Number(values.price) * 10000,
    address: values.address.trim(),
    city: values.city.trim(),
    bedrooms: values.bedrooms ?? null,
    bathrooms: values.bathrooms ?? null,
    area_sqm: values.area_sqm ?? null,
    property_type: values.property_type,
    image_url: urls[0] ?? null,
    image_urls: urls.length ? urls : null,
    featured: !!values.featured,
    status: values.status,
  };
}
