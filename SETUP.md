# Setup Guide

## Prerequisites

- Node.js 20.x or higher
- pnpm (if not installed: `npm install -g pnpm`)
- Supabase account and project

## Installation

1. Navigate to the frontend directory:
```
cd frontend
```

2. Install dependencies:
```
pnpm install
```

3. Create environment file:
```
touch .env
```

4. Configure your environment variables in `.env`:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Getting Supabase Credentials

1. Go to https://supabase.com and sign in
2. Create a new project or select existing project
3. Navigate to Project Settings > API
4. Copy the following values:
   - Project URL → `VITE_SUPABASE_URL`
   - Project API keys > anon public → `VITE_SUPABASE_ANON_KEY`

## Database Setup

1. Go to Supabase Dashboard > SQL Editor
2. Run the following SQL to create the profiles table:

```sql
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    email TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    avatar_url TEXT DEFAULT '',
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('superadmin', 'admin', 'staff', 'user')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS profiles_email_idx ON public.profiles(email);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
```

3. Create trigger function:

```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name, avatar_url, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.email, ''),
    COALESCE(
      NULLIF(NEW.raw_user_meta_data->>'first_name', ''), 
      NULLIF(NEW.raw_user_meta_data->>'given_name', ''), 
      SPLIT_PART(COALESCE(NEW.raw_user_meta_data->>'full_name', ''), ' ', 1),
      'User'
    ),
    COALESCE(
      NULLIF(NEW.raw_user_meta_data->>'last_name', ''), 
      NULLIF(NEW.raw_user_meta_data->>'family_name', ''),
      SPLIT_PART(COALESCE(NEW.raw_user_meta_data->>'full_name', ''), ' ', 2),
      ''
    ),
    COALESCE(
      NULLIF(NEW.raw_user_meta_data->>'avatar_url', ''),
      NULLIF(NEW.raw_user_meta_data->>'picture', ''),
      ''
    ),
    'user'
  );
  RETURN NEW;
EXCEPTION
  WHEN others THEN
    RAISE WARNING 'Error creating profile: %', SQLERRM;
    RAISE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

4. Create trigger:

```sql
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
```

5. Set up RLS policies:

```sql
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);
```

## Authentication Settings

1. Go to Supabase Dashboard > Authentication > Settings
2. Disable "Enable email confirmations" for development
3. Set Site URL to: `http://localhost:5173`
4. Add Redirect URL: `http://localhost:5173/auth/callback`

## Running the Application

Start the development server:
```
pnpm dev
```

The application will be available at http://localhost:5173

## Available Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

## Usage

### User Registration

1. Navigate to http://localhost:5173
2. Click "Sign up"
3. Fill in email, password, first name, and last name
4. Click "Create account"
5. You will be redirected to the dashboard

### User Login

1. Navigate to http://localhost:5173/login
2. Enter email and password
3. Click "Sign in"
4. You will be redirected to the dashboard

### OAuth Login

1. Click "Continue with Google" or "Continue with Facebook"
2. Complete OAuth flow with provider
3. You will be redirected to the dashboard

### Protected Routes

Protected routes are wrapped with `ProtectedRoute` component. Users must be authenticated to access these routes.

### User Roles

Available roles:
- superadmin
- admin
- staff
- user (default)

Roles are managed in the profiles table.

## Project Structure

```
frontend/
├── src/
│   ├── components/          # React components
│   │   ├── features/        # Feature-specific components
│   │   │   └── auth/        # Authentication components
│   │   └── ui/              # Reusable UI components
│   ├── data/                # Data access layer
│   │   └── auth/            # Auth API calls
│   ├── hooks/               # Custom React hooks
│   │   ├── auth/            # Auth-related hooks
│   │   └── query/           # React Query hooks
│   ├── lib/                 # Utility libraries
│   │   └── supabase/        # Supabase client
│   ├── pages/               # Page components
│   ├── schemas/             # Zod validation schemas
│   ├── stores/              # Zustand stores
│   └── constants/           # App constants
```

## Troubleshooting

### Database Error Saving New User

If you encounter this error during OAuth registration:
1. Verify the trigger function exists
2. Check Supabase logs for specific errors
3. Ensure RLS policies are configured correctly

### Email Not Confirmed

If email confirmation is required but fails:
1. Check Supabase Authentication settings
2. Verify redirect URLs match your configuration
3. Disable email confirmation for development

### Build Errors

If you encounter build errors:
1. Clear node_modules: `rm -rf node_modules`
2. Clear pnpm cache: `pnpm store prune`
3. Reinstall: `pnpm install`

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| VITE_SUPABASE_URL | Your Supabase project URL | Yes |
| VITE_SUPABASE_ANON_KEY | Your Supabase anon public key | Yes |

