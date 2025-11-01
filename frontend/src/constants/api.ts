/**
 * API endpoints and callback URL configuration
 * 
 * Centralized API configuration for consistency across the application.
 */

export const API_ENDPOINTS = {
  auth: {
    callback: '/auth/callback',
  },
} as const;

/**
 * Get the full callback URL for OAuth and email redirects
 * @returns Full callback URL with protocol and domain
 */
export function getCallbackUrl(): string {
  return `${window.location.origin}${API_ENDPOINTS.auth.callback}`;
}

