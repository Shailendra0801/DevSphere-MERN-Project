import axios from '../lib/axios';

/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

class AuthService {
  // Login user
  async login(email, password, rememberMe = false) {
    try {
      console.log('AuthService login called with:', { email, password: '***', rememberMe });
      const response = await axios.post('/api/v1/auth/login', {
        email,
        password,
        rememberMe
      });
      
      console.log('AuthService login response:', response);
      
      // Store tokens
      if (response.data.accessToken) {
        localStorage.setItem('auth_token', response.data.accessToken);
      }
      if (response.data.refreshToken && rememberMe) {
        localStorage.setItem('refresh_token', response.data.refreshToken);
      }
      
      return response;
    } catch (error) {
      console.error('AuthService login error:', error);
      console.error('Error response:', error.response);
      throw error.response?.data || { message: error.message };
    }
  }

  // Register user
  async register(name, email, password, confirmPassword) {
    try {
      const response = await axios.post('/api/v1/auth/register', {
        name,
        email,
        password,
        confirmPassword
      });
      
      // Store tokens
      if (response.data.accessToken) {
        localStorage.setItem('auth_token', response.data.accessToken);
      }
      if (response.data.refreshToken) {
        localStorage.setItem('refresh_token', response.data.refreshToken);
      }
      
      return response;
    } catch (error) {
      throw error.response?.data || { message: error.message };
    }
  }

  // Logout user
  async logout() {
    try {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      return { data: { message: 'Logged out successfully' } };
    } catch (error) {
      throw error.response?.data || { message: error.message };
    }
  }

  // Get current user
  async getCurrentUser() {
    try {
      const token = localStorage.getItem('auth_token');
      console.log('getCurrentUser - Token:', token ? 'Present' : 'Missing');
      if (!token) {
        throw new Error('No authentication token found');
      }
      
      const response = await axios.get('/api/v1/auth/me');
      return response;
    } catch (error) {
      console.error('getCurrentUser error:', error);
      throw error.response?.data || { message: error.message };
    }
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem('auth_token');
  }

  // Get auth token
  getToken() {
    return localStorage.getItem('auth_token');
  }

  // Refresh token
  async refreshToken() {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) {
        throw new Error('No refresh token found');
      }
      
      const response = await axios.post('/api/v1/auth/refresh-token', {
        refreshToken
      });
      
      if (response.data.accessToken) {
        localStorage.setItem('auth_token', response.data.accessToken);
      }
      
      return response;
    } catch (error) {
      // Clear tokens on refresh failure
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      throw error.response?.data || { message: error.message };
    }
  }
}

export default new AuthService();