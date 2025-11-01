import { useState } from 'react';
import { LoginForm } from './login-form';
import { RegisterForm } from './register-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface AuthLayoutProps {
  initialMode?: 'login' | 'register';
}

export function AuthLayout({ initialMode = 'login' }: AuthLayoutProps) {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {mode === 'login' ? (
          <LoginForm onSwitchToRegister={() => setMode('register')} />
        ) : (
          <RegisterForm onSwitchToLogin={() => setMode('login')} />
        )}

        {/* Footer */}
        <Card className="mt-6">
          <CardContent className="p-4 text-center text-sm text-muted-foreground">
            <p>
              By continuing, you agree to our{' '}
              <Button variant="link" className="p-0 h-auto text-sm">
                Terms of Service
              </Button>{' '}
              and{' '}
              <Button variant="link" className="p-0 h-auto text-sm">
                Privacy Policy
              </Button>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
