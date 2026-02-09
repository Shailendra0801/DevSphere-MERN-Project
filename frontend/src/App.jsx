import React from 'react';
import { Outlet } from 'react-router-dom';
import PublicNavbar from './components/Layout/PublicNavbar';

/**
 * App Component
 * Main application wrapper that handles layout based on authentication state
 */
function App() {
  // For now, we'll show the public navbar for all routes
  // In a real app, you'd check authentication state here
  const isAuthenticated = false; // This would come from auth context
  
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      {!isAuthenticated && <PublicNavbar />}
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}

export default App;