"use client"

import Link from "next/link"

interface FamilyTreeCardProps {
  name: string
  relation: string
  avatar?: string
  href?: string
}

export default function FamilyTreeCard({ name, relation, avatar, href = "#" }: FamilyTreeCardProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 border border-yellow-600/20 hover:border-yellow-600/40 hover:bg-slate-800 transition-all hover:shadow-lg"
    >
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-600 via-yellow-500 to-amber-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-lg border-2 border-yellow-400/30">
        {name.charAt(0)}
      </div>
      <div className="min-w-0">
        <div className="font-medium text-slate-200 truncate font-display">{name}</div>
        <div className="text-sm text-slate-400 font-body">{relation}</div>
      </div>
    </Link>
  )
}
