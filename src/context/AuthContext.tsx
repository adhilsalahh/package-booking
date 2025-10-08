import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase, Profile } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  isAdmin: boolean;
  loading: boolean;
  signUp: (
    email: string,
    password: string,
    username: string,
    phone: string,
    additionalData?: {
      full_name?: string;
      date_of_birth?: string;
      address?: string;
      profile_picture_url?: string;
      preferences?: Record<string, any>;
    }
  ) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  adminSignIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
    return data;
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id).then(setProfile);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      (async () => {
        setUser(session?.user ?? null);
        if (session?.user) {
          const profileData = await fetchProfile(session.user.id);
          setProfile(profileData);
        } else {
          setProfile(null);
        }
      })();
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (
    email: string,
    password: string,
    username: string,
    phone: string,
    additionalData?: {
      full_name?: string;
      date_of_birth?: string;
      address?: string;
      profile_picture_url?: string;
      preferences?: Record<string, any>;
    }
  ) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    if (data.user) {
      const profileData: any = {
        id: data.user.id,
        username,
        phone,
        role: 'user',
        account_status: 'active',
        email_verified: false,
      };

      if (additionalData) {
        if (additionalData.full_name) profileData.full_name = additionalData.full_name;
        if (additionalData.date_of_birth) profileData.date_of_birth = additionalData.date_of_birth;
        if (additionalData.address) profileData.address = additionalData.address;
        if (additionalData.profile_picture_url)
          profileData.profile_picture_url = additionalData.profile_picture_url;
        if (additionalData.preferences) profileData.preferences = additionalData.preferences;
      }

      const { error: profileError } = await supabase.from('profiles').insert(profileData);

      if (profileError) throw profileError;
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
  };

  const adminSignIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    if (data.user) {
      const profileData = await fetchProfile(data.user.id);
      if (profileData?.role !== 'admin') {
        await supabase.auth.signOut();
        throw new Error('Unauthorized: Admin access only');
      }
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const isAdmin = profile?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isAdmin,
        loading,
        signUp,
        signIn,
        adminSignIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
