import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { OAuthButtons } from './_components/oauth-buttons';
import { PasswordInput } from './_components/password-input';
import { Divider } from '@/components/ui/divider';
import { useLoginForm } from '@/hooks/auth/use-auth-forms';

interface LoginFormProps {
  onSwitchToRegister?: () => void;
}

export function LoginForm({ onSwitchToRegister }: LoginFormProps) {
  const { 
    form, 
    loginMutation, 
    oauthMutation, 
    handleOAuth, 
    handleLogin 
  } = useLoginForm();

  return (
    <Card className="w-full max-w-md mx-auto">
      {/* Header */}
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-semibold">Welcome back</CardTitle>
        <CardDescription>Sign in to your account to continue</CardDescription>
      </CardHeader>
      
      {/* Content */}
      <CardContent className="space-y-6">
          {/* Login form */}
          <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...form.register('email')}
              className={form.formState.errors.email ? 'border-destructive' : ''}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
            )}
          </div>
          {/* Password */}
          <PasswordInput
            id="password"
            label="Password"
            placeholder="Enter your password"
            register={form.register('password')}
            error={form.formState.errors.password?.message}
          />
          {/* Submit button */}
          <Button
            type="submit"
            className="w-full"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
        {/* Sign up button */}
        <div className="text-center text-sm">
          <span className="text-muted-foreground">Don't have an account? </span>
          <Button 
            variant="link" 
            className="p-0 h-auto"
            onClick={onSwitchToRegister}
          >
            Sign up
          </Button>
        </div>
        
        <Divider />
        {/* OAuth providers */}
        <OAuthButtons onOAuthClick={handleOAuth} isLoading={oauthMutation.isPending} />
      </CardContent>
    </Card>
  );
}