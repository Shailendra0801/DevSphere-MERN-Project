import { Navigate, useLocation } from 'react-router-dom';

// Temporary authentication check - will be replaced with actual auth logic
const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('auth_token');
};

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

/**
 * Protected Route Component
 * Wraps routes that require authentication
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
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

interface GuestRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

/**
 * Guest Route Component
 * Wraps routes that should only be accessible to unauthenticated users
 */
export const GuestRoute: React.FC<GuestRouteProps> = ({ 
  children, 
  redirectTo = '/dashboard' 
}) => {
  if (isAuthenticated()) {
    return <Navigate to={redirectTo} replace />;
  }
  
  return <>{children}</>;
};

interface RoleBasedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
  userRole?: string;
  redirectTo?: string;
}

/**
 * Role-Based Route Component
 * Wraps routes that require specific user roles
 */
export const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({ 
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

export default ProtectedRoute;