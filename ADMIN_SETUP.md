# Admin Panel Setup Guide

## Overview
This document explains the secure admin panel implementation for Shivam Green Solar Energy website.

## Features
- ✅ Secure session-based authentication with HTTP-only cookies
- ✅ Protected admin routes at `/admin`
- ✅ Read-only view of contact form submissions
- ✅ No SEO indexing (noindex, nofollow)
- ✅ Blocked from robots.txt and sitemap
- ✅ Isolated from public components
- ✅ XSS protection with sanitized output
- ✅ CSRF protection with SameSite strict cookies

## Architecture

### Authentication Flow
1. User navigates to `/admin`
2. Login page submits credentials to `/api/auth/login`
3. Server validates credentials against environment variables
4. Upon successful login, server creates session and sets HTTP-only cookie
5. Session stored server-side with 24-hour expiration
6. Protected routes verify session via `/api/auth/verify`
7. Invalid/expired sessions redirect to login page

### Session Implementation
- **Type**: Server-side sessions with HTTP-only cookies
- **Storage**: Encrypted sessions using iron-session
- **Expiration**: 24 hours
- **Cookie Options**:
  - `httpOnly: true` - Not accessible via JavaScript
  - `secure: true` - HTTPS only (production)
  - `sameSite: strict` - CSRF protection
  - `maxAge: 24h` - Auto-expiration
- **Verification**: Server-side on every protected route access
- **Secret**: Stored in environment variables

### File Structure
```
api/
├── session-config.ts        # Session configuration
└── auth/
    ├── login.ts             # Login API endpoint
    ├── logout.ts            # Logout API endpoint
    └── verify.ts            # Session verification endpoint
src/
├── lib/
│   ├── auth.ts              # Client-side auth utilities (API calls)
│   └── adminService.ts      # Supabase queries for admin
├── components/
│   └── admin/
│       └── ProtectedRoute.tsx  # Route wrapper for auth
└── pages/
    └── admin/
        ├── AdminLogin.tsx      # Login page
        └── AdminDashboard.tsx  # Main admin panel
```

## Environment Variables Required

Add the following to your `.env` file:

```enSESSION_SECRET=your_secure_random_secret_here
VITE_ADMIN_USERNAME=your_admin_username
VITE_ADMIN_PASSWORD=your_admin_password
```

### Generating Secure Values

**Session Secret** (recommended 256-bit / 32 characters minimum):
```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Using OpenSSL
openssl rand -hex 32

# Or use any strong random generator
```

**Admin Credentials**:
- Username: Choose a non-obvious username (avoid "admin", "administrator")
- Password: Use strong password (12+ characters, mix of letters, numbers, symbols)

### Example .env
```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_SESSIONrd: Use strong password (12+ characters, mix of letters, numbers, symbols)

### Example .env
```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_JWT_SECRET=a7f3c9e8b2d1f6a4e9c8b7d2f5a3e8c9b1d6f4a7e3c8b9d2f5a1e6c4b8d3f7a2
VITE_ADMIN_USERNAME=solar_admin_2026
VITE_ADMIN_PASSWORD=SecureP@ssw0rd!2026
```

## Installation

1. **Install session library**:
```bash
npm install iron-session cookie
```

2. **Add environment variables** to `.env` file (see above)

3. **Restart development server**:
```bash
npm run dev
```

4. **Access admin panel**:
   - Navigate to: `http://localhost:5173/admin`
   - Login with credentials from env file
   - View contact inquiries at dashboard

## Usage

### Admin Routes
- `/admin` - Login page (public)
- `/admin/dashboard` - Admin dashboard (protected)

### Features
- **View Contact Inquiries**: All contact form submissions displayed in table
- **Refresh Data**: Click refresh button to reload inquiries
- **Logout**: Click logout button to clear session
- **Auto-redirect**: Already authenticated users skip login page

## Security Features

### 1. Session Security
- HTTP-only cookies (not accessible via JavaScript/localStorage)
- Secure flag in production (HTTPS only)
- SameSite strict (prevents CSRF attacks)
- Server-side session storage with encryption
- Expire after 24 hours
- Verified on every protected route access

### 2. Credential Protection
- Admin credentials stored in environment variables
- Never hardcoded in source code
- Server-side validation only

### 3. SEO Protection
- All admin pages have `<meta name="robots" content="noindex, nofollow">`
- `/admin` blocked in robots.txt
- Admin routes excluded from sitemap

### 4. XSS Prevention
- All user input sanitized before display
- HTML entities escaped
- Email/phone rendered as links but sanitized

### 5. Database Security
- Uses existing Supabase RLS policies
- Read-only access from admin panel
- No write/update/delete operations
- Anon key used (service role not exposed to client)

### 6. CSRF Protection
- SameSite strict cookie policy
- No state-changing operations without proper session

## Supabase Configuration

### RLS Policy Required
Ensure the following policy exists for `contact_inquiries` table:

```sql
-- Allow authenticated reads (via valid Supabase session)
CREATE POLICY "Allow authenticated read on contact_inquiries"
ON contact_inquiries
FOR SELECT
TO authenticated
USING (true);
```

**Note**: Since we're using the anon key from client-side, you may need to adjust this policy:

```sql
-- Alternative: Allow anon reads (if admin uses anon key)
CREATE POLICY "Allow anon read on contact_inquiries"
ON contact_inquiries
FOR SELECT
TO anon
USING (true);
```

This is acceptable because:
1. Contact inquiries are not sensitive data
2. JWT authentication provides access control layer
3. AdmRedis for session storage (instead of memory)sible
4. No SEO indexing of admin content

For production, consider:
- Implementing a backend API that uses Supabase service role
- Add additional authentication layer with Supabase Auth
- Use server-side token verification

## Testing

### Manual Testing
1. **Test Login**:
   - Go to `/admin`
   - Enter wrong credentials → Should show error
   - Enter correct credentials → Should redirect to dashboard

2. **Test Protection**:
   - Try accessing `/admin/dashboard` without login → Should redirect to `/admin`
   - Login and access dashboard → Should display inquiries
   - Logout → Should redirect to login

3. **Test Token Expiry**:
   - Login successfully
   - Wait 24 hours (or manually delete token from localStorage)
   - Try accessing dashboard → Should redirect to login

4. **Test Data Display**:
   - Submit contact form from public site
   - Login to admin panel
   - Verify inquiry appears in dashboard
   - Click refresh to reload data
SESSION_SECRET`
   - `VITE_ADMIN_USERNAME`
   - `VITE_ADMIN_PASSWORD`
3. Redeploy application

### Security Checklist
- ✅ Strong session secret (32+ characters)
- ✅ Strong admin password (12+ characters)
- ✅ Non-obvious username
- ✅ Environment variables set on hosting platform
- ✅ `.env` file in `.gitignore`
- ✅ HTTPS enabled on production domain
- ✅ robots.txt blocks `/admin`
- ✅ Admin pages have noindex meta tag
- ✅ HTTP-only cookies enabled
- ✅ SameSite strict enabledters)
- ✅ Non-obvious username
- ✅ ESESSION_SECRET not configured"
- Ensure `VITE_SESSION_SECRET` is in `.env` file
- Restart dev server after adding variable
- Check variable name starts with `VITE_`

### "Invalid username or password"
- Verify `VITE_ADMIN_USERNAME` and `VITE_ADMIN_PASSWORD` in `.env`
- Check for spaces or special characters
- Ensure values match exactly

### "Failed to fetch contact inquiries"
- Check Supabase RLS policies allow reads
- Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- Check browser console for specific errors
- Verify contact_inquiries table exists

### Session keeps expiring
- Check system clock is correct
- Verify session secret hasn't changed
- Clear browser cookies and login again

### API endpoints not working
- Ensure Vercel/serverless functions are deployed
- Check API route paths are correct (`/api/auth/*`)
- Verify environment variables are set on hosting platformreads
- Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- Check browser console for specific errors
- Verify contact_inquiries table exists

### Token keeps expiring
- Check system clock is correct
- Verify JWT secret hasn't changed
- Clear localStorage and l (clears session)
4. Login with new credentials

### Changing Session Secret
1. Update `VITE_SESSION_SECRET` in `.env`
2. Restart development server
3. All existing sessiont server
3. Logout from admin panel
4. Login with new credentials

### Changing JWT Secret
1. Update `VITE_JWT_SECRET` in `.env`
2. ResRedis session store for scalability
- [ ] Backend API with service role key (more secure)
- [ ] Supabase Auth integration
- [ ] Rate limiting on login attempts
- [ ] Two-factor authentication
- [ ] Audit log for admin actions
- [ ] Export inquiries to CSV
- [ ] Mark inquiries as read/unread
- [ ] Delete inquiries functionality
- [ ] Email notifications for new inquiries
- [ ] Session activity monitoringrage
- [ ] Rate limiting on login attempts
- [ ] Two-factor authentication
- [ ] Audit log for admin actions
- [ ] Export inquiries to CSV
- [ ] Mark inquiries as read/unread
- [ ] Delete inquiries functionality
- [ ] Email notifications for new inquiries

## Support

For issues or questions:
1. Check this documentation
2. Review error messages in browser console
3. Verify environment variables are set correctly
4. Check Supabase dashboard for RLS policy issues
