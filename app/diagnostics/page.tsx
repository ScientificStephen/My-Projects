"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, AlertCircle, Loader2, RefreshCw } from "lucide-react"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"

type CheckStatus = "loading" | "success" | "error" | "warning"

interface Check {
  name: string
  status: CheckStatus
  message: string
  details?: string
}

export default function DiagnosticsPage() {
  const [checks, setChecks] = useState<Check[]>([])
  const [isRunning, setIsRunning] = useState(false)

  const runDiagnostics = async () => {
    setIsRunning(true)
    const results: Check[] = []

    // Check 1: Environment Variables
    try {
      const hasUrl = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL)
      const hasKey = Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

      if (hasUrl && hasKey) {
        results.push({
          name: "Environment Variables",
          status: "success",
          message: "Environment variables are set correctly",
          details: `URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30)}...`,
        })
      } else {
        results.push({
          name: "Environment Variables",
          status: "error",
          message: "Missing environment variables",
          details: `URL: ${hasUrl ? "✓" : "✗"} | Key: ${hasKey ? "✓" : "✗"}`,
        })
      }
    } catch (error) {
      results.push({
        name: "Environment Variables",
        status: "error",
        message: "Failed to check environment variables",
      })
    }

    setChecks([...results])
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Check 2: Supabase Client
    try {
      if (isSupabaseConfigured() && supabase) {
        results.push({
          name: "Supabase Client",
          status: "success",
          message: "Supabase client initialized successfully",
        })
      } else {
        results.push({
          name: "Supabase Client",
          status: "error",
          message: "Supabase client failed to initialize",
        })
      }
    } catch (error: any) {
      results.push({
        name: "Supabase Client",
        status: "error",
        message: "Error initializing client",
        details: error.message,
      })
    }

    setChecks([...results])
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Check 3: Database Connection
    if (supabase) {
      try {
        const { error } = await supabase.from("profiles").select("count").limit(1).single()

        if (error) {
          if (error.code === "PGRST116") {
            results.push({
              name: "Database Connection",
              status: "success",
              message: "Connected to database (no profiles yet)",
            })
          } else {
            results.push({
              name: "Database Connection",
              status: "error",
              message: "Database connection failed",
              details: error.message,
            })
          }
        } else {
          results.push({
            name: "Database Connection",
            status: "success",
            message: "Database connected and has data",
          })
        }
      } catch (error: any) {
        results.push({
          name: "Database Connection",
          status: "error",
          message: "Failed to connect to database",
          details: error.message,
        })
      }
    } else {
      results.push({
        name: "Database Connection",
        status: "error",
        message: "Cannot test - Supabase client not initialized",
      })
    }

    setChecks([...results])
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Check 4: Tables Exist
    if (supabase) {
      try {
        const tables = ["profiles", "family_members", "posts"]
        const tableChecks = await Promise.all(
          tables.map(async (table) => {
            try {
              const { error } = await supabase.from(table).select("id").limit(1)
              return { table, exists: !error || error.code === "PGRST116" }
            } catch {
              return { table, exists: false }
            }
          }),
        )

        const allExist = tableChecks.every((t) => t.exists)
        const existingTables = tableChecks.filter((t) => t.exists).map((t) => t.table)
        const missingTables = tableChecks.filter((t) => !t.exists).map((t) => t.table)

        if (allExist) {
          results.push({
            name: "Database Tables",
            status: "success",
            message: "All required tables exist",
            details: existingTables.join(", "),
          })
        } else if (existingTables.length > 0) {
          results.push({
            name: "Database Tables",
            status: "warning",
            message: "Some tables are missing",
            details: `Missing: ${missingTables.join(", ")}`,
          })
        } else {
          results.push({
            name: "Database Tables",
            status: "error",
            message: "No tables found - Run the SQL script",
            details: "Execute scripts/01-create-tables.sql in Supabase",
          })
        }
      } catch (error: any) {
        results.push({
          name: "Database Tables",
          status: "error",
          message: "Failed to check tables",
          details: error.message,
        })
      }
    } else {
      results.push({
        name: "Database Tables",
        status: "error",
        message: "Cannot test - Supabase client not initialized",
      })
    }

    setChecks([...results])
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Check 5: Row Level Security
    if (supabase) {
      try {
        const { data: user } = await supabase.auth.getUser()

        if (user.user) {
          results.push({
            name: "Authentication",
            status: "success",
            message: "User is logged in",
            details: user.user.email || "No email",
          })
        } else {
          results.push({
            name: "Authentication",
            status: "warning",
            message: "No user logged in (this is normal for testing)",
          })
        }
      } catch (error: any) {
        results.push({
          name: "Authentication",
          status: "warning",
          message: "Cannot check auth status",
          details: error.message,
        })
      }
    }

    setChecks([...results])
    setIsRunning(false)
  }

  useEffect(() => {
    runDiagnostics()
  }, [])

  const getStatusIcon = (status: CheckStatus) => {
    switch (status) {
      case "loading":
        return <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
      case "success":
        return <CheckCircle2 className="w-5 h-5 text-green-400" />
      case "error":
        return <XCircle className="w-5 h-5 text-red-400" />
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-400" />
    }
  }

  const getStatusColor = (status: CheckStatus) => {
    switch (status) {
      case "loading":
        return "border-blue-400/20 bg-blue-400/5"
      case "success":
        return "border-green-400/20 bg-green-400/5"
      case "error":
        return "border-red-400/20 bg-red-400/5"
      case "warning":
        return "border-yellow-400/20 bg-yellow-400/5"
    }
  }

  const hasErrors = checks.some((c) => c.status === "error")
  const allSuccess = checks.every((c) => c.status === "success")

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gold-gradient font-display mb-2">System Diagnostics</h1>
          <p className="text-slate-400 font-body">Checking your Supabase configuration and database setup</p>
        </div>
        <Button onClick={runDiagnostics} disabled={isRunning} className="btn-gold">
          <RefreshCw className={`w-4 h-4 mr-2 ${isRunning ? "animate-spin" : ""}`} />
          {isRunning ? "Running..." : "Run Again"}
        </Button>
      </div>

      {/* Overall Status */}
      {!isRunning && checks.length > 0 && (
        <Card
          className={`shadow-luxury border-2 ${
            allSuccess
              ? "border-green-400/30 bg-green-400/5"
              : hasErrors
                ? "border-red-400/30 bg-red-400/5"
                : "border-yellow-400/30 bg-yellow-400/5"
          }`}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              {allSuccess ? (
                <>
                  <CheckCircle2 className="w-8 h-8 text-green-400" />
                  <div>
                    <h3 className="text-xl font-bold text-green-400 font-display">All Systems Operational! 🎉</h3>
                    <p className="text-slate-300 text-sm">Your Supabase setup is complete and working correctly</p>
                  </div>
                </>
              ) : hasErrors ? (
                <>
                  <XCircle className="w-8 h-8 text-red-400" />
                  <div>
                    <h3 className="text-xl font-bold text-red-400 font-display">Issues Detected</h3>
                    <p className="text-slate-300 text-sm">Please review the errors below and fix them</p>
                  </div>
                </>
              ) : (
                <>
                  <AlertCircle className="w-8 h-8 text-yellow-400" />
                  <div>
                    <h3 className="text-xl font-bold text-yellow-400 font-display">Warnings Found</h3>
                    <p className="text-slate-300 text-sm">Some minor issues detected - review below</p>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Individual Checks */}
      <div className="space-y-3">
        {checks.map((check, index) => (
          <Card key={index} className={`card-luxury shadow-luxury border-2 ${getStatusColor(check.status)}`}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                {getStatusIcon(check.status)}
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-100 font-display">{check.name}</h4>
                  <p className="text-sm text-slate-300 mt-1">{check.message}</p>
                  {check.details && (
                    <p className="text-xs text-slate-500 mt-2 font-mono bg-slate-800/50 p-2 rounded">{check.details}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Setup Instructions if errors */}
      {hasErrors && !isRunning && (
        <Card className="card-luxury shadow-luxury border-2 border-yellow-400/20">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-yellow-400 font-display">Need Help?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-bold text-slate-200 mb-2">Common Issues:</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400">•</span>
                  <span>
                    <strong>Missing environment variables:</strong> Add NEXT_PUBLIC_SUPABASE_URL and
                    NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel Settings → Environment Variables
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400">•</span>
                  <span>
                    <strong>Missing tables:</strong> Run the SQL script from scripts/01-create-tables.sql in your
                    Supabase SQL Editor
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400">•</span>
                  <span>
                    <strong>Connection failed:</strong> Check that your Supabase project URL is correct and the project
                    is not paused
                  </span>
                </li>
              </ul>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => window.open("https://supabase.com/dashboard", "_blank")}
                className="btn-gold"
                size="sm"
              >
                Open Supabase Dashboard
              </Button>
              <Button
                onClick={() => window.open(process.env.NEXT_PUBLIC_SITE_URL || "/", "_blank")}
                variant="outline"
                className="border-yellow-500/50 text-slate-100 bg-transparent"
                size="sm"
              >
                View Setup Guide
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Success Next Steps */}
      {allSuccess && !isRunning && (
        <Card className="card-luxury shadow-luxury border-2 border-green-400/20">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-green-400 font-display">What's Next?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-300">
            <p>Your Supabase setup is complete! You can now:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>Test user sign-up and login</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>Add family members to your tree</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>Create and share posts</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>Deploy to production with confidence</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
