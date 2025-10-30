import { supabase } from '@/lib/supabase/supabase';
import type { AuthUser } from '@/stores/auth/auth.types';

// Get Profile Data
export type GetProfileDataArgs = {
    userId: string;
};

// Get Profile Data
export async function getProfileData(args: GetProfileDataArgs): Promise<AuthUser> {
    const {
        data,
        error
    } = await supabase
        // Handle table and query
        .from('profiles')
        .select('*')
        .eq('id', args.userId) // Handle filter
        .single();

    if (error) {
        throw new Error(error.message); 
    }
    // Map data columns to AuthUser
    return {
        id: data.id,
        email: data.email,
        firstName: data.first_name,
        lastName: data.last_name,
        role: data.role,
    }
}