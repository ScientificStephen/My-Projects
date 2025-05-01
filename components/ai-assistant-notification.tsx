"use client"

import { useState, useEffect } from "react"
import { X, MessageCircleIcon as MessageCircleHelp } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AiAssistantNotification() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    // Check if the notification has been dismissed before
    const dismissed = localStorage.getItem("aiNotificationDismissed")
    if (dismissed) {
      setIsDismissed(true)
      return
    }

    // Show notification after a delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    // Remember that the user dismissed the notification
    localStorage.setItem("aiNotificationDismissed", "true")

    // After animation completes, update state
    setTimeout(() => {
      setIsDismissed(true)
    }, 500)
  }

  if (isDismissed) return null

  return (
    <div
      className={`fixed bottom-24 left-6 bg-orange-500 text-white p-4 rounded-lg shadow-lg max-w-xs z-50 flex items-start gap-3 transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <MessageCircleHelp className="h-5 w-5 mt-0.5 flex-shrink-0" />
      <div className="flex-1">
        <p className="font-medium">Need help shopping?</p>
        <p className="text-sm mt-1">Our AI employee is ready to assist you! Click the chat icon in the corner.</p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 rounded-full -mt-1 -mr-1 text-white hover:bg-orange-600"
        onClick={handleDismiss}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Dismiss</span>
      </Button>
    </div>
  )
}
