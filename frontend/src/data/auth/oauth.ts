import { supabase } from '@/lib/supabase/supabase';
import { getCallbackUrl } from '@/constants/api';

export type OAuthProvider = 'google' | 'facebook';

// OAuth Provider Args
export type OAuthProviderArgs = {
    provider: OAuthProvider;
    redirectTo?: string;
};

// OAuth Provider Response
export type OAuthProviderResponse = {
    provider: string;
    url: string | null;
};

// OAuth Login Data
export async function oauthLoginData(args: OAuthProviderArgs) {
    const {
        data,
        error
    } = await supabase.auth.signInWithOAuth(
        {
            provider: args.provider,
            options: {
                // Callback URL
                redirectTo: args.redirectTo || getCallbackUrl(),
            },
        }
    );
    
    if (error) {
        throw new Error(error.message);
    }
    
    // Redirect to OAuth provider URL
    if (data.url) {
        window.location.href = data.url;
    } else {
        throw new Error('OAuth URL not provided');
    }
    
    return data;
}