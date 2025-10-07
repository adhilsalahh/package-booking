import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Profile {
  id: string;
  username: string;
  phone: string;
  role: 'user' | 'admin';
  created_at: string;
}

export interface Package {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  duration: string;
  created_by: string;
  created_at: string;
}

export interface PackageDate {
  id: string;
  package_id: string;
  available_date: string;
  seats: number;
}

export interface Booking {
  id: string;
  package_id: string;
  user_id: string;
  booking_date: string;
  travel_date: string;
  members: any;
  total_amount: number;
  advance_paid: boolean;
  advance_amount: number;
  advance_utr: string | null;
  advance_receipt_url: string | null;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
}
