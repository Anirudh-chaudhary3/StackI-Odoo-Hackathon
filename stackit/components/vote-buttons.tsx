"use client"
import { Button } from "@/components/ui/button"
import { ChevronUp, ChevronDown } from "lucide-react"

interface VoteButtonsProps {
  votes: number
  userVote?: "up" | "down" | null
  onVote: (voteType: "up" | "down") => void
  disabled?: boolean
}

export function VoteButtons({ votes, userVote, onVote, disabled = false }: VoteButtonsProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onVote("up")}
        disabled={disabled}
        className={`p-1 ${
          userVote === "up" ? "text-green-400 hover:text-green-300" : "text-gray-400 hover:text-white"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <ChevronUp className="h-6 w-6" />
      </Button>

      <span className="text-lg font-semibold text-white">{votes}</span>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => onVote("down")}
        disabled={disabled}
        className={`p-1 ${
          userVote === "down" ? "text-red-400 hover:text-red-300" : "text-gray-400 hover:text-white"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <ChevronDown className="h-6 w-6" />
      </Button>
    </div>
  )
}