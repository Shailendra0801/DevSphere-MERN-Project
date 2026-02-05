import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Welcome to your dashboard! This is where you'll see your main application content.
        </p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 dark:text-blue-200">Statistics</h3>
            <p className="text-blue-600 dark:text-blue-300 mt-2">Your stats will appear here</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <h3 className="font-semibold text-green-800 dark:text-green-200">Recent Activity</h3>
            <p className="text-green-600 dark:text-green-300 mt-2">Recent actions will show here</p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
            <h3 className="font-semibold text-purple-800 dark:text-purple-200">Quick Actions</h3>
            <p className="text-purple-600 dark:text-purple-300 mt-2">Quick actions available here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;