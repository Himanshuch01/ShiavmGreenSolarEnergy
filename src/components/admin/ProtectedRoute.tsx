/**
 * Protected Route Component
 * 
 * HOC that wraps admin routes to ensure only authenticated users
 * can access protected pages. Redirects to login if not authenticated.
 * 
 * Security:
 * - Verifies JWT token on every render
 * - Automatic redirect to login page if token is invalid
 * - Shows loading state during authentication check
 */

import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '@/lib/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authenticated = await isAuthenticated();
        setIsAuth(authenticated);
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuth(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, []);

  if (isChecking) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Verifying authentication...</p>
      </div>
    );
  }

  if (!isAuth) {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
};

const styles: Record<string, React.CSSProperties> = {
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f7fafc',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #e2e8f0',
    borderTopColor: '#667eea',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
    marginBottom: '1rem',
  },
  loadingText: {
    color: '#718096',
    fontSize: '0.875rem',
  },
};

// Add keyframes for spinner animation
const styleSheet = document.styleSheets[0];
if (styleSheet) {
  try {
    styleSheet.insertRule(`
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `, styleSheet.cssRules.length);
  } catch (e) {
    // Ignore if rule already exists
  }
}

export default ProtectedRoute;
