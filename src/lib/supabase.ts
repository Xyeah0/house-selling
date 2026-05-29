import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const STORAGE_KEY = "supabase-config";

export type SupabaseConfig = {
  url: string;
  anonKey: string;
};

export function loadConfig(): SupabaseConfig | null {
  const fromEnv =
    import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY
      ? {
          url: import.meta.env.VITE_SUPABASE_URL,
          anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
        }
      : null;

  if (fromEnv) return fromEnv;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SupabaseConfig;
    if (parsed.url && parsed.anonKey) return parsed;
  } catch {
    /* ignore */
  }
  return null;
}

export function saveConfig(config: SupabaseConfig) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

export function clearConfig() {
  localStorage.removeItem(STORAGE_KEY);
}

export function createSupabaseClient(config: SupabaseConfig): SupabaseClient {
  return createClient(config.url.trim(), config.anonKey.trim());
}
