"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share2 } from "lucide-react"
import Image from "next/image"

interface FeedCardProps {
  name: string
  time: string
  text: string
  image?: string
  likes: number
  comments: number
}

export default function FeedCard({ name, time, text, image, likes, comments }: FeedCardProps) {
  return (
    <Card className="card-luxury shadow-luxury border-2 border-yellow-600/20 overflow-hidden hover-lift">
      <CardContent className="p-0">
        {/* Header */}
        <div className="p-4 flex items-center gap-3">
          <Avatar className="border-2 border-yellow-400/30">
            <AvatarImage src={`/generic-placeholder-graphic.png?height=40&width=40`} />
            <AvatarFallback className="bg-gradient-to-br from-yellow-600 to-amber-600 text-white font-bold">
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h4 className="font-bold text-slate-100 font-display">{name}</h4>
            <p className="text-xs text-slate-400 font-body">{time}</p>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 pb-4">
          <p className="text-slate-200 font-body leading-relaxed">{text}</p>
        </div>

        {/* Image */}
        {image && (
          <div className="relative h-64 w-full">
            <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
          </div>
        )}

        {/* Actions */}
        <div className="px-4 py-3 flex items-center gap-6 border-t border-yellow-600/20">
          <button className="flex items-center gap-2 text-slate-300 hover:text-yellow-400 transition group">
            <Heart className="w-5 h-5 group-hover:fill-yellow-400" />
            <span className="text-sm font-body">{likes.toLocaleString()}</span>
          </button>
          <button className="flex items-center gap-2 text-slate-300 hover:text-yellow-400 transition">
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm font-body">{comments}</span>
          </button>
          <button className="flex items-center gap-2 text-slate-300 hover:text-yellow-400 transition ml-auto">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
