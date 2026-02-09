import React from 'react';
import './profile.css';

const Profile = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Profile</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-4">Your profile information will appear here.</p>
      </div>
    </div>
  );
};

export default Profile;