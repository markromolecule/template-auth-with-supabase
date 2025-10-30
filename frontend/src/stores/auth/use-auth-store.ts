import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { AuthStore } from './auth.types';
import { DEFAULT_AUTH_STORE_STATE } from './auth.constants';

export const useAuthStore = create(
  immer<AuthStore>((set) => ({
    ...DEFAULT_AUTH_STORE_STATE,

    /* Actions */
    setUser: (user) => {
      set((state) => {
        state.user = user;
      });
    },
    setSession: (session) => {
      set((state) => {
        state.session = session;
      });
    },
    setLoading: (loading) => {
      set((state) => {
        state.isLoading = loading;
      });
    },
    setInitialized: (initialized) => {
      set((state) => {
        state.isInitialized = initialized;
      });
    },
    logout: () => {
      set((state) => {
        state.user = null;
        state.session = null;
      });
    },
    updateUser: (updates) => {
      set((state) => {
        if (state.user) Object.assign(state.user, updates);
      });
    },
  }))
);