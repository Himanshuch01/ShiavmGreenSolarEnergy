import { createClient } from "@supabase/supabase-js";

// Get environment variables (trim whitespace in case of formatting issues)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

// Debug logging (only in development)
if (import.meta.env.DEV) {
  const allEnvKeys = Object.keys(import.meta.env).filter(key => key.startsWith("VITE_"));
  console.log("Environment check:", {
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseAnonKey,
    urlLength: supabaseUrl?.length || 0,
    keyLength: supabaseAnonKey?.length || 0,
    allEnvKeys: allEnvKeys,
    allEnvValues: allEnvKeys.reduce((acc, key) => {
      acc[key] = import.meta.env[key]?.substring(0, 20) + "...";
      return acc;
    }, {} as Record<string, string>),
    mode: import.meta.env.MODE,
    dev: import.meta.env.DEV,
    prod: import.meta.env.PROD
  });
}

// Better error messages for debugging
if (!supabaseUrl) {
  const errorMsg = 
    "Missing VITE_SUPABASE_URL environment variable.\n\n" +
    "Troubleshooting steps:\n" +
    "1. Make sure you have a .env file in the project root (same folder as package.json)\n" +
    "2. The .env file should contain: VITE_SUPABASE_URL=your_supabase_url\n" +
    "3. Restart your dev server after creating/modifying .env file\n" +
    "4. Check that there are no spaces around the = sign\n" +
    "5. Make sure the variable name starts with VITE_\n\n" +
    "Current .env location should be: " + (typeof window === 'undefined' ? 'project root' : 'project root (same folder as package.json)');
  
  console.error(errorMsg);
  throw new Error(errorMsg);
}

if (!supabaseAnonKey) {
  const errorMsg = 
    "Missing VITE_SUPABASE_ANON_KEY environment variable.\n\n" +
    "Troubleshooting steps:\n" +
    "1. Make sure you have a .env file in the project root\n" +
    "2. The .env file should contain: VITE_SUPABASE_ANON_KEY=your_anon_key\n" +
    "3. Restart your dev server after creating/modifying .env file\n" +
    "4. Check that there are no spaces around the = sign\n" +
    "5. Make sure the variable name starts with VITE_";
  
  console.error(errorMsg);
  throw new Error(errorMsg);
}

// Validate that values are not placeholder values
if (supabaseUrl === "your_supabase_project_url" || supabaseAnonKey === "your_supabase_anon_key") {
  throw new Error(
    "Please replace the placeholder values in your .env file with your actual Supabase credentials. " +
    "Get them from: https://app.supabase.com → Your Project → Settings → API"
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface ContactInquiry {
  id?: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  created_at?: string;
}

export interface CalculatorResult {
  id?: string;
  monthly_bill: number;
  city: string;
  rooftop_size: number;
  system_size: number;
  estimated_cost: number;
  annual_savings: number;
  payback_period: number;
  co2_reduction: number;
  subsidy_amount: number;
  created_at?: string;
}

export interface Testimonial {
  id?: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  image_url?: string | null;
  is_approved?: boolean;
  created_at?: string;
  updated_at?: string;
}

