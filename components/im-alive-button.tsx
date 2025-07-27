"use client"

import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

interface ImAliveButtonProps {
  onImAlive: () => Promise<void>
}

export function ImAliveButton({ onImAlive }: ImAliveButtonProps) {
  return (
    <Button onClick={onImAlive} size="lg" className="bg-green-600 hover:bg-green-700 text-white">
      <Heart className="mr-2 h-4 w-4" />
      I'm Alive
    </Button>
  )
}
