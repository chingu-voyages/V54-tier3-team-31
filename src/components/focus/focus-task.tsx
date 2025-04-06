"use client"

import type React from "react"
import { useState } from "react"
import type { UseFormReturn } from "react-hook-form"
import type { TaskFormValues } from "@/lib/types/types"
import { Checkbox } from "../ui/checkbox"
import { MoreHorizontal, Sparkles } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"

interface FocusTaskProps {
  id: number
  title: string
  frequency: string
  duration: string
  completed: boolean
  form: UseFormReturn<TaskFormValues>
}

const FocusTask: React.FC<FocusTaskProps> = ({ id, title, frequency, duration, completed, form }) => {
  const [isChecked, setIsChecked] = useState(completed)

  return (
    <div className="mb-4">
      <div className="flex items-center gap-3 mb-2">
        <Checkbox
          checked={isChecked}
          onCheckedChange={(checked) => setIsChecked(checked as boolean)}
          className="h-5 w-5 rounded-full border-zinc-600 data-[state=checked]:bg-white data-[state=checked]:text-black"
        />
        <span className={`flex-1 text-white ${isChecked ? "line-through text-zinc-500" : ""}`}>{title}</span>
      </div>
      <div className="flex items-center justify-between pl-8">
        <div className="flex gap-2">
          <span className="text-xs bg-zinc-800 text-zinc-400 px-3 py-1 rounded-full">{frequency}</span>
          <span className="text-xs bg-zinc-800 text-zinc-400 px-3 py-1 rounded-full">{duration}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-xs text-zinc-400">
            <Sparkles className="h-4 w-4" />
            <span>Simpler</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="h-8 w-8 flex items-center justify-center text-zinc-400">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800">
              <DropdownMenuItem className="text-zinc-300">Edit</DropdownMenuItem>
              <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

export default FocusTask

