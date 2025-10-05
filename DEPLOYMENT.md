# 🚀 New Family Tree - Deployment Guide

Complete guide to deploying your New Family Tree website to production.

## 📋 Table of Contents

1. [Quick Start (5 Minutes)](#quick-start)
2. [Platform Options](#platform-options)
3. [Vercel Deployment (Recommended)](#vercel-deployment)
4. [Environment Variables](#environment-variables)
5. [Custom Domain Setup](#custom-domain-setup)
6. [Post-Deployment](#post-deployment)
7. [Troubleshooting](#troubleshooting)

---

## ⚡ Quick Start

The fastest way to deploy:

\`\`\`bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
\`\`\`

That's it! Your site will be live in 3-5 minutes. ✨

---

## 🎯 Platform Options

### Option 1: Vercel (Recommended)
- ✅ **Cost**: FREE
- ✅ **Time**: 5 minutes
- ✅ **Auto SSL**: Yes
- ✅ **CDN**: Global
- ✅ **CI/CD**: Built-in
- ✅ **Support**: Excellent

### Option 2: Netlify
- ✅ **Cost**: FREE
- ⏱️ **Time**: 10 minutes
- ✅ **Auto SSL**: Yes
- ✅ **CDN**: Global

### Option 3: AWS Amplify
- 💰 **Cost**: Pay-as-you-go
- ⏱️ **Time**: 15 minutes
- ✅ **Auto SSL**: Yes
- ✅ **Scalability**: High

---

## 🚀 Vercel Deployment (Recommended)

### Step 1: Prerequisites

\`\`\`bash
# Check Node.js version (need 18+)
node --version

# Install dependencies
npm install

# Test build locally
npm run build
\`\`\`

### Step 2: Create Vercel Account

1. Go to [vercel.com/signup](https://vercel.com/signup)
2. Sign up with GitHub (recommended)
3. Verify your email

### Step 3: Deploy with CLI

\`\`\`bash
# Install Vercel CLI globally
npm install -g vercel

# Login
vercel login

# Deploy to production
vercel --prod
\`\`\`

### Step 4: Deploy with GitHub (Auto-Deploy)

\`\`\`bash
# 1. Push code to GitHub
git add .
git commit -m "Ready for deployment"
git push origin main

# 2. Import to Vercel
# - Go to vercel.com/new
# - Select your GitHub repo
# - Click "Deploy"
\`\`\`

**Benefits of GitHub deployment:**
- ✅ Auto-deploy on every push
- ✅ Preview deployments for PRs
- ✅ Rollback to any commit
- ✅ Team collaboration

---

## 🔐 Environment Variables

### Required Variables

Set these in Vercel Dashboard (Settings → Environment Variables):

\`\`\`bash
# Supabase (Database)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com
\`\`\`

### Optional Variables

\`\`\`bash
# Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Email (Optional - for contact forms)
RESEND_API_KEY=re_xxxxxxxxxxxxx
\`\`\`

### How to Add Variables in Vercel

1. Go to your project dashboard
2. Click "Settings" → "Environment Variables"
3. Add each variable with name and value
4. Select environments (Production, Preview, Development)
5. Click "Save"

### Setting Variables via CLI

\`\`\`bash
# Production
vercel env add NEXT_PUBLIC_SUPABASE_URL production

# Preview
vercel env add NEXT_PUBLIC_SUPABASE_URL preview

# Development
vercel env add NEXT_PUBLIC_SUPABASE_URL development
\`\`\`

---

## 🌐 Custom Domain Setup

### Step 1: Purchase Domain

**Recommended registrars:**
- Namecheap (from $8.88/year)
- Google Domains (from $12/year)
- Cloudflare (at cost pricing)

### Step 2: Add Domain to Vercel

1. Go to project → "Settings" → "Domains"
2. Enter your domain name
3. Click "Add"

### Step 3: Configure DNS

**Option A: Vercel Nameservers (Easiest)**

Change nameservers at your registrar to:
\`\`\`
ns1.vercel-dns.com
ns2.vercel-dns.com
\`\`\`

**Option B: CNAME Record (Alternative)**

Add this CNAME record at your registrar:
\`\`\`
Type: CNAME
Name: @  (or www)
Value: cname.vercel-dns.com
\`\`\`

### Step 4: Wait for Propagation

- DNS changes take 0-48 hours
- Usually complete in 1-2 hours
- Check status: `nslookup your-domain.com`

### Step 5: Enable HTTPS

Vercel automatically provisions SSL certificates. No action needed!

---

## 📊 Post-Deployment Checklist

### Immediate Tasks (Day 1)

- [ ] Test all pages and features
- [ ] Verify mobile responsiveness
- [ ] Check loading speeds (PageSpeed Insights)
- [ ] Test authentication flow
- [ ] Verify database connections
- [ ] Check image optimization
- [ ] Test form submissions
- [ ] Review error monitoring

### First Week Tasks

- [ ] Set up Google Analytics
- [ ] Configure SEO (sitemap, meta tags)
- [ ] Add Google Search Console
- [ ] Set up uptime monitoring
- [ ] Create backup strategy
- [ ] Review performance metrics
- [ ] Monitor error logs
- [ ] Test on different devices/browsers

### Ongoing Maintenance

- [ ] Weekly: Review analytics
- [ ] Weekly: Check error logs
- [ ] Monthly: Security updates
- [ ] Monthly: Performance optimization
- [ ] Quarterly: User feedback review

---

## 🔍 Monitoring & Analytics

### Built-in Vercel Analytics

Vercel provides free analytics:
- Page views
- Unique visitors
- Top pages
- Geographic distribution
- Performance metrics

### Add Google Analytics

1. Create GA4 property at [analytics.google.com](https://analytics.google.com)
2. Copy Measurement ID (G-XXXXXXXXXX)
3. Add to environment variables:
   \`\`\`bash
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   \`\`\`

### Error Tracking (Optional)

Consider adding Sentry for error tracking:
\`\`\`bash
npm install @sentry/nextjs
npx @sentry/wizard -i nextjs
\`\`\`

---

## 🐛 Troubleshooting

### Build Failures

**Issue:** Build fails with TypeScript errors
\`\`\`bash
# Solution: Fix type errors locally first
npm run build
\`\`\`

**Issue:** Missing dependencies
\`\`\`bash
# Solution: Install all dependencies
npm install
\`\`\`

### Environment Variable Issues

**Issue:** Variables not loading
- Check variable names match exactly
- Verify they're set for correct environment
- Redeploy after adding variables

### Domain Issues

**Issue:** Domain not connecting
- Wait 24-48 hours for DNS propagation
- Verify DNS records are correct
- Check nameservers at registrar

**Issue:** SSL certificate not working
- Usually resolves automatically within 24 hours
- Contact Vercel support if persists

### Performance Issues

**Issue:** Slow page loads
- Check image optimization
- Review bundle size
- Enable caching
- Use Vercel Analytics to identify bottlenecks

---

## 📞 Support Resources

### Vercel Support
- Documentation: [vercel.com/docs](https://vercel.com/docs)
- Community: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)
- Support: support@vercel.com

### Next.js Support
- Documentation: [nextjs.org/docs](https://nextjs.org/docs)
- Community: [github.com/vercel/next.js/discussions](https://github.com/vercel/next.js/discussions)

### Emergency Rollback

If something goes wrong:
\`\`\`bash
# Rollback to previous deployment
vercel rollback
\`\`\`

Or in Vercel Dashboard:
1. Go to "Deployments"
2. Find working deployment
3. Click "..." → "Promote to Production"

---

## 🎉 Success Checklist

Your site is successfully deployed when:

- ✅ Site loads at your domain
- ✅ All pages accessible
- ✅ Authentication works
- ✅ Database connections active
- ✅ Images loading properly
- ✅ Mobile responsive
- ✅ SSL certificate active (https://)
- ✅ No console errors
- ✅ Forms submitting correctly
- ✅ Fast load times (<3s)

---

## 🚀 Next Steps After Deployment

1. **Marketing**: Share on social media
2. **SEO**: Submit sitemap to Google
3. **Analytics**: Monitor traffic
4. **Feedback**: Collect user input
5. **Iterate**: Plan next features

Congratulations! Your New Family Tree is now live! 🎊
