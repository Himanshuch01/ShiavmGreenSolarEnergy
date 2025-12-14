# Quick Start Guide - Supabase Integration

## 🚀 Quick Setup (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
```bash
# Copy the example file
cp .env.example .env

# Edit .env and add your Supabase credentials:
# VITE_SUPABASE_URL=https://your-project.supabase.co
# VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Create Supabase Project
1. Go to https://app.supabase.com
2. Create a new project
3. Get your URL and anon key from Settings → API
4. Add them to your `.env` file

### 4. Set Up Database
1. In Supabase dashboard, go to **SQL Editor**
2. Open `supabase/schema.sql` from this project
3. Copy all SQL code
4. Paste and run in SQL Editor

### 5. Start Development Server
```bash
npm run dev
```

## ✅ Verification

1. **Test Contact Form:**
   - Go to `/contact`
   - Submit the form
   - Check Supabase → Table Editor → `contact_inquiries`

2. **Test Calculator:**
   - Go to `/calculator`
   - Run a calculation
   - Check Supabase → Table Editor → `calculator_results`

## 📁 Key Files

- `.env` - Your API keys (not committed to git)
- `.env.example` - Template for environment variables
- `src/lib/supabase.ts` - Supabase client configuration
- `supabase/schema.sql` - Database schema
- `SUPABASE_SETUP.md` - Detailed setup guide

## 🔒 Security Notes

- Never commit `.env` file to git
- The `anon` key is safe for frontend use
- Row Level Security (RLS) is enabled on all tables
- Only authenticated users can read data (by default)

## 🆘 Troubleshooting

**"Missing Supabase environment variables"**
→ Check your `.env` file exists and has correct variable names

**"relation does not exist"**
→ Run the SQL schema in Supabase SQL Editor

**Forms not saving**
→ Check browser console and Supabase logs

For detailed help, see [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)

