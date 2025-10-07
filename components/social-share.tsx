"use client"

import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"

interface SocialShareProps {
  title: string
  text: string
}

export default function SocialShare({ title, text }: SocialShareProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`
      window.open(shareUrl, "_blank", "width=550,height=420")
    }
  }

  return (
    <Button
      onClick={handleShare}
      variant="outline"
      className="border-yellow-500/50 hover:bg-yellow-500/10 text-slate-100 font-body bg-transparent"
    >
      <Share2 className="w-4 h-4 mr-2" />
      Share
    </Button>
  )
}
