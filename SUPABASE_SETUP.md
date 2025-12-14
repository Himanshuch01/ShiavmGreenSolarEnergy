# Supabase Setup Guide

This guide will help you set up Supabase as the backend for the Shivam GreenSolar Energy website.

## Prerequisites

1. A Supabase account (sign up at https://app.supabase.com)
2. Node.js installed on your system
3. Basic knowledge of SQL

## Step 1: Create a Supabase Project

1. Go to https://app.supabase.com and sign in
2. Click "New Project"
3. Fill in your project details:
   - **Name**: Shivam GreenSolar Energy (or any name you prefer)
   - **Database Password**: Choose a strong password (save this!)
   - **Region**: Choose the closest region to your users
4. Click "Create new project" and wait for it to be set up (takes 1-2 minutes)

## Step 2: Get Your API Keys

1. In your Supabase project dashboard, go to **Settings** → **API**
2. You'll find two important values:
   - **Project URL**: Copy this value
   - **anon/public key**: Copy this value (this is safe to use in frontend)

## Step 3: Configure Environment Variables

1. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and replace the placeholder values:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

3. Save the file

## Step 4: Set Up Database Tables

### Option A: Using Supabase SQL Editor (Recommended)

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Open the file `supabase/schema.sql` from this project
4. Copy all the SQL code
5. Paste it into the SQL Editor
6. Click "Run" (or press Ctrl+Enter)
7. You should see "Success. No rows returned"

### Option B: Using Supabase CLI (Advanced)

If you have Supabase CLI installed:
```bash
supabase db push
```

## Step 5: Verify Tables Are Created

1. In Supabase dashboard, go to **Table Editor**
2. You should see two tables:
   - `contact_inquiries`
   - `calculator_results`

## Step 6: Install Dependencies

```bash
npm install
```

This will install the `@supabase/supabase-js` package.

## Step 7: Test the Integration

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to the Contact page and submit the form
3. Check your Supabase dashboard → **Table Editor** → `contact_inquiries` to see the submitted data

4. Navigate to the Calculator page and run a calculation
5. Check `calculator_results` table to see the saved calculation

## Database Schema Overview

### `contact_inquiries` Table
Stores contact form submissions with:
- `id` (UUID, auto-generated)
- `name` (VARCHAR)
- `email` (VARCHAR)
- `phone` (VARCHAR)
- `service` (VARCHAR)
- `message` (TEXT)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### `calculator_results` Table
Stores solar calculator calculations with:
- `id` (UUID, auto-generated)
- `monthly_bill` (DECIMAL)
- `city` (VARCHAR)
- `rooftop_size` (DECIMAL)
- `system_size` (DECIMAL)
- `estimated_cost` (DECIMAL)
- `annual_savings` (DECIMAL)
- `payback_period` (DECIMAL)
- `co2_reduction` (DECIMAL)
- `subsidy_amount` (DECIMAL)
- `created_at` (TIMESTAMP)

## Security & Row Level Security (RLS)

The schema includes Row Level Security policies:
- **Public Insert**: Anyone can insert data (for forms)
- **Authenticated Read**: Only authenticated users can read data

To modify access control:
1. Go to **Authentication** → **Policies** in Supabase dashboard
2. Adjust policies as needed for your use case

## Troubleshooting

### Error: "Missing Supabase environment variables"
- Make sure your `.env` file exists and has the correct variable names
- Restart your development server after creating/updating `.env`

### Error: "relation does not exist"
- Make sure you've run the SQL schema in Step 4
- Check that table names match exactly (case-sensitive)

### Error: "new row violates row-level security policy"
- Check your RLS policies in Supabase dashboard
- Make sure the policies allow the operation you're trying to perform

### Forms not saving data
- Check browser console for errors
- Verify your Supabase URL and anon key are correct
- Check Supabase dashboard → **Logs** for API errors

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)

## Support

If you encounter issues, check:
1. Supabase project status: https://status.supabase.com
2. Browser console for client-side errors
3. Supabase dashboard → **Logs** for server-side errors

