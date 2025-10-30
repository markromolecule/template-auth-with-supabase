import { createClient } from '@supabase/supabase-js';

// Supabase Configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

// Create Supabase Client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

export type Database = {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string;
                    email: string;
                    first_name: string;
                    last_name: string;
                    avatar_url: string;
                    role: 'superadmin' | 'admin' | 'staff' |'user';
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id: string;
                    email: string;
                    first_name: string;
                    last_name: string;
                    avatar_url: string;
                    role: 'superadmin' | 'admin' | 'staff' |'user';
                    created_at: string;
                    updated_at: string;
                };
                Update: {
                    id?: string;
                    email?: string;
                    first_name?: string;
                    last_name?: string;
                    avatar_url?: string;
                    role?: 'superadmin' | 'admin' | 'staff' |'user';
                    created_at?: string;
                    updated_at?: string;
                };
            }
        }
    }
}