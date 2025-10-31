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

    // If profile doesn't exist, create it
    if (error && error.code === 'PGRST116') {
        // Get user from auth
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !user) {
            console.error('Failed to get user information:', userError);
            throw new Error('Failed to get user information');
        }

        // Extract name from user metadata
        // Check different possible metadata fields from OAuth providers
        const firstName = user.user_metadata.first_name 
            || user.user_metadata.given_name 
            || user.user_metadata.full_name?.split(' ')[0] 
            || 'User';
        const lastName = user.user_metadata.last_name 
            || user.user_metadata.family_name 
            || user.user_metadata.full_name?.split(' ').slice(1).join(' ') 
            || '';
        const avatarUrl = user.user_metadata.avatar_url || user.user_metadata.picture || '';
        const email = user.email || '';

        // Log for debugging
        console.log('Creating profile with metadata:', {
            firstName,
            lastName,
            email,
            avatarUrl,
            metadata: user.user_metadata
        });

        // Create profile
        const { error: insertError } = await supabase
            .from('profiles')
            .insert({
                id: user.id,
                email: email,
                first_name: firstName,
                last_name: lastName,
                avatar_url: avatarUrl,
                role: 'user',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            });

        if (insertError) {
            console.error('Profile creation error:', insertError);
            console.error('Insert data:', {
                id: user.id,
                email: email,
                first_name: firstName,
                last_name: lastName,
                avatar_url: avatarUrl,
                role: 'user',
            });
            throw new Error(`Failed to create profile: ${insertError.message}`);
        }

        // Return the newly created profile
        return {
            id: user.id,
            email: email,
            firstName: firstName,
            lastName: lastName,
            avatar: avatarUrl,
            role: 'user',
        };
    }

    if (error) {
        throw new Error(error.message); 
    }

    // Map data columns to AuthUser
    return {
        id: data.id,
        email: data.email,
        firstName: data.first_name,
        lastName: data.last_name,
        avatar: data.avatar_url || '',
        role: data.role,
    }
}