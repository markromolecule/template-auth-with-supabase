import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { OAuthButtons } from './_components/oauth-buttons';
import { PasswordInput } from './_components/password-input';
import { Divider } from '@/components/ui/divider';
import { useRegisterForm } from '@/hooks/auth/use-auth-forms';

interface RegisterFormProps {
  onSwitchToLogin?: () => void;
}

export function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  const { 
    form, 
    registerMutation, 
    oauthMutation, 
    handleOAuth, 
    handleRegister 
  } = useRegisterForm();

  return (
    <Card className="w-full max-w-md mx-auto">
      {/* Header */}
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-semibold">Create account</CardTitle>
        <CardDescription>Sign up to get started with your account</CardDescription>
      </CardHeader>

      {/* Content */}
      <CardContent className="space-y-6">
        <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* First name */}
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                placeholder="John"
                {...form.register('firstName')}
                className={form.formState.errors.firstName ? 'border-destructive' : ''}
              />
              {form.formState.errors.firstName && (
                <p className="text-sm text-destructive">{form.formState.errors.firstName.message}</p>
              )}
            </div>
            {/* Last name */}
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Doe"
                {...form.register('lastName')}
                className={form.formState.errors.lastName ? 'border-destructive' : ''}
              />
              {form.formState.errors.lastName && (
                <p className="text-sm text-destructive">{form.formState.errors.lastName.message}</p>
              )}
            </div>
          </div>
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john.doe@example.com"
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
            placeholder="Create a password"
            register={form.register('password')}
            error={form.formState.errors.password?.message}
          />
          {/* Confirm password */}
          <PasswordInput
            id="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm your password"
            register={form.register('confirmPassword')}
            error={form.formState.errors.confirmPassword?.message}
          />
          {/* Submit button */}
          <Button
            type="submit"
            className="w-full"
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? 'Creating account...' : 'Create account'}
          </Button>
        </form>
        {/* Sign in button */}
        <div className="text-center text-sm">
          <span className="text-muted-foreground">Already have an account? </span>
          <Button 
            variant="link" 
            className="p-0 h-auto"
            onClick={onSwitchToLogin}
          >
            Sign in
          </Button>
        </div>
        <Divider />
        {/* OAuth providers */}
        <OAuthButtons onOAuthClick={handleOAuth} isLoading={oauthMutation.isPending} />
      </CardContent>
    </Card>
  );
}
