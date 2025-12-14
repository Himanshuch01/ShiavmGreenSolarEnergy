/**
 * Database Setup Script for Supabase
 * 
 * This script provides instructions for setting up your Supabase database tables.
 * 
 * Usage:
 * 1. Make sure you have Node.js installed
 * 2. Install dependencies: npm install
 * 3. Set up your Supabase credentials in .env file
 * 4. Run this script: node scripts/setup-database.js
 * 
 * Alternatively, you can copy the SQL from supabase/schema.sql
 * and run it directly in your Supabase SQL Editor.
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function setupDatabase() {
  try {
    console.log('\n📖 Reading schema file...');
    const schemaPath = join(__dirname, '..', 'supabase', 'schema.sql');
    const schema = readFileSync(schemaPath, 'utf-8');

    console.log('✅ Schema file loaded successfully!');
    console.log('\n📝 Database Setup Instructions:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n1. Go to your Supabase project dashboard: https://app.supabase.com');
    console.log('2. Navigate to SQL Editor (left sidebar)');
    console.log('3. Click "New query"');
    console.log('4. Copy the contents of supabase/schema.sql');
    console.log('5. Paste the SQL into the SQL Editor');
    console.log('6. Click "Run" (or press Ctrl+Enter / Cmd+Enter)');
    console.log('7. You should see "Success. No rows returned"');
    console.log('\n📄 Schema file location: supabase/schema.sql');
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n💡 Alternative: Use Supabase CLI (if installed):');
    console.log('   supabase db push');
    console.log('\n✨ After setup, verify tables in Table Editor:');
    console.log('   - contact_inquiries');
    console.log('   - calculator_results\n');
    
  } catch (error) {
    console.error('❌ Error reading schema file:', error.message);
    console.error('\nMake sure supabase/schema.sql exists in the project root.');
    process.exit(1);
  }
}

setupDatabase();

