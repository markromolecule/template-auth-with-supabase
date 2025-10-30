import type { Session } from '@supabase/supabase-js';

// Auth Store Types
export type UserRole = 'superadmin' | 'admin' | 'staff' | 'user';

// Auth User Types
export type AuthUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
};

// Auth Store Types
export type AuthStoreState = {
  user: AuthUser | null;
  session: Session | null;
  isLoading: boolean;
  isInitialized: boolean;
};

// Auth Store Actions
export type AuthStoreActions = {
  setUser: (user: AuthUser | null) => void;
  setSession: (session: Session | null) => void;
  setLoading: (loading: boolean) => void;
  setInitialized: (initialized: boolean) => void;
  logout: () => void;
  updateUser: (updates: Partial<AuthUser>) => void;
};

// Auth Store is equal to AuthStoreState and AuthStoreActions
export type AuthStore = AuthStoreState & AuthStoreActions;
