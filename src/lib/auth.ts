/**
 * Session-Based Authentication Utilities
 * 
 * This module handles session-based authentication for admin panel.
 * Sessions are stored server-side with HTTP-only cookies.
 * 
 * Security Features:
 * - HTTP-only cookies (no localStorage/JavaScript access)
 * - Secure flag in production (HTTPS only)
 * - SameSite strict (CSRF protection)
 * - 24-hour session expiration
 * - Server-side session validation
 */

const API_BASE = '/api/auth';

/**
 * Checks if user is authenticated by verifying session
 * Makes server-side request to verify HTTP-only cookie
 */
export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE}/verify`, {
      method: 'GET',
      credentials: 'include', // Include cookies in request
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return data.authenticated === true;
  } catch (error) {
    console.error('Authentication check failed:', error);
    return false;
  }
};

/**
 * Logs in admin user with credentials
 * Creates server-side session with HTTP-only cookie
 */
export const login = async (username: string, password: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      credentials: 'include', // Include cookies in request
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('Login failed:', error);
    return false;
  }
};

/**
 * Logs out admin user by destroying session
 * Clears HTTP-only session cookie on server
 */
export const logout = async (): Promise<void> => {
  try {
    await fetch(`${API_BASE}/logout`, {
      method: 'POST',
      credentials: 'include', // Include cookies in request
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
