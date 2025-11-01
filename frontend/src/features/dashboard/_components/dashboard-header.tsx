import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import type { AuthUser } from '@/stores/auth/auth.types';

interface DashboardHeaderProps {
  user: AuthUser;
  onLogout: () => void;
  isLoggingOut: boolean;
}

export function DashboardHeader({ user, onLogout, isLoggingOut }: DashboardHeaderProps) {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user.firstName} {user.lastName}!
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={onLogout}
            disabled={isLoggingOut}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            {isLoggingOut ? 'Signing out...' : 'Sign out'}
          </Button>
        </div>
      </div>
    </header>
  );
}

