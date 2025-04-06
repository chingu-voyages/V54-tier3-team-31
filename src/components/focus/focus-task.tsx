'use client'

import type React from 'react'
import { useEffect, useState } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import type { TaskFormValues } from '@/lib/types/types'
import { Checkbox } from '../ui/checkbox'
import { Button } from '../ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { FREQUENCY_OPTIONS, DURATION_OPTIONS } from '@/lib/constants/taskOptions'
import { WandSparkles, Trash } from 'lucide-react'
import ActionDropdown from '../ui/action-dropdown'

interface FocusTaskProps {
    id: number
    title: string
    frequency: string
    duration: string
    completed: boolean
    form: UseFormReturn<TaskFormValues>
    onToggleFocus?: (taskId: number, isInFocus: boolean) => void
    onTaskComplete?: (
        taskId: number,
        completed: boolean,
        completedAt?: Date
    ) => void
    onFrequencyChange?: (taskId: number, newFrequency: string) => void
    onDurationChange?: (taskId: number, newDuration: string) => void
    onDeleteTask?: (taskId: number) => void
}

const FocusTask: React.FC<FocusTaskProps> = ({
    id,
    title,
    frequency,
    duration,
    completed: initialCompleted,
    onTaskComplete,
    onFrequencyChange,
    onDurationChange,
    onDeleteTask,
}) => {
    const [isChecked, setIsChecked] = useState(initialCompleted)

    useEffect(() => {
        setIsChecked(initialCompleted)
    }, [initialCompleted])

    const handleCheckboxChange = async (checked: boolean) => {
        setIsChecked(checked)
        onTaskComplete?.(id, checked, checked ? new Date() : undefined)
    }

    const handleFrequencyChange = (newFrequency: string) => {
        onFrequencyChange?.(id, newFrequency)
    }

    const handleDurationChange = (newDuration: string) => {
        onDurationChange?.(id, newDuration)
    }

    const handleDeleteTask = () => {
        onDeleteTask?.(id)
    }

    return (
        <div className="mb-4">
            <div className="flex items-center gap-3">
                <Checkbox
                    checked={isChecked}
                    onCheckedChange={handleCheckboxChange}
                    className={`h-5 w-5 rounded-full ${!isChecked && 'border-neutral-500'} data-[state=checked]:!bg-lime-400 data-[state=checked]:!text-slate-900`}
                />
                <span
                    className={`flex-1 text-zinc-100 ${isChecked ? 'line-through text-zinc-500' : ''}`}
                >
                    {title}
                </span>
            </div>
            <div className="flex w-full items-center text-xs text-foreground font-medium justify-between mt-3">
                <div className="self-stretch flex items-center gap-4 my-auto">
                    {/* Frequency Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-auto px-3 py-1 text-xs border-border bg-background whitespace-nowrap rounded-md border-solid hover:bg-accent"
                            >
                                {frequency}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            {FREQUENCY_OPTIONS.map((option) => (
                                <DropdownMenuItem
                                    key={option}
                                    onSelect={() => handleFrequencyChange(option)}
                                >
                                    {option}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Duration Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-auto px-3 py-1 text-xs border-border bg-background whitespace-nowrap rounded-md border-solid hover:bg-accent -ml-2"
                            >
                                {duration?.length === 0
                                    ? 'None'
                                    : duration}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            {DURATION_OPTIONS.map((option) => (
                                <DropdownMenuItem
                                    key={option}
                                    onSelect={() => handleDurationChange(option)}
                                >
                                    {option}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        className="flex items-center gap-1 whitespace-nowrap"
                    >
                        <div className="w-4 h-4 text-primary">
                            <WandSparkles size={16} />
                        </div>
                        <div>Simpler</div>
                    </Button>
                    <ActionDropdown iconSize={16}>
                        <DropdownMenuItem
                            className="text-destructive"
                            onClick={handleDeleteTask}
                        >
                            <Trash className="mr-2 h-4 w-4 text-red-400" />
                            Delete
                        </DropdownMenuItem>
                    </ActionDropdown>
                </div>
            </div>
        </div>
    )
}

export default FocusTask
