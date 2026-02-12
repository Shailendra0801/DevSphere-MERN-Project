import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import './auth.css';

/**
 * Login Page Component
 * Works with existing .input class while adding floating label functionality
 */
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Attempting login...');
      console.log('Email:', email);
      console.log('Password length:', password.length);
      const data = await login(email, password, rememberMe);
      console.log('Login successful via context:', data);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      console.error('Login error:', err);
      console.error('Error response:', err.response);
      console.error('Error message:', err.message);
      setError(err.response?.data?.message || err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          {/* Header */}
          <div>
            <div className="auth-logo">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">Sign in to your DevSphere account</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="auth-form">
            {/* Email Input with Floating Label */}
            <div className="auth-input-group">
              <div className="auth-input-wrapper">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=" "
                  className="auth-input"
                  required
                />
                <label htmlFor="email" className="floating-label">
                  Email
                </label>
                <Mail className="input-icon h-5 w-5" />
              </div>
            </div>

            {/* Password Input with Floating Label */}
            <div className="auth-input-group">
              <div className="auth-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder=" "
                  className="auth-input"
                  required
                />
                <label htmlFor="password" className="floating-label">
                  Password
                </label>
                <Lock className="input-icon h-5 w-5" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle-btn"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="form-options">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="remember-checkbox"
                />
                <label htmlFor="remember-me" className="checkbox-label">
                  Remember me
                </label>
              </div>
              <Link to="/forgot-password" className="forgot-password-link">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="submit-button"
              disabled={loading}
            >
              <span className="submit-button-content">
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Footer */}
          <div className="auth-footer">
            <p>
              Don&apos;t have an account?{' '}
              <Link to="/register" className="auth-footer-link">
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