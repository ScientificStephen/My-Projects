# 📱 App Store Deployment Guide

Complete guide to deploying **New Family Tree** to the Apple App Store and Google Play Store.

---

## 🎯 Prerequisites

### Required Accounts

1. **Apple Developer Account** ($99/year)
   - Sign up at: https://developer.apple.com/programs/
   - Processing time: 24-48 hours
   - Required for iOS deployment

2. **Google Play Developer Account** ($25 one-time)
   - Sign up at: https://play.google.com/console/signup
   - Processing time: 48 hours
   - Required for Android deployment

3. **Expo Account** (Free)
   - Sign up at: https://expo.dev
   - Required for EAS Build

### Required Tools

\`\`\`bash
# Install EAS CLI globally
npm install -g eas-cli

# Login to Expo
eas login

# Verify installation
eas whoami
\`\`\`

---

## 🍎 iOS Deployment (App Store)

### Step 1: Apple Developer Account Setup

1. **Enroll in Apple Developer Program**
   - Go to https://developer.apple.com/programs/enroll/
   - Complete enrollment ($99/year)
   - Wait for approval (24-48 hours)

2. **Create App Store Connect App**
   - Go to https://appstoreconnect.apple.com
   - Click "+" → "New App"
   - Fill in:
     - Platform: iOS
     - Name: "New Family Tree"
     - Primary Language: English
     - Bundle ID: `com.newfamilytree.app`
     - SKU: `new-family-tree-001`

3. **Configure App Information**
   - Category: Social Networking
   - Subcategory: Social Networking
   - Age Rating: 12+ (for social features)

### Step 2: Prepare App Assets

Create the following assets in the `assets` folder:

#### App Icon (1024x1024px)
\`\`\`bash
# iOS requires a single 1024x1024 icon
# Save as: assets/icon.png
# Format: PNG, no transparency
# Size: exactly 1024x1024 pixels
\`\`\`

#### Screenshots (Required Sizes)
- **6.5" Display** (iPhone 14 Pro Max, 15 Pro Max)
  - 1290 x 2796 pixels
  - At least 3 screenshots
  
- **5.5" Display** (iPhone 8 Plus)
  - 1242 x 2208 pixels
  - At least 3 screenshots

- **iPad Pro (12.9")** (Optional)
  - 2048 x 2732 pixels
  - At least 3 screenshots

#### App Preview Video (Optional)
- Maximum: 30 seconds
- Format: .mov, .m4v, or .mp4
- Orientation: Portrait

### Step 3: Build for iOS

\`\`\`bash
# Navigate to mobile app directory
cd mobile-app

# Configure project for EAS
eas build:configure

# Build for iOS (App Store)
eas build --platform ios --profile production

# This will:
# 1. Create iOS credentials
# 2. Generate provisioning profile
# 3. Build your app
# 4. Upload to EAS servers
\`\`\`

**Build time: 15-30 minutes**

### Step 4: Submit to App Store

#### Option A: Automatic Submission (Recommended)

\`\`\`bash
# Submit latest build to App Store
eas submit --platform ios --latest

# You'll be prompted for:
# - Apple ID
# - App-specific password (generate at appleid.apple.com)
# - App Store Connect App ID
\`\`\`

#### Option B: Manual Submission

1. Download `.ipa` file from EAS dashboard
2. Open Xcode → Window → Organizer
3. Drag `.ipa` into Organizer
4. Click "Distribute App" → "App Store Connect"
5. Follow prompts to upload

### Step 5: Complete App Store Listing

In App Store Connect:

1. **App Information**
   - Name: New Family Tree
   - Subtitle: Build the Family You Love
   - Privacy Policy URL: `https://newfamilytree.app/privacy`

2. **Promotional Text** (170 chars)
   \`\`\`
   You might not have been born with the family you want but here you can 
   build the family you love. Connect with your chosen family today.
   \`\`\`

3. **Description** (4000 chars max)
   \`\`\`
   NEW FAMILY TREE - BUILD YOUR CHOSEN FAMILY

   You might not have been born with the family you want but here you can 
   build the family you love.

   FEATURES:

   🌳 Build Your Family Tree
   Create a family tree based on love and choice, not just blood. Add parents, 
   siblings, grandparents, aunts, uncles, and friends who feel like family.

   💬 Chat Before Adding
   Get to know potential family members before connecting. Our unique "Chat 
   First" feature lets you build relationships naturally.

   📸 Share Memories
   Upload photos and videos to preserve precious family moments. Create a 
   digital memory book that lasts forever.

   📅 Family Calendar
   Never miss important dates - birthdays, anniversaries, and family gatherings. 
   Get reminders for events that matter.

   🔍 Discover Connections
   Find people looking for the same family relationships you are. Connect based 
   on shared values and life experiences.

   ✨ Safe & Secure
   Your privacy matters. All data is encrypted, and you control who sees your 
   information.

   "Family isn't always blood. It's the people in your life who want you in 
   theirs. The ones who accept you for who you are."

   Join 10,000+ people who have already found their chosen family.

   TESTIMONIALS:

   "After leaving an abusive family, I thought I'd always be alone. New Family 
   Tree helped me build a support system of 8 people who truly love me." 
   - Jennifer W.

   "As a single dad, I needed support. My kids now have 'aunts' and 'uncles' 
   who show up for birthdays and help with homework." - David T.

   Download now and start building the family you deserve.

   Founded by Alexian Scruggs
   \`\`\`

4. **Keywords** (100 chars)
   \`\`\`
   family,chosen family,social,community,connections,lgbtq,support,relationships
   \`\`\`

5. **Support URL**
   \`\`\`
   https://newfamilytree.app/support
   \`\`\`

6. **Marketing URL** (Optional)
   \`\`\`
   https://newfamilytree.app
   \`\`\`

7. **Copyright**
   \`\`\`
   © 2025 New Family Tree
   \`\`\`

### Step 6: App Review Information

1. **Contact Information**
   - First Name: [Your Name]
   - Last Name: [Your Last Name]
   - Phone: [Your Phone]
   - Email: [Your Email]

2. **Demo Account** (Required for social features)
   - Username: `demo@newfamilytree.app`
   - Password: `Demo2025!`
   - Notes: "This is a test account with pre-populated data"

3. **Notes for Review**
   \`\`\`
   Thank you for reviewing New Family Tree!

   KEY FEATURES TO TEST:
   1. Sign up flow (email or social)
   2. Create family tree
   3. Send connection request
   4. Chat feature
   5. Photo upload
   6. Calendar events

   DEMO CREDENTIALS:
   Email: demo@newfamilytree.app
   Password: Demo2025!

   The app uses Supabase for backend and all features are functional in 
   production.

   Please let us know if you need any clarification!
   \`\`\`

### Step 7: Submit for Review

1. Select your build
2. Fill in all required information
3. Accept Export Compliance (typically "No")
4. Click "Submit for Review"

**Review Time: 24-48 hours (average)**

---

## 🤖 Android Deployment (Google Play)

### Step 1: Google Play Console Setup

1. **Create Developer Account**
   - Go to https://play.google.com/console/signup
   - Pay $25 one-time fee
   - Complete identity verification

2. **Create Application**
   - Click "Create app"
   - Fill in:
     - App name: "New Family Tree"
     - Default language: English (United States)
     - App or game: App
     - Free or paid: Free

3. **Complete Privacy Policy**
   - URL: `https://newfamilytree.app/privacy`

### Step 2: Prepare Assets

#### App Icon
- Size: 512x512 pixels
- Format: PNG (32-bit)
- No transparency

#### Feature Graphic
- Size: 1024x500 pixels
- Format: PNG or JPEG
- Required for all apps

#### Screenshots (Required)
- **Phone**: 320px - 3840px (at least 2)
- **7" Tablet**: 600px - 7680px (at least 2)
- **10" Tablet**: 1280px - 7680px (optional)

#### App Video (Optional)
- YouTube URL of promotional video

### Step 3: Build for Android

\`\`\`bash
# Build Android App Bundle (AAB)
eas build --platform android --profile production

# Build time: 10-20 minutes

# Note: AAB is required for Play Store (not APK)
\`\`\`

### Step 4: Configure Google Play Services

1. **Create Firebase Project**
   - Go to https://console.firebase.google.com
   - Create new project: "New Family Tree"
   - Add Android app with package: `com.newfamilytree.app`
   - Download `google-services.json`
   - Place in `mobile-app/` root

2. **Configure Cloud Messaging (for notifications)**
   - Enable Cloud Messaging in Firebase
   - Add Server key to Expo

### Step 5: Submit to Play Store

#### Option A: Automatic Submission

\`\`\`bash
# Create service account
# Go to: https://console.cloud.google.com/iam-admin/serviceaccounts
# Create key → Download JSON

# Submit to Play Store
eas submit --platform android --latest

# You'll need:
# - Service account JSON key
# - Track: production, beta, or alpha
\`\`\`

#### Option B: Manual Submission

1. Download `.aab` file from EAS
2. Go to Play Console
3. Navigate to "Production" → "Create new release"
4. Upload `.aab` file
5. Add release notes
6. Review and rollout

### Step 6: Complete Store Listing

#### App Details

1. **App Name**
   \`\`\`
   New Family Tree - Build Your Chosen Family
   \`\`\`

2. **Short Description** (80 chars)
   \`\`\`
   Build the family you love. Connect with your chosen family today.
   \`\`\`

3. **Full Description** (4000 chars)
   \`\`\`
   [Same as iOS description above]
   \`\`\`

4. **Category**
   - App: Social
   - Tags: social networking, family, community

5. **Contact Details**
   - Email: support@newfamilytree.app
   - Phone: [Optional]
   - Website: https://newfamilytree.app

#### Content Rating

Complete the questionnaire:
- Violence: No
- Sexual Content: No
- Language: No
- Controlled Substances: No
- Gambling: No
- User Interaction: Yes (users can communicate)
- Personal Info Sharing: Yes (users can share profiles)
- Location: Yes (optional feature)

**Recommended Rating: PEGI 12, ESRB Teen**

#### Pricing & Distribution

1. **Price**: Free
2. **Countries**: All countries
3. **Contains Ads**: No
4. **In-app Purchases**: No (for initial release)

### Step 7: Submit for Review

1. Complete all required sections (marked with !)
2. Review and publish
3. Submit for review

**Review Time: 1-7 days (average 2-3 days)**

---

## 📋 Pre-Submission Checklist

### Both Platforms

- [ ] App tested on physical devices
- [ ] All features working correctly
- [ ] Crash logs checked and fixed
- [ ] Privacy policy live and accessible
- [ ] Terms of service live and accessible
- [ ] Support email active and monitored
- [ ] Demo/test account created
- [ ] Screenshots prepared
- [ ] App icon finalized (no transparency)
- [ ] Feature graphic created (Android)
- [ ] App description written and spell-checked
- [ ] Keywords researched and optimized
- [ ] Age rating appropriate
- [ ] All permissions justified in description

### iOS Specific

- [ ] Apple Developer Account active
- [ ] App Store Connect app created
- [ ] Bundle ID matches code
- [ ] App-specific password generated
- [ ] 6.5" and 5.5" screenshots ready
- [ ] Export compliance determined

### Android Specific

- [ ] Google Play Developer Account active
- [ ] google-services.json added
- [ ] Service account JSON created (for auto-submit)
- [ ] Feature graphic created (1024x500)
- [ ] Content rating questionnaire completed
- [ ] Store listing reviewed

---

## 🚀 Deployment Commands Quick Reference

\`\`\`bash
# Configure EAS
eas build:configure

# Build iOS (production)
eas build --platform ios --profile production

# Build Android (production)
eas build --platform android --profile production

# Build both platforms
eas build --platform all --profile production

# Submit iOS to App Store
eas submit --platform ios --latest

# Submit Android to Play Store
eas submit --platform android --latest

# Check build status
eas build:list

# View credentials
eas credentials
\`\`\`

---

## 🐛 Common Issues & Solutions

### Issue: Build Failed - Dependencies

\`\`\`bash
# Clear cache and rebuild
rm -rf node_modules
npm install
eas build --platform [ios/android] --clear-cache
\`\`\`

### Issue: iOS Provisioning Profile Error

\`\`\`bash
# Reset credentials
eas credentials -p ios
# Select: Delete credentials
# Then rebuild
\`\`\`

### Issue: Android Signing Key Error

\`\`\`bash
# Generate new keystore
eas credentials -p android
# Follow prompts to generate new signing key
\`\`\`

### Issue: Upload Failed

\`\`\`bash
# Try manual submission instead
# Download .ipa or .aab from EAS dashboard
# Upload manually through respective consoles
\`\`\`

### Issue: App Rejected - Crashes

1. Check crash logs in EAS dashboard
2. Fix issues in code
3. Increment version number
4. Rebuild and resubmit

---

## 📊 Post-Launch Checklist

### Immediately After Launch

- [ ] Monitor crash reports (Sentry/Firebase)
- [ ] Check user reviews daily
- [ ] Monitor app store analytics
- [ ] Set up alerts for critical issues
- [ ] Prepare response templates for reviews

### First Week

- [ ] Respond to all reviews
- [ ] Monitor performance metrics
- [ ] Check conversion rates
- [ ] Gather user feedback
- [ ] Plan first update

### Ongoing

- [ ] Weekly review monitoring
- [ ] Monthly analytics review
- [ ] Quarterly feature updates
- [ ] Annual subscription renewals (Apple Developer)

---

## 🔄 Updating Your App

### Version Number Format

- **Major.Minor.Patch** (e.g., 1.0.0)
- Major: Breaking changes
- Minor: New features
- Patch: Bug fixes

### Update Process

1. **Increment Version**
   \`\`\`json
   // app.json
   {
     "version": "1.0.1",  // User-facing
     "ios": {
       "buildNumber": "1.0.1"  // iOS build
     },
     "android": {
       "versionCode": 2  // Android version code
     }
   }
   \`\`\`

2. **Build New Version**
   \`\`\`bash
   eas build --platform all --profile production
   \`\`\`

3. **Submit Update**
   \`\`\`bash
   eas submit --platform all --latest
   \`\`\`

4. **Add Release Notes**
   - What's new
   - Bug fixes
   - Improvements

---

## 💰 Cost Summary

### One-Time Costs
- Google Play Developer: $25
- App assets/design: $0-500 (if outsourced)

### Annual Costs
- Apple Developer: $99/year
- EAS Build (optional): $0-$99/month
  - Free: 30 builds/month
  - Production: Unlimited builds

### Estimated Total First Year
- **Minimum**: $124 (both stores)
- **Recommended**: $224-$1,300 (with EAS subscription)

---

## 📞 Support Resources

### Documentation
- Expo Docs: https://docs.expo.dev
- App Store Connect: https://help.apple.com/app-store-connect
- Play Console: https://support.google.com/googleplay

### Communities
- Expo Forums: https://forums.expo.dev
- React Native Discord: https://discord.gg/react-native
- Stack Overflow: [react-native] [expo] tags

### Direct Support
- EAS Support: https://expo.dev/support
- Apple Developer Support: https://developer.apple.com/support
- Google Play Support: Via Play Console

---

## ✅ Success Metrics

Track these KPIs after launch:

- **Downloads**: Target 1,000 in first month
- **Active Users**: Target 60% retention in week 1
- **Crash-Free Rate**: Target >99%
- **Average Rating**: Target >4.0 stars
- **Review Response Time**: <24 hours

---

## 🎉 You're Ready to Deploy!

Follow this guide step-by-step and you'll have your app live on both stores within 1-2 weeks!

Good luck! 🚀
\`\`\`

Create a pre-submission test script:
