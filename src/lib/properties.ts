import type { SupabaseClient } from "@supabase/supabase-js";
import { MOCK_PROPERTIES } from "../data/mockProperties";
import type { Property } from "../types/property";

export const PROPERTIES_TABLE = "properties";

export async function fetchProperties(
  client: SupabaseClient | null,
): Promise<{ data: Property[]; source: "supabase" | "demo" }> {
  if (!client) {
    return { data: MOCK_PROPERTIES, source: "demo" };
  }

  const { data, error } = await client
    .from(PROPERTIES_TABLE)
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data?.length) {
    return { data: MOCK_PROPERTIES, source: "demo" };
  }

  return { data: data as Property[], source: "supabase" };
}

export async function insertProperty(
  client: SupabaseClient,
  payload: Omit<Property, "id" | "created_at">,
): Promise<{ data: Property | null; error: string | null }> {
  const { data, error } = await client
    .from(PROPERTIES_TABLE)
    .insert(payload)
    .select()
    .single();

  if (error) return { data: null, error: error.message };
  return { data: data as Property, error: null };
}

export async function deleteProperty(
  client: SupabaseClient,
  id: string,
): Promise<{ error: string | null }> {
  const { error } = await client.from(PROPERTIES_TABLE).delete().eq("id", id);
  return { error: error?.message ?? null };
}

export async function updateProperty(
  client: SupabaseClient,
  id: string,
  payload: Omit<Property, "id" | "created_at">,
): Promise<{ data: Property | null; error: string | null }> {
  const { data, error } = await client
    .from(PROPERTIES_TABLE)
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) return { data: null, error: error.message };
  return { data: data as Property, error: null };
}

export async function fetchPropertyById(
  client: SupabaseClient,
  id: string,
): Promise<{ data: Property | null; error: string | null }> {
  const { data, error } = await client
    .from(PROPERTIES_TABLE)
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) return { data: null, error: error.message };
  return { data: (data as Property | null) ?? null, error: null };
}

export function formatPrice(price: number): string {
  if (price >= 10000) {
    return `¥ ${(price / 10000).toFixed(price % 10000 === 0 ? 0 : 1)} 万`;
  }
  return `¥ ${price.toLocaleString("zh-CN")}`;
}

export function propertyTypeLabel(type: string | null): string {
  const map: Record<string, string> = {
    apartment: "精品公寓",
    villa: "独栋别墅",
    townhouse: "联排宅邸",
    penthouse: "顶层大平层",
  };
  return type ? (map[type] ?? type) : "精品住宅";
}

export function statusLabel(status: string | null): string {
  const map: Record<string, string> = {
    available: "在售",
    pending: "洽谈中",
    sold: "已售",
  };
  return status ? (map[status] ?? status) : "在售";
}
