# Frontend Source Structure

This directory contains the frontend application code organized by layers and features.

## Directory Structure

```
src/
├── components/          # UI components
│   ├── features/       # Feature-specific components
│   │   └── auth/       # Auth feature components
│   ├── shared/         # Shared reusable components
│   └── ui/             # Base UI primitives (shadcn/ui)
├── data/               # Data access layer
│   └── auth/           # Auth data operations
├── hooks/              # React hooks
│   ├── auth/           # Auth-specific hooks
│   └── query/          # React Query hooks
│       └── auth/       # Auth query hooks
├── stores/             # Global state management
│   └── auth/           # Auth store (Zustand)
├── pages/              # Page components
├── constants/          # Application constants
├── schemas/            # Validation schemas (Zod)
└── lib/                # Utilities and libraries
```

## Layer Responsibilities

### Components (`components/`)
**Purpose:** Presentational UI components

- **Features:** Feature-specific components with business logic
- **Shared:** Reusable components across features
- **UI:** Base design system components

See: [`components/README.md`](./components/README.md)

### Data Layer (`data/`)
**Purpose:** Data access and API communication

Pure functions that interact with external services (Supabase, APIs, etc.)

See: [`data/auth/README.md`](./data/auth/README.md)

### Hooks (`hooks/`)
**Purpose:** React hooks for logic and state

- **Query hooks:** React Query mutations and queries
- **Custom hooks:** Business logic hooks

See: [`hooks/query/auth/README.md`](./hooks/query/auth/README.md)

### Stores (`stores/`)
**Purpose:** Global state management

Zustand stores for application-wide state

See: [`stores/auth/README.md`](./stores/auth/README.md)

### Pages (`pages/`)
**Purpose:** Page-level components

Top-level route components that compose features

### Constants (`constants/`)
**Purpose:** Application constants

Shared constants, configuration values

### Schemas (`schemas/`)
**Purpose:** Data validation schemas

Zod schemas for form validation and type inference

### Lib (`lib/`)
**Purpose:** Utilities and third-party integrations

Helper functions, external library configurations

## Auth Feature Architecture

The authentication feature is organized across multiple layers:

```
src/
├── components/features/auth/    # UI components
│   ├── login-form.tsx          # Public export
│   ├── register-form.tsx       # Public export
│   ├── auth-layout.tsx         # Public export
│   ├── providers/              # Auth provider
│   ├── routes/                 # Protected routes
│   ├── _components/            # Internal helpers
│   └── _ui/                    # UI states
├── data/auth/                  # Data operations
│   ├── login.ts               # Login API
│   ├── register.ts            # Register API
│   ├── logout.ts              # Logout API
│   ├── oauth.ts               # OAuth API
│   └── get-profile.ts         # Profile API
├── hooks/query/auth/           # Query hooks
│   ├── use-login-mutation.ts
│   ├── use-register-mutation.ts
│   ├── use-logout-mutation.ts
│   └── use-oauth-mutation.ts
├── stores/auth/                # State management
│   ├── auth.types.ts          # TypeScript types
│   ├── auth.constants.ts      # Default state
│   └── use-auth-store.ts      # Zustand store
├── constants/                  # Constants
│   └── auth-constants.ts      # Auth constants
└── schemas/                    # Validation
    └── auth-schemas.ts        # Auth schemas (Zod)
```

## Data Flow

```
User Action
    ↓
Component (UI)
    ↓
Hook (Logic)
    ↓
Data Layer (API)
    ↓
Store (State Update)
    ↓
Component Re-render
```

### Example: Login Flow

1. **Component:** `LoginForm` calls `useLoginMutation`
2. **Hook:** `useLoginMutation` calls `loginData()`
3. **Data Layer:** `loginData()` calls Supabase API
4. **Data Layer:** Returns session and user data
5. **Hook:** Fetches profile via `getProfileData()`
6. **Store:** Updates `user` and `session` in `useAuthStore`
7. **Component:** Re-renders with new state

## Import Guidelines

### Components
```typescript
// Feature components
import { LoginForm } from '@/components/features/auth/login-form';

// UI components
import { Button } from '@/components/ui/button';
```

### Data Layer
```typescript
// Data functions
import { loginData } from '@/data/auth/login';
```

### Hooks
```typescript
// Query hooks
import { useLoginMutation } from '@/hooks/query/auth/use-login-mutation';

// Custom hooks
import { useLoginForm } from '@/hooks/auth/use-auth-forms';
```

### Stores
```typescript
// Store access
import { useAuthStore } from '@/stores/auth/use-auth-store';
```

### Constants & Schemas
```typescript
// Constants
import { AUTH_MESSAGES } from '@/constants/auth-constants';

// Schemas
import { loginSchema } from '@/schemas/auth-schemas';
```

## Conventions

### Naming
- **Files:** `kebab-case.ts`
- **Components:** `PascalCase`
- **Functions:** `camelCase`
- **Types:** `PascalCase`
- **Private folders:** `_underscore-prefix`

### File Organization
- **One file per component/function**
- **Group related functionality**
- **Use `_` prefix for internal modules**

### TypeScript
- **Explicit types over inference**
- **Export types alongside functions**
- **Use branded types for IDs**

## Development Workflow

1. **Create data function** - Pure data operation
2. **Create hook** - Wrap data function with React Query
3. **Create component** - UI that uses hook
4. **Update store** - Global state if needed
5. **Add validation** - Zod schemas
6. **Export publicly** - Only what's needed

## Best Practices

### Separation of Concerns
- **Components:** Presentation only
- **Hooks:** Logic and side effects
- **Data Layer:** Pure data operations
- **Stores:** Global state

### Reusability
- **Extract shared logic** to hooks
- **Compose components** from primitives
- **Reuse schemas** for validation

### Performance
- **Use selectors** in stores
- **Memoize expensive computations**
- **Code-split routes**

### Testing
- **Unit test** data functions
- **Integration test** hooks
- **Component test** UI

## Documentation

Each major directory has its own README:
- [`components/README.md`](./components/README.md) - Component organization
- [`components/features/auth/README.md`](./components/features/auth/README.md) - Auth feature
- [`data/auth/README.md`](./data/auth/README.md) - Data operations
- [`hooks/query/auth/README.md`](./hooks/query/auth/README.md) - Query hooks
- [`stores/auth/README.md`](./stores/auth/README.md) - State management

## Dependencies

### Core
- React 19
- React Router 7
- TypeScript 5

### State & Data
- Zustand - State management
- React Query - Server state
- Immer - Immutable updates

### Forms & Validation
- React Hook Form - Form management
- Zod - Schema validation

### UI
- Tailwind CSS - Styling
- shadcn/ui - Components
- Lucide Icons - Icons

### Auth
- Supabase - Backend service

