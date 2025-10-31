import { useEffect, type ReactNode } from 'react';
import { supabase } from '@/lib/supabase/supabase';
import { useAuthStore } from '@/stores/auth/use-auth-store';
import { getProfileData } from '@/data/auth/get-profile';
import { toast } from 'sonner';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { setUser, setSession, setLoading, setInitialized } = useAuthStore();

  useEffect(() => {
    let mounted = true;
    let isInitialized = false;

    // Get initial session
    const initializeAuth = async () => {
      try {
        setLoading(true);
        
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          return;
        }

        setSession(session);
        
        if (session?.user && mounted) {
          try {
            const profile = await getProfileData({ userId: session.user.id });
            if (mounted) {
              setUser(profile);
            }
          } catch (error) {
            console.error('Failed to fetch profile:', error);
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        if (mounted) {
          setLoading(false);
          setInitialized(true);
          isInitialized = true;
        }
      }
    };

    initializeAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      // Only log important auth events (skip INITIAL_SESSION and SIGNED_OUT during initialization)
      if (event !== 'INITIAL_SESSION' && event !== 'SIGNED_OUT') {
        console.log('Auth state changed:', event, session?.user?.id);
      }
      
      if (!mounted) return;

      setSession(session);
      
      if (event === 'SIGNED_IN' && session?.user) {
        setLoading(true);
        try {
          const profile = await getProfileData({ userId: session.user.id });
            setUser(profile);
            toast.success('Successfully signed in!');
        } catch (error) {
            console.error('Failed to fetch profile after sign in:', error);
            toast.error('Failed to load user profile');
        } finally {
            setLoading(false);
        }
      } else if (event === 'SIGNED_OUT') {
          // Only show toast if we're past initialization (real sign out, not initial state)
          setUser(null);
          setLoading(false);
          if (isInitialized) {
            toast.success('Successfully signed out!');
          }
      } else if (event === 'TOKEN_REFRESHED') {
          // Session was refreshed, user data should still be valid
          console.log('Token refreshed');
      } else if (event === 'USER_UPDATED' && session?.user) {
        // User data was updated, refresh profile
        try {
          const profile = await getProfileData({ userId: session.user.id });
            setUser(profile);
        } catch (error) {
            console.error('Failed to refresh profile after user update:', error);
        }
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [setUser, setSession, setLoading, setInitialized]);

  return <>{children}</>;
}