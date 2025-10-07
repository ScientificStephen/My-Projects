import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar, Heart, MapPin, Users, Edit, Plus } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Profile",
  description: "Your profile and family connections",
}

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <Card className="card-luxury shadow-luxury border-2 border-yellow-600/20">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <Avatar className="w-32 h-32 border-4 border-yellow-400/30">
              <AvatarFallback className="bg-gradient-to-br from-yellow-600 to-amber-600 text-white text-4xl font-bold">
                ?
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-slate-100 font-display mb-1">Welcome!</h1>
                  <p className="text-slate-400 font-body">Complete your profile to get started</p>
                </div>
                <Button className="btn-gold">
                  <Edit className="w-4 h-4 mr-2" />
                  Complete Profile
                </Button>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-yellow-400" />
                  <span className="font-body text-slate-500">Add your location</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-yellow-400" />
                  <span className="font-body">Joined {new Date().toLocaleDateString()}</span>
                </div>
              </div>

              <div className="bg-slate-800/50 border border-yellow-600/20 rounded-lg p-4">
                <p className="text-slate-300 font-body text-sm leading-relaxed">
                  👋 <strong className="text-yellow-400">Welcome to New Family Tree!</strong> Start by adding your first
                  chosen family member. Remember, family isn't about blood - it's about love and choice.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="card-luxury shadow-luxury border-2 border-yellow-600/20">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-slate-100">
              <Users className="w-5 h-5 text-yellow-400" />
              Family Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold text-gold-gradient mb-1">0</div>
              <p className="text-sm text-slate-400 font-body mb-4">Start building your family</p>
              <Link href="/add-member">
                <Button size="sm" className="btn-gold w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Member
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="card-luxury shadow-luxury border-2 border-yellow-600/20">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-slate-100">
              <Heart className="w-5 h-5 text-yellow-400" />
              Connections
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold text-gold-gradient mb-1">0</div>
              <p className="text-sm text-slate-400 font-body">Connections to build</p>
            </div>
          </CardContent>
        </Card>

        <Card className="card-luxury shadow-luxury border-2 border-yellow-600/20">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-slate-100">
              <Calendar className="w-5 h-5 text-yellow-400" />
              Journey
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold text-gold-gradient mb-1">New</div>
              <p className="text-sm text-slate-400 font-body">Just getting started</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Getting Started Guide */}
      <Card className="card-luxury shadow-luxury border-2 border-yellow-600/20">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gold-gradient font-display">Getting Started Guide</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-yellow-600/20 flex items-center justify-center flex-shrink-0 border border-yellow-400/30">
              <span className="text-yellow-400 font-bold">1</span>
            </div>
            <div>
              <h3 className="font-bold text-slate-100 mb-1 font-display">Complete Your Profile</h3>
              <p className="text-sm text-slate-400 font-body">
                Add your photo, location, and a bio about who you are and what family means to you
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-yellow-600/20 flex items-center justify-center flex-shrink-0 border border-yellow-400/30">
              <span className="text-yellow-400 font-bold">2</span>
            </div>
            <div>
              <h3 className="font-bold text-slate-100 mb-1 font-display">Add Your First Family Member</h3>
              <p className="text-sm text-slate-400 font-body">
                Invite someone you consider chosen family or browse profiles to connect with new people
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-yellow-600/20 flex items-center justify-center flex-shrink-0 border border-yellow-400/30">
              <span className="text-yellow-400 font-bold">3</span>
            </div>
            <div>
              <h3 className="font-bold text-slate-100 mb-1 font-display">Share Your Story</h3>
              <p className="text-sm text-slate-400 font-body">
                Post updates, share memories, and stay connected with your chosen family
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
