import "./globals.css"
import type { ReactNode } from "react"
import NavBar from "@/components/navbar"
import SetupBanner from "@/components/setup-banner"
import EmailVerificationBanner from "@/components/email-verification-banner"
import { AuthProvider } from "@/lib/auth-context"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    default: "New Family Tree — Build the Family You Love",
    template: "%s | New Family Tree",
  },
  description:
    "You might not have been born with the family you want but here you can build the family you love. Founded by Alexian Scruggs.",
  openGraph: {
    title: "New Family Tree — Build the Family You Love",
    description:
      "You might not have been born with the family you want but here you can build the family you love. Founded by Alexian Scruggs.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://new-family-tree.vercel.app",
    siteName: "New Family Tree",
    images: [
      {
        url: "/placeholder.svg?height=630&width=1200",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "New Family Tree — Build the Family You Love",
    description:
      "You might not have been born with the family you want but here you can build the family you love. Founded by Alexian Scruggs.",
  },
    generator: 'v0.app'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Lato:wght@300;400;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <AuthProvider>
          <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <NavBar />
            <SetupBanner />
            <EmailVerificationBanner />
            <main className="mt-6 mb-20">{children}</main>

            {/* Footer */}
            <footer className="border-t border-yellow-600/20 py-8 mt-20">
              <div className="text-center space-y-4">
                <div className="text-gold-gradient font-display text-xl font-bold">New Family Tree</div>
                <p className="text-slate-400 text-sm font-body max-w-2xl mx-auto">
                  "You might not have been born with the family you want but here you can build the family you love"
                </p>
                <p className="text-yellow-400 text-sm font-body italic">— Alexian Scruggs, Founder</p>
                <div className="flex justify-center gap-6 text-sm text-slate-400 font-body">
                  <a href="#" className="hover:text-yellow-400 transition">
                    About
                  </a>
                  <a href="#" className="hover:text-yellow-400 transition">
                    Privacy
                  </a>
                  <a href="#" className="hover:text-yellow-400 transition">
                    Terms
                  </a>
                  <a href="#" className="hover:text-yellow-400 transition">
                    Contact
                  </a>
                </div>
                <p className="text-slate-500 text-xs font-body">© 2025 New Family Tree. All rights reserved.</p>
              </div>
            </footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
