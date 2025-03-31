'use client'

import React, { useState, useRef } from 'react'
import { Star, Trash, WandSparkles } from 'lucide-react'
import { Button } from '../ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import ActionDropdown from '../ui/action-dropdown'
import { Form } from '@/components/ui/form'
import { FormField, FormItem, FormControl, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { UseFormReturn } from 'react-hook-form'
import { TaskFormValues } from '@/lib/types/types'


interface TaskProps {
    id: number
    title: string
    // Add props for frequency and duration if they need to be dynamic
    frequency?: string | null // e.g., 'Once', 'Daily'
    duration?: string | null // e.g., '5 mins', '15 mins'
    // Add callback functions to handle selection changes
    onFrequencyChange?: (newFrequency: string) => void
    onDurationChange?: (newDuration: string) => void
    onDeleteTaskClick: (taskId: number) => void
    onEditTask: (id: number, values: TaskFormValues) => void
    form: UseFormReturn<TaskFormValues>
}

const Task: React.FC<TaskProps> = ({
    id,
    title,
    frequency = 'Once', // Default value
    duration = '5 mins', // Default value
    onFrequencyChange,
    onDurationChange,
    onDeleteTaskClick,
    onEditTask,
    form,
}) => {
    const frequencyOptions = ['Once', 'Daily', 'Weekly', 'Monthly']
    const durationOptions = [
        '5 mins',
        '10 mins',
        '15 mins',
        '30 mins',
        '1 hour',
    ]
    const [isEditing, setIsEditing] = useState(false)
    const formRef = useRef<HTMLDivElement>(null)

    // Handler for document clicks - checks if click is outside the form
    const handleDocumentClick = (e: MouseEvent) => {
        // If the form ref is set and the click is outside the form
        if (formRef.current && !formRef.current.contains(e.target as Node)) {
            // Save changes before closing the form
            form.handleSubmit((values) => onEditTask(id, values))()
            setIsEditing(false)
            // Clean up the event listener
            document.removeEventListener('mousedown', handleDocumentClick)
        }
    }

    // Toggle editing state function
    const toggleEditing = (newState: boolean) => {
        setIsEditing(newState)
        
        if (newState) {
            // When we start editing, add the document click listener with a small delay
            // to prevent the click that opened the form from immediately closing it
            setTimeout(() => {
                document.addEventListener('mousedown', handleDocumentClick)
            }, 0)
        } else {
            // When we stop editing, remove the document click listener
            document.removeEventListener('mousedown', handleDocumentClick)
        }
    }

    return (
        <div className="w-full border-b border-border py-3">
            {isEditing ? (
                <div ref={formRef}>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit((values) => onEditTask(id, values))}
                            className="space-y-4 border-b border-border pb-3 pt-4"
                        >
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div>
                                                <div className="flex w-full items-center gap-2 text-base text-foreground font-medium">
                                                    <Star
                                                        strokeWidth={1.5}
                                                        className="text-neutral-500"
                                                    />
                                                    <Input
                                                        placeholder="Your Task"
                                                        {...field}
                                                        className="text-xl font-semibold border-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto"
                                                        variant="ghost"
                                                    />
                                                </div>
                                                <div className="flex w-full items-center text-xs text-foreground font-medium justify-between mt-3">
                                                    <div className="flex items-center gap-4">
                                                        {/* --- Frequency Dropdown --- */}
                                                        <FormField
                                                            control={form.control}
                                                            name="frequency"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <DropdownMenu>
                                                                        <DropdownMenuTrigger
                                                                            asChild
                                                                        >
                                                                            <Button
                                                                                variant="outline"
                                                                                size="sm"
                                                                                className="h-auto px-3 py-1 text-xs border-border bg-background whitespace-nowrap rounded-md border-solid hover:bg-accent"
                                                                            >
                                                                                {field.value ||
                                                                                    'Frequency'}{' '}
                                                                            </Button>
                                                                        </DropdownMenuTrigger>
                                                                        <DropdownMenuContent align="start">
                                                                            {frequencyOptions.map(
                                                                                (option) => (
                                                                                    <DropdownMenuItem
                                                                                        key={option}
                                                                                        onSelect={() =>
                                                                                            field.onChange(option)
                                                                                        }
                                                                                    >
                                                                                        {option}
                                                                                    </DropdownMenuItem>
                                                                                )
                                                                            )}
                                                                        </DropdownMenuContent>
                                                                    </DropdownMenu>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                        {/* --- Duration Dropdown --- */}
                                                        <FormField
                                                            control={form.control}
                                                            name="duration"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <DropdownMenu>
                                                                        <DropdownMenuTrigger
                                                                            asChild
                                                                        >
                                                                            <Button
                                                                                variant="outline"
                                                                                size="sm"
                                                                                className="h-auto px-3 py-1 text-xs border-border bg-background whitespace-nowrap rounded-md border-solid hover:bg-accent -ml-2"
                                                                            >
                                                                                {field.value ||
                                                                                    'Duration'}{' '}
                                                                            </Button>
                                                                        </DropdownMenuTrigger>
                                                                        <DropdownMenuContent align="start">
                                                                            {durationOptions.map(
                                                                                (option) => (
                                                                                    <DropdownMenuItem
                                                                                        key={option}
                                                                                        onSelect={() =>
                                                                                            field.onChange(option)
                                                                                        }
                                                                                    >
                                                                                        {option}
                                                                                    </DropdownMenuItem>
                                                                                )
                                                                            )}
                                                                        </DropdownMenuContent>
                                                                    </DropdownMenu>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>
                                                    {/* Action Dropdown remains */}
                                                    <ActionDropdown iconSize={16}>
                                                        <DropdownMenuItem
                                                            className="text-destructive"
                                                            onClick={() => toggleEditing(false)}
                                                        >
                                                            <Trash className="mr-2 h-4 w-4 text-red-400" />
                                                            Cancel
                                                        </DropdownMenuItem>
                                                        {/* Consider adding a Save button here or rely on Enter */}
                                                    </ActionDropdown>
                                                </div>
                                            </div>
                                        </FormControl>
                                        <FormMessage />{' '}
                                        {/* Message for title field */}
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </div>
            ) : (
                <>
                    <div
                        className="flex w-full items-center gap-2 text-base text-foreground font-medium cursor-pointer"
                        onClick={() => toggleEditing(true)}
                    >
                        <Star strokeWidth={1.5} className="text-neutral-500" />
                        <div className="self-stretch my-auto">{title}</div>
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
                                    {frequencyOptions.map((option) => (
                                        <DropdownMenuItem
                                            key={option}
                                            onSelect={() =>
                                                onFrequencyChange?.(option)
                                            }
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
                                    {durationOptions.map((option) => (
                                        <DropdownMenuItem
                                            key={option}
                                            onSelect={() =>
                                                onDurationChange?.(option)
                                            }
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
                </>
            )}
        </div>
    )
}

export default Task
