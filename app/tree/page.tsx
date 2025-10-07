import type { Metadata } from "next"
import FamilyTreeVisual from "@/components/family-tree-visual"
import FamilyTreeCard from "@/components/family-tree-card"
import { Button } from "@/components/ui/button"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "Family Tree",
  description: "Visualize your chosen family connections",
}

export default function TreePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-gold-gradient font-display">Family Tree</h1>
        <Button className="btn-gold">
          <Plus className="w-4 h-4 mr-2" />
          Add Member
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <FamilyTreeVisual />
        </div>

        <div className="card-luxury">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-slate-100">
              <Users className="w-5 h-5 text-yellow-400" />
              Family Members
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <FamilyTreeCard name="Marcus Johnson" relation="Chosen Father" />
            <FamilyTreeCard name="Aisha Rahman" relation="Chosen Sister" />
            <FamilyTreeCard name="Sofia Martinez" relation="Chosen Aunt" />
            <FamilyTreeCard name="David Chen" relation="Chosen Brother" />
          </CardContent>
        </div>
      </div>
    </div>
  )
}
