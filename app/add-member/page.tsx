import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserPlus } from "lucide-react"

export const metadata: Metadata = {
  title: "Add Family Member",
  description: "Add a new member to your chosen family",
}

export default function AddMemberPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-gold-gradient font-display mb-2">Add Family Member</h1>
        <p className="text-slate-400 font-body">Invite someone to join your chosen family</p>
      </div>

      <Card className="card-luxury shadow-luxury border-2 border-yellow-600/20">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-slate-100 font-display flex items-center gap-2">
            <UserPlus className="w-6 h-6 text-yellow-400" />
            Member Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-200">
                Full Name
              </Label>
              <Input
                id="name"
                placeholder="Enter their name"
                className="bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="relation" className="text-slate-200">
                Relationship
              </Label>
              <Select>
                <SelectTrigger className="bg-slate-800 border-slate-700 text-slate-100">
                  <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="parent">Chosen Parent</SelectItem>
                  <SelectItem value="sibling">Chosen Sibling</SelectItem>
                  <SelectItem value="child">Chosen Child</SelectItem>
                  <SelectItem value="aunt-uncle">Chosen Aunt/Uncle</SelectItem>
                  <SelectItem value="grandparent">Chosen Grandparent</SelectItem>
                  <SelectItem value="cousin">Chosen Cousin</SelectItem>
                  <SelectItem value="friend">Family Friend</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-200">
                Email (Optional)
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="their@email.com"
                className="bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-slate-200">
                Personal Message
              </Label>
              <Textarea
                id="message"
                placeholder="Write a message explaining why you want them in your chosen family..."
                className="bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500 min-h-32"
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="btn-gold flex-1">
                Send Invitation
              </Button>
              <Button type="button" variant="outline" className="border-yellow-500/50 text-slate-100 bg-transparent">
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
