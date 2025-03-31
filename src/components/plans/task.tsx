'use client'

import React from 'react'
import { Star, Trash, WandSparkles } from 'lucide-react'
import { Button } from '../ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import ActionDropdown from '../ui/action-dropdown'

interface TaskProps {
    id?: number,
    title: string
    // Add props for frequency and duration if they need to be dynamic
    frequency?: string | null // e.g., 'Once', 'Daily'
    duration?: string | null // e.g., '5 mins', '15 mins'
    // Add callback functions to handle selection changes
    onFrequencyChange?: (newFrequency: string) => void,
    onDurationChange?: (newDuration: string) => void,
    onDeleteTaskClick: (taskId: number) => void,
}

const Task: React.FC<TaskProps> = ({
    id,
    title,
    frequency = 'Once', // Default value
    duration = '5 mins', // Default value
    onFrequencyChange,
    onDurationChange,
    onDeleteTaskClick,
}) => {
    const frequencyOptions = ['Once', 'Daily', 'Weekly', 'Monthly']
    const durationOptions = [
        '5 mins',
        '10 mins',
        '15 mins',
        '30 mins',
        '1 hour',
    ]

    return (
        <div className="w-full border-b border-border py-3">
            <div className="flex w-full items-center gap-2 text-base text-foreground font-medium">
                <Star strokeWidth={1.5} className="text-neutral-500" />
                <div className="self-stretch my-auto">{title}</div>
            </div>
            <div className="flex w-full items-center text-xs text-foreground font-medium justify-between mt-3">
                <div className="self-stretch flex items-center gap-4 my-auto">
                    {/* Frequency Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            {/* Use a Button styled like the original div for better accessibility */}
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-auto px-3 py-1 text-xs border-border bg-background whitespace-nowrap rounded-md border-solid hover:bg-accent" // Adjusted styling
                            >
                                {frequency}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            {frequencyOptions.map((option) => (
                                <DropdownMenuItem
                                    key={option}
                                    onSelect={() => onFrequencyChange?.(option)} // Call handler on select
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
                                className="h-auto px-3 py-1 text-xs border-border bg-background whitespace-nowrap rounded-md border-solid hover:bg-accent -ml-2" // Adjusted styling, kept -ml-2 if needed
                            >
                                {duration?.length === 0 ? 'None' : duration}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            {durationOptions.map((option) => (
                                <DropdownMenuItem
                                    key={option}
                                    onSelect={() => onDurationChange?.(option)} // Call handler on select
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
                            onClick={() => {
                                if (id !== undefined) {
                                    onDeleteTaskClick(id)
                                }
                            }}
                            disabled={id === undefined} // Optionally disable if id is undefined
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

export default Task
