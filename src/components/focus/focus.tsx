"use client"

import type React from "react"
import { Plus, MoreHorizontal } from "lucide-react"
import { Button } from "../ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { TaskFormSchema } from "@/lib/types/validations"
import FocusTask from "./focus-task"

const Focus: React.FC = () => {
  // Form setup for tasks
  const taskForm = useForm<typeof TaskFormSchema._type>({
    resolver: zodResolver(TaskFormSchema),
    defaultValues: {
      title: "",
      frequency: "Once",
      duration: "5mins",
    },
  })

  // Mock data for demonstration - replace with actual data management
  const focusTasks = [
    {
      id: 1,
      title: "Stretch (neck, shoulders, back)",
      frequency: "Once",
      duration: "5mins",
      completed: false,
    },
    {
      id: 2,
      title: "10 push-ups, squats, or jumping jacks",
      frequency: "Once",
      duration: "5mins",
      completed: false,
    },
    {
      id: 3,
      title: "Walk while listening to music/podcast",
      frequency: "Once",
      duration: "5mins",
      completed: false,
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-col flex-1 px-4 pb-16 md:pb-0 md:max-w-3xl md:mx-auto md:w-full">
        {/* Header */}
        <div className="flex items-center justify-between mt-4 mb-6">
          <h1 className="text-2xl font-semibold">Today&apos;s Focus</h1>
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <span className="sr-only">Menu</span>
            <span className="text-2xl">≡</span>
          </Button>
        </div>

        {/* Exercise Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl">Exercise to Get Healthier</h2>
            <Button variant="ghost" size="icon" className="text-zinc-400 h-8 w-8 p-0">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>

          <div>
            {focusTasks.map((task) => (
              <FocusTask key={task.id} {...task} form={taskForm} />
            ))}
          </div>

          <Button
            variant="ghost"
            className="w-full flex items-center gap-2 justify-start text-sm py-2 text-zinc-400"
          >
            <Plus className="h-4 w-4" />
            add
          </Button>

          {/* Best Time Info */}
          <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-lg mt-2">
            <h3 className="font-medium text-white mb-1">Best Time</h3>
            <p className="text-sm text-zinc-400">After a long coding session or before lunch, refresh your mind.</p>
          </div>
        </div>

        {/* Sleep Early Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl">Sleep Early</h2>
            <Button variant="ghost" size="icon" className="text-zinc-400 h-8 w-8 p-0">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>

          <FocusTask
            id={4}
            title="Dim lights, activate night mode"
            frequency="Once"
            duration="5mins"
            completed={false}
            form={taskForm}
          />

          <Button
            variant="ghost"
            className="w-full flex items-center gap-2 justify-start text-sm py-2 text-zinc-400"
          >
            <Plus className="h-4 w-4" />
            add
          </Button>

          {/* Best Time Info */}
          <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-lg mt-2">
            <h3 className="font-medium text-white mb-1">Best Time</h3>
            <p className="text-sm text-zinc-400">30 minutes before bed.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Focus

