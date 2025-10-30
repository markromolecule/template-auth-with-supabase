# Auth Store

Global authentication state management using Zustand with Immer.

## Overview

The auth store manages user authentication state throughout the application using Zustand with Immer for immutable state updates. It provides reactive state that components can subscribe to.

## Files

```
auth/
├── auth.types.ts          # TypeScript types
├── auth.constants.ts      # Default state constants
└── use-auth-store.ts      # Zustand store implementation
```

## Store State

```typescript
type AuthStoreState = {
  user: AuthUser | null;              // Current user profile
  session: Session | null;            // Supabase session
  isLoading: boolean;                 // Loading state
  isInitialized: boolean;             // Store initialization flag
};
```

## Store Actions

```typescript
type AuthStoreActions = {
  setUser: (user: AuthUser | null) => void;              // Update user
  setSession: (session: Session | null) => void;         // Update session
  setLoading: (loading: boolean) => void;                // Set loading state
  setInitialized: (initialized: boolean) => void;        // Mark as initialized
  logout: () => void;                                    // Clear auth state
  updateUser: (updates: Partial<AuthUser>) => void;      // Partial user update
};
```

## User Types

```typescript
type UserRole = 'superadmin' | 'admin' | 'staff' | 'user';

type AuthUser = {
  id: string;                  // User UUID
  email: string;               // User email
  firstName: string;           // First name
  lastName: string;            // Last name
  role: UserRole;              // RBAC role
};
```

## Usage

### Basic Store Access

```typescript
import { useAuthStore } from '@/stores/auth/use-auth-store';

function MyComponent() {
  // Subscribe to entire store (any change triggers re-render)
  const { user, session, isLoading } = useAuthStore();

  // Subscribe to specific state (only re-renders on that change)
  const user = useAuthStore((state) => state.user);
  
  // Subscribe to action only (never re-renders)
  const setUser = useAuthStore((state) => state.setUser);

  return <div>{user?.email}</div>;
}
```

### Accessing Actions

```typescript
function LoginButton() {
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);

  const handleLogin = async () => {
    const userData = await login();
    setUser(userData);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}
```

### Conditional Rendering

```typescript
function App() {
  const { user, isLoading, isInitialized } = useAuthStore();

  // Show loading while initializing
  if (!isInitialized || isLoading) {
    return <LoadingSpinner />;
  }

  // Show login if not authenticated
  if (!user) {
    return <LoginPage />;
  }

  // Show app if authenticated
  return <Dashboard />;
}
```

### Role-Based Access

```typescript
function AdminPanel() {
  const user = useAuthStore((state) => state.user);

  // Check role
  if (!user || !['admin', 'superadmin'].includes(user.role)) {
    return <AccessDenied />;
  }

  return <AdminContent />;
}
```

### Partial User Updates

```typescript
function UpdateProfileForm() {
  const updateUser = useAuthStore((state) => state.updateUser);

  const handleUpdate = (data: Partial<AuthUser>) => {
    updateUser(data);
  };

  return <form onSubmit={handleUpdate}>...</form>;
}
```

## Store Initialization

The store is initialized by the `AuthProvider` component:

```typescript
import { useEffect } from 'react';
import { useAuthStore } from '@/stores/auth/use-auth-store';

function AuthProvider({ children }) {
  const { setUser, setSession, setLoading, setInitialized } = useAuthStore();

  useEffect(() => {
    // Fetch session
    const session = await supabase.auth.getSession();
    setSession(session);
    
    // Fetch profile
    if (session?.user) {
      const profile = await getProfileData({ userId: session.user.id });
      setUser(profile);
    }
    
    setInitialized(true);
    setLoading(false);
  }, []);

  return <>{children}</>;
}
```

## Default State

```typescript
const DEFAULT_AUTH_STORE_STATE: AuthStoreState = {
  user: null,              // No user initially
  session: null,           // No session initially
  isLoading: true,         // Loading on mount
  isInitialized: false,    // Not initialized on mount
};
```

## Immer Integration

The store uses Immer middleware for immutable updates:

```typescript
import { immer } from 'zustand/middleware/immer';

export const useAuthStore = create(
  immer<AuthStore>((set) => ({
    // State
    user: null,
    
    // Actions (can use direct mutations with Immer)
    setUser: (user) => {
      set((state) => {
        state.user = user;  // Direct mutation (Immer handles immutability)
      });
    },
  }))
);
```

## Subscription Pattern

Components automatically re-render when subscribed state changes:

```typescript
// Subscribe to all auth state
const { user, session } = useAuthStore();

// Subscribe to only user (more efficient)
const user = useAuthStore((state) => state.user);

// Subscribe to multiple specific values
const { user, isLoading } = useAuthStore((state) => ({
  user: state.user,
  isLoading: state.isLoading,
}));
```

## Dependencies

- `zustand` - State management library
- `immer` - Immutable state updates
- `@supabase/supabase-js` - Session types

## Best Practices

1. **Use selectors** - Subscribe to specific state slices for performance
2. **Actions in hooks** - Don't call actions directly in components
3. **Type everything** - Use TypeScript types for all state
4. **Initialize early** - Set `isInitialized` in AuthProvider
5. **Clear on logout** - Always clear user and session on logout

## Example: Auth Guard Hook

```typescript
function useRequireAuth() {
  const { user, isLoading, isInitialized } = useAuthStore();

  useEffect(() => {
    if (!isLoading && isInitialized && !user) {
      navigate('/login');
    }
  }, [user, isLoading, isInitialized]);
}

function ProtectedPage() {
  useRequireAuth();
  const user = useAuthStore((state) => state.user);

  return <div>Welcome, {user?.firstName}!</div>;
}
```

## RBAC Helper

```typescript
function useRequireRole(allowedRoles: UserRole[]) {
  const user = useAuthStore((state) => state.user);

  return {
    hasAccess: user ? allowedRoles.includes(user.role) : false,
    userRole: user?.role,
  };
}

function AdminPanel() {
  const { hasAccess, userRole } = useRequireRole(['admin', 'superadmin']);

  if (!hasAccess) {
    return <AccessDenied role={userRole} />;
  }

  return <AdminContent />;
}
```

