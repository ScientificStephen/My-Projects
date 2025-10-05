"use client"

import { useState } from "react"
import Link from "next/link"
import { Users, Menu, X, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import AuthModal from "./auth-modal"

export default function NavBar() {
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="flex items-center justify-between py-3 border-b border-yellow-600/20 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-50 shadow-luxury">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition group">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-600 via-yellow-500 to-amber-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform border border-yellow-400/30">
              <Users className="w-4 h-4 text-white" />
            </div>
            <span className="text-gold-gradient text-base font-bold font-display">New Family Tree</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-slate-300 hover:text-yellow-400 transition font-body">
            Feed
          </Link>
          <Link href="/tree" className="text-sm font-medium text-slate-300 hover:text-yellow-400 transition font-body">
            Tree
          </Link>
          <Link
            href="/add-member"
            className="text-sm font-medium text-slate-300 hover:text-yellow-400 transition font-body"
          >
            Add Member
          </Link>
          <Link
            href="/profile"
            className="text-sm font-medium text-slate-300 hover:text-yellow-400 transition font-body"
          >
            Profile
          </Link>
          <Button
            onClick={() => setAuthModalOpen(true)}
            size="sm"
            className="btn-gold text-slate-900 font-bold shadow-lg hover:shadow-xl transition-all px-4 py-1 font-body border border-yellow-400/30"
          >
            <Sparkles className="w-3 h-3 mr-1" />
            Join
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-yellow-400" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-slate-900 border-b border-yellow-600/20 shadow-2xl md:hidden">
            <nav className="flex flex-col p-4 space-y-3">
              <Link
                href="/"
                className="text-sm font-medium text-slate-300 hover:text-yellow-400 transition py-2 font-body"
                onClick={() => setMobileMenuOpen(false)}
              >
                Feed
              </Link>
              <Link
                href="/tree"
                className="text-sm font-medium text-slate-300 hover:text-yellow-400 transition py-2 font-body"
                onClick={() => setMobileMenuOpen(false)}
              >
                Tree
              </Link>
              <Link
                href="/add-member"
                className="text-sm font-medium text-slate-300 hover:text-yellow-400 transition py-2 font-body"
                onClick={() => setMobileMenuOpen(false)}
              >
                Add Member
              </Link>
              <Link
                href="/profile"
                className="text-sm font-medium text-slate-300 hover:text-yellow-400 transition py-2 font-body"
                onClick={() => setMobileMenuOpen(false)}
              >
                Profile
              </Link>
              <Button
                onClick={() => {
                  setAuthModalOpen(true)
                  setMobileMenuOpen(false)
                }}
                className="btn-gold text-slate-900 font-bold shadow-xl w-full border border-yellow-400/30"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Join Now
              </Button>
            </nav>
          </div>
        )}
      </header>

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </>
  )
}
