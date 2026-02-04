import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './components/UserList';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Auth from './components/Auth';
import { useAuth } from './contexts/AuthContext';

const API_BASE_URL = 'http://localhost:5000';

// Main App Content Component
const AppContent = () => {
  const [message, setMessage] = useState('');
  const [healthStatus, setHealthStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  useEffect(() => {
    fetchHealthStatus();
  }, []);

  const fetchHealthStatus = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/health`);
      setHealthStatus(response.data);
      setMessage('Connected to backend successfully!');
    } catch (error) {
      console.error('Error connecting to backend:', error);
      setMessage('Failed to connect to backend. Make sure the server is running.');
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <Auth />
      
      {isAuthenticated && (
        <header className="App-header" style={{ padding: '20px', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h1>DevSphere MERN Project</h1>
            <div>
              <span style={{ marginRight: '15px' }}>Welcome, {user?.name}!</span>
              <button 
                onClick={logout}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Logout
              </button>
            </div>
          </div>
          <p>Welcome to your MERN stack application!</p>
        
        <div style={{ margin: '20px 0' }}>
          <button 
            onClick={fetchHealthStatus}
            disabled={loading}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Checking...' : 'Check Backend Connection'}
          </button>
        </div>

        {message && (
          <div style={{ 
            margin: '10px 0', 
            padding: '10px', 
            backgroundColor: message.includes('success') ? '#d4edda' : '#f8d7da',
            color: message.includes('success') ? '#155724' : '#721c24',
            borderRadius: '4px'
          }}>
            {message}
          </div>
        )}

        {healthStatus && (
          <div style={{ 
            margin: '10px 0', 
            padding: '10px', 
            backgroundColor: '#d1ecf1',
            color: '#0c5460',
            borderRadius: '4px'
          }}>
            <strong>Backend Status:</strong> {healthStatus.status} - {healthStatus.message}
          </div>
        )}

          <hr style={{ margin: '30px 0', borderColor: '#ccc' }} />
          
          {/* User List Component */}
          <UserList />
        </header>
      )}
    </div>
  );
};

// Main App Component with Providers
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;