# Auth Query Hooks

React Query hooks for authentication mutations using TanStack Query.

## Overview

This directory contains mutation hooks that wrap data access functions with React Query's `useMutation`. These hooks provide loading states, error handling, and integration with the auth store.

## Files

```
auth/
├── use-login-mutation.ts      # Login mutation hook
├── use-register-mutation.ts   # Registration mutation hook
├── use-logout-mutation.ts     # Logout mutation hook
└── use-oauth-mutation.ts      # OAuth mutation hook
```

## Naming Conventions

- **Hook naming:** `use[Operation]Mutation` (e.g., `useLoginMutation`, `useRegisterMutation`)
- **Type naming:** `Use[Operation]MutationArgs`
- **File naming:** `use-[operation]-mutation.ts` using kebab-case

## Hooks

### `useLoginMutation` - Login Hook

Handles user login with session and profile management.

```typescript
import { useLoginMutation } from '@/hooks/query/auth/use-login-mutation';

const loginMutation = useLoginMutation({
  onSuccess: (data) => {
    console.log('Login successful!', data);
  },
  onError: (error) => {
    console.error('Login failed:', error.message);
  },
});

// Usage in component
const handleLogin = () => {
  loginMutation.mutate({
    email: 'user@example.com',
    password: 'password123',
  });
};

// Access states
if (loginMutation.isPending) console.log('Logging in...');
if (loginMutation.isError) console.error(loginMutation.error);
if (loginMutation.isSuccess) console.log('Success!');
```

**Features:**
- Automatically fetches user profile after login
- Updates auth store with session and user
- Manages loading state

**Data Access:** Calls `loginData()` then `getProfileData()`

---

### `useRegisterMutation` - Registration Hook

Handles user registration.

```typescript
import { useRegisterMutation } from '@/hooks/query/auth/use-register-mutation';

const registerMutation = useRegisterMutation({
  onSuccess: (data) => {
    toast.success('Registration successful!');
  },
  onError: (error) => {
    toast.error(error.message);
  },
});

// Usage
registerMutation.mutate({
  email: 'user@example.com',
  password: 'SecurePassword123!',
  firstName: 'John',
  lastName: 'Doe',
});
```

**Features:**
- Simple registration without auto-login
- Supports custom success/error callbacks

**Data Access:** Calls `registerData()`

---

### `useLogoutMutation` - Logout Hook

Handles user logout.

```typescript
import { useLogoutMutation } from '@/hooks/query/auth/use-logout-mutation';

const logoutMutation = useLogoutMutation({
  onSuccess: () => {
    toast.success('Logged out successfully');
    navigate('/login');
  },
});

// Usage
logoutMutation.mutate();
```

**Features:**
- Clears auth store state
- No arguments required

**Data Access:** Calls `logoutData()` then updates store

---

### `useOAuthMutation` - OAuth Hook

Handles OAuth provider authentication.

```typescript
import { useOAuthMutation } from '@/hooks/query/auth/use-oauth-mutation';

const oauthMutation = useOAuthMutation({
  onError: (error) => {
    toast.error(`OAuth failed: ${error.message}`);
  },
});

// Usage
oauthMutation.mutate({ provider: 'google' });
```

**Features:**
- Supports multiple providers (google, facebook)
- Handles redirect flow
- Loading state management

**Data Access:** Calls `oauthLoginData()`

## Hook Pattern

All hooks follow this pattern:

```typescript
export type Use[Operation]MutationArgs = MutationOptions<
  ResponseType,
  Error,
  ArgsType
>;

export function use[Operation]Mutation(args: Use[Operation]MutationArgs = {}) {
  return useMutation({
    ...args,                    // Spread args first (allows overrides)
    mutationFn: operationData,  // Data access function
    onSuccess: (data, variables, context) => {
      // Hook-specific logic (e.g., update store)
      args.onSuccess?.(data, variables, context); // Call user callback
    },
    onError: (error, variables, context) => {
      // Hook-specific error handling
      args.onError?.(error, variables, context); // Call user callback
    },
  });
}
```

## Mutation States

All hooks return these states:

- `isPending` - Mutation is in progress
- `isError` - Mutation failed
- `isSuccess` - Mutation succeeded
- `error` - Error object (if failed)
- `data` - Response data (if succeeded)

```typescript
const mutation = useLoginMutation();

if (mutation.isPending) {
  return <LoadingSpinner />;
}

if (mutation.isError) {
  return <ErrorMessage error={mutation.error} />;
}

if (mutation.isSuccess) {
  return <SuccessMessage data={mutation.data} />;
}
```

## Integration with Auth Store

Some hooks automatically update the auth store:

- **useLoginMutation** - Updates `user`, `session`, and `isLoading`
- **useLogoutMutation** - Clears `user` and `session`

## Dependencies

- `@tanstack/react-query` - React Query library
- `@/data/auth/*` - Data access layer
- `@/stores/auth/use-auth-store` - Auth state management

## Best Practices

1. **Spread args first** - Allows consumers to override any option
2. **Call callbacks** - Always call user-provided callbacks
3. **Update store** - Handle side effects (store updates) in hooks
4. **Type everything** - Use TypeScript types for all arguments
5. **Handle errors** - Provide default error handling

## Example: Custom Hook Usage

```typescript
function LoginForm() {
  const loginMutation = useLoginMutation({
    onSuccess: (data) => {
      // Navigate to dashboard
      navigate('/dashboard');
    },
    onError: (error) => {
      // Show error toast
      toast.error(error.message);
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({
      email: formData.email,
      password: formData.password,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" {...register('email')} />
      <input type="password" {...register('password')} />
      <button disabled={loginMutation.isPending}>
        {loginMutation.isPending ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
```