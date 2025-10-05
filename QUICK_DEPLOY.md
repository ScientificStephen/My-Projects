# ⚡ Quick Deploy Guide - 5 Minutes

Get your New Family Tree website live in 5 minutes!

## 🚀 Three Simple Steps

### Step 1: Install Vercel CLI (1 minute)

\`\`\`bash
npm install -g vercel
\`\`\`

### Step 2: Login to Vercel (1 minute)

\`\`\`bash
vercel login
\`\`\`

Follow the prompts to authenticate.

### Step 3: Deploy! (3 minutes)

\`\`\`bash
vercel --prod
\`\`\`

**That's it!** Your site is now live! 🎉

---

## 📝 What You'll Get

- ✅ Free hosting
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Auto-scaling
- ✅ Your live URL: `https://new-family-tree-xxx.vercel.app`

---

## 🔐 Add Environment Variables

After deployment, add your Supabase credentials:

1. Go to [vercel.com](https://vercel.com)
2. Select your project
3. Go to "Settings" → "Environment Variables"
4. Add these variables:

\`\`\`
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
\`\`\`

5. Redeploy:
\`\`\`bash
vercel --prod
\`\`\`

---

## 🌐 Add Custom Domain (Optional)

1. Buy domain (e.g., newfamilytree.app)
2. In Vercel: "Settings" → "Domains"
3. Add your domain
4. Update DNS at registrar
5. Wait 1-24 hours for DNS propagation

---

## ✅ Test Your Site

Visit your site and verify:
- [ ] Homepage loads
- [ ] Can create account
- [ ] Can login
- [ ] Mobile responsive
- [ ] Images display

---

## 🆘 Need Help?

- Read full guide: See `DEPLOYMENT.md`
- Vercel docs: [vercel.com/docs](https://vercel.com/docs)
- Join Discord: [vercel.com/discord](https://vercel.com/discord)

---

**Congratulations!** Your site is live! 🎊

Share it with the world: `https://your-site.vercel.app`
\`\`\`

Create deployment scripts:
