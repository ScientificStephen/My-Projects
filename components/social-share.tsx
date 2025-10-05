"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Share2, Twitter, Facebook, Link2, MessageCircle, Check } from "lucide-react"

interface SocialShareProps {
  title: string
  text: string
  url?: string
}

export default function SocialShare({ title, text, url }: SocialShareProps) {
  const [copied, setCopied] = useState(false)
  const [open, setOpen] = useState(false)
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "")

  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`
    window.open(twitterUrl, "_blank", "width=550,height=420")
  }

  const shareToFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    window.open(facebookUrl, "_blank", "width=550,height=420")
  }

  const shareToWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + " " + shareUrl)}`
    window.open(whatsappUrl, "_blank")
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          variant="outline"
          className="bg-white/10 text-white border-2 border-white/30 hover:bg-white/20 backdrop-blur-sm text-lg px-8"
        >
          <Share2 className="w-5 h-5 mr-2" />
          Share This
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-slate-900 border-2 border-yellow-600/30">
        <DialogHeader>
          <DialogTitle className="text-gold-gradient font-display text-2xl">Share This Story</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button
            onClick={shareToTwitter}
            className="w-full justify-start bg-slate-800 hover:bg-slate-700 text-white border border-yellow-600/20"
          >
            <Twitter className="w-5 h-5 mr-3" />
            Share on Twitter
          </Button>
          <Button
            onClick={shareToFacebook}
            className="w-full justify-start bg-slate-800 hover:bg-slate-700 text-white border border-yellow-600/20"
          >
            <Facebook className="w-5 h-5 mr-3" />
            Share on Facebook
          </Button>
          <Button
            onClick={shareToWhatsApp}
            className="w-full justify-start bg-slate-800 hover:bg-slate-700 text-white border border-yellow-600/20"
          >
            <MessageCircle className="w-5 h-5 mr-3" />
            Share on WhatsApp
          </Button>
          <Button
            onClick={copyLink}
            className="w-full justify-start bg-slate-800 hover:bg-slate-700 text-white border border-yellow-600/20"
          >
            {copied ? <Check className="w-5 h-5 mr-3 text-green-400" /> : <Link2 className="w-5 h-5 mr-3" />}
            {copied ? "Link Copied!" : "Copy Link"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
