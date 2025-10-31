import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth/use-auth-store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, isInitialized } = useAuthStore();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    // Check for OAuth errors in URL parameters
    const errorParam = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');
    
    if (errorParam) {
      console.error('OAuth error:', { error: errorParam, errorDescription });
      setError(decodeURIComponent(errorDescription || errorParam));
      return;
    }

    // Wait for auth to initialize
    if (!isInitialized) return;

    // If user is authenticated, redirect to dashboard
    // AuthProvider handles the OAuth callback automatically via onAuthStateChange
    if (user) {
      navigate('/dashboard', { replace: true });
    } else {
      // Check if this is an email confirmation callback
      const type = searchParams.get('type');
      if (type === 'signup' || type === 'email') {
        // Email confirmation successful, redirect to login
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 2000);
        setSuccess('Email confirmed! Redirecting to login...');
        return;
      }
      
      // If no user after callback, redirect to login
      navigate('/login', { replace: true });
    }
  }, [user, isInitialized, navigate, searchParams]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        {success ? (
          <>
            <CardHeader className="text-center">
              <CheckCircle2 className="h-12 w-12 mx-auto mb-4 text-green-600" />
              <CardTitle>Success!</CardTitle>
              <CardDescription className="mt-2">
                {success}
              </CardDescription>
            </CardHeader>
          </>
        ) : error ? (
          <>
            <CardHeader className="text-center">
              <AlertCircle className="h-12 w-12 mx-auto mb-4 text-destructive" />
              <CardTitle>Authentication Error</CardTitle>
              <CardDescription className="mt-2">
                {error}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={() => navigate('/login', { replace: true })} 
                className="w-full"
              >
                Return to Login
              </Button>
            </CardContent>
          </>
        ) : (
          <CardContent className="p-8 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
            <h2 className="text-lg font-semibold mb-2">Completing Authentication</h2>
            <p className="text-muted-foreground text-sm">
              Please wait while we finish setting up your account...
            </p>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
