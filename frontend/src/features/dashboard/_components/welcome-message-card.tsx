import { Card, CardContent } from '@/components/ui/card';
import { User } from 'lucide-react';
import type { AuthUser } from '@/stores/auth/auth.types';

interface WelcomeMessageCardProps {
  user: AuthUser;
}

export function WelcomeMessageCard({ user }: WelcomeMessageCardProps) {
  return (
    <Card className="md:col-span-2 lg:col-span-2">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">
              Welcome to your dashboard, {user.firstName}!
            </h3>
            <p className="text-muted-foreground mb-4">
              This is your central hub for managing your account and accessing all available features. 
              Your current role is <span className="font-medium capitalize">{user.role}</span>, 
              which gives you access to specific features and permissions.
            </p>
            {user.role === 'user' && (
              <p className="text-sm text-muted-foreground">
                Contact an administrator if you need additional permissions or have questions about your account.
              </p>
            )}
            {(user.role === 'admin' || user.role === 'superadmin') && (
              <p className="text-sm text-muted-foreground">
                As an administrator, you have access to the admin panel for managing users and system settings.
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

