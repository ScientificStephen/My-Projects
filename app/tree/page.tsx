import FamilyTreeCard from "@/components/family-tree-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserPlus, Download, Share2 } from "lucide-react"
import Link from "next/link"

export default function TreePage() {
  const familyMembers = [
    { name: "Grandma Rose", relation: "Grandmother", generation: "Grandparents" },
    { name: "Grandpa Pedro", relation: "Grandfather", generation: "Grandparents" },
    { name: "Mom Maria", relation: "Mother", generation: "Parents" },
    { name: "Dad James", relation: "Father", generation: "Parents" },
    { name: "Aunt Linda", relation: "Aunt", generation: "Parents" },
    { name: "Uncle Tom", relation: "Uncle", generation: "Parents" },
    { name: "You", relation: "Self", generation: "Children" },
    { name: "Sister Ava", relation: "Sister", generation: "Children" },
    { name: "Brother Miguel", relation: "Brother", generation: "Children" },
    { name: "Cousin Sarah", relation: "Cousin", generation: "Children" },
  ]

  const generations = ["Grandparents", "Parents", "Children"]

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Family Tree</h1>
          <p className="text-slate-600">Visualize your family connections and relationships</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Link href="/add-member">
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              <UserPlus className="w-4 h-4 mr-2" />
              Add Member
            </Button>
          </Link>
        </div>
      </div>

      {/* Generation-based Tree View */}
      <div className="space-y-8">
        {generations.map((generation) => (
          <div key={generation}>
            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-600"></div>
              {generation}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {familyMembers
                .filter((member) => member.generation === generation)
                .map((member, idx) => (
                  <FamilyTreeCard
                    key={idx}
                    name={member.name}
                    relation={member.relation}
                    href={`/profile/${member.name.toLowerCase().replace(" ", "-")}`}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Future Features Card */}
      <Card className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">Coming Soon</CardTitle>
          <CardDescription className="text-blue-700">Exciting features we're working on</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="text-sm text-blue-800 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">✓</span>
              <span>Interactive tree viewer with drag-to-connect relationships</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">✓</span>
              <span>Export your family tree as PDF or image</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">✓</span>
              <span>Import family data from CSV or GEDCOM files</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">✓</span>
              <span>Collaborative editing with family members</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
