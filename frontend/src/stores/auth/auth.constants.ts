import type { AuthStoreState } from './auth.types';

// Auth Store Constants
export const DEFAULT_AUTH_STORE_STATE: AuthStoreState = {
    user: null,
    session: null,
    isLoading: true,
    isInitialized: false,
};