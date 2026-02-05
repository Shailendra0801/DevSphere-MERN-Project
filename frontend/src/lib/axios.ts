import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import config from '../config';

// Define custom error types
export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  errors?: Record<string, string[]>;
}

// Define response structure
export interface ApiResponse<T = unknown> {
  status: 'success' | 'fail' | 'error';
  data?: T;
  message?: string;
  error?: ApiError;
}

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: config.API_BASE_URL,
  timeout: config.API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (requestConfig: InternalAxiosRequestConfig) => {
    // Add authentication token if available
    const token = localStorage.getItem(config.TOKEN_KEY);
    if (token) {
      requestConfig.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add request ID for tracking
    requestConfig.headers['X-Request-ID'] = crypto.randomUUID();
    
    // Log request in development
    if (config.ENABLE_LOGGING) {
      console.log(`[API Request] ${requestConfig.method?.toUpperCase()} ${requestConfig.url}`, {
        headers: requestConfig.headers,
        data: requestConfig.data,
      });
    }
    
    return requestConfig;
  },
  (error) => {
    if (config.ENABLE_LOGGING) {
      console.error('[API Request Error]', error);
    }
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    // Log successful response in development
    if (config.ENABLE_LOGGING) {
      console.log(`[API Response] ${response.config.method?.toUpperCase()} ${response.config.url}`, {
        status: response.status,
        data: response.data,
      });
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Log error response
    if (config.ENABLE_LOGGING) {
      console.error(`[API Error] ${originalRequest?.method?.toUpperCase()} ${originalRequest?.url}`, {
        status: error.response?.status,
        message: error.message,
        data: error.response?.data,
      });
    }
    
    // Handle 401 Unauthorized - token might be expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Attempt to refresh token
        const refreshToken = localStorage.getItem(config.REFRESH_TOKEN_KEY);
        if (refreshToken) {
          const refreshResponse = await axios.post(`${config.BACKEND_URL}/api/v1/auth/refresh-token`, {
            refreshToken,
          });
          
          if (refreshResponse.data.accessToken) {
            // Store new token
            localStorage.setItem(config.TOKEN_KEY, refreshResponse.data.accessToken);
            
            // Retry original request with new token
            originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.accessToken}`;
            return apiClient(originalRequest);
          }
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        localStorage.removeItem(config.TOKEN_KEY);
        localStorage.removeItem(config.REFRESH_TOKEN_KEY);
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      // Show permission denied message
      console.warn('Access forbidden - insufficient permissions');
    }
    
    // Handle 500 Internal Server Error
    if (error.response?.status === 500) {
      console.error('Server error occurred');
    }
    
    return Promise.reject(error);
  }
);

// Helper functions
export const setAuthToken = (token: string): void => {
  localStorage.setItem(config.TOKEN_KEY, token);
};

export const removeAuthToken = (): void => {
  localStorage.removeItem(config.TOKEN_KEY);
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem(config.TOKEN_KEY);
};

export const isAuthenticated = (): boolean => {
  const token = getAuthToken();
  if (!token) return false;
  
  // Check if token is expired (simplified check)
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

// Export the configured axios instance
export default apiClient;

// Export types for convenience
export type { AxiosInstance, AxiosRequestConfig, AxiosResponse };