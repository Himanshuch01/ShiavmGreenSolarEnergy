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
import { sessionOptions, validateCredentials, SessionData } from '../session-config.js';

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
    console.log('=== Login attempt started ===');
    console.log('Request method:', req.method);
    console.log('Has body:', !!req.body);
    
    const { username, password } = req.body;

    console.log('Username provided:', !!username);
    console.log('Password provided:', !!password);

    // Validate input
    if (!username || !password) {
      console.log('Missing credentials');
      return res.status(400).json({ success: false, error: 'Username and password required' });
    }

    console.log('Validating credentials...');
    // Validate credentials
    if (!validateCredentials(username, password)) {
      console.log('Invalid credentials');
      return res.status(401).json({ success: false, error: 'Invalid username or password' });
    }

    console.log('Credentials valid, creating session...');
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
