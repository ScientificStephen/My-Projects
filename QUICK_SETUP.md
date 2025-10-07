# Quick Setup Guide - Get Your App Working in 5 Minutes

## Current Status
Your website is live but needs a database connection for user accounts. Follow these steps:

## Step 1: Create Supabase Project (2 minutes)

1. Go to **[supabase.com](https://supabase.com)** and click "Start your project"
2. Sign in with GitHub (easiest)
3. Click "New Project"
4. Fill in:
   - **Name**: new-family-tree
   - **Database Password**: (create a strong password and save it)
   - **Region**: Choose closest to you
5. Click "Create new project"
6. Wait 1-2 minutes for setup

## Step 2: Get Your Keys (30 seconds)

1. In your Supabase project, go to **Settings** (⚙️ icon on left sidebar)
2. Click **API** in the settings menu
3. You'll see two important values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)
4. Keep this tab open for the next step

## Step 3: Add Keys to Vercel (1 minute)

### Option A: Via Vercel Dashboard
1. Go to your Vercel project
2. Click **Settings** tab
3. Click **Environment Variables** in left menu
4. Add two variables:
   - Name: `NEXT_PUBLIC_SUPABASE_URL` → Value: (paste your Project URL)
   - Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY` → Value: (paste your anon key)
5. Click **Save**

### Option B: Via Vercel Integration (Automatic)
1. In Vercel project, click **Integrations** tab
2. Search for "Supabase"
3. Click "Add Integration"
4. Follow prompts to connect
5. Done! (Variables added automatically)

## Step 4: Setup Database (1 minute)

1. In Supabase, go to **SQL Editor** (left sidebar)
2. Click **New Query**
3. Copy the entire SQL script from `scripts/01-create-tables.sql`
4. Paste into the editor
5. Click **Run** (or press Cmd/Ctrl + Enter)
6. You should see "Success" message

## Step 5: Redeploy (30 seconds)

### Option A: Git Push
\`\`\`bash
git add .
git commit -m "Add Supabase config"
git push origin main
\`\`\`

### Option B: Manual Redeploy
1. Go to Vercel dashboard
2. Click **Deployments** tab
3. Click ⋮ menu on latest deployment
4. Click **Redeploy**

## Step 6: Test It! (30 seconds)

1. Visit your live site
2. Click "Get Started"
3. Create an account
4. Check your email for verification link
5. 🎉 You're done!

---

## Troubleshooting

### "Setup Required" message still shows
- Make sure environment variables are named **exactly** as shown
- They MUST start with `NEXT_PUBLIC_`
- Click "Redeploy" in Vercel after adding variables

### "Invalid API key" error
- You copied the wrong key - use the **anon public** key, not service_role
- Check for extra spaces when copying/pasting

### SQL script fails
- Make sure you copied the ENTIRE script
- Run it in Supabase SQL Editor, not locally

### Email not received
- Check spam folder
- Wait 1-2 minutes
- In Supabase, go to Authentication → Settings to configure email

---

## What You Get After Setup

✅ Working user sign-up
✅ Email verification
✅ Secure login/logout
✅ User profiles
✅ Database for family members
✅ Ready for posts and photos
✅ Production-ready and scalable

## Need Help?

- Supabase Docs: [supabase.com/docs](https://supabase.com/docs)
- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)

**Total setup time: ~5 minutes** ⚡
