"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, UserPlus } from "lucide-react"
import Link from "next/link"

export default function AddMemberPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    relation: "",
    birthdate: "",
    job: "",
    interests: "",
  })

  const relations = [
    "Parent",
    "Child",
    "Sibling",
    "Grandparent",
    "Grandchild",
    "Aunt",
    "Uncle",
    "Cousin",
    "Niece",
    "Nephew",
    "Family Friend",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Adding member:", formData)
    router.push("/tree")
  }

  return (
    <div>
      <div className="mb-6">
        <Link href="/tree">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tree
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-slate-900">Add Family Member</h1>
        <p className="text-slate-600 mt-2">Add a new person to your family tree</p>
      </div>

      <div className="max-w-2xl">
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center">
                <UserPlus className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle>Member Information</CardTitle>
                <CardDescription>Fill in the details below</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-slate-700">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="Enter full name"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="relation" className="text-slate-700">
                  Relationship *
                </Label>
                <select
                  id="relation"
                  value={formData.relation}
                  onChange={(e) => setFormData({ ...formData, relation: e.target.value })}
                  required
                  className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select relationship</option>
                  {relations.map((rel) => (
                    <option key={rel} value={rel}>
                      {rel}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="birthdate" className="text-slate-700">
                  Birthday
                </Label>
                <Input
                  id="birthdate"
                  type="date"
                  value={formData.birthdate}
                  onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="job" className="text-slate-700">
                  Job/Occupation
                </Label>
                <Input
                  id="job"
                  value={formData.job}
                  onChange={(e) => setFormData({ ...formData, job: e.target.value })}
                  placeholder="e.g., Teacher, Engineer, Retired"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="interests" className="text-slate-700">
                  Interests & Hobbies
                </Label>
                <Input
                  id="interests"
                  value={formData.interests}
                  onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                  placeholder="e.g., Reading, Cooking, Sports, Gardening"
                  className="mt-1"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Member
                </Button>
                <Link href="/tree" className="flex-1">
                  <Button type="button" variant="outline" className="w-full bg-transparent">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
