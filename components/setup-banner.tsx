"use client"

import { useState, useEffect } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { X, AlertTriangle, ExternalLink } from "lucide-react"
import { isSupabaseConfigured } from "@/lib/supabase"

export default function SetupBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [isConfigured, setIsConfigured] = useState(true)

  useEffect(() => {
    const configured = isSupabaseConfigured()
    setIsConfigured(configured)

    // Check if user has dismissed the banner
    const dismissed = localStorage.getItem("setup-banner-dismissed")
    if (!configured && !dismissed) {
      setIsVisible(true)
    }
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    localStorage.setItem("setup-banner-dismissed", "true")
  }

  if (!isVisible || isConfigured) {
    return null
  }

  return (
    <div className="fixed top-20 left-0 right-0 z-40 px-4">
      <Alert className="max-w-4xl mx-auto bg-yellow-500/10 border-2 border-yellow-500/50 text-slate-100 shadow-2xl">
        <AlertTriangle className="h-5 w-5 text-yellow-400" />
        <AlertTitle className="text-lg font-bold text-yellow-400 flex items-center justify-between">
          Setup Required - Database Not Connected
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDismiss}
            className="h-6 w-6 p-0 text-slate-400 hover:text-slate-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </AlertTitle>
        <AlertDescription className="mt-2 text-slate-300">
          <p className="mb-3">
            Your website is live but needs a database to enable user accounts. Setup takes less than 5 minutes.
          </p>
          <div className="flex gap-3 flex-wrap">
            <Button
              size="sm"
              className="btn-gold"
              onClick={() => window.open("https://supabase.com/dashboard/projects", "_blank")}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Setup Supabase Database
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-yellow-500/50 text-slate-100 bg-transparent hover:bg-yellow-500/10"
              onClick={() => window.open("/QUICK_SETUP.md", "_blank")}
            >
              View Setup Guide
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  )
}
