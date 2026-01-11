/**
 * Session Verification API Endpoint
 * 
 * Vercel Serverless Function for verifying admin session.
 * Checks if user has valid session cookie.
 * 
 * GET /api/auth/verify
 * Response: { authenticated: boolean, username?: string }
 */

import { getIronSession } from 'iron-session';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sessionOptions, SessionData } from '../session-config';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ authenticated: false, error: 'Method not allowed' });
  }

  try {
    // Get session
    const session = await getIronSession<SessionData>(req, res, sessionOptions);

    // Check if session exists and has required data
    if (session.username && session.role === 'admin') {
      // Check session expiration (24 hours)
      const now = Date.now();
      const sessionAge = now - (session.createdAt || 0);
      const maxAge = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

      if (sessionAge > maxAge) {
        // Session expired, destroy it
        session.destroy();
        return res.status(200).json({ authenticated: false });
      }

      return res.status(200).json({
        authenticated: true,
        username: session.username,
      });
    }

    return res.status(200).json({ authenticated: false });
  } catch (error) {
    console.error('Verify error:', error);
    return res.status(200).json({ authenticated: false });
  }
}
