/**
 * Admin Service for Supabase Operations
 * 
 * This module handles all Supabase queries for the admin panel.
 * It fetches contact inquiries securely for authenticated admins.
 * 
 * Security Notes:
 * - Uses the same Supabase client as public site (anon key)
 * - RLS policies must allow authenticated reads on contact_inquiries
 * - All data is read-only from admin perspective
 */

import { supabase } from './supabase';

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  created_at: string;
  updated_at: string;
}

/**
 * Fetches all contact inquiries from Supabase
 * Ordered by most recent first
 */
export const fetchContactInquiries = async (): Promise<ContactInquiry[]> => {
  try {
    const { data, error } = await supabase
      .from('contact_inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching contact inquiries:', error);
      throw new Error('Failed to fetch contact inquiries');
    }

    return data || [];
  } catch (error) {
    console.error('Error in fetchContactInquiries:', error);
    throw error;
  }
};

/**
 * Sanitizes HTML to prevent XSS attacks
 * Used before rendering user-submitted content
 */
export const sanitizeText = (text: string): string => {
  if (!text) return '';
  
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

/**
 * Formats date for display
 */
export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  } catch (error) {
    return dateString;
  }
};
