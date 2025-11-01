import { createClient } from '@supabase/supabase-js';
import { env } from '@/config/env';

// Create Supabase Client
export const supabase = createClient(env.supabase.url, env.supabase.anonKey, {
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