import { supabase } from '@/lib/supabase/supabase';
import type { User, Session } from '@supabase/supabase-js';

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
            options: { // Handle options
                data: { // Handle data
                    first_name: args.firstName,
                    last_name: args.lastName,
                },
            },
        }
    ); if (error) {
        throw new Error(error.message); // TODO: Handle error
    }    
    return data; // TODO: Handle data
}