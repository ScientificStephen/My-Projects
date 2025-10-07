import type { Metadata } from "next"
import FeedCard from "@/components/feed-card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export const metadata: Metadata = {
  title: "Feed",
  description: "See what your chosen family is sharing",
}

export default function FeedPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-gold-gradient font-display">Your Feed</h1>
        <Button className="btn-gold">
          <Plus className="w-4 h-4 mr-2" />
          New Post
        </Button>
      </div>

      <FeedCard
        name="Marcus Johnson"
        time="2h ago"
        text="Today marks 1 year since David and I became father and son. Not by blood, but by choice. He's taught me as much as I've taught him. This is what real family looks like. 🤝❤️"
        image="/black-father-white-son-handshake-chosen-family.jpg"
        likes={2341}
        comments={456}
      />

      <FeedCard
        name="Aisha Rahman"
        time="5h ago"
        text="Five years ago, I walked into a support group feeling alone. Today, I have 12 people I call family who weren't in my life before. They chose me, and I chose them. That's real family. 💛"
        image="/diverse-mixed-race-family-smiling-reunion-outdoors.jpg"
        likes={842}
        comments={126}
      />

      <FeedCard
        name="David Chen"
        time="8h ago"
        text="My biological father left when I was 3. Marcus showed up when I was 23. He didn't have to choose me, but he did. And I chose him right back. Blood doesn't make family - love and commitment do. 🙏✨"
        likes={1567}
        comments={234}
      />
    </div>
  )
}
