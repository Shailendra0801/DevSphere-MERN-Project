import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { ThemedCard, ThemedInput, ThemedButton } from '../contexts/ThemeContext';

const ForgotPassword = ({ onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  
  const { forgotPassword } = useAuth();
  const { isDark } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsLoading(true);
    setError('');
    setMessage('');
    
    const result = await forgotPassword(email);
    
    if (result.success) {
      setMessage(result.message);
      setIsSent(true);
    } else {
      setError(result.message);
    }
    
    setIsLoading(false);
  };

  return (
    <ThemedCard className="auth-form-container">
      <div className="auth-form-header">
        <h2>Reset Your Password</h2>
        <p>Enter your email address and we'll send you a link to reset your password</p>
      </div>
      
      <form onSubmit={handleSubmit} className="auth-form">
        {error && (
          <div className={`alert alert-error ${isDark ? 'dark' : 'light'}`}>
            {error}
          </div>
        )}
        
        {message && (
          <div className={`alert alert-success ${isDark ? 'dark' : 'light'}`}>
            {message}
          </div>
        )}
        
        {!isSent ? (
          <>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <ThemedInput
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={isLoading}
              />
            </div>
            
            <ThemedButton 
              type="submit" 
              variant="primary" 
              disabled={isLoading}
              className="auth-submit-btn"
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </ThemedButton>
          </>
        ) : (
          <div className="reset-success-message">
            <p>Check your email for the password reset link.</p>
            <p className="small">Didn't receive the email? Check your spam folder.</p>
          </div>
        )}
      </form>
      
      <div className="auth-footer">
        <button 
          type="button" 
          onClick={onSwitchToLogin}
          className="switch-auth-link"
          disabled={isLoading}
        >
          Back to Login
        </button>
      </div>
    </ThemedCard>
  );
};

export default ForgotPassword;