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
import { FREQUENCY_OPTIONS, DURATION_OPTIONS } from '@/lib/constants/taskOptions'
import { useTaskGoalContext } from '@/hooks/useTaskGoalContext'

interface TaskProps {
    id: number
    title: string
    frequency?: string | null
    duration?: string | null
    onFrequencyChange?: (newFrequency: string) => void
    onDurationChange?: (newDuration: string) => void
    onDeleteTaskClick: (taskId: number) => void
    onEditTask: (id: number, values: TaskFormValues, goalId?: number) => void
    form: UseFormReturn<TaskFormValues>,
    goalId?: number 
}

const Task: React.FC<TaskProps> = ({
    id,
    title,
    frequency = 'Once',
    duration = '5 mins',
    onFrequencyChange,
    onDurationChange,
    onDeleteTaskClick,
    onEditTask,
    form,
    goalId
}) => {
    const [isEditing, setIsEditing] = useState(false)
    const formRef = useRef<HTMLDivElement>(null)
    
    // Access the TaskGoalContext if available
    const taskGoalContext = goalId ? useTaskGoalContext() : null

    // Handler for document clicks - checks if click is outside the form
    const handleDocumentClick = (e: MouseEvent) => {
        if (formRef.current && !formRef.current.contains(e.target as Node)) {
            form.handleSubmit((values) => handleTaskEdit(id, values))()
            setIsEditing(false)
            document.removeEventListener('mousedown', handleDocumentClick)
        }
    }

    // Toggle editing state function
    const toggleEditing = (newState: boolean) => {
        setIsEditing(newState)
        
        if (newState) {
            form.setValue('title', title)
            form.setValue('frequency', frequency || 'Once')
            form.setValue('duration', duration || '5 mins')
            document.addEventListener('mousedown', handleDocumentClick)
        } else {
            document.removeEventListener('mousedown', handleDocumentClick)
        }
    }

    // Unified handler for task editing
    const handleTaskEdit = async (taskId: number, values: TaskFormValues) => {
        if (goalId && taskGoalContext) {
            // If this is a goal task and we have access to context, use the context method
            await taskGoalContext.updateTaskInGoal(taskId, goalId, values)
        } else {
            // Otherwise use the standard method
            onEditTask(taskId, values, goalId)
        }
    }

    // Handle frequency change in non-editing mode
    const handleFrequencyChange = async (newFrequency: string) => {
        if (onFrequencyChange) {
            onFrequencyChange(newFrequency)
        }
        
        const updatedValues = {
            title,
            frequency: newFrequency,
            duration: duration || '5 mins',
        }
        
        await handleTaskEdit(id, updatedValues)
    }

    // Handle duration change in non-editing mode
    const handleDurationChange = async (newDuration: string) => {
        if (onDurationChange) {
            onDurationChange(newDuration)
        }
        
        const updatedValues = {
            title,
            frequency: frequency || 'Once',
            duration: newDuration,
        }
        
        await handleTaskEdit(id, updatedValues)
    }

    return (
        <div className="w-full border-b border-border py-3">
            {isEditing ? (
                <div ref={formRef}>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit((values) => handleTaskEdit(id, values))}
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
                                                                            {FREQUENCY_OPTIONS.map(
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
                                                                            {DURATION_OPTIONS.map(
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
