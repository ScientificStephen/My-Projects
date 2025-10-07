"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TreeNode {
  id: string
  name: string
  relation: string
  level: number
  x: number
  y: number
}

export default function FamilyTreeVisual() {
  const nodes: TreeNode[] = [
    { id: "1", name: "Grandma Rose", relation: "Grandmother", level: 0, x: 250, y: 50 },
    { id: "2", name: "Grandpa John", relation: "Grandfather", level: 0, x: 450, y: 50 },
    { id: "3", name: "Mom Maria", relation: "Mother", level: 1, x: 200, y: 200 },
    { id: "4", name: "Dad James", relation: "Father", level: 1, x: 400, y: 200 },
    { id: "5", name: "You", relation: "Self", level: 2, x: 300, y: 350 },
    { id: "6", name: "Sister Sarah", relation: "Sister", level: 2, x: 500, y: 350 },
  ]

  const connections = [
    { from: "1", to: "3" },
    { from: "2", to: "4" },
    { from: "3", to: "5" },
    { from: "4", to: "5" },
    { from: "3", to: "6" },
    { from: "4", to: "6" },
  ]

  const getNode = (id: string) => nodes.find((n) => n.id === id)

  return (
    <Card className="card-luxury shadow-luxury border-2 border-yellow-600/20">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gold-gradient font-display">Your Family Tree</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-[500px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-8 overflow-hidden">
          {/* Decorative tree trunk */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-24 bg-gradient-to-b from-yellow-800 to-yellow-900 rounded-t-lg opacity-30" />

          <svg className="absolute inset-0 w-full h-full">
            {/* Draw connections as branches */}
            {connections.map((conn, idx) => {
              const from = getNode(conn.from)
              const to = getNode(conn.to)
              if (!from || !to) return null

              // Calculate control points for curved branches
              const midY = (from.y + to.y) / 2

              return (
                <path
                  key={idx}
                  d={`M ${from.x} ${from.y + 30} Q ${from.x} ${midY}, ${(from.x + to.x) / 2} ${midY} T ${to.x} ${to.y - 30}`}
                  className="tree-branch"
                  strokeDasharray="4 2"
                />
              )
            })}
          </svg>

          {/* Draw nodes */}
          {nodes.map((node) => (
            <div
              key={node.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 tree-node"
              style={{ left: node.x, top: node.y }}
            >
              <div className="relative group cursor-pointer">
                {/* Node circle with gold border */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-600 via-yellow-500 to-amber-600 flex items-center justify-center text-white font-bold text-xl border-4 border-yellow-400/30 shadow-xl hover:scale-110 transition-transform">
                  {node.name.charAt(0)}
                </div>

                {/* Hover card */}
                <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white px-4 py-2 rounded-lg shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 border border-yellow-600/30">
                  <div className="font-semibold text-yellow-400">{node.name}</div>
                  <div className="text-xs text-slate-300">{node.relation}</div>
                </div>
              </div>
            </div>
          ))}

          {/* Decorative leaves */}
          <div className="absolute top-8 right-8 w-8 h-8 bg-gradient-to-br from-green-600 to-emerald-700 rounded-full opacity-20 animate-pulse" />
          <div className="absolute top-16 right-24 w-6 h-6 bg-gradient-to-br from-green-600 to-emerald-700 rounded-full opacity-20 animate-pulse delay-100" />
          <div className="absolute top-12 left-12 w-8 h-8 bg-gradient-to-br from-green-600 to-emerald-700 rounded-full opacity-20 animate-pulse delay-200" />
        </div>
      </CardContent>
    </Card>
  )
}
