"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Lock, User, Sparkles, AlertCircle, AlertTriangle, ExternalLink, Eye, EyeOff } from "lucide-react"
import { signUp, signIn, validatePassword } from "@/lib/auth"
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
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState<string[]>([])

  useEffect(() => {
    setIsConfigured(isSupabaseConfigured())
  }, [])

  // Sign up form
  const [signUpData, setSignUpData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  // Sign in form
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  })

  // Check password strength as user types
  useEffect(() => {
    if (signUpData.password) {
      const validation = validatePassword(signUpData.password)
      setPasswordStrength(validation.errors)
    } else {
      setPasswordStrength([])
    }
  }, [signUpData.password])

  if (!isConfigured) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-lg bg-slate-900 border-yellow-600/20 text-slate-100">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gold-gradient font-display flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-yellow-400" />
              Database Setup Required
            </DialogTitle>
            <DialogDescription className="text-slate-400 font-body">
              Quick 5-minute setup to enable user accounts
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border border-yellow-500/30 rounded-lg p-5">
              <h3 className="font-bold text-yellow-400 mb-3 text-lg">🚀 Ready to Launch?</h3>
              <p className="text-sm text-slate-300 mb-4">
                Your website is live and looks beautiful! To enable user sign-up and all features, connect a free
                Supabase database.
              </p>

              <div className="flex gap-3">
                <Button
                  onClick={() => window.open("https://supabase.com/dashboard/sign-in", "_blank")}
                  className="flex-1 btn-gold"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Setup Database Now
                </Button>
                <Button
                  onClick={() => window.open("/diagnostics", "_blank")}
                  variant="outline"
                  className="border-yellow-500/50 text-slate-100 bg-transparent hover:bg-yellow-500/10"
                >
                  View Guide
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    // Validate passwords match
    if (signUpData.password !== signUpData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    // Validate password strength
    const validation = validatePassword(signUpData.password)
    if (!validation.isValid) {
      setError(validation.errors[0])
      return
    }

    setIsLoading(true)

    try {
      await signUp(signUpData.email, signUpData.password, signUpData.fullName)
      setSuccess(
        "Account created! Please check your email and click the verification link before logging in. Check your spam folder if you don't see it.",
      )
      // Clear form
      setSignUpData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      })
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
      const { user } = await signIn(signInData.email, signInData.password)

      // Check if email is verified
      if (user && !user.email_confirmed_at) {
        setError("Please verify your email address before logging in. Check your inbox for the verification link.")
        setIsLoading(false)
        return
      }

      setSuccess("Signed in successfully!")
      setTimeout(() => {
        onOpenChange(false)
        router.push("/feed")
        router.refresh()
      }, 1000)
    } catch (err: any) {
      setError(err.message || "Failed to sign in")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-slate-900 border-yellow-600/20 text-slate-100 max-h-[90vh] overflow-y-auto">
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

          <TabsContent value="signup" className="space-y-4">
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name" className="text-slate-200">
                  Full Name *
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
                  Email *
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
                  Password *
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    className="pl-10 pr-10 bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500"
                    required
                    minLength={8}
                    value={signUpData.password}
                    onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {passwordStrength.length > 0 && signUpData.password && (
                  <div className="text-xs space-y-1">
                    {passwordStrength.map((error, i) => (
                      <p key={i} className="text-red-400 flex items-center gap-1">
                        <span>•</span> {error}
                      </p>
                    ))}
                  </div>
                )}
                {passwordStrength.length === 0 && signUpData.password && (
                  <p className="text-xs text-green-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Strong password!
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-confirm-password" className="text-slate-200">
                  Confirm Password *
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="signup-confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter your password"
                    className="pl-10 pr-10 bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500"
                    required
                    minLength={8}
                    value={signUpData.confirmPassword}
                    onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-300"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {signUpData.confirmPassword && signUpData.password !== signUpData.confirmPassword && (
                  <p className="text-xs text-red-400">Passwords do not match</p>
                )}
              </div>

              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-xs text-slate-400">
                <p className="font-semibold text-slate-300 mb-2">Password Requirements:</p>
                <ul className="space-y-1">
                  <li>• At least 8 characters long</li>
                  <li>• Contains uppercase and lowercase letters</li>
                  <li>• Contains at least one number</li>
                </ul>
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
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-10 pr-10 bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500"
                    required
                    value={signInData.password}
                    onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
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
