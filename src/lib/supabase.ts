import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  email: string;
  full_name: string;
  phone: string | null;
  role: 'admin' | 'user';
  created_at: string;
};

export type Package = {
  id: string;
  title: string;
  description: string;
  destination: string;
  duration_days: number;
  price_per_head: number;
  advance_payment: number;
  max_capacity: number;
  start_date: string;
  end_date: string;
  image_url: string | null;
  is_active: boolean;
  created_by: string | null;
  created_at: string;
};

export type Booking = {
  id: string;
  package_id: string;
  user_id: string;
  number_of_people: number;
  total_amount: number;
  advance_paid: number;
  remaining_amount: number;
  payment_proof_url: string | null;
  payment_proof_type: string | null;
  status: 'pending' | 'confirmed' | 'cancelled';
  user_phone: string;
  user_name: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
};
