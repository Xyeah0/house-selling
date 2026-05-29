import type { Property } from "../types/property";

export function getPropertyImages(property: Property): string[] {
  if (property.image_urls?.length) {
    return property.image_urls.filter(Boolean);
  }
  if (property.image_url) {
    return [property.image_url];
  }
  return [];
}

export function getPropertyCover(property: Property): string | null {
  return getPropertyImages(property)[0] ?? null;
}
