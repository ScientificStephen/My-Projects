"use client"

import { useState } from "react"
import Link from "next/link"
import { Users, Menu, X, Sparkles, Settings, LogOut, UserIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import AuthModal from "./auth-modal"
import { useAuth } from "@/lib/auth-context"

export default function NavBar() {
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
    setMobileMenuOpen(false)
  }

  return (
    <>
      <header className="flex items-center justify-between py-6 border-b border-yellow-600/20 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-50 shadow-luxury">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition group">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-600 via-yellow-500 to-amber-600 rounded-xl flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform border-2 border-yellow-400/30">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-gold-gradient text-xl font-bold block font-display">New Family Tree</span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {user && user.email_confirmed_at && (
            <>
              <Link
                href="/feed"
                className="text-sm font-medium text-slate-400 hover:text-yellow-400 transition font-body"
              >
                Feed
              </Link>
              <Link
                href="/tree"
                className="text-sm font-medium text-slate-400 hover:text-yellow-400 transition font-body"
              >
                Tree
              </Link>
            </>
          )}

          <Link
            href="/diagnostics"
            className="text-sm font-medium text-slate-400 hover:text-yellow-400 transition font-body flex items-center gap-2"
          >
            <Settings className="w-4 h-4" />
            Diagnostics
          </Link>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full border-2 border-yellow-400/30">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gradient-to-br from-yellow-600 to-amber-600 text-white font-bold">
                      {user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-slate-800 border-slate-700" align="end">
                <div className="px-2 py-2">
                  <p className="text-sm font-medium text-slate-100">{user.user_metadata?.full_name || "User"}</p>
                  <p className="text-xs text-slate-400">{user.email}</p>
                  {!user.email_confirmed_at && <p className="text-xs text-yellow-400 mt-1">⚠️ Email not verified</p>}
                </div>
                <DropdownMenuSeparator className="bg-slate-700" />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer text-slate-100">
                    <UserIcon className="w-4 h-4 mr-2" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-slate-700" />
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-400">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              onClick={() => setAuthModalOpen(true)}
              className="btn-gold text-slate-900 font-bold shadow-xl hover:shadow-2xl transition-all px-6 font-body border-2 border-yellow-400/30"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Get Started
            </Button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-yellow-400" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-slate-900 border-b border-yellow-600/20 shadow-2xl md:hidden">
            <nav className="flex flex-col p-6 space-y-4">
              {user && user.email_confirmed_at && (
                <>
                  <Link
                    href="/feed"
                    className="text-sm font-medium text-slate-400 hover:text-yellow-400 transition font-body"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Feed
                  </Link>
                  <Link
                    href="/tree"
                    className="text-sm font-medium text-slate-400 hover:text-yellow-400 transition font-body"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Tree
                  </Link>
                  <Link
                    href="/profile"
                    className="text-sm font-medium text-slate-400 hover:text-yellow-400 transition font-body"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                </>
              )}

              <Link
                href="/diagnostics"
                className="text-sm font-medium text-slate-400 hover:text-yellow-400 transition font-body flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Settings className="w-4 h-4" />
                Diagnostics
              </Link>

              {user ? (
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="border-red-500/50 text-red-400 hover:bg-red-500/10 w-full bg-transparent"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setAuthModalOpen(true)
                    setMobileMenuOpen(false)
                  }}
                  className="btn-gold text-slate-900 font-bold shadow-xl w-full border-2 border-yellow-400/30"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Get Started
                </Button>
              )}
            </nav>
          </div>
        )}
      </header>

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </>
  )
}
