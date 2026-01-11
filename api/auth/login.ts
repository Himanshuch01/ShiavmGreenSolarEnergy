/**
 * Admin Login API Endpoint
 * 
 * Vercel Serverless Function for handling admin login.
 * Creates a secure session with HTTP-only cookie.
 * 
 * POST /api/auth/login
 * Body: { username: string, password: string }
 * Response: { success: boolean, error?: string }
 */

import { getIronSession } from 'iron-session';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sessionOptions, validateCredentials, SessionData } from '../session-config';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ success: false, error: 'Username and password required' });
    }

    // Validate credentials
    if (!validateCredentials(username, password)) {
      return res.status(401).json({ success: false, error: 'Invalid username or password' });
    }

    // Create session
    const session = await getIronSession<SessionData>(req, res, sessionOptions);
    
    // Store user data in session
    session.username = username;
    session.role = 'admin';
    session.createdAt = Date.now();

    // Save session (sets HTTP-only cookie)
    await session.save();

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Login error:', error);
    console.error('Session secret exists:', !!process.env.SESSION_SECRET);
    console.error('Admin username exists:', !!process.env.ADMIN_USERNAME);
    return res.status(500).json({ 
      success: false, 
      error: 'Authentication failed',
      details: process.env.NODE_ENV === 'development' ? String(error) : undefined
    });
  }
}
