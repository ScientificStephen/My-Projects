// Test utilities for debugging features
export const testFeatures = {
  async testSupabaseConnection() {
    try {
      const { supabase } = await import("../services/supabase")
      const { data, error } = await supabase.from("profiles").select("*").limit(1)
      console.log("✅ Supabase connection:", { success: !error, data, error })
      return { success: !error, data, error }
    } catch (error) {
      console.error("❌ Supabase connection failed:", error)
      return { success: false, error }
    }
  },

  async testNotifications() {
    try {
      const { registerForPushNotificationsAsync } = await import("../services/notifications")
      const token = await registerForPushNotificationsAsync()
      console.log("✅ Push notifications:", { token })
      return { success: !!token, token }
    } catch (error) {
      console.error("❌ Push notifications failed:", error)
      return { success: false, error }
    }
  },

  async testBiometrics() {
    try {
      const { isBiometricSupported, isBiometricEnrolled } = await import("../services/biometrics")
      const supported = await isBiometricSupported()
      const enrolled = await isBiometricEnrolled()
      console.log("✅ Biometrics:", { supported, enrolled })
      return { success: true, supported, enrolled }
    } catch (error) {
      console.error("❌ Biometrics failed:", error)
      return { success: false, error }
    }
  },

  async testOfflineMode() {
    try {
      const { cacheData, getCachedData } = await import("../services/offline")
      await cacheData("test", { message: "Hello offline!" })
      const cached = await getCachedData("test")
      console.log("✅ Offline mode:", { cached })
      return { success: !!cached, cached }
    } catch (error) {
      console.error("❌ Offline mode failed:", error)
      return { success: false, error }
    }
  },

  async runAllTests() {
    console.log("🧪 Running all tests...\n")

    const results = {
      supabase: await this.testSupabaseConnection(),
      notifications: await this.testNotifications(),
      biometrics: await this.testBiometrics(),
      offline: await this.testOfflineMode(),
    }

    console.log("\n📊 Test Results:")
    Object.entries(results).forEach(([name, result]) => {
      const icon = result.success ? "✅" : "❌"
      console.log(`${icon} ${name}:`, result.success ? "PASSED" : "FAILED")
    })

    return results
  },
}

// Usage in any screen:
// import { testFeatures } from '../utils/testFeatures'
// testFeatures.runAllTests()
