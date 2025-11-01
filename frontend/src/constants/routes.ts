/**
 * Application routes configuration
 * 
 * Centralized route definitions for easy maintenance and refactoring.
 * Using const assertions to ensure type safety and prevent typos.
 */

export const ROUTES = {
  // Public routes
  login: '/login',
  register: '/register',
  authCallback: '/auth/callback',
  
  // Protected routes
  dashboard: '/dashboard',
  admin: '/admin',
  
  // Root
  home: '/',
} as const;

/**
 * Type representing all available route paths
 */
export type RoutePath = typeof ROUTES[keyof typeof ROUTES];

