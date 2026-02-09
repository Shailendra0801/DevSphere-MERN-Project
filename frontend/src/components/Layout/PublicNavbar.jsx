import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Code } from 'lucide-react';

/**
 * Public Navbar Component
 * Used for unauthenticated landing page routes
 * Features sticky positioning, responsive design, and smooth transitions
 */
const PublicNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Navigation items for the public navbar
  const navItems = [
    { name: 'Features', path: '#features' },
    { name: 'How It Works', path: '#workflow' },
    { name: 'Pricing', path: '#pricing' },
  ];

  // Check if we're on landing page to enable smooth scrolling
  const isLandingPage = location.pathname === '/';

  const handleNavClick = (path) => {
    if (isLandingPage && path.startsWith('#')) {
      // Smooth scroll for anchor links on landing page
      const element = document.querySelector(path);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link 
              to="/" 
              className="flex items-center space-x-2 group"
              aria-label="DevSphere Home"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-lg">
                  <Code className="h-6 w-6" />
                </div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                DevSphere
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                aria-label={`Go to ${item.name}`}
              >
                {item.name}
              </button>
            ))}
            
            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                aria-label="Login to your account"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                aria-label="Create free account"
              >
                Register
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors duration-200"
              >
                {item.name}
              </button>
            ))}
            <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-800 space-y-3">
              <Link
                to="/login"
                className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-md transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block w-full text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-base font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default PublicNavbar;