import * as LocalAuthentication from "expo-local-authentication"
import * as SecureStore from "expo-secure-store"

export async function isBiometricSupported(): Promise<boolean> {
  const compatible = await LocalAuthentication.hasHardwareAsync()
  return compatible
}

export async function isBiometricEnrolled(): Promise<boolean> {
  const enrolled = await LocalAuthentication.isEnrolledAsync()
  return enrolled
}

export async function authenticateWithBiometrics(): Promise<boolean> {
  try {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate to access your family",
      fallbackLabel: "Use passcode",
      disableDeviceFallback: false,
    })

    return result.success
  } catch (error) {
    console.error("Biometric authentication error:", error)
    return false
  }
}

export async function getBiometricType(): Promise<string> {
  const types = await LocalAuthentication.supportedAuthenticationTypesAsync()

  if (types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
    return "Face ID"
  } else if (types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
    return "Fingerprint"
  } else if (types.includes(LocalAuthentication.AuthenticationType.IRIS)) {
    return "Iris"
  }

  return "Biometric"
}

export async function saveBiometricPreference(enabled: boolean): Promise<void> {
  await SecureStore.setItemAsync("biometric_enabled", enabled.toString())
}

export async function getBiometricPreference(): Promise<boolean> {
  const value = await SecureStore.getItemAsync("biometric_enabled")
  return value === "true"
}
