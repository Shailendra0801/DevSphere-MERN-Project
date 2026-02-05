import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mt-4">Page Not Found</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Sorry, the page you are looking for does not exist.
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

export default NotFound;