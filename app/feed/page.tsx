import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Heart, Users } from "lucide-react"
import Link from "next/link"

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

      {/* Empty State */}
      <Card className="card-luxury shadow-luxury border-2 border-yellow-600/20">
        <CardContent className="py-16 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-yellow-600/20 to-amber-600/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-yellow-400/30">
            <Users className="w-12 h-12 text-yellow-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-100 mb-3 font-display">Your Feed is Empty</h2>
          <p className="text-slate-400 mb-6 max-w-md mx-auto font-body">
            Start building your chosen family to see posts and updates from the people you love
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/tree">
              <Button className="btn-gold">
                <Heart className="w-4 h-4 mr-2" />
                View Your Tree
              </Button>
            </Link>
            <Link href="/add-member">
              <Button variant="outline" className="border-yellow-500/50 text-slate-100 bg-transparent">
                <Plus className="w-4 h-4 mr-2" />
                Add Family Member
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
