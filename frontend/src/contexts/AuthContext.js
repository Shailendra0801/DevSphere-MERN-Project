import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create Auth Context
const AuthContext = createContext();

// Custom hook to use auth
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Set up axios defaults
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      if (token) {
        try {
          const response = await axios.get('http://localhost:5000/api/v1/auth/me');
          setUser(response.data.data.user);
        } catch (error) {
          // Token is invalid, remove it
          localStorage.removeItem('token');
          setToken(null);
        }
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, [token]);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/v1/auth/login', {
        email,
        password
      });

      const { token, data } = response.data;
      
      // Store token
      localStorage.setItem('token', token);
      setToken(token);
      setUser(data.user);
      
      return { success: true, user: data.user };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      return { success: false, message };
    }
  };

  // Register function
  const register = async (name, email, password, confirmPassword) => {
    try {
      const response = await axios.post('http://localhost:5000/api/v1/auth/register', {
        name,
        email,
        password,
        confirmPassword
      });

      const { token, data } = response.data;
      
      // Store token
      localStorage.setItem('token', token);
      setToken(token);
      setUser(data.user);
      
      return { success: true, user: data.user };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      return { success: false, message };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await axios.post('http://localhost:5000/api/v1/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear everything regardless of API response
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
    }
  };

  // Update password function
  const updatePassword = async (currentPassword, newPassword, confirmNewPassword) => {
    try {
      const response = await axios.patch('http://localhost:5000/api/v1/auth/update-password', {
        currentPassword,
        newPassword,
        confirmNewPassword
      });

      const { token, data } = response.data;
      
      // Update token (might change after password update)
      localStorage.setItem('token', token);
      setToken(token);
      setUser(data.user);
      
      return { success: true, message: 'Password updated successfully' };
    } catch (error) {
      const message = error.response?.data?.message || 'Password update failed';
      return { success: false, message };
    }
  };

  // Forgot password function
  const forgotPassword = async (email) => {
    try {
      await axios.post('http://localhost:5000/api/v1/auth/forgot-password', { email });
      return { success: true, message: 'Password reset email sent' };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to send reset email';
      return { success: false, message };
    }
  };

  // Reset password function
  const resetPassword = async (token, password, confirmPassword) => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/v1/auth/reset-password/${token}`, {
        password,
        confirmPassword
      });

      const { token: newToken, data } = response.data;
      
      // Store new token
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(data.user);
      
      return { success: true, message: 'Password reset successfully' };
    } catch (error) {
      const message = error.response?.data?.message || 'Password reset failed';
      return { success: false, message };
    }
  };

  // Auth values
  const authValues = {
    user,
    loading,
    token,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updatePassword,
    forgotPassword,
    resetPassword
  };

  return (
    <AuthContext.Provider value={authValues}>
      {children}
    </AuthContext.Provider>
  );
};