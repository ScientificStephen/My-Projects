import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Users, Sparkles } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Family Tree",
  description: "Visualize your chosen family connections",
}

export default function TreePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-gold-gradient font-display">Family Tree</h1>
        <Link href="/add-member">
          <Button className="btn-gold">
            <Plus className="w-4 h-4 mr-2" />
            Add Member
          </Button>
        </Link>
      </div>

      {/* Empty State */}
      <Card className="card-luxury shadow-luxury border-2 border-yellow-600/20">
        <CardContent className="py-20 text-center">
          <div className="w-32 h-32 bg-gradient-to-br from-yellow-600/20 to-amber-600/20 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-yellow-400/30">
            <Users className="w-16 h-16 text-yellow-400" />
          </div>
          <h2 className="text-3xl font-bold text-slate-100 mb-4 font-display">Start Building Your Family Tree</h2>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto font-body text-lg">
            Your family tree is empty. Add your first chosen family member to begin building the family you love. It's
            not about blood - it's about who chooses to be there for you.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/add-member">
              <Button size="lg" className="btn-gold">
                <Sparkles className="w-5 h-5 mr-2" />
                Add Your First Family Member
              </Button>
            </Link>
            <Link href="/">
              <Button
                size="lg"
                variant="outline"
                className="border-yellow-500/50 text-slate-100 bg-transparent hover:bg-yellow-500/10"
              >
                Learn More
              </Button>
            </Link>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-gold-gradient">1</div>
              <h3 className="font-bold text-slate-200 font-display">Add Members</h3>
              <p className="text-sm text-slate-400 font-body">Invite people to join your chosen family</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-gold-gradient">2</div>
              <h3 className="font-bold text-slate-200 font-display">Build Connections</h3>
              <p className="text-sm text-slate-400 font-body">Create meaningful relationships</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-gold-gradient">3</div>
              <h3 className="font-bold text-slate-200 font-display">Grow Together</h3>
              <p className="text-sm text-slate-400 font-body">Share life's moments with your family</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
