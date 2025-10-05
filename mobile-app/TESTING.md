# Testing the New Family Tree Mobile App

This guide will help you test the app on a physical device or simulator.

## Prerequisites

### For iOS Testing
- Mac computer with Xcode installed
- iOS device (iPhone/iPad) OR iOS Simulator
- Apple Developer Account (for physical device testing)
- Expo Go app installed on your device

### For Android Testing
- Android device OR Android emulator
- Expo Go app installed on your device
- Android Studio (optional, for emulator)

## Setup Steps

### 1. Install Dependencies

\`\`\`bash
cd mobile-app
npm install
\`\`\`

### 2. Set Up Environment Variables

Create a `.env` file in the `mobile-app` directory:

\`\`\`env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
\`\`\`

### 3. Start the Development Server

\`\`\`bash
npm start
\`\`\`

This will open the Expo Dev Tools in your browser and show a QR code.

## Testing on Physical Device

### iOS (iPhone/iPad)

1. **Install Expo Go** from the App Store
2. **Open Camera app** and scan the QR code shown in your terminal
3. Tap the notification to open in Expo Go
4. The app will load and you can start testing

### Android

1. **Install Expo Go** from Google Play Store
2. **Open Expo Go app**
3. Tap "Scan QR Code"
4. Scan the QR code shown in your terminal
5. The app will load and you can start testing

## Testing on Simulator/Emulator

### iOS Simulator (Mac only)

\`\`\`bash
npm run ios
\`\`\`

This will:
- Build the app
- Launch iOS Simulator
- Install and run the app

### Android Emulator

1. **Start Android Emulator** from Android Studio
2. Run:
\`\`\`bash
npm run android
\`\`\`

## Testing Checklist

### 🏠 Feed Screen
- [ ] Hero banner displays correctly
- [ ] Posts render with images
- [ ] Can scroll through posts
- [ ] Like/comment buttons are clickable
- [ ] Social share button works

### 🔍 Discover Screen
- [ ] Potential connections display
- [ ] Search functionality works
- [ ] "Chat First" button navigates to chat
- [ ] "Connect" button opens request modal
- [ ] Request message can be typed and sent
- [ ] Tabs switch between Discover and Requests

### 💬 Messages Screen
- [ ] Conversations list displays
- [ ] Unread count badges show
- [ ] Tapping conversation opens chat
- [ ] Real-time message updates work

### 💬 Chat Screen
- [ ] Messages display correctly
- [ ] Can send new messages
- [ ] Pending connection banner shows
- [ ] Messages scroll properly
- [ ] Keyboard behavior is correct

### 📅 Events Screen
- [ ] Calendar displays
- [ ] Upcoming events show
- [ ] Can create new event
- [ ] Event types can be selected
- [ ] Events for selected date display
- [ ] Can delete events

### 🌳 Tree Screen
- [ ] Family members display by generation
- [ ] Search functionality works
- [ ] Member cards are clickable
- [ ] Stats card shows correct data
- [ ] Quote card displays

### 👤 Profile Screen
- [ ] Avatar displays
- [ ] Stats show correctly
- [ ] Contact info displays
- [ ] Settings button navigates
- [ ] Photo upload works (camera/library)

### ⚙️ Settings Screen
- [ ] Offline toggle works
- [ ] Cache size displays
- [ ] Clear cache works
- [ ] Biometric toggle works (on supported devices)
- [ ] Settings persist after app restart

## Feature-Specific Testing

### Chat Before Adding Feature

1. **Go to Discover tab**
2. **Find a potential connection**
3. **Tap "Chat First"** - should open chat with pending banner
4. **Send messages** - should work even without connection
5. **Go back to Discover**
6. **Tap "Connect"** - should show request modal
7. **Send connection request**
8. **Check Messages tab** - should show the conversation
9. **Check Requests tab** - should show pending request

### Photo Upload

1. **Go to Profile screen**
2. **Tap camera button on avatar**
3. **Choose "Take Photo"**
   - Grant camera permission if asked
   - Take photo
   - Confirm photo updates
4. **Tap camera button again**
5. **Choose "Choose from Library"**
   - Grant photos permission if asked
   - Select photo
   - Confirm photo updates

### Events & Calendar

1. **Go to Events tab**
2. **Tap + button**
3. **Fill in event details**
4. **Select event type**
5. **Create event**
6. **Verify event appears in calendar**
7. **Tap date with event**
8. **Verify event shows in list**
9. **Delete event**

### Offline Mode

1. **Go to Settings**
2. **Enable Offline Access**
3. **Browse the app** (data should cache)
4. **Turn off WiFi/Data**
5. **Restart app**
6. **Verify cached data displays**
7. **Check Cache Size in Settings**
8. **Clear Cache**
9. **Verify cache size resets**

### Biometric Authentication

1. **Go to Settings**
2. **Enable Biometric Authentication**
3. **Authenticate with Face ID/Touch ID**
4. **Restart app**
5. **Verify authentication prompt appears**
6. **Authenticate successfully**
7. **App should open**

## Performance Testing

### Load Testing
- [ ] App loads within 3 seconds
- [ ] Images load progressively
- [ ] Scrolling is smooth (60fps)
- [ ] Animations are fluid
- [ ] No lag when typing

### Memory Testing
- [ ] Check memory usage in Xcode/Android Studio
- [ ] Should stay under 150MB for iOS
- [ ] Should stay under 200MB for Android
- [ ] No memory leaks during navigation

### Battery Testing
- [ ] Use app for 30 minutes
- [ ] Battery drain should be < 10%
- [ ] App shouldn't cause device to heat up

## Common Issues & Solutions

### Issue: QR Code Not Scanning
**Solution**: 
- Make sure phone and computer are on same WiFi
- Try restarting the dev server
- Use "Scan QR Code" option in Expo Go app

### Issue: App Crashes on Launch
**Solution**:
- Clear Expo cache: `expo start -c`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check error logs in Expo Dev Tools

### Issue: White Screen
**Solution**:
- Check console for errors
- Verify all imports are correct
- Restart dev server

### Issue: Images Not Loading
**Solution**:
- Check file paths are correct
- Verify image files exist
- Check network permissions

### Issue: Push Notifications Not Working
**Solution**:
- Only works on physical devices, not simulators
- Check notification permissions
- Verify push token is generated

### Issue: Biometric Not Available
**Solution**:
- Only works on devices with biometric hardware
- Enable Face ID/Touch ID in device settings
- Grant biometric permission to app

## Reporting Issues

When reporting issues, include:
1. Device model and OS version
2. Steps to reproduce
3. Expected vs actual behavior
4. Screenshots/screen recording
5. Console logs from Expo Dev Tools

## Next Steps After Testing

Once testing is complete:

1. **Review all checked items**
2. **Document any bugs found**
3. **Prioritize fixes**
4. **Test fixes**
5. **Prepare for production build**

## Production Build Testing

For production builds:

\`\`\`bash
# iOS
eas build --platform ios --profile preview

# Android  
eas build --platform android --profile preview
\`\`\`

Then test the production build thoroughly before submitting to app stores.
\`\`\`

Now let's create a quick start script:
