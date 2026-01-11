/**
 * Admin Logout API Endpoint
 * 
 * Vercel Serverless Function for handling admin logout.
 * Destroys session and clears HTTP-only cookie.
 * 
 * POST /api/auth/logout
 * Response: { success: boolean }
 */

import { getIronSession } from 'iron-session';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sessionOptions, SessionData } from '../session-config';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    // Get session
    const session = await getIronSession<SessionData>(req, res, sessionOptions);

    // Destroy session (clears cookie)
    session.destroy();

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({ success: false, error: 'Logout failed' });
  }
}
