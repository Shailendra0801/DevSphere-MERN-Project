import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Theme Context
const ThemeContext = createContext();

// Custom hook to use theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Theme Provider Component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  // Load theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Toggle theme function
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // Theme values
  const themeValues = {
    theme,
    toggleTheme,
    isDark: theme === 'dark'
  };

  return (
    <ThemeContext.Provider value={themeValues}>
      {children}
    </ThemeContext.Provider>
  );
};

// Theme-aware styled components
export const ThemedButton = ({ children, variant = 'primary', ...props }) => {
  const { isDark } = useTheme();
  
  const baseClasses = 'themed-button';
  const variantClass = `btn-${variant}`;
  const themeClass = isDark ? 'dark-theme' : 'light-theme';
  
  return (
    <button 
      className={`${baseClasses} ${variantClass} ${themeClass}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const ThemedInput = ({ ...props }) => {
  const { isDark } = useTheme();
  const themeClass = isDark ? 'dark-theme' : 'light-theme';
  
  return (
    <input 
      className={`themed-input ${themeClass}`}
      {...props}
    />
  );
};

export const ThemedCard = ({ children, className = '', ...props }) => {
  const { isDark } = useTheme();
  const themeClass = isDark ? 'dark-theme' : 'light-theme';
  
  return (
    <div 
      className={`themed-card ${themeClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};