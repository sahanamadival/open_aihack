import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AccessibilityProvider } from './contexts/AccessibilityContext';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';

// Components
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import LoadingSpinner from './components/Common/LoadingSpinner';
import ErrorBoundary from './components/Common/ErrorBoundary';

// Pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import Textbooks from './pages/Textbooks/Textbooks';
import TextbookViewer from './pages/Textbooks/TextbookViewer';
import Games from './pages/Games/Games';
import Profile from './pages/Profile/Profile';
import AccessibilitySettings from './pages/Accessibility/AccessibilitySettings';
import AdminDashboard from './pages/Admin/AdminDashboard';

// Styles
import './styles/App.css';
import './styles/accessibility.css';
import './styles/themes.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for existing user session
    const checkUserSession = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (token) {
          // Verify token and get user data
          const response = await fetch('/api/auth/me', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
          }
        }
      } catch (error) {
        console.error('Session check failed:', error);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      } finally {
        setIsLoading(false);
      }
    };

    checkUserSession();
  }, []);

  if (isLoading) {
    return (
      <div className="app-loading">
        <LoadingSpinner size="large" />
        <p>Loading Accessibility Education Portal...</p>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <AccessibilityProvider>
        <LanguageProvider>
          <AuthProvider value={{ user, setUser }}>
            <div className="app">
              <Router>
                {user ? (
                  <AuthenticatedApp user={user} />
                ) : (
                  <UnauthenticatedApp />
                )}
              </Router>
            </div>
          </AuthProvider>
        </LanguageProvider>
      </AccessibilityProvider>
    </ErrorBoundary>
  );
}

function AuthenticatedApp({ user }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-authenticated">
      <Header 
        user={user}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      
      <div className="app-content">
        <Sidebar 
          user={user}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        
        <main className="main-content" role="main">
          <div className="content-container">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/textbooks" element={<Textbooks />} />
              <Route path="/textbooks/:id" element={<TextbookViewer />} />
              <Route path="/games" element={<Games />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/accessibility" element={<AccessibilitySettings />} />
              
              {/* Admin routes */}
              {user.role === 'admin' && (
                <Route path="/admin" element={<AdminDashboard />} />
              )}
              
              {/* Redirect unknown routes to dashboard */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </main>
      </div>
      
      {/* Accessibility tools overlay */}
      <div id="accessibility-tools" role="region" aria-label="Accessibility Tools">
        {/* This will be populated by accessibility context */}
      </div>
      
      {/* Skip links for keyboard navigation */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
    </div>
  );
}

function UnauthenticatedApp() {
  return (
    <div className="app-unauthenticated">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;
