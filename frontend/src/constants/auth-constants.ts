import type { UserRole } from '@/stores/auth/auth.types';

export const ROLE_HIERARCHY: Record<UserRole, UserRole[]> = {
  superadmin: ['superadmin'],
  admin: ['superadmin', 'admin'],
  staff: ['superadmin', 'admin', 'staff'],
  user: ['superadmin', 'admin', 'staff', 'user'],
};

export const AUTH_MESSAGES = {
  LOADING: {
    TITLE: 'Loading...',
    DESCRIPTION: 'Please wait while we verify your authentication',
  },
  UNAUTHENTICATED: {
    TITLE: 'Authentication Required',
    DESCRIPTION: 'Please sign in to access this page.',
    SIGN_IN_BUTTON: 'Sign In',
    CREATE_ACCOUNT_BUTTON: 'Create Account',
  },
  UNAUTHORIZED: {
    TITLE: 'Access Denied',
    DESCRIPTION: "You don't have permission to access this page.",
    GO_BACK_BUTTON: 'Go Back',
    YOUR_ROLE_LABEL: 'Your role:',
    REQUIRED_ROLES_LABEL: 'Required roles:',
  },
} as const;

