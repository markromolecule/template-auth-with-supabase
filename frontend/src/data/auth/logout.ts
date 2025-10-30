import { supabase } from '@/lib/supabase/supabase';

// Logout Data
export async function logoutData(): Promise<void> {
    const {
        error
    } = await supabase.auth.signOut(
        // Handle sign out-opt    
    );
    if (error) {
        throw new Error(error.message); // TODO: Handle error
    }
}