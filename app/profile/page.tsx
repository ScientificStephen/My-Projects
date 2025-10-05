"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Camera, Upload, Edit, Mail, Phone, MapPin, Briefcase, Crown, Heart } from "lucide-react"
import Link from "next/link"
import FamilyTreeVisual from "@/components/family-tree-visual"

export default function ProfilePage() {
  const [profile] = useState({
    name: "Your Name",
    email: "your.email@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    birthdate: "1990-01-15",
    job: "Creative Director",
    interests: "Art, Travel, Connecting People, Building Community",
  })

  const [photos] = useState<string[]>([])

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gold-gradient font-display mb-2">Your Legacy</h1>
        <p className="text-slate-400 font-body">Build and nurture your chosen family tree</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="md:col-span-1">
          <div className="card-luxury shadow-luxury mb-6">
            <CardHeader className="text-center">
              <div className="relative inline-block mb-4">
                <div className="w-32 h-32 bg-gradient-to-br from-yellow-600 via-yellow-500 to-amber-600 rounded-full flex items-center justify-center text-white text-5xl font-bold shadow-2xl border-4 border-yellow-400/30">
                  {profile.name.charAt(0)}
                </div>
                <button className="absolute bottom-0 right-0 w-12 h-12 btn-gold rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform border-2 border-yellow-400/30">
                  <Camera className="w-5 h-5 text-slate-900" />
                </button>
                <div className="absolute -top-2 -right-2">
                  <Crown className="w-8 h-8 text-yellow-400" />
                </div>
              </div>
              <CardTitle className="text-2xl text-slate-100 font-display">{profile.name}</CardTitle>
              <p className="text-sm text-yellow-400 font-body">{profile.job}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full btn-gold text-slate-900 font-bold border-2 border-yellow-400/30">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
              <Link href="/tree" className="block">
                <Button
                  variant="outline"
                  className="w-full bg-slate-800 border-yellow-600/30 text-yellow-400 hover:bg-slate-700"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  View Full Tree
                </Button>
              </Link>
            </CardContent>
          </div>

          {/* Quick Stats */}
          <div className="card-gold shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg text-slate-800">Your Impact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-700 font-body">Chosen Family</span>
                <span className="font-bold text-2xl text-yellow-800">24</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-700 font-body">Memories Shared</span>
                <span className="font-bold text-2xl text-yellow-800">156</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-700 font-body">Hearts Given</span>
                <span className="font-bold text-2xl text-yellow-800">1,243</span>
              </div>
            </CardContent>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Family Tree Visualization */}
          <div>
            <h2 className="text-2xl font-bold text-slate-100 mb-4 font-display flex items-center gap-2">
              <Heart className="w-6 h-6 text-yellow-400" />
              Your Family Tree
            </h2>
            <FamilyTreeVisual />
            <p className="text-sm text-slate-400 mt-3 text-center font-body italic">
              "A family tree that grows with love, not just blood"
            </p>
          </div>

          {/* Contact Information */}
          <div className="card-luxury shadow-luxury">
            <CardHeader>
              <CardTitle className="text-slate-100">Contact Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="flex items-center gap-2 text-slate-300">
                    <Mail className="w-4 h-4 text-yellow-400" />
                    Email
                  </Label>
                  <Input value={profile.email} readOnly className="mt-1 bg-slate-800 border-slate-700 text-white" />
                </div>
                <div>
                  <Label className="flex items-center gap-2 text-slate-300">
                    <Phone className="w-4 h-4 text-yellow-400" />
                    Phone
                  </Label>
                  <Input value={profile.phone} readOnly className="mt-1 bg-slate-800 border-slate-700 text-white" />
                </div>
              </div>
              <div>
                <Label className="flex items-center gap-2 text-slate-300">
                  <MapPin className="w-4 h-4 text-yellow-400" />
                  Location
                </Label>
                <Input value={profile.location} readOnly className="mt-1 bg-slate-800 border-slate-700 text-white" />
              </div>
            </CardContent>
          </div>

          {/* Personal Information */}
          <div className="card-luxury shadow-luxury">
            <CardHeader>
              <CardTitle className="text-slate-100">About You</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">Birthday</Label>
                  <Input
                    type="date"
                    value={profile.birthdate}
                    readOnly
                    className="mt-1 bg-slate-800 border-slate-700 text-white"
                  />
                </div>
                <div>
                  <Label className="flex items-center gap-2 text-slate-300">
                    <Briefcase className="w-4 h-4 text-yellow-400" />
                    Profession
                  </Label>
                  <Input value={profile.job} readOnly className="mt-1 bg-slate-800 border-slate-700 text-white" />
                </div>
              </div>
              <div>
                <Label className="text-slate-300">Passions & Interests</Label>
                <Input value={profile.interests} readOnly className="mt-1 bg-slate-800 border-slate-700 text-white" />
              </div>
            </CardContent>
          </div>

          {/* Memory Gallery */}
          <div className="card-luxury shadow-luxury">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-slate-100">Memory Gallery</CardTitle>
                <Button size="sm" className="btn-gold text-slate-900 border-2 border-yellow-400/30">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {photos.length === 0 ? (
                <div className="text-center py-16 text-slate-400">
                  <Camera className="w-20 h-20 mx-auto mb-4 text-yellow-400/30" />
                  <p className="text-lg font-medium mb-2 text-slate-300 font-display">Your Story Awaits</p>
                  <p className="text-sm mb-6 font-body">Share the moments that define your chosen family</p>
                  <Button className="btn-gold text-slate-900 border-2 border-yellow-400/30">
                    <Upload className="w-4 h-4 mr-2" />
                    Share Your First Memory
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-4">
                  {photos.map((photo, index) => (
                    <div key={index} className="aspect-square bg-slate-800 rounded-lg border border-yellow-600/20" />
                  ))}
                </div>
              )}
            </CardContent>
          </div>
        </div>
      </div>
    </div>
  )
}
