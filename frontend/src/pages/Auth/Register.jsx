import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import './auth.css';

/**
 * Register Page Component
 * Works with existing .input class while adding floating label functionality
 */
const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { register: authRegister } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    if (!agreeToTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy');
      setLoading(false);
      return;
    }

    try {
      const response = await authRegister(name, email, password, confirmPassword);
      console.log('Registration successful:', response);
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'Registration failed. Please try again.');
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
            <div className="auth-logo register-logo-gradient">
              <User className="h-8 w-8 text-white" />
            </div>
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-subtitle">
              Join DevSphere and start building amazing projects
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="auth-form">
            {/* Full Name Input with Floating Label */}
            <div className="auth-input-group">
              <div className="auth-input-wrapper">
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder=" "
                  className="auth-input"
                  required
                />
                <label htmlFor="name" className="floating-label">
                  Full Name
                </label>
                <User className="input-icon h-5 w-5" />
              </div>
            </div>

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
                  Email Address
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

            {/* Confirm Password Input with Floating Label */}
            <div className="auth-input-group">
              <div className="auth-input-wrapper">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder=" "
                  className="auth-input"
                  required
                />
                <label htmlFor="confirm-password" className="floating-label">
                  Confirm Password
                </label>
                <Lock className="input-icon h-5 w-5" />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="password-toggle-btn"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="terms-wrapper">
              <input
                id="terms"
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="terms-checkbox"
                required
              />
              <label htmlFor="terms" className="terms-label">
                I agree to the{' '}
                <Link to="/terms" className="terms-link">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="terms-link">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="submit-button"
              disabled={loading || !agreeToTerms}
            >
              <span className="submit-button-content">
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Footer */}
          <div className="auth-footer">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="auth-footer-link">
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