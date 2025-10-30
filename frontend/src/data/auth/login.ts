import { supabase } from '@/lib/supabase/supabase';
import type { User, Session } from '@supabase/supabase-js';

// Login Data
export type LoginDataArgs = {
    email: string;
    password: string;
};

// Login Data Response
export type LoginDataResponse = {
    user: User | null;
    session: Session | null;
};

// Login Data
export async function loginData(args: LoginDataArgs): Promise<LoginDataResponse> {
    const { 
        data, 
        error 
    } = await supabase.auth.signInWithPassword(
        {
            email: args.email,
            password: args.password,
        }
    ); if (error) {
        throw new Error(error.message); // TODO: Handle error
    }    
    return data; // TODO: Handle data
}