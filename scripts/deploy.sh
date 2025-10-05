#!/bin/bash

# New Family Tree - Deployment Script
# This script automates the deployment process

set -e  # Exit on error

echo "🚀 New Family Tree Deployment Script"
echo "===================================="
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
    echo "✅ Vercel CLI installed"
fi

# Check Node version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js 18+ required. Current version: $(node -v)"
    exit 1
fi
echo "✅ Node.js version check passed"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install
echo "✅ Dependencies installed"

# Run build test
echo ""
echo "🔨 Testing build..."
npm run build
echo "✅ Build successful"

# Run linting
echo ""
echo "🔍 Running linter..."
npm run lint || echo "⚠️  Linting warnings found (non-critical)"

# Deploy to Vercel
echo ""
echo "🚀 Deploying to Vercel..."
read -p "Deploy to production? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    vercel --prod
    echo ""
    echo "🎉 Deployment complete!"
    echo "📊 Check your dashboard: https://vercel.com/dashboard"
else
    echo "Deployment cancelled"
    exit 0
fi

# Post-deployment checks
echo ""
echo "📋 Post-Deployment Checklist:"
echo "  [ ] Test your live site"
echo "  [ ] Verify authentication works"
echo "  [ ] Check mobile responsiveness"
echo "  [ ] Review Vercel Analytics"
echo "  [ ] Set up custom domain (optional)"
echo ""
echo "🎊 Your site is live!"
