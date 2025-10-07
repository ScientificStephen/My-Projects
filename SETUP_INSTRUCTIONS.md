# Setup Instructions for New Family Tree

## 1. Install Dependencies

First, install the required Supabase package:

\`\`\`bash
npm install @supabase/supabase-js
\`\`\`

## 2. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Create a new project
4. Wait for the project to be ready (~2 minutes)

## 3. Get Supabase Credentials

In your Supabase project dashboard:

1. Go to **Settings** → **API**
2. Copy the **Project URL** (looks like: `https://xxxxx.supabase.co`)
3. Copy the **anon/public key** (starts with `eyJ...`)

## 4. Add Environment Variables

In your Vercel project (or locally in `.env.local`):

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
\`\`\`

**Important:** These must start with `NEXT_PUBLIC_` to work in the browser!

## 5. Run Database Setup

In Supabase Dashboard:

1. Go to **SQL Editor**
2. Click **New Query**
3. Copy the contents from `scripts/01-create-tables.sql`
4. Paste into the SQL Editor
5. Click **Run**

This will create:
- `profiles` table
- `family_members` table
- `posts` table
- Row Level Security policies
- Auto-create profile trigger

## 6. Enable Email Auth

In Supabase Dashboard:

1. Go to **Authentication** → **Providers**
2. Ensure **Email** is enabled
3. (Optional) Configure **Email Templates** for custom branding

## 7. Test Locally

\`\`\`bash
npm run dev
\`\`\`

Visit `http://localhost:3000` and try:
1. Click "Get Started"
2. Sign up with an email
3. Check your email for verification link
4. Log in and use the app!

## 8. Deploy to Production

\`\`\`bash
# Deploy to Vercel
vercel --prod

# Or push to GitHub (if connected to Vercel)
git add .
git commit -m "Add Supabase authentication"
git push origin main
\`\`\`

## 9. Add Environment Variables to Vercel

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add both variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Click **Save**
5. Redeploy your project

## Troubleshooting

### "Invalid API key" error
- Make sure you copied the **anon/public** key, not the service role key
- Check that environment variables start with `NEXT_PUBLIC_`

### Database errors
- Verify you ran the SQL script in Supabase
- Check Row Level Security policies are enabled

### Email not sending
- Check spam folder
- Verify email settings in Supabase Authentication settings

## What's Working Now

✅ User sign up with email
✅ Email verification
✅ User login
✅ Session management
✅ Automatic profile creation
✅ Protected routes
✅ Database ready for family members and posts

## Next Steps

- Add profile editing
- Implement family member adding
- Create post functionality
- Add real-time features
\`\`\`
