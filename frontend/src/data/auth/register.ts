import { supabase } from '@/lib/supabase/supabase';
import type { User, Session } from '@supabase/supabase-js';
import { getCallbackUrl } from '@/constants/api';

// Register Data
export type RegisterDataArgs = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
};

// Register Data Response
export type RegisterDataResponse = {
    user: User | null;
    session: Session | null;
};

// Register Data
export async function registerData(args: RegisterDataArgs): Promise<RegisterDataResponse> {
    const { 
        data, 
        error 
    } = await supabase.auth.signUp(
        {
            email: args.email,
            password: args.password,
            options: {
                data: {
                    first_name: args.firstName,
                    last_name: args.lastName,
                },
                emailRedirectTo: getCallbackUrl(),
            },
        }
    ); 
    
    if (error) {
        throw new Error(error.message);
    }    
    
    // If user is created, create profile record
    if (data.user) {
        const { error: profileError } = await supabase
            .from('profiles')
            .insert({
                id: data.user.id,
                email: args.email,
                first_name: args.firstName,
                last_name: args.lastName,
                avatar_url: '',
                role: 'user',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            });

        if (profileError) {
            console.error('Failed to create profile:', profileError);
            // Don't throw error as user is already created
        }
    }
    
    return data;
}