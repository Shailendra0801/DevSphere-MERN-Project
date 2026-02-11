import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../../hooks/useAuth';
import './routing.css';

/**
 * Protected Route Component
 * Wraps routes that require authentication
 */
export const ProtectedRoute = ({ 
  children, 
  redirectTo = '/login' 
}) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  
  console.log('ProtectedRoute - isAuthenticated:', isAuthenticated);
  console.log('ProtectedRoute - loading:', loading);
  console.log('ProtectedRoute - location:', location.pathname);
  
  // If still loading, show loading state
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    console.log('ProtectedRoute - redirecting to login');
    // Redirect to login page with return url
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }
  
  console.log('ProtectedRoute - allowing access to:', location.pathname);
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
  const { isAuthenticated, loading } = useAuth();
  
  console.log('GuestRoute - isAuthenticated:', isAuthenticated);
  console.log('GuestRoute - loading:', loading);
  
  // If still loading, show loading state
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  
  // If authenticated, redirect to dashboard
  if (isAuthenticated) {
    console.log('GuestRoute - redirecting to dashboard');
    return <Navigate to={redirectTo} replace />;
  }
  
  console.log('GuestRoute - allowing access');
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
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();
  
  console.log('RoleBasedRoute - isAuthenticated:', isAuthenticated);
  console.log('RoleBasedRoute - user:', user);
  console.log('RoleBasedRoute - loading:', loading);
  
  // If still loading, show loading state
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    console.log('RoleBasedRoute - redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Check user role
  const currentUserRole = userRole || user?.role;
  if (currentUserRole && !allowedRoles.includes(currentUserRole)) {
    console.log('RoleBasedRoute - unauthorized access, redirecting');
    return <Navigate to={redirectTo} replace />;
  }
  
  console.log('RoleBasedRoute - allowing access');
  return <>{children}</>;
};

RoleBasedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
  userRole: PropTypes.string,
  redirectTo: PropTypes.string
};

export default ProtectedRoute;