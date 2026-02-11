import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import authService from "../services/auth.service";

/**
 * Auth Context
 * Provides authentication state and methods throughout the app
 */

const AuthContext = createContext(null);

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_KEY = "user";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // =============================
  // BOOTSTRAP AUTH ON APP START
  // =============================
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        console.log("AuthProvider checking auth status...");

        const token = localStorage.getItem(ACCESS_TOKEN_KEY);

        if (token) {
          const response = await authService.getCurrentUser();
          const userData =
            response.data?.data?.user || response.data?.user || null;

          setUser(userData);
          setIsAuthenticated(true);
          console.log("User authenticated:", userData);
        } else {
          console.log("No token found in storage");
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Auth check failed:", error);

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
  const login = async (email, password, rememberMe) => {
    const response = await authService.login(email, password, rememberMe);

    const { accessToken, refreshToken, data } = response.data;

    const userData = data?.user || response.data?.user || null;

    if (accessToken) {
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    }

    if (refreshToken) {
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    }

    if (userData) {
      localStorage.setItem(USER_KEY, JSON.stringify(userData));
      setUser(userData);
    }

    setIsAuthenticated(true);

    return response.data;
  };

  // =============================
  // REGISTER
  // =============================
  const register = async (name, email, password) => {
    const response = await authService.register(name, email, password);

    const { accessToken, refreshToken, data } = response.data;

    const userData = data?.user || response.data?.user || null;

    if (accessToken) {
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    }

    if (refreshToken) {
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    }

    if (userData) {
      localStorage.setItem(USER_KEY, JSON.stringify(userData));
      setUser(userData);
    }

    setIsAuthenticated(true);

    return response.data;
  };

  // =============================
  // LOGOUT
  // =============================
  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      localStorage.removeItem(USER_KEY);

      setUser(null);
      setIsAuthenticated(false);
    }
  };

  // =============================
  // REFRESH USER
  // =============================
  const refreshUser = async () => {
    try {
      const response = await authService.getCurrentUser();

      const userData = response.data?.data?.user || response.data?.user || null;

      setUser(userData);
      setIsAuthenticated(true);

      return userData;
    } catch (error) {
      console.error("Refresh user error:", error);
      throw error;
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    refreshUser,
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
