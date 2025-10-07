"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Lock, User, Sparkles, AlertCircle, AlertTriangle } from "lucide-react"
import { signUp, signIn } from "@/lib/auth"
import { isSupabaseConfigured } from "@/lib/supabase"
import { useRouter } from "next/navigation"

interface AuthModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isConfigured, setIsConfigured] = useState(true)

  useEffect(() => {
    setIsConfigured(isSupabaseConfigured())
  }, [])

  // Sign up form
  const [signUpData, setSignUpData] = useState({
    fullName: "",
    email: "",
    password: "",
  })

  // Sign in form
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  })

  if (!isConfigured) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md bg-slate-900 border-yellow-600/20 text-slate-100">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gold-gradient font-display flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-yellow-400" />
              Setup Required
            </DialogTitle>
            <DialogDescription className="text-slate-400 font-body">
              Database connection needs to be configured
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-4">
              <h3 className="font-bold text-yellow-400 mb-2">⚠️ Supabase Not Connected</h3>
              <p className="text-sm text-slate-300 mb-3">
                To enable sign-up and login, you need to connect a Supabase database.
              </p>

              <div className="space-y-2 text-sm">
                <p className="text-slate-400">Quick setup steps:</p>
                <ol className="list-decimal list-inside space-y-1 text-slate-300 ml-2">
                  <li>
                    Create a free account at{" "}
                    <a
                      href="https://supabase.com"
                      target="_blank"
                      className="text-yellow-400 hover:underline"
                      rel="noreferrer"
                    >
                      supabase.com
                    </a>
                  </li>
                  <li>Create a new project</li>
                  <li>Copy your project URL and anon key</li>
                  <li>Add them as environment variables in Vercel</li>
                </ol>
              </div>
            </div>

            <div className="bg-slate-800 rounded-lg p-4 font-mono text-xs">
              <p className="text-slate-400 mb-2">Environment Variables Needed:</p>
              <code className="text-yellow-400">
                NEXT_PUBLIC_SUPABASE_URL=your_url
                <br />
                NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
              </code>
            </div>

            <Button onClick={() => window.open("https://supabase.com", "_blank")} className="w-full btn-gold">
              <Sparkles className="w-4 h-4 mr-2" />
              Setup Supabase Now
            </Button>

            <p className="text-xs text-center text-slate-500">Setup takes less than 5 minutes • Free tier available</p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setIsLoading(true)

    try {
      await signUp(signUpData.email, signUpData.password, signUpData.fullName)
      setSuccess("Account created! Check your email to verify your account.")
      setTimeout(() => {
        onOpenChange(false)
        router.push("/profile")
      }, 2000)
    } catch (err: any) {
      setError(err.message || "Failed to create account")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setIsLoading(true)

    try {
      await signIn(signInData.email, signInData.password)
      setSuccess("Signed in successfully!")
      setTimeout(() => {
        onOpenChange(false)
        router.push("/feed")
      }, 1000)
    } catch (err: any) {
      setError(err.message || "Failed to sign in")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-slate-900 border-yellow-600/20 text-slate-100">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gold-gradient font-display">
            Welcome to New Family Tree
          </DialogTitle>
          <DialogDescription className="text-slate-400 font-body">
            Start building the family you love today
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-3 flex items-start gap-2">
            <Sparkles className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-green-400">{success}</p>
          </div>
        )}

        <Tabs defaultValue="signup" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-slate-800">
            <TabsTrigger
              value="signup"
              className="data-[state=active]:bg-yellow-600/20 data-[state=active]:text-yellow-400"
            >
              Sign Up
            </TabsTrigger>
            <TabsTrigger
              value="login"
              className="data-[state=active]:bg-yellow-600/20 data-[state=active]:text-yellow-400"
            >
              Login
            </TabsTrigger>
          </TabsList>

          <TabsContent value="signup">
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name" className="text-slate-200">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="signup-name"
                    placeholder="Your name"
                    className="pl-10 bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500"
                    required
                    value={signUpData.fullName}
                    onChange={(e) => setSignUpData({ ...signUpData, fullName: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email" className="text-slate-200">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="your@email.com"
                    className="pl-10 bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500"
                    required
                    value={signUpData.email}
                    onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password" className="text-slate-200">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="Create a password (min 6 characters)"
                    className="pl-10 bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500"
                    required
                    minLength={6}
                    value={signUpData.password}
                    onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full btn-gold" disabled={isLoading}>
                {isLoading ? (
                  "Creating account..."
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Create Account
                  </>
                )}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="login">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email" className="text-slate-200">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="your@email.com"
                    className="pl-10 bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500"
                    required
                    value={signInData.email}
                    onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password" className="text-slate-200">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="Enter your password"
                    className="pl-10 bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500"
                    required
                    value={signInData.password}
                    onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full btn-gold" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="text-center text-xs text-slate-500 font-body">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </div>
      </DialogContent>
    </Dialog>
  )
}
