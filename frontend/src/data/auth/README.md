# Auth Data Layer

Data access layer for authentication operations using Supabase.

## Overview

This directory contains data access functions that interact with Supabase's authentication and database services. These functions are pure, framework-agnostic data operations that return promises.

## Files

```
auth/
├── login.ts           # User login with email/password
├── register.ts        # User registration
├── logout.ts          # User logout
├── oauth.ts           # OAuth provider authentication
└── get-profile.ts     # Fetch user profile from database
```

## Naming Conventions

- **Function naming:** `[operation][Entity]Data` (e.g., `loginData`, `registerData`)
- **Type naming:** `[Operation][Entity]DataArgs` for arguments, `[Operation][Entity]DataResponse` for return type
- **File naming:** `[operation].ts` using kebab-case

## Operations

### `login.ts` - User Login

Authenticates user with email and password.

```typescript
import { loginData } from '@/data/auth/login';

// Arguments
type LoginDataArgs = {
  email: string;
  password: string;
};

// Returns
type LoginDataResponse = {
  user: User | null;
  session: Session | null;
};

// Usage
const result = await loginData({ email: 'user@example.com', password: 'password123' });
```

**Supabase API:** `supabase.auth.signInWithPassword()`

---

### `register.ts` - User Registration

Creates a new user account.

```typescript
import { registerData } from '@/data/auth/register';

// Arguments
type RegisterDataArgs = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

// Returns
type RegisterDataResponse = {
  user: User | null;
  session: Session | null;
};

// Usage
const result = await registerData({
  email: 'user@example.com',
  password: 'SecurePassword123!',
  firstName: 'John',
  lastName: 'Doe'
});
```

**Supabase API:** `supabase.auth.signUp()` with user metadata

---

### `logout.ts` - User Logout

Signs out the current user.

```typescript
import { logoutData } from '@/data/auth/logout';

// Returns: void

// Usage
await logoutData();
```

**Supabase API:** `supabase.auth.signOut()`

---

### `oauth.ts` - OAuth Authentication

Initiates OAuth authentication flow.

```typescript
import { oauthLoginData } from '@/data/auth/oauth';

// Arguments
type OAuthProviderArgs = {
  provider: 'google' | 'facebook';
  redirectTo?: string;
};

// Returns
type OAuthProviderResponse = {
  provider: string;
  url: string | null;
};

// Usage
const result = await oauthLoginData({ provider: 'google' });
// Browser redirects to OAuth provider
```

**Supabase API:** `supabase.auth.signInWithOAuth()`

**Supported Providers:**
- `google`
- `facebook`

---

### `get-profile.ts` - User Profile

Fetches user profile from the database.

```typescript
import { getProfileData } from '@/data/auth/get-profile';

// Arguments
type GetProfileDataArgs = {
  userId: string;
};

// Returns: AuthUser

// Usage
const profile = await getProfileData({ userId: 'user-id-123' });
```

**Database Table:** `profiles`

**Returns:**
```typescript
type AuthUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'superadmin' | 'admin' | 'staff' | 'user';
};
```

## Error Handling

All functions throw errors when:
- Supabase API returns an error
- Database query fails
- Invalid arguments provided

```typescript
try {
  const result = await loginData({ email, password });
} catch (error) {
  console.error('Login failed:', error.message);
}
```

## Data Flow

```
Component → Hook → Data Layer → Supabase → Response
```

1. **Component** calls a hook (e.g., `useLoginMutation`)
2. **Hook** calls data function (e.g., `loginData`)
3. **Data Layer** communicates with Supabase
4. **Response** flows back through the chain

## Dependencies

- `@/lib/supabase/supabase` - Supabase client
- `@supabase/supabase-js` - Supabase types
- `@/stores/auth/auth.types` - Auth types

## Best Practices

1. **Keep functions pure** - No side effects, just data operations
2. **Type everything** - Use TypeScript types for arguments and responses
3. **Handle errors** - Throw descriptive errors
4. **Document APIs** - Comment on what Supabase API is used
5. **Map data** - Transform database columns to app types (snake_case → camelCase)

## Example: Adding OAuth Provider

```typescript
// oauth.ts
export type OAuthProvider = 'google' | 'facebook' | 'github'; // Add new provider

export async function oauthLoginData(args: OAuthProviderArgs) {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: args.provider,
    options: {
      redirectTo: args.redirectTo || `${window.location.origin}/auth/callback`,
    },
  });
  
  if (error) {
    throw new Error(error.message);
  }
  
  return data;
}
```

