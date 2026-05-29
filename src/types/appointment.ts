export interface Appointment {
  id: string;
  property_id: string | null;
  name: string;
  phone: string;
  city: string | null;
  message: string | null;
  created_at?: string | null;
}

export interface AppointmentInsert {
  property_id?: string | null;
  name: string;
  phone: string;
  city?: string | null;
  message?: string | null;
}
