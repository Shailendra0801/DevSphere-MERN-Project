import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import { ProtectedRoute, GuestRoute } from '../components/Routing/ProtectedRoute';

// Import page components
import Dashboard from '../pages/Dashboard/Dashboard';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import Profile from '../pages/Profile/Profile';
import Settings from '../pages/Settings/Settings';
import NotFound from '../pages/NotFound/NotFound';
import Unauthorized from '../pages/Unauthorized/Unauthorized';

/**
 * Application Routes Configuration
 * Defines all routes for the application with proper protection
 */
export const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      // Public routes
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'login',
        element: (
          <GuestRoute>
            <Login />
          </GuestRoute>
        ),
      },
      {
        path: 'register',
        element: (
          <GuestRoute>
            <Register />
          </GuestRoute>
        ),
      },
      
      // Protected routes
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: 'settings',
        element: (
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        ),
      },
      
      // Error routes
      {
        path: 'unauthorized',
        element: <Unauthorized />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
];

/**
 * Create browser router with defined routes
 */
const router = createBrowserRouter(routes);

export default router;