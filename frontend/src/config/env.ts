/**
 * Environment variable validation and configuration
 * 
 * This module ensures all required environment variables are present
 * before the application starts, preventing runtime errors.
 */

const requiredEnvVars = ['VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY'] as const;

/**
 * Validates that all required environment variables are present
 * @throws Error if any required environment variables are missing
 */
export function validateEnv(): void {
  const missing = requiredEnvVars.filter((varName) => !import.meta.env[varName]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
        'Please check your .env file and ensure all required variables are set.\n' +
        'Refer to SETUP.md for configuration instructions.'
    );
  }
}

// Validate on module load
validateEnv();

/**
 * Validated and typed environment configuration
 */
export const env = {
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL as string,
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY as string,
  },
  app: {
    isDev: import.meta.env.DEV,
    isProd: import.meta.env.PROD,
    mode: import.meta.env.MODE,
  },
} as const;

