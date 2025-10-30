# Components Organization

This directory contains all UI components organized by their purpose and usage.

## Directory Structure

```
components/
├── features/              # Feature-specific components
│   └── auth/             # Authentication feature
│       ├── _components/  # Internal helper components
│       ├── _ui/          # UI state components
│       ├── providers/    # Context providers
│       ├── routes/       # Route protection
│       ├── login-form.tsx
│       ├── register-form.tsx
│       └── auth-layout.tsx
├── shared/               # Shared reusable components
│   └── (empty for now)
└── ui/                   # Base UI components (shadcn/ui)
    ├── badge.tsx
    ├── button.tsx
    ├── card.tsx
    ├── divider.tsx
    └── ...
```

## Component Categories

### Features (`features/`)
**Purpose:** Feature-specific components that contain business logic related to a specific domain.

**Structure:**
```
features/[feature-name]/
├── _components/   # Internal components (private)
├── _ui/           # UI state components (private)
├── providers/     # Context providers
├── routes/        # Route protection
└── [feature].tsx  # Main public exports
```

**Characteristics:**
- Tied to specific business logic
- May use hooks, stores, and data access
- Organized with private `_` folders for internal components
- Public exports are the main feature components

**Example - Auth Feature:**
- `login-form.tsx` - Public export (use this)
- `register-form.tsx` - Public export (use this)
- `_components/oauth-buttons.tsx` - Internal (private)
- `_ui/loading-state.tsx` - Internal (private)
- `routes/protected-route.tsx` - Public export
- `providers/auth-provider.tsx` - Public export

### Shared (`shared/`)
**Purpose:** Reusable components that work across multiple features but aren't base UI primitives.

**Examples:**
- Data tables
- Complex form builders
- Dashboard widgets
- Layout components

**Characteristics:**
- No business logic
- Generic and configurable
- Usable by multiple features
- May consume UI components

### UI (`ui/`)
**Purpose:** Base design system components (shadcn/ui primitives).

**Examples:**
- Button, Input, Card, etc.
- Basic form controls
- Layout primitives

**Characteristics:**
- No business logic
- Pure presentational components
- Part of design system
- Reusable everywhere

## Naming Conventions

- **Files:** `kebab-case.tsx`
- **Components:** `PascalCase`
- **Private folders:** `_components`, `_ui`, `_data`, `_hooks` (leading underscore)
- **Public folders:** `providers`, `routes` (no underscore)

## Private vs Public Folders

### Private Folders (Leading Underscore `_`)
Folders starting with `_` are considered internal implementation details:
- `_components/` - Helper components only used within the feature
- `_ui/` - UI state components
- `_data/` - Feature-specific data access (when needed)
- `_hooks/` - Feature-specific hooks (when needed)

**Rule:** Only import from `_` folders within the same feature!

### Public Folders (No Underscore)
Folders without underscore are public API:
- `providers/` - Context providers
- `routes/` - Route protection components

## Adding New Components

1. **Feature-specific?** → Add to `features/[feature-name]/`
   - Internal helper? → `features/[feature-name]/_components/`
   - UI state? → `features/[feature-name]/_ui/`
   - Main component? → Root of feature folder

2. **Shared across features?** → Add to `shared/`

3. **Base UI component?** → Add to `ui/`

## Import Examples

```typescript
// Public feature exports
import { LoginForm } from '@/components/features/auth/login-form';
import { ProtectedRoute } from '@/components/features/auth/routes/protected-route';

// Shared components
import { DataTable } from '@/components/shared/data-table';

// UI components
import { Button } from '@/components/ui/button';

// DON'T import from private folders
// import { OAuthButtons } from '@/components/features/auth/_components/oauth-buttons';
```

## Best Practices

1. **Keep public API minimal** - Only expose what's needed
2. **Use `_` prefix** - Mark internal implementation details
3. **Group by concern** - Separate UI, logic, and routes
4. **Document public API** - Add README in feature folders
5. **Avoid deep nesting** - Max 3 levels deep

