import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  title: "New Family Tree - Build the Family You Love",
  description:
    "Because family isn't just who you're born to—it's who you choose. Connect with chosen family members, create lasting bonds, and build your family tree with people who truly matter.",
  keywords: [
    "chosen family",
    "family tree",
    "lgbtq family",
    "adoptive family",
    "blended family",
    "family connections",
    "support network",
    "family building",
  ],
  authors: [{ name: "New Family Tree" }],
  openGraph: {
    title: "New Family Tree - Build the Family You Love",
    description: "Connect with chosen family members and build the support system you deserve.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://newfamilytree.app",
    siteName: "New Family Tree",
    images: [
      {
        url: "/diverse-multiracial-families-smiling-together-mult.jpg",
        width: 1200,
        height: 630,
        alt: "New Family Tree - Chosen families together",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "New Family Tree - Build the Family You Love",
    description: "Connect with chosen family members and build the support system you deserve.",
    images: ["/diverse-multiracial-families-smiling-together-mult.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <Navbar />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
