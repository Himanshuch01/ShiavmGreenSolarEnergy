/**
 * Admin Login Page
 * 
 * Standalone login page for admin authentication.
 * Completely isolated from public site components.
 * 
 * Features:
 * - Session-based authentication with HTTP-only cookies
 * - Credential validation via server-side API
 * - Automatic redirect after successful login
 * - No SEO indexing
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Lock, User, LogIn, AlertCircle, Eye, EyeOff, Sparkles } from 'lucide-react';
import { login, isAuthenticated } from '@/lib/auth';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAuthenticated();
      if (authenticated) {
        navigate('/admin/dashboard', { replace: true });
      }
    };
    checkAuth();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(username, password);
      
      if (success) {
        navigate('/admin/dashboard', { replace: true });
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Authentication failed. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Login - Shivam Green Solar Energy</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div style={styles.container}>
        {/* Animated background elements */}
        <div style={styles.backgroundShapes}>
          <div style={styles.shape1}></div>
          <div style={styles.shape2}></div>
          <div style={styles.shape3}></div>
        </div>

        <div style={styles.loginBox}>
          <div style={styles.header}>
            <div style={styles.iconContainer}>
              <Lock size={32} style={styles.icon} />
              <Sparkles size={16} style={styles.sparkle} />
            </div>
            <h1 style={styles.title}>Admin Portal</h1>
            <p style={styles.subtitle}>Shivam Green Solar Energy</p>
          </div>

          <form onSubmit={handleSubmit} style={styles.form}>
            {error && (
              <div style={styles.errorAlert}>
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <div style={styles.inputGroup}>
              <label htmlFor="username" style={styles.label}>
                <User size={16} />
                <span>Username</span>
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                disabled={isLoading}
                style={styles.input}
                placeholder="Enter username"
              />
            </div>

            <div style={styles.inputGroup}>
              <label htmlFor="password" style={styles.label}>
                <Lock size={16} />
                <span>Password</span>
              </label>
              <div style={styles.passwordInputWrapper}>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  disabled={isLoading}
                  style={styles.passwordInput}
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                ...styles.button,
                ...(isLoading ? styles.buttonDisabled : {}),
              }}
            >
              {isLoading ? (
                <>
                  <span style={styles.spinner}></span>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

// Scoped styles - completely isolated from global styles
const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '1rem',
    position: 'relative',
    overflow: 'hidden',
  },
  backgroundShapes: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
    overflow: 'hidden',
  },
  shape1: {
    position: 'absolute',
    top: '-10%',
    right: '-5%',
    width: '400px',
    height: '400px',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '50%',
    animation: 'float 8s ease-in-out infinite',
  },
  shape2: {
    position: 'absolute',
    bottom: '-15%',
    left: '-10%',
    width: '500px',
    height: '500px',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '50%',
    animation: 'float 10s ease-in-out infinite reverse',
  },
  shape3: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '300px',
    height: '300px',
    background: 'rgba(255, 255, 255, 0.08)',
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
    animation: 'pulse 6s ease-in-out infinite',
  },
  loginBox: {
    backgroundColor: 'white',
    borderRadius: '20px',
    boxShadow: '0 25px 70px rgba(0, 0, 0, 0.35), 0 10px 30px rgba(0, 0, 0, 0.2)',
    padding: '3rem 2.5rem',
    width: '100%',
    maxWidth: '440px',
    position: 'relative',
    zIndex: 1,
    backdropFilter: 'blur(10px)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2.5rem',
  },
  iconContainer: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '72px',
    height: '72px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    marginBottom: '1.25rem',
    position: 'relative',
    boxShadow: '0 8px 20px rgba(102, 126, 234, 0.4)',
  },
  icon: {
    color: 'white',
  },
  sparkle: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    color: '#fbbf24',
    animation: 'sparkle 2s ease-in-out infinite',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#1a202c',
    marginBottom: '0.5rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  subtitle: {
    fontSize: '0.9rem',
    color: '#718096',
    fontWeight: '500',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  errorAlert: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem',
    backgroundColor: '#fee',
    color: '#c53030',
    borderRadius: '6px',
    fontSize: '0.875rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#2d3748',
  },
  input: {
    width: '100%',
    padding: '0.875rem 1rem',
    border: '2px solid #e2e8f0',
    borderRadius: '10px',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    outline: 'none',
    backgroundColor: '#f7fafc',
  },
  passwordInputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  passwordInput: {
    width: '100%',
    padding: '0.875rem 3rem 0.875rem 1rem',
    border: '2px solid #e2e8f0',
    borderRadius: '10px',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    outline: 'none',
    backgroundColor: '#f7fafc',
  },
  eyeButton: {
    position: 'absolute',
    right: '1rem',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#718096',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.25rem',
    borderRadius: '4px',
    transition: 'color 0.2s, background-color 0.2s',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    width: '100%',
    padding: '1rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
  },
  buttonDisabled: {
    backgroundColor: '#a0aec0',
    cursor: 'not-allowed',
  },
  spinner: {
    width: '16px',
    height: '16px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderTopColor: 'white',
    borderRadius: '50%',
    animation: 'spin 0.6s linear infinite',
  },
};

// Add keyframes for animations
const styleSheet = document.styleSheets[0];
if (styleSheet) {
  try {
    styleSheet.insertRule(`
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `, styleSheet.cssRules.length);
    styleSheet.insertRule(`
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
      }
    `, styleSheet.cssRules.length);
    styleSheet.insertRule(`
      @keyframes pulse {
        0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
        50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.5; }
      }
    `, styleSheet.cssRules.length);
    styleSheet.insertRule(`
      @keyframes sparkle {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.5; transform: scale(0.8); }
      }
    `, styleSheet.cssRules.length);
  } catch (e) {
    // Ignore if rules already exist
  }
}

export default AdminLogin;
