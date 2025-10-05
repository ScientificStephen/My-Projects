import * as Notifications from "expo-notifications"
import * as Device from "expo-device"
import Constants from "expo-constants"
import { Platform } from "react-native"

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
})

export async function registerForPushNotificationsAsync() {
  let token

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#d4af37",
    })
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }

    if (finalStatus !== "granted") {
      return null
    }

    try {
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: Constants.expoConfig?.extra?.eas?.projectId,
        })
      ).data
    } catch (error) {
      console.error("Error getting push token:", error)
      return null
    }
  }

  return token
}

export async function scheduleFamilyUpdateNotification(memberName: string, action: string) {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Family Update 💛",
        body: `${memberName} ${action}`,
        data: { type: "family_update" },
        sound: true,
      },
      trigger: null,
    })
  } catch (error) {
    console.error("Error scheduling notification:", error)
  }
}

export async function scheduleMessageNotification(senderName: string, message: string) {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `${senderName}`,
        body: message,
        data: { type: "message" },
        sound: true,
      },
      trigger: null,
    })
  } catch (error) {
    console.error("Error scheduling notification:", error)
  }
}
