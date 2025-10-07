import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, Heart, MapPin, Users, Edit } from "lucide-react"

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
              <AvatarImage src="/placeholder.svg?height=128&width=128" />
              <AvatarFallback className="bg-gradient-to-br from-yellow-600 to-amber-600 text-white text-4xl font-bold">
                JD
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-slate-100 font-display mb-1">John Doe</h1>
                  <p className="text-slate-400 font-body">Building my chosen family since 2023</p>
                </div>
                <Button className="btn-gold">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-yellow-400" />
                  <span className="font-body">San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-yellow-400" />
                  <span className="font-body">Joined January 2023</span>
                </div>
              </div>

              <p className="text-slate-300 font-body leading-relaxed">
                Looking to build meaningful connections with people who understand that family is about choice and love,
                not just blood. Open to becoming a chosen uncle, brother, or friend to those who need support.
              </p>

              <div className="flex gap-2 flex-wrap">
                <Badge className="bg-yellow-600/20 text-yellow-400 border-yellow-600/30">LGBTQ+ Ally</Badge>
                <Badge className="bg-yellow-600/20 text-yellow-400 border-yellow-600/30">Mental Health Advocate</Badge>
                <Badge className="bg-yellow-600/20 text-yellow-400 border-yellow-600/30">Community Builder</Badge>
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
              <div className="text-4xl font-bold text-gold-gradient mb-1">12</div>
              <p className="text-sm text-slate-400 font-body">Chosen family members</p>
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
              <div className="text-4xl font-bold text-gold-gradient mb-1">48</div>
              <p className="text-sm text-slate-400 font-body">Total connections made</p>
            </div>
          </CardContent>
        </Card>

        <Card className="card-luxury shadow-luxury border-2 border-yellow-600/20">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-slate-100">
              <Calendar className="w-5 h-5 text-yellow-400" />
              Active Since
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold text-gold-gradient mb-1">2y</div>
              <p className="text-sm text-slate-400 font-body">Building family</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
