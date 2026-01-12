/**
 * Development Server for Admin API Routes
 * 
 * This Express server handles authentication API routes during local development.
 * In production, these are handled by Vercel serverless functions.
 * 
 * Run: node server.js
 */

import 'dotenv/config';
import express from 'express';
import { getIronSession } from 'iron-session';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:8081'],
  credentials: true
}));
app.use(express.json());

// Session configuration
const SESSION_SECRET = process.env.VITE_SESSION_SECRET || '';
const ADMIN_USERNAME = process.env.VITE_ADMIN_USERNAME || '';
const ADMIN_PASSWORD = process.env.VITE_ADMIN_PASSWORD || '';

const sessionOptions = {
  password: SESSION_SECRET,
  cookieName: 'admin_session',
  cookieOptions: {
    httpOnly: true,
    secure: false, // false in development (http://localhost)
    sameSite: 'lax', // 'lax' for cross-origin in dev
    maxAge: 60 * 60 * 24,
    path: '/',
  },
};

// Validate credentials
const validateCredentials = (username, password) => {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
};

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, error: 'Username and password required' });
    }

    if (!validateCredentials(username, password)) {
      return res.status(401).json({ success: false, error: 'Invalid username or password' });
    }

    const session = await getIronSession(req, res, sessionOptions);
    session.username = username;
    session.role = 'admin';
    session.createdAt = Date.now();
    await session.save();

    res.json({ success: true });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, error: 'Authentication failed' });
  }
});

// Logout endpoint
app.post('/api/auth/logout', async (req, res) => {
  try {
    const session = await getIronSession(req, res, sessionOptions);
    session.destroy();
    res.json({ success: true });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ success: false, error: 'Logout failed' });
  }
});

// Verify endpoint
app.get('/api/auth/verify', async (req, res) => {
  try {
    const session = await getIronSession(req, res, sessionOptions);

    if (session.username && session.role === 'admin') {
      const now = Date.now();
      const sessionAge = now - (session.createdAt || 0);
      const maxAge = 24 * 60 * 60 * 1000;

      if (sessionAge > maxAge) {
        session.destroy();
        return res.json({ authenticated: false });
      }

      return res.json({ authenticated: true, username: session.username });
    }

    res.json({ authenticated: false });
  } catch (error) {
    console.error('Verify error:', error);
    res.json({ authenticated: false });
  }
});

app.listen(PORT, () => {
  console.log(`🔐 Auth API server running on http://localhost:${PORT}`);
  console.log(`📍 Endpoints:`);
  console.log(`   POST http://localhost:${PORT}/api/auth/login`);
  console.log(`   POST http://localhost:${PORT}/api/auth/logout`);
  console.log(`   GET  http://localhost:${PORT}/api/auth/verify`);
});
