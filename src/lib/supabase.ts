import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          name: string;
          phone: string;
          is_admin: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          name: string;
          phone: string;
          is_admin?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          phone?: string;
          is_admin?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      packages: {
        Row: {
          id: string;
          name: string;
          description: string;
          price: number;
          duration: string;
          features: string[];
          image_url: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          price: number;
          duration: string;
          features?: string[];
          image_url?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          price?: number;
          duration?: string;
          features?: string[];
          image_url?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      bookings: {
        Row: {
          id: string;
          user_id: string;
          package_id: string;
          booking_date: string;
          requested_date: string | null;
          date_status: 'pending' | 'approved' | 'rejected';
          status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
          total_amount: number;
          special_requests: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          package_id: string;
          booking_date?: string;
          requested_date?: string | null;
          date_status?: 'pending' | 'approved' | 'rejected';
          status?: 'pending' | 'confirmed' | 'cancelled' | 'completed';
          total_amount: number;
          special_requests?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          package_id?: string;
          booking_date?: string;
          requested_date?: string | null;
          date_status?: 'pending' | 'approved' | 'rejected';
          status?: 'pending' | 'confirmed' | 'cancelled' | 'completed';
          total_amount?: number;
          special_requests?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      payments: {
        Row: {
          id: string;
          booking_id: string;
          user_id: string;
          amount: number;
          payment_proof_url: string | null;
          payment_status: 'pending' | 'verified' | 'rejected';
          payment_method: string;
          admin_notes: string;
          verified_at: string | null;
          verified_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          booking_id: string;
          user_id: string;
          amount: number;
          payment_proof_url?: string | null;
          payment_status?: 'pending' | 'verified' | 'rejected';
          payment_method?: string;
          admin_notes?: string;
          verified_at?: string | null;
          verified_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          booking_id?: string;
          user_id?: string;
          amount?: number;
          payment_proof_url?: string | null;
          payment_status?: 'pending' | 'verified' | 'rejected';
          payment_method?: string;
          admin_notes?: string;
          verified_at?: string | null;
          verified_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};
