# Troubleshooting Guide

## Installation Issues

### Error: Cannot find module
\`\`\`bash
# Clear cache and reinstall
rm -rf node_modules
rm package-lock.json
npm install
expo start --clear
\`\`\`

### Error: Metro bundler issues
\`\`\`bash
# Reset Metro bundler cache
npx expo start --clear
# or
watchman watch-del-all
rm -rf $TMPDIR/react-*
\`\`\`

## Development Issues

### White Screen on Launch
1. Check Metro bundler is running
2. Look for errors in terminal
3. Verify all imports are correct
4. Try:
\`\`\`bash
expo start --clear
\`\`\`

### Images Not Displaying
1. Check file paths
2. Verify images are in correct directory
3. Use `require()` for local images
4. Check image permissions

### Navigation Not Working
1. Verify NavigationContainer wraps app
2. Check screen names match navigation calls
3. Verify all screens are registered
4. Check TypeScript types

## Device-Specific Issues

### iOS Simulator

**App crashes on launch:**
\`\`\`bash
# Reset simulator
xcrun simctl erase all
\`\`\`

**Keyboard not showing:**
- Hardware → Keyboard → Toggle Software Keyboard

**Camera not working:**
- Simulators don't have camera access
- Use physical device for camera features

### Android Emulator

**App crashes on launch:**
\`\`\`bash
# Clear emulator data
adb shell pm clear host.exp.exponent
\`\`\`

**Slow performance:**
- Increase emulator RAM in AVD Manager
- Enable hardware acceleration
- Use ARM64 system image

**Network issues:**
- Check emulator internet connection
- Use 10.0.2.2 for localhost on emulator

## Feature-Specific Issues

### Push Notifications

**Notifications not appearing:**
1. Check device has notification permissions
2. Verify push token is generated
3. Test on physical device (not simulator)
4. Check Expo push notification dashboard

**Solution:**
\`\`\`typescript
// Check notification permissions
const { status } = await Notifications.getPermissionsAsync()
console.log('Notification permission:', status)

// Request if not granted
if (status !== 'granted') {
  await Notifications.requestPermissionsAsync()
}
\`\`\`

### Biometric Authentication

**Face ID/Touch ID not working:**
1. Only works on physical devices
2. Requires biometric setup in device settings
3. Check app has biometric permission

**Solution:**
\`\`\`typescript
// Check biometric availability
const compatible = await LocalAuthentication.hasHardwareAsync()
const enrolled = await LocalAuthentication.isEnrolledAsync()
console.log('Biometric available:', compatible && enrolled)
\`\`\`

### Photo Upload

**Camera permission denied:**
1. Go to device Settings
2. Find app
3. Enable Camera permission
4. Restart app

**Photos not saving:**
1. Check storage permissions
2. Verify Supabase configuration
3. Check internet connection
4. Look for console errors

### Real-time Messaging

**Messages not updating in real-time:**
1. Check Supabase Realtime is enabled
2. Verify channel subscriptions
3. Check internet connection
4. Look for WebSocket errors

**Solution:**
\`\`\`typescript
// Test Realtime connection
const channel = supabase.channel('test')
channel.subscribe((status) => {
  console.log('Realtime status:', status)
})
\`\`\`

## Build Issues

### EAS Build Errors

**Build fails with dependencies:**
\`\`\`bash
# Clean install
rm -rf node_modules
npm install
eas build --platform [ios|android] --clear-cache
\`\`\`

**Build times out:**
1. Check EAS build queue
2. Verify plan limits
3. Try building again later

### App Store Submission

**App rejected for missing info:**
1. Update app.json with all required fields
2. Add privacy policy URL
3. Include app description
4. Add screenshots

## Database Issues

### Supabase Connection

**Cannot connect to Supabase:**
1. Verify environment variables
2. Check API keys are correct
3. Test connection:
\`\`\`typescript
const { data, error } = await supabase.from('profiles').select('*').limit(1)
console.log('Supabase test:', { data, error })
\`\`\`

**RLS policies blocking queries:**
1. Check Row Level Security policies
2. Verify user is authenticated
3. Test queries in Supabase dashboard

## Performance Issues

### Slow App Performance

**General slowness:**
1. Enable Hermes JavaScript engine
2. Optimize images (compress, resize)
3. Use FlatList instead of ScrollView for long lists
4. Implement pagination
5. Use React.memo for components

**Memory leaks:**
1. Unsubscribe from listeners in cleanup
2. Cancel pending promises
3. Clear intervals/timeouts
4. Use React DevTools Profiler

### Slow Image Loading

\`\`\`typescript
// Use optimized images
<Image
  source={{ uri: imageUrl }}
  style={styles.image}
  resizeMode="cover"
  loadingIndicatorSource={require('./loading.gif')}
/>
\`\`\`

## Debug Tools

### Expo Dev Tools

\`\`\`bash
# Open in browser
expo start

# Then press:
# - j for debugger
# - m for menu
# - r to reload
# - shift-r to reload and clear cache
\`\`\`

### React Native Debugger

1. Install: `brew install react-native-debugger`
2. Start app: `expo start`
3. Press `j` to open debugger
4. View console, network, Redux

### Flipper (Advanced)

1. Install Flipper desktop app
2. Connect device
3. View logs, network, databases
4. Debug layout issues

## Getting Help

### Before Asking for Help

1. Check console logs
2. Search error message on Google
3. Check Expo documentation
4. Look at GitHub issues

### When Asking for Help

Include:
1. Device model and OS version
2. Expo SDK version
3. Full error message
4. Steps to reproduce
5. Code snippet
6. Screenshots

### Resources

- [Expo Documentation](https://docs.expo.dev)
- [React Native Documentation](https://reactnative.dev)
- [Expo Forums](https://forums.expo.dev)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/expo)
- [GitHub Issues](https://github.com/expo/expo/issues)
\`\`\`

Create a quick test runner script:
