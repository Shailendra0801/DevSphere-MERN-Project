import React, { createContext, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import authService from "../services/auth.service";

/**
 * Auth Context
 * Provides authentication state and methods throughout the app
 */

const AuthContext = createContext(null);

const ACCESS_TOKEN_KEY = "auth_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const USER_KEY = "user";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);

  // =============================
  // BOOTSTRAP AUTH ON APP START
  // =============================
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        console.log("AuthProvider checking auth status...");
        setError(null);

        const token = localStorage.getItem(ACCESS_TOKEN_KEY);

        if (token) {
          const response = await authService.getCurrentUser();
          const userData =
            response.data?.data?.user || response.data?.user || null;

          if (userData) {
            setUser(userData);
            setIsAuthenticated(true);
            console.log("User authenticated:", userData);
          } else {
            throw new Error("Invalid user data received");
          }
        } else {
          console.log("No token found in storage");
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setError(error.message || "Authentication check failed");

        // Clear invalid tokens
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        localStorage.removeItem(USER_KEY);

        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // =============================
  // LOGIN
  // =============================
  const login = useCallback(async (email, password, rememberMe) => {
    try {
      setError(null);
      const response = await authService.login(email, password, rememberMe);

      const { accessToken, refreshToken, data } = response.data;

      const userData = data?.user || response.data?.user || null;

      if (!userData) {
        throw new Error("Invalid response from server");
      }

      if (accessToken) {
        localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      }

      if (refreshToken && rememberMe) {
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
      }

      localStorage.setItem(USER_KEY, JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);

      return response.data;
    } catch (error) {
      console.error("Login failed:", error);
      setError(error.message || "Login failed");
      throw error;
    }
  }, []);

  // =============================
  // REGISTER
  // =============================
  const register = useCallback(async (name, email, password, confirmPassword) => {
    try {
      setError(null);
      const response = await authService.register(name, email, password, confirmPassword);

      const { accessToken, refreshToken, data } = response.data;

      const userData = data?.user || response.data?.user || null;

      if (!userData) {
        throw new Error("Invalid response from server");
      }

      if (accessToken) {
        localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      }

      if (refreshToken) {
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
      }

      localStorage.setItem(USER_KEY, JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);

      return response.data;
    } catch (error) {
      console.error("Registration failed:", error);
      setError(error.message || "Registration failed");
      throw error;
    }
  }, []);

  // =============================
  // LOGOUT
  // =============================
  const logout = useCallback(async () => {
    try {
      setError(null);
      await authService.logout();
    } catch (error) {
      console.error("Logout error:", error);
      // Still clear local storage even if API call fails
    } finally {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      localStorage.removeItem(USER_KEY);

      setUser(null);
      setIsAuthenticated(false);
      setError(null);
    }
  }, []);

  // =============================
  // REFRESH USER
  // =============================
  const refreshUser = useCallback(async () => {
    try {
      setError(null);
      const response = await authService.getCurrentUser();

      const userData = response.data?.data?.user || response.data?.user || null;

      if (userData) {
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem(USER_KEY, JSON.stringify(userData));
        return userData;
      } else {
        throw new Error("Failed to refresh user data");
      }
    } catch (error) {
      console.error("Refresh user error:", error);
      setError(error.message || "Failed to refresh user data");
      
      // Clear auth on refresh failure
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      setUser(null);
      setIsAuthenticated(false);
      
      throw error;
    }
  }, []);

  const value = {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout,
    refreshUser,
    setError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};


export { AuthProvider, AuthContext };
