import { useEffect, useState } from "react";

function parseHashRoute(): string {
  const raw = window.location.hash.slice(1);
  const path = raw.split("?")[0];
  if (path.startsWith("/admin")) {
    return path === "/admin" ? "/admin/properties" : path;
  }
  if (path.startsWith("/property/")) {
    return path;
  }
  return "/";
}

export function useHashRoute(): string {
  const [route, setRoute] = useState(() => parseHashRoute());

  useEffect(() => {
    const onHashChange = () => setRoute(parseHashRoute());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return route;
}

export function isAdminRoute(route: string): boolean {
  return route.startsWith("/admin");
}

export function parsePropertyIdFromRoute(route: string): string | null {
  const match = route.match(/^\/property\/([^/]+)$/);
  return match?.[1] ?? null;
}

export function propertyHref(id: string): string {
  return `#/property/${id}`;
}

export function adminHref(path: string): string {
  return `#${path.startsWith("/") ? path : `/admin/${path}`}`;
}

export function parseContactPropertyId(): string | null {
  const hash = window.location.hash.slice(1);
  const query = hash.includes("?") ? hash.split("?")[1] : "";
  if (!query) return null;
  return new URLSearchParams(query).get("property");
}

export function scrollToContact() {
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function navigateToContact(propertyId?: string) {
  window.location.hash = propertyId ? `contact?property=${propertyId}` : "contact";
  window.setTimeout(scrollToContact, 50);
}

export function useContactPropertyId(): string | null {
  const [propertyId, setPropertyId] = useState(() => parseContactPropertyId());

  useEffect(() => {
    const sync = () => setPropertyId(parseContactPropertyId());
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  return propertyId;
}

export function useContactScroll() {
  useEffect(() => {
    const tryScroll = () => {
      const anchor = window.location.hash.slice(1).split("?")[0];
      if (anchor === "contact") {
        window.setTimeout(scrollToContact, 50);
      }
    };

    tryScroll();
    window.addEventListener("hashchange", tryScroll);
    return () => window.removeEventListener("hashchange", tryScroll);
  }, []);
}
