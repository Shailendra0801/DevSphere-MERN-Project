import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import './routing.css';

// Temporary authentication check - will be replaced with actual auth logic
const isAuthenticated = () => {
  return !!localStorage.getItem('auth_token');
};

/**
 * Protected Route Component
 * Wraps routes that require authentication
 */
export const ProtectedRoute = ({ 
  children, 
  redirectTo = '/login' 
}) => {
  const location = useLocation();
  
  if (!isAuthenticated()) {
    // Redirect to login page with return url
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  redirectTo: PropTypes.string
};

/**
 * Guest Route Component
 * Wraps routes that should only be accessible to unauthenticated users
 */
export const GuestRoute = ({ 
  children, 
  redirectTo = '/dashboard' 
}) => {
  if (isAuthenticated()) {
    return <Navigate to={redirectTo} replace />;
  }
  
  return <>{children}</>;
};

GuestRoute.propTypes = {
  children: PropTypes.node.isRequired,
  redirectTo: PropTypes.string
};

/**
 * Role-Based Route Component
 * Wraps routes that require specific user roles
 */
export const RoleBasedRoute = ({ 
  children, 
  allowedRoles, 
  userRole,
  redirectTo = '/unauthorized' 
}) => {
  const location = useLocation();
  
  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  if (userRole && !allowedRoles.includes(userRole)) {
    return <Navigate to={redirectTo} replace />;
  }
  
  return <>{children}</>;
};

RoleBasedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
  userRole: PropTypes.string,
  redirectTo: PropTypes.string
};

export default ProtectedRoute;