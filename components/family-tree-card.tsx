import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface FamilyTreeCardProps {
  name: string
  relation: string
}

export default function FamilyTreeCard({ name, relation }: FamilyTreeCardProps) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 border border-yellow-600/10 hover:border-yellow-600/30 transition cursor-pointer">
      <Avatar className="border-2 border-yellow-400/30">
        <AvatarImage src={`/generic-placeholder-graphic.png?height=40&width=40`} />
        <AvatarFallback className="bg-gradient-to-br from-yellow-600 to-amber-600 text-white font-bold text-sm">
          {name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-slate-100 text-sm font-display truncate">{name}</h4>
        <p className="text-xs text-yellow-400 font-body">{relation}</p>
      </div>
    </div>
  )
}
