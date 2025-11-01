import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth/use-auth-store';
import { CALLBACK_TYPES, SUCCESS_MESSAGES, REDIRECT_DELAY_MS } from '../_constants/auth-callback.constants';

export function useAuthCallback() {
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
      if (type === CALLBACK_TYPES.SIGNUP || type === CALLBACK_TYPES.EMAIL) {
        // Email confirmation successful, redirect to login
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, REDIRECT_DELAY_MS);
        setSuccess(SUCCESS_MESSAGES.EMAIL_CONFIRMED);
        return;
      }
      
      // If no user after callback, redirect to login
      navigate('/login', { replace: true });
    }
  }, [user, isInitialized, navigate, searchParams]);

  return {
    error,
    success,
  };
}

