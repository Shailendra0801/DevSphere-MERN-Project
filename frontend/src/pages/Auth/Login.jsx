import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import './auth.css';

/**
 * Login Page Component
 * Simple login form for authenticated access
 */
const Login = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="auth-logo">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <h1 className="auth-title">
              Welcome Back
            </h1>
            <p className="auth-subtitle">
              Sign in to your DevSphere account
            </p>
          </div>
          
          {/* Form */}
          <form className="auth-form space-y-6">
            <div className="auth-input-group">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <div className="input-with-icon relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  className="auth-input w-full pl-10 pr-4 py-3"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>
            
            <div className="auth-input-group">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="input-with-icon relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  id="password"
                  className="auth-input w-full pl-10 pr-4 py-3"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
            
            <div className="form-options flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="remember-checkbox h-4 w-4"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Remember me
                </label>
              </div>
              <Link 
                to="/forgot-password" 
                className="forgot-password-link text-sm"
              >
                Forgot password?
              </Link>
            </div>
            
            <button
              type="submit"
              className="submit-button"
            >
              Sign In
              <ArrowRight className="submit-button-icon ml-2 h-5 w-5" />
            </button>
          </form>
          
          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Don&apos;t have an account?{' '}
              <Link 
                to="/register" 
                className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;