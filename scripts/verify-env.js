/**
 * Environment Variables Verification Script
 * 
 * This script helps verify that your .env file is set up correctly.
 * Run: node scripts/verify-env.js
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const envPath = join(__dirname, '..', '.env');

console.log('\n🔍 Verifying .env file...\n');

try {
  const envContent = readFileSync(envPath, 'utf-8');
  const lines = envContent.split('\n');
  
  let hasUrl = false;
  let hasKey = false;
  let urlValue = '';
  let keyValue = '';
  
  lines.forEach((line, index) => {
    const trimmed = line.trim();
    
    // Skip comments and empty lines
    if (!trimmed || trimmed.startsWith('#')) {
      return;
    }
    
    // Check for VITE_SUPABASE_URL
    if (trimmed.startsWith('VITE_SUPABASE_URL=')) {
      hasUrl = true;
      urlValue = trimmed.split('=').slice(1).join('=').trim();
      console.log(`✅ Found VITE_SUPABASE_URL: ${urlValue.substring(0, 50)}...`);
    }
    
    // Check for VITE_SUPABASE_ANON_KEY
    if (trimmed.startsWith('VITE_SUPABASE_ANON_KEY=')) {
      hasKey = true;
      keyValue = trimmed.split('=').slice(1).join('=').trim();
      console.log(`✅ Found VITE_SUPABASE_ANON_KEY: ${keyValue.substring(0, 30)}...`);
    }
  });
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  if (hasUrl && hasKey) {
    // Validate values
    if (urlValue === 'your_supabase_project_url' || keyValue === 'your_supabase_anon_key') {
      console.log('❌ ERROR: Placeholder values detected!');
      console.log('   Please replace the placeholder values with your actual Supabase credentials.\n');
      process.exit(1);
    }
    
    if (!urlValue || !keyValue) {
      console.log('❌ ERROR: Empty values detected!');
      console.log('   Make sure your .env file has actual values, not empty strings.\n');
      process.exit(1);
    }
    
    console.log('✅ .env file is properly configured!');
    console.log('\n📝 IMPORTANT: If you just created/modified the .env file:');
    console.log('   1. Stop your dev server (Ctrl+C)');
    console.log('   2. Restart it: npm run dev');
    console.log('   3. Vite only loads environment variables at startup\n');
    
  } else {
    console.log('❌ ERROR: Missing required environment variables!\n');
    
    if (!hasUrl) {
      console.log('   Missing: VITE_SUPABASE_URL');
    }
    
    if (!hasKey) {
      console.log('   Missing: VITE_SUPABASE_ANON_KEY');
    }
    
    console.log('\n   Make sure your .env file contains both variables.');
    console.log('   Example:');
    console.log('   VITE_SUPABASE_URL=https://your-project.supabase.co');
    console.log('   VITE_SUPABASE_ANON_KEY=your-anon-key-here\n');
    
    process.exit(1);
  }
  
} catch (error) {
  if (error.code === 'ENOENT') {
    console.log('❌ ERROR: .env file not found!');
    console.log(`   Expected location: ${envPath}`);
    console.log('\n   Steps to fix:');
    console.log('   1. Copy .env.example to .env: cp .env.example .env');
    console.log('   2. Edit .env and add your Supabase credentials');
    console.log('   3. Run this script again to verify\n');
  } else {
    console.log('❌ ERROR reading .env file:', error.message);
  }
  process.exit(1);
}

