import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { ArrowLeft, MoreHorizontal, Trash } from 'lucide-react'
import { Card } from '@/components/ui/card'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import FocusTask from '@/components/focus/focus-task'
import { removeTaskFromLocal } from '@/lib/localforage'
import { deleteTaskForUser } from '@/app/(protected)/app/actions/tasks'
import { updateTaskCompletionForUser } from '@/app/(protected)/app/actions/tasks'
import { updateTaskCompletion as updateTaskCompletionLocal } from '@/lib/localforage'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'

interface HabitCompletionsProps {
    id: string
    title: string
    completions: {
        id: number
        name: string
        goalId: number | undefined
        frequency: string
        duration: string
        completed: boolean
        completedAt: Date | null
    }[]
    onBack: () => void
    onTaskChanged: () => void
}

const HabitCompletions: React.FC<HabitCompletionsProps> = ({
    title,
    completions,
    onBack,
    onTaskChanged,
}) => {
    const { status } = useSession()
    const [updatedCompletions, setUpdatedCompletions] = useState(completions)

    const handleToggleCompleteTask = async (
        taskId: number,
        completed: boolean,
        goalId: number | undefined
    ) => {
        try {
            const newCompletedStatus = !completed
            const completedAt = newCompletedStatus ? new Date() : null

            if (status === 'authenticated') {
                await updateTaskCompletionForUser(
                    taskId,
                    newCompletedStatus,
                    completedAt
                )
            } else {
                await updateTaskCompletionLocal(
                    taskId,
                    newCompletedStatus,
                    goalId
                )
            }
            setUpdatedCompletions((prev) =>
                prev.map((completion) =>
                    completion.id === taskId
                        ? {
                              ...completion,
                              completed: newCompletedStatus,
                              completedAt,
                          }
                        : completion
                )
            )
            onTaskChanged()
        } catch (error) {
            console.error('Error toggling task completion:', error)
        }
    }

    const handleDeleteCompleteTask = async (
        taskId: number,
        goalId: number | undefined
    ) => {
        try {
            if (status === 'authenticated') {
                await deleteTaskForUser(taskId)
            } else {
                await removeTaskFromLocal({ taskId, goalId })
            }

            setUpdatedCompletions((prev) =>
                prev.filter((completion) => completion.id !== taskId)
            )
            onTaskChanged()
        } catch (error) {
            console.error('Error deleting task:', error)
        }
    }

    return (
        <div className="min-h-screen flex flex-col pb-16 md:pb-0 md:max-w-3xl md:mx-auto md:w-full pt-4 md:pt-8">
            {/* Back Button */}
            <Button
                onClick={onBack}
                variant="link"
                size="icon"
                className="justify-start hover:no-underline px-0 hover:cursor-pointer gap-5 mb-2"
            >
                <ArrowLeft className="!w-6 !h-6" />
                <h3 className="text-2xl font-semibold">Habit completions</h3>
            </Button>
            {/* Task details */}
            <h4 className="mt-4 text-xl font-semibold">{title}</h4>
            <div className="mt-4 w-full space-y-4">
                {updatedCompletions.map((completion) => (
                    <Card
                        key={completion.id}
                        className="border-b-[1px] rounded-none mb-2 bg-neutral-900 min-h-[72px] pt-0 pb-3"
                    >
                        <div className="w-full">
                            <div className="flex w-full items-center gap-1.5 text-base text-foreground font-medium">
                                <Checkbox
                                    checked={completion.completed}
                                    onCheckedChange={() =>
                                        handleToggleCompleteTask(
                                            completion.id,
                                            completion.completed,
                                            completion.goalId
                                        )
                                    }
                                    className={`h-5 w-5 rounded-full hover:cursor-pointer ${
                                        !completion.completed &&
                                        'border-neutral-500'
                                    } data-[state=checked]:!bg-lime-400 data-[state=checked]:!text-slate-900`}
                                />
                                <div
                                    className={`self-stretch my-auto text-neutral-100 text-base font-normal ${
                                        completion.completed
                                            ? 'line-through text-zinc-500'
                                            : ''
                                    }`}
                                >
                                    {completion.name}
                                </div>
                            </div>
                            <div className="flex w-full items-center text-xs text-foreground font-medium justify-between mt-3">
                                <div className="self-stretch flex items-center gap-4 my-auto">
                                    <div className="self-stretch border border-border bg-background whitespace-nowrap my-auto px-3 py-1 rounded-md border-solid">
                                        {completion.frequency}
                                    </div>
                                    <div className="self-stretch border border-border bg-background -ml-2 whitespace-nowrap my-auto px-3 py-1 rounded-md border-solid">
                                        {completion.duration}
                                    </div>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="self-stretch flex items-center gap-1 whitespace-nowrap my-auto"
                                        >
                                            <MoreHorizontal />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem
                                            className="text-destructive"
                                            onClick={() =>
                                                handleDeleteCompleteTask(
                                                    completion.id,
                                                    completion.goalId
                                                )
                                            }
                                        >
                                            <Trash className="mr-2 h-4 w-4 text-red-400" />
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default HabitCompletions
