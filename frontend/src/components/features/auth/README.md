# Auth Feature

Authentication and authorization feature with RBAC (Role-Based Access Control) support.

## Directory Structure

```
auth/
├── _components/              # Internal helper components
│   ├── oauth-buttons.tsx    # OAuth provider buttons
│   └── password-input.tsx   # Password input with toggle
├── _ui/                     # UI state components
│   ├── loading-state.tsx    # Loading state display
│   ├── unauthenticated-state.tsx  # Unauthenticated state
│   └── unauthorized-state.tsx     # Unauthorized state
├── providers/               # Context providers
│   └── auth-provider.tsx    # Auth state management
├── routes/                  # Route protection components
│   └── protected-route.tsx  # RBAC route protection
├── auth-layout.tsx          # Main auth layout (public export)
├── login-form.tsx           # Login form (public export)
└── register-form.tsx        # Registration form (public export)
```

## Public API

Only these files should be imported from outside the auth feature:

### Components
- `login-form.tsx` - Login form component
- `register-form.tsx` - Registration form component  
- `auth-layout.tsx` - Combined auth layout with tabs
- `routes/protected-route.tsx` - Protected route wrapper

### Providers
- `providers/auth-provider.tsx` - Auth context provider

## Internal Structure

### `_components/` (Internal Components)
Helper components used only by the auth feature:
- `oauth-buttons.tsx` - OAuth provider buttons (Google, Facebook)
- `password-input.tsx` - Password input with show/hide toggle

### `_ui/` (UI States)
Presentation components for different auth states:
- `loading-state.tsx` - Loading spinner and message
- `unauthenticated-state.tsx` - Sign-in required message
- `unauthorized-state.tsx` - Insufficient permissions message

### `providers/` (Context Providers)
React context providers:
- `auth-provider.tsx` - Manages auth state, session, and user profile

### `routes/` (Route Protection)
Route protection and authorization:
- `protected-route.tsx` - Wraps routes with auth checks and RBAC
  - `ProtectedRoute` - Base protected route component
  - `withAuth` - HOC wrapper
  - `SuperAdminRoute`, `AdminRoute`, `StaffRoute`, `UserRoute` - Role-specific routes

## Usage Examples

### Using Login/Register Forms
```typescript
import { LoginForm } from '@/components/features/auth/login-form';
import { RegisterForm } from '@/components/features/auth/register-form';
```

### Using Auth Layout (Tabs)
```typescript
import { AuthLayout } from '@/components/features/auth/auth-layout';
```

### Using Protected Routes
```typescript
import { ProtectedRoute, AdminRoute } from '@/components/features/auth/routes/protected-route';

// With role requirement
<AdminRoute>
  <AdminPanel />
</AdminRoute>

// With custom roles
<ProtectedRoute requiredRoles={['admin', 'superadmin']}>
  <YourComponent />
</ProtectedRoute>
```

### Using Auth Provider
```typescript
import { AuthProvider } from '@/components/features/auth/providers/auth-provider';

// Wrap your app
<AuthProvider>
  <App />
</AuthProvider>
```

## RBAC Support

The auth feature supports 4 role levels:
- `superadmin` - Full system access
- `admin` - Administrative access
- `staff` - Staff access
- `user` - Basic user access

Role hierarchy follows a cascading permission model where higher roles include lower role permissions.

## Dependencies

- `@/hooks/auth/use-auth-forms` - Form validation and submission hooks
- `@/stores/auth/use-auth-store` - Auth state management (Zustand)
- `@/data/auth/*` - Data access layer for auth operations
- `@/schemas/auth-schemas` - Zod validation schemas
- `@/constants/auth-constants` - Auth constants and messages

