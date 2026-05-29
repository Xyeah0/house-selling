import type { SupabaseClient } from "@supabase/supabase-js";
import type { Appointment, AppointmentInsert } from "../types/appointment";

export const APPOINTMENTS_TABLE = "appointments";

export async function insertAppointment(
  client: SupabaseClient,
  payload: AppointmentInsert,
): Promise<{ data: Appointment | null; error: string | null }> {
  const { data, error } = await client
    .from(APPOINTMENTS_TABLE)
    .insert(payload)
    .select()
    .single();

  if (error) return { data: null, error: error.message };
  return { data: data as Appointment, error: null };
}

export async function fetchAppointments(
  client: SupabaseClient,
): Promise<{ data: Appointment[]; error: string | null }> {
  const { data, error } = await client
    .from(APPOINTMENTS_TABLE)
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return { data: [], error: error.message };
  return { data: (data ?? []) as Appointment[], error: null };
}
