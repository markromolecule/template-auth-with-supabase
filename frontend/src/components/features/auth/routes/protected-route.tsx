import type { ReactNode } from 'react';
import { useAuthStore } from '@/stores/auth/use-auth-store';
import type { UserRole } from '@/stores/auth/auth.types';
import { LoadingState } from '../_ui/loading-state';
import { UnauthenticatedState } from '../_ui/unauthenticated-state';
import { UnauthorizedState } from '../_ui/unauthorized-state';

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
    return <LoadingState />;
  }

  // Redirect to login if not authenticated
  if (!user) {
    return fallback || <UnauthenticatedState />;
  }

  // Check role-based access
  if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
    return <UnauthorizedState userRole={user.role} requiredRoles={requiredRoles} />;
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
