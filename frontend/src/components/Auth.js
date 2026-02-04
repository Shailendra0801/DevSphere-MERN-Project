import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import Login from './Login';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import { ThemedButton } from '../contexts/ThemeContext';

const Auth = () => {
  const [authView, setAuthView] = useState('login'); // login, register, forgot
  const { isAuthenticated } = useAuth();
  const { toggleTheme, isDark } = useTheme();

  if (isAuthenticated) {
    return null; // Don't show auth forms when user is logged in
  }

  const renderAuthForm = () => {
    switch (authView) {
      case 'register':
        return <Register onSwitchToLogin={() => setAuthView('login')} />;
      case 'forgot':
        return <ForgotPassword onSwitchToLogin={() => setAuthView('login')} />;
      default:
        return (
          <Login 
            onSwitchToRegister={() => setAuthView('register')}
            onSwitchToForgot={() => setAuthView('forgot')}
          />
        );
    }
  };

  return (
    <div className="auth-overlay">
      <div className="auth-container">
        <div className="auth-header">
          <div className="theme-toggle-container">
            <ThemedButton 
              onClick={toggleTheme}
              variant="secondary"
              className="theme-toggle-btn"
            >
              {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </ThemedButton>
          </div>
        </div>
        
        <div className="auth-content">
          {renderAuthForm()}
        </div>
      </div>
    </div>
  );
};

export default Auth;