"use client"

import { Heart, MessageCircle, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface FeedCardProps {
  name: string
  time: string
  text: string
  image?: string
  likes?: number
  comments?: number
}

export default function FeedCard({ name, time, text, image, likes = 0, comments = 0 }: FeedCardProps) {
  return (
    <article className="card-luxury mb-6 hover:shadow-2xl transition-all">
      <div className="flex gap-4">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-600 via-yellow-500 to-amber-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0 shadow-xl border-2 border-yellow-400/30">
          {name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="font-semibold text-slate-100 font-display">{name}</div>
              <div className="text-xs text-slate-500 font-body">{time}</div>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-slate-300 font-body">{text}</p>
          {image && (
            <div className="mt-4 w-full h-64 bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-yellow-600/10">
              <Image
                src={image || "/placeholder.svg"}
                alt="post"
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
      <footer className="mt-4 pt-4 border-t border-yellow-600/20 flex gap-6">
        <Button
          variant="ghost"
          size="sm"
          className="text-slate-400 hover:text-yellow-400 hover:bg-yellow-400/10 font-body"
        >
          <Heart className="w-4 h-4 mr-2" />
          {likes.toLocaleString()}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-slate-400 hover:text-yellow-400 hover:bg-yellow-400/10 font-body"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          {comments.toLocaleString()}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-slate-400 hover:text-yellow-400 hover:bg-yellow-400/10 font-body"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
      </footer>
    </article>
  )
}
