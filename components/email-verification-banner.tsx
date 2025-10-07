"use client"

import { useState, useEffect } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Mail, X, RefreshCw } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { resendVerificationEmail } from "@/lib/auth"

export default function EmailVerificationBanner() {
  const { user, refreshUser } = useAuth()
  const [isVisible, setIsVisible] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [resendMessage, setResendMessage] = useState<string | null>(null)

  useEffect(() => {
    // Show banner if user is logged in but email not verified
    if (user && !user.email_confirmed_at) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }, [user])

  const handleResend = async () => {
    setIsResending(true)
    setResendMessage(null)

    try {
      await resendVerificationEmail()
      setResendMessage("Verification email sent! Check your inbox.")
    } catch (error: any) {
      setResendMessage(error.message || "Failed to send email. Please try again.")
    } finally {
      setIsResending(false)
    }
  }

  const handleRefresh = async () => {
    await refreshUser()
  }

  if (!isVisible) {
    return null
  }

  return (
    <div className="fixed top-20 left-0 right-0 z-40 px-4">
      <Alert className="max-w-4xl mx-auto bg-blue-500/10 border-2 border-blue-500/50 text-slate-100 shadow-2xl">
        <Mail className="h-5 w-5 text-blue-400" />
        <AlertTitle className="text-lg font-bold text-blue-400 flex items-center justify-between">
          Please Verify Your Email
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
            className="h-6 w-6 p-0 text-slate-400 hover:text-slate-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </AlertTitle>
        <AlertDescription className="mt-2 text-slate-300">
          <p className="mb-3">
            We sent a verification link to <strong className="text-blue-400">{user?.email}</strong>. Please check your
            inbox (and spam folder) and click the link to activate your account.
          </p>

          {resendMessage && (
            <p className="mb-3 text-sm text-green-400 bg-green-500/10 border border-green-500/30 rounded p-2">
              {resendMessage}
            </p>
          )}

          <div className="flex gap-3 flex-wrap">
            <Button
              size="sm"
              onClick={handleResend}
              disabled={isResending}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isResending ? "animate-spin" : ""}`} />
              {isResending ? "Sending..." : "Resend Verification Email"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-blue-500/50 text-slate-100 bg-transparent hover:bg-blue-500/10"
              onClick={handleRefresh}
            >
              I've Verified - Refresh
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  )
}
