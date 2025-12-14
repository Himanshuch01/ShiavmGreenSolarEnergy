# Troubleshooting Guide

## Environment Variables Not Loading

### Problem
You see errors like:
- "Missing VITE_SUPABASE_URL environment variable"
- "Missing VITE_SUPABASE_ANON_KEY environment variable"

### Solution

**Step 1: Verify .env file exists and is correct**
```bash
# Run the verification script
npm run verify-env
```

**Step 2: Check .env file location**
- The `.env` file MUST be in the project root (same folder as `package.json`)
- NOT in `src/` folder
- NOT in any subfolder

**Step 3: Check .env file format**
Your `.env` file should look like this (no spaces around `=`):
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Common mistakes:**
- ❌ `VITE_SUPABASE_URL = https://...` (spaces around =)
- ❌ `VITE_SUPABASE_URL=https://... ` (trailing space)
- ❌ Missing `VITE_` prefix
- ❌ Using quotes: `VITE_SUPABASE_URL="https://..."` (quotes are optional but not needed)

**Step 4: RESTART YOUR DEV SERVER** ⚠️
This is the most common issue! Vite only loads environment variables when it starts.

1. **Stop** your current dev server (press `Ctrl+C` in the terminal)
2. **Start** it again:
   ```bash
   npm run dev
   ```

**Step 5: Clear browser cache**
Sometimes the browser caches the old error. Try:
- Hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
- Or open in incognito/private mode

## Verification Checklist

- [ ] `.env` file exists in project root
- [ ] `.env` contains `VITE_SUPABASE_URL=...`
- [ ] `.env` contains `VITE_SUPABASE_ANON_KEY=...`
- [ ] No spaces around `=` sign
- [ ] Values are not placeholders (`your_supabase_project_url`)
- [ ] Dev server was restarted after creating/modifying `.env`
- [ ] Browser cache cleared or using incognito mode

## Quick Test

After restarting your dev server, open the browser console and check:
1. You should NOT see the Supabase error
2. You can test by submitting the contact form
3. Check Supabase dashboard → Table Editor to see if data was saved

## Still Not Working?

1. **Check the console output** when starting the dev server
   - Look for any warnings about environment variables

2. **Verify file encoding**
   - Make sure `.env` is saved as UTF-8 (not UTF-16 or other)

3. **Check for hidden characters**
   - Try recreating the `.env` file from scratch
   - Copy the values directly from Supabase dashboard

4. **Verify Vite is reading the file**
   - Add a test variable: `VITE_TEST=hello`
   - In your code: `console.log(import.meta.env.VITE_TEST)`
   - Should print "hello" after restart

5. **Check vite.config.ts**
   - Make sure `envPrefix: "VITE_"` is set (it should be)

## Getting Help

If none of the above works:
1. Run `npm run verify-env` and share the output
2. Check browser console for the exact error message
3. Verify your Supabase project is active and accessible

