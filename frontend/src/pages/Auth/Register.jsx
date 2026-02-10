import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import './auth.css';

/**
 * Register Page Component
 * Simple registration form for new users
 */
const Register = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="auth-logo register-logo-gradient">
              <User className="h-8 w-8 text-white" />
            </div>
            <h1 className="auth-title">
              Create Account
            </h1>
            <p className="auth-subtitle">
              Join DevSphere and start building amazing projects
            </p>
          </div>
          
          {/* Form */}
          <form className="auth-form space-y-6">
            <div className="auth-input-group">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              <div className="input-with-icon relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="name"
                  className="auth-input w-full pl-10 pr-4 py-3"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>
            
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
            
            <div className="auth-input-group confirm-password-input">
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="input-with-icon relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  id="confirm-password"
                  className="auth-input w-full pl-10 pr-4 py-3"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
            
            <div className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                className="remember-checkbox h-4 w-4"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                I agree to the{' '}
                <Link to="/terms" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">
                  Privacy Policy
                </Link>
              </label>
            </div>
            
            <button
              type="submit"
              className="submit-button"
            >
              Create Account
              <ArrowRight className="submit-button-icon ml-2 h-5 w-5" />
            </button>
          </form>
          
          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;