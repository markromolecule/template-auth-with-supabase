import { useState } from 'react';
import { LoginForm } from './login-form';
import { RegisterForm } from './register-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type AuthMode = 'login' | 'register';

interface AuthLayoutProps {
  initialMode?: AuthMode;
}

export function AuthLayout({ initialMode = 'login' }: AuthLayoutProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Tabs value={mode} onValueChange={(value) => setMode(value as AuthMode)}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="register">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="space-y-0">
            <LoginForm onSwitchToRegister={() => setMode('register')} />
          </TabsContent>
          
          <TabsContent value="register" className="space-y-0">
            <RegisterForm onSwitchToLogin={() => setMode('login')} />
          </TabsContent>
        </Tabs>

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
