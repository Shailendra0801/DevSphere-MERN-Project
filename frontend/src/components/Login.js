import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { ThemedCard, ThemedInput, ThemedButton } from '../contexts/ThemeContext';

const Login = ({ onSwitchToRegister, onSwitchToForgot }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const { isDark } = useTheme();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    const result = await login(formData.email, formData.password);
    
    if (!result.success) {
      setErrors({ form: result.message });
    }
    
    setIsLoading(false);
  };

  return (
    <ThemedCard className="auth-form-container">
      <div className="auth-form-header">
        <h2>Login to DevSphere</h2>
        <p>Welcome back! Please enter your details</p>
      </div>
      
      <form onSubmit={handleSubmit} className="auth-form">
        {errors.form && (
          <div className={`alert alert-error ${isDark ? 'dark' : 'light'}`}>
            {errors.form}
          </div>
        )}
        
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <ThemedInput
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <ThemedInput
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className={errors.password ? 'error' : ''}
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>
        
        <div className="form-options">
          <div className="remember-me">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>
          <button 
            type="button" 
            onClick={onSwitchToForgot}
            className="forgot-password-link"
          >
            Forgot Password?
          </button>
        </div>
        
        <ThemedButton 
          type="submit" 
          variant="primary" 
          disabled={isLoading}
          className="auth-submit-btn"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </ThemedButton>
      </form>
      
      <div className="auth-footer">
        <p>
          Don't have an account?{' '}
          <button 
            type="button" 
            onClick={onSwitchToRegister}
            className="switch-auth-link"
          >
            Sign up
          </button>
        </p>
      </div>
    </ThemedCard>
  );
};

export default Login;