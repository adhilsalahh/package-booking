import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Package {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  images: string[];
  inclusions: string[];
  itinerary: ItineraryDay[];
  created_at: string;
  updated_at: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  activities: string[];
}

export interface Member {
  name: string;
  age: number;
}

export interface Booking {
  id: string;
  package_id: string;
  name: string;
  phone: string;
  members: Member[];
  booking_date: string;
  payment_screenshot?: string;
  status: 'pending' | 'confirmed';
  created_at: string;
  updated_at: string;
}

export interface AvailableDate {
  id: string;
  package_id: string;
  date: string;
  max_bookings: number;
  current_bookings: number;
  created_at: string;
}
