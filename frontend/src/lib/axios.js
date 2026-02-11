import axios from 'axios';
import config from '../config';

// Create axios instance
const apiClient = axios.create({
  baseURL: config.API_BASE_URL,
  timeout: config.API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
  // Retry configuration
  retry: config.API_RETRY_ATTEMPTS,
  retryDelay: config.API_RETRY_DELAY,
});

// Request interceptor
apiClient.interceptors.request.use(
  (requestConfig) => {
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
        baseURL: requestConfig.baseURL,
        url: requestConfig.url,
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
  (response) => {
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
    
    // Implement retry logic for network errors
    if (!error.response && originalRequest.retryCount < (originalRequest.retry || config.API_RETRY_ATTEMPTS)) {
      originalRequest.retryCount = originalRequest.retryCount || 0;
      originalRequest.retryCount++;
      
      const delay = originalRequest.retryDelay || config.API_RETRY_DELAY;
      
      if (config.ENABLE_LOGGING) {
        console.log(`Retrying request (${originalRequest.retryCount}/${originalRequest.retry || config.API_RETRY_ATTEMPTS}) in ${delay}ms`);
      }
      
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, delay));
      
      // Retry the request
      return apiClient(originalRequest);
    }
    
    // Log error response
    if (config.ENABLE_LOGGING) {
      console.error(`[API Error] ${originalRequest?.method?.toUpperCase()} ${originalRequest?.url}`, {
        status: error.response?.status,
        message: error.message,
        data: error.response?.data,
        config: {
          baseURL: originalRequest?.baseURL,
          url: originalRequest?.url,
        }
      });
    }
    
    // Handle 401 Unauthorized - token might be expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Check if we're already trying to refresh
        if (originalRequest.url?.includes('/refresh-token')) {
          throw new Error('Refresh token failed');
        }
        
        // Attempt to refresh token
        const refreshToken = localStorage.getItem(config.REFRESH_TOKEN_KEY);
        if (refreshToken) {
          const refreshResponse = await axios.post(`${config.API_BASE_URL}/api/v1/auth/refresh-token`, {
            refreshToken,
          });
          
          if (refreshResponse.data.accessToken) {
            // Store new token
            localStorage.setItem(config.TOKEN_KEY, refreshResponse.data.accessToken);
            
            // Update Authorization header
            originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.accessToken}`;
            
            // Retry original request with new token
            return apiClient(originalRequest);
          }
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        
        // Clear all auth tokens
        localStorage.removeItem(config.TOKEN_KEY);
        localStorage.removeItem(config.REFRESH_TOKEN_KEY);
        localStorage.removeItem('user');
        
        // Redirect to login only if not already on login page
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
        
        return Promise.reject(new Error('Session expired. Please log in again.'));
      }
    }
    
    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      console.warn('Access forbidden - insufficient permissions');
    }
    
    // Handle 500 Internal Server Error
    if (error.response?.status >= 500) {
      console.error('Server error occurred');
    }
    
    // Handle network errors
    if (!error.response) {
      console.error('Network error - check your connection');
    }
    
    return Promise.reject(error);
  }
);

// Helper functions
export const setAuthToken = (token) => {
  localStorage.setItem(config.TOKEN_KEY, token);
};

export const removeAuthToken = () => {
  localStorage.removeItem(config.TOKEN_KEY);
};

export const getAuthToken = () => {
  return localStorage.getItem(config.TOKEN_KEY);
};

export const isAuthenticated = () => {
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