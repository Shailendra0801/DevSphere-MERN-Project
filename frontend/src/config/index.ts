// Environment configuration
const config = {
  // API Configuration
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1',
  API_TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000'),
  
  // Authentication
  TOKEN_KEY: import.meta.env.VITE_TOKEN_KEY || 'auth_token',
  REFRESH_TOKEN_KEY: import.meta.env.VITE_REFRESH_TOKEN_KEY || 'refresh_token',
  
  // Application
  APP_NAME: import.meta.env.VITE_APP_NAME || 'DevSphere',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  
  // Feature Flags
  ENABLE_DARK_MODE: import.meta.env.VITE_ENABLE_DARK_MODE === 'true',
  ENABLE_LOGGING: import.meta.env.VITE_ENABLE_LOGGING === 'true',
  
  // URLs
  FRONTEND_URL: import.meta.env.VITE_FRONTEND_URL || 'http://localhost:5173',
  BACKEND_URL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000',
  
  // Pagination
  DEFAULT_PAGE_SIZE: parseInt(import.meta.env.VITE_DEFAULT_PAGE_SIZE || '10'),
  
  // Retry Configuration
  API_RETRY_ATTEMPTS: parseInt(import.meta.env.VITE_API_RETRY_ATTEMPTS || '3'),
  API_RETRY_DELAY: parseInt(import.meta.env.VITE_API_RETRY_DELAY || '1000'),
} as const;

export type Config = typeof config;
export default config;