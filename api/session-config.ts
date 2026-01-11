/**
 * Session Configuration for Admin Authentication
 * 
 * Centralized session configuration using iron-session.
 * Sessions are stored server-side with HTTP-only cookies.
 * 
 * Security Features:
 * - HTTP-only cookies (not accessible via JavaScript)
 * - Secure flag in production (HTTPS only)
 * - SameSite strict (CSRF protection)
 * - 24-hour expiration
 * - Strong encryption using secret from env
 */

import { SessionOptions } from 'iron-session';

// Session data structure
export interface SessionData {
  username: string;
  role: string;
  createdAt: number;
}

// Validate required environment variables
const SESSION_SECRET = process.env.VITE_SESSION_SECRET || process.env.SESSION_SECRET || '';
const ADMIN_USERNAME = process.env.VITE_ADMIN_USERNAME || '';
const ADMIN_PASSWORD = process.env.VITE_ADMIN_PASSWORD || '';

if (!SESSION_SECRET || SESSION_SECRET.length < 32) {
  console.error('SESSION_SECRET must be at least 32 characters long');
}

if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
  console.error('ADMIN_USERNAME and ADMIN_PASSWORD must be set');
}

// Iron-session configuration
export const sessionOptions: SessionOptions = {
  password: SESSION_SECRET,
  cookieName: 'admin_session',
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24, // 24 hours in seconds
    path: '/',
  },
};

// Admin credentials from environment
export const adminCredentials = {
  username: ADMIN_USERNAME,
  password: ADMIN_PASSWORD,
};

// Validate credentials
export const validateCredentials = (username: string, password: string): boolean => {
  return username === adminCredentials.username && password === adminCredentials.password;
};
