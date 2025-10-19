import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  username: string;
  email: string;
  phone: string;
  full_name: string;
  role: 'user' | 'admin';
  account_status: 'active' | 'suspended' | 'deleted';
  created_at: string;
  updated_at: string;
};

export type Package = {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  images: string[];
  created_by: string;
  created_at: string;
};

export type PackageDate = {
  id: string;
  package_id: string;
  available_date: string;
  seats: number;
};

export type Member = {
  name: string;
  age: number;
  phone: string;
};

export type Booking = {
  id: string;
  package_id: string;
  user_id: string;
  booking_date: string;
  travel_date: string;
  members: Member[];
  total_amount: number;
  advance_paid: boolean;
  advance_amount: number;
  advance_utr: string | null;
  advance_receipt_url: string | null;
  remaining_amount: number;
  remaining_paid: boolean;
  remaining_utr: string | null;
  remaining_receipt_url: string | null;
  full_payment_done: boolean;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
};

export type PaymentSettings = {
  id: string;
  setting_key: string;
  setting_value: string;
  description: string | null;
  updated_at: string;
  updated_by: string | null;
};
