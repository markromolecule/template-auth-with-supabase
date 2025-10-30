import type { ReactNode } from 'react';
import { useAuthStore } from '@/stores/auth/use-auth-store';
import type { UserRole } from '@/stores/auth/auth.types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, ShieldAlert, Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRoles?: UserRole[];
  fallback?: ReactNode;
  redirectTo?: string;
}

export function ProtectedRoute({ 
  children, 
  requiredRoles = [], 
  fallback 
}: ProtectedRouteProps) {
  const { user, isLoading, isInitialized } = useAuthStore();

  // Show loading state while initializing
  if (!isInitialized || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
            <h2 className="text-lg font-semibold mb-2">Loading...</h2>
            <p className="text-muted-foreground text-sm">
              Please wait while we verify your authentication
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <Shield className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold mb-2">Authentication Required</h2>
            <p className="text-muted-foreground mb-6">
              Please sign in to access this page.
            </p>
            <div className="space-y-2">
              <Button 
                onClick={() => window.location.href = '/login'} 
                className="w-full"
              >
                Sign In
              </Button>
              <Button 
                variant="outline" 
                onClick={() => window.location.href = '/register'} 
                className="w-full"
              >
                Create Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Check role-based access
  if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <ShieldAlert className="h-12 w-12 mx-auto mb-4 text-destructive" />
            <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
            <p className="text-muted-foreground mb-4">
              You don't have permission to access this page.
            </p>
            <div className="bg-muted rounded-lg p-4 mb-6">
              <p className="text-sm">
                <span className="font-medium">Your role:</span> 
                <span className="capitalize ml-1 px-2 py-1 bg-background rounded-md text-xs">
                  {user.role}
                </span>
              </p>
              <p className="text-sm mt-2">
                <span className="font-medium">Required roles:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {requiredRoles.map(role => (
                    <span 
                      key={role} 
                      className="capitalize px-2 py-1 bg-background rounded-md text-xs"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => window.history.back()} 
              className="w-full"
            >
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}

// Higher-order component for specific role requirements
export const withAuth = (
  Component: React.ComponentType<any>,
  requiredRoles?: UserRole[]
) => {
  return function AuthenticatedComponent(props: any) {
    return (
      <ProtectedRoute requiredRoles={requiredRoles}>
        <Component {...props} />
      </ProtectedRoute>
    );
  };
};

// Specific role-based route components
export const SuperAdminRoute = ({ children }: { children: ReactNode }) => (
  <ProtectedRoute requiredRoles={['superadmin']}>
    {children}
  </ProtectedRoute>
);

export const AdminRoute = ({ children }: { children: ReactNode }) => (
  <ProtectedRoute requiredRoles={['superadmin', 'admin']}>
    {children}
  </ProtectedRoute>
);

export const StaffRoute = ({ children }: { children: ReactNode }) => (
  <ProtectedRoute requiredRoles={['superadmin', 'admin', 'staff']}>
    {children}
  </ProtectedRoute>
);

export const UserRoute = ({ children }: { children: ReactNode }) => (
  <ProtectedRoute requiredRoles={['superadmin', 'admin', 'staff', 'user']}>
    {children}
  </ProtectedRoute>
);
