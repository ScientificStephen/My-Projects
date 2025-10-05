# Deployment Guide for New Family Tree Mobile App

## Prerequisites

1. **Expo Account**: Sign up at https://expo.dev
2. **Apple Developer Account**: Required for iOS ($99/year)
3. **Google Play Developer Account**: Required for Android ($25 one-time)
4. **EAS CLI**: Install with `npm install -g eas-cli`

## Setup

### 1. Configure EAS

\`\`\`bash
cd mobile-app
eas login
eas build:configure
\`\`\`

### 2. Set Environment Variables

Create `.env` file:
\`\`\`
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
\`\`\`

### 3. Update app.json

Update these fields:
- `expo.owner`: Your Expo username
- `expo.extra.eas.projectId`: Your EAS project ID
- `expo.ios.bundleIdentifier`: Your iOS bundle ID
- `expo.android.package`: Your Android package name

## Building

### iOS Build

\`\`\`bash
# Development build
eas build --platform ios --profile development

# Production build for App Store
eas build --platform ios --profile production
\`\`\`

### Android Build

\`\`\`bash
# Development build
eas build --platform android --profile development

# Production build for Play Store
eas build --platform android --profile production
\`\`\`

## Submission

### iOS App Store

1. Create app in App Store Connect
2. Configure app information
3. Submit build:

\`\`\`bash
eas submit --platform ios --latest
\`\`\`

### Google Play Store

1. Create app in Google Play Console
2. Create service account JSON key
3. Submit build:

\`\`\`bash
eas submit --platform android --latest
\`\`\`

## Push Notifications Setup

### iOS

1. Enable Push Notifications in Apple Developer Portal
2. Download APNs key (.p8 file)
3. Upload to Expo: `eas credentials`

### Android

1. Set up Firebase Cloud Messaging
2. Download `google-services.json`
3. Place in project root
4. Upload to Expo: `eas credentials`

## App Store Optimization

### iOS

- App Name: "New Family Tree"
- Subtitle: "Build the Family You Love"
- Keywords: family, chosen family, community, social, connections
- Category: Social Networking
- Screenshots: Required (5.5", 6.5" iPhone, 12.9" iPad)

### Android

- Title: "New Family Tree - Chosen Family"
- Short Description: "Build meaningful connections with chosen family members"
- Full Description: Include all features
- Category: Social
- Screenshots: Required (Phone, 7" Tablet, 10" Tablet)

## Post-Launch

### Monitor

- Crash reports in Sentry/Expo
- Push notification delivery rates
- User engagement metrics
- App Store reviews

### Update

\`\`\`bash
# Over-the-air update
eas update --branch production --message "Bug fixes"
\`\`\`

### Versioning

Update in app.json:
- `version`: User-facing version (1.0.1)
- `ios.buildNumber`: iOS build number
- `android.versionCode`: Android version code

## Troubleshooting

### Build Failures

- Check expo-doctor: `npx expo-doctor`
- Verify all dependencies are compatible
- Check EAS build logs

### Push Notifications Not Working

- Verify credentials in `eas credentials`
- Test on physical device (not simulator)
- Check Expo push notification tool

### App Rejected

- Review App Store/Play Store guidelines
- Address rejection reasons
- Resubmit after fixes

## Support

- Expo Docs: https://docs.expo.dev
- EAS Build: https://docs.expo.dev/build/introduction
- EAS Submit: https://docs.expo.dev/submit/introduction
