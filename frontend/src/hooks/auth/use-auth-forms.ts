import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLoginMutation } from '@/hooks/query/auth/use-login-mutation';
import { useRegisterMutation } from '@/hooks/query/auth/use-register-mutation';
import { useOAuthMutation } from '@/hooks/query/auth/use-oauth-mutation';
import { loginSchema, registerSchema } from '@/schemas/auth-schemas';
import type { LoginFormData, RegisterFormData } from '@/schemas/auth-schemas';
import type { OAuthProvider } from '@/data/auth/oauth';
import { toast } from 'sonner';

export function useLoginForm() {
  const loginMutation = useLoginMutation();
  const oauthMutation = useOAuthMutation();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const handleOAuth = (provider: OAuthProvider) => {
    oauthMutation.mutate(
      { provider },
      {
        onError: (error) => {
          toast.error(`OAuth login failed: ${error.message}`);
        },
      }
    );
  };

  const handleLogin = (data: LoginFormData) => {
    loginMutation.mutate(data, {
      onError: (error) => {
        toast.error(`Login failed: ${error.message}`);
      },
    });
  };

  return {
    form,
    loginMutation,
    oauthMutation,
    handleOAuth,
    handleLogin,
  };
}

export function useRegisterForm() {
  const registerMutation = useRegisterMutation();
  const oauthMutation = useOAuthMutation();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const handleOAuth = (provider: OAuthProvider) => {
    oauthMutation.mutate(
      { provider },
      {
        onError: (error) => {
          toast.error(`OAuth registration failed: ${error.message}`);
        },
      }
    );
  };

  const handleRegister = (data: RegisterFormData) => {
    registerMutation.mutate(
      {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          toast.success('Registration successful! Please check your email to verify your account.');
        },
        onError: (error) => {
          toast.error(`Registration failed: ${error.message}`);
        },
      }
    );
  };

  return {
    form,
    registerMutation,
    oauthMutation,
    handleOAuth,
    handleRegister,
  };
}

