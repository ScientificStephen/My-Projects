"use client"

import { Button } from "@/components/ui/button"
import { Heart, Menu, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-yellow-600/20 bg-slate-950/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Heart className="h-5 w-5 text-slate-950 fill-slate-950" />
            </div>
            <span className="text-xl font-bold text-gold-gradient font-display hidden sm:inline">New Family Tree</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-slate-300 hover:text-yellow-400 transition-colors font-body font-medium"
            >
              Features
            </Link>
            <Link
              href="#stories"
              className="text-slate-300 hover:text-yellow-400 transition-colors font-body font-medium"
            >
              Stories
            </Link>
            <Link
              href="#how-it-works"
              className="text-slate-300 hover:text-yellow-400 transition-colors font-body font-medium"
            >
              How It Works
            </Link>
            <Link
              href="#pricing"
              className="text-slate-300 hover:text-yellow-400 transition-colors font-body font-medium"
            >
              Pricing
            </Link>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/auth">
              <Button variant="ghost" className="text-slate-300 hover:text-yellow-400 font-body font-medium">
                Sign In
              </Button>
            </Link>
            <Link href="/auth">
              <Button className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-slate-950 font-bold shadow-lg">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-300 hover:text-yellow-400 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-yellow-600/20 animate-slide-up">
            <div className="flex flex-col gap-4">
              <Link
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-300 hover:text-yellow-400 transition-colors font-body font-medium px-4 py-2"
              >
                Features
              </Link>
              <Link
                href="#stories"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-300 hover:text-yellow-400 transition-colors font-body font-medium px-4 py-2"
              >
                Stories
              </Link>
              <Link
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-300 hover:text-yellow-400 transition-colors font-body font-medium px-4 py-2"
              >
                How It Works
              </Link>
              <Link
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-300 hover:text-yellow-400 transition-colors font-body font-medium px-4 py-2"
              >
                Pricing
              </Link>
              <div className="flex flex-col gap-2 px-4 pt-4 border-t border-yellow-600/20">
                <Link href="/auth" onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full border-yellow-500/50 hover:bg-yellow-500/10 bg-transparent"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-slate-950 font-bold">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
