import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase/supabase';
import { useAuthStore } from '@/stores/auth/use-auth-store';
import { getProfileData } from '@/data/auth/get-profile';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export function AuthCallback() {
  const navigate = useNavigate();
  const { setUser, setSession, setLoading } = useAuthStore();

  useEffect(() => {
    let mounted = true;

    const handleAuthCallback = async () => {
      try {
        setLoading(true);
        
        // Handle the OAuth callback
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('OAuth callback error:', error);
          toast.error('Authentication failed: ' + error.message);
          navigate('/login');
          return;
        }

        if (!data.session) {
          console.error('No session found after OAuth callback');
          toast.error('Authentication failed: No session found');
          navigate('/login');
          return;
        }

        if (!mounted) return;

        // Set the session
        setSession(data.session);

        // Fetch the user profile
        try {
          const profile = await getProfileData({ userId: data.session.user.id });
          
          if (mounted) {
            setUser(profile);
            toast.success('Successfully signed in!');
            navigate('/dashboard');
          }
        } catch (profileError) {
          console.error('Failed to fetch profile:', profileError);
          
          // If profile doesn't exist, it might be a new user
          // The auth provider should handle creating the profile
          toast.error('Failed to load user profile. Please try again.');
          navigate('/login');
        }
      } catch (error) {
        console.error('Unexpected error in auth callback:', error);
        toast.error('An unexpected error occurred during authentication');
        navigate('/login');
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    handleAuthCallback();

    return () => {
      mounted = false;
    };
  }, [navigate, setUser, setSession, setLoading]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <h2 className="text-lg font-semibold mb-2">Completing Authentication</h2>
          <p className="text-muted-foreground text-sm">
            Please wait while we finish setting up your account...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
