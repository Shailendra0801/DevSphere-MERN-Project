import React from 'react';

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white">403</h1>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mt-4">Access Denied</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          You don't have permission to access this resource.
        </p>
        <a 
          href="/" 
          className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go Home
        </a>
      </div>
    </div>
  );
};

export default Unauthorized;