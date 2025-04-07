'use client'

import type React from 'react'
import { useEffect, useState, useRef, KeyboardEvent } from 'react'
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
import { Form } from '@/components/ui/form'
import { FormField, FormItem, FormControl, FormMessage } from '../ui/form'
import { Input } from '../ui/input'

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
    onEditTask?: (taskId: number, values: TaskFormValues) => void
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
    onEditTask,
    form,
}) => {
    const [isChecked, setIsChecked] = useState(initialCompleted)
    const [isEditing, setIsEditing] = useState(false)
    const formRef = useRef<HTMLDivElement>(null)

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

    // Handler for document clicks - checks if click is outside the form
    const handleDocumentClick = (e: MouseEvent) => {
        if (formRef.current && !formRef.current.contains(e.target as Node)) {
            form.handleSubmit((values) => handleTaskEdit(id, values))()
            setIsEditing(false)
            document.removeEventListener('mousedown', handleDocumentClick)
        }
    }

    // Handle Enter key press on the form when editing
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            form.handleSubmit((values) => handleTaskEdit(id, values))()
            setIsEditing(false)
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

    // Handler for task editing
    const handleTaskEdit = async (taskId: number, values: TaskFormValues) => {
        if (onEditTask) {
            onEditTask(taskId, values)
        }
    }

    return (
        <div className="mb-4">
            {isEditing ? (
                <div ref={formRef}>
                    <Form {...form}>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault()
                                form.handleSubmit((values) => handleTaskEdit(id, values))(e)
                            }}
                            className="space-y-4 border-none border-border pb-0 pt-4"
                        >
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div>
                                                <div className="flex w-full items-center gap-2 text-base text-foreground font-medium">
                                                    <Checkbox checked={isChecked}
                                                        onCheckedChange={handleCheckboxChange}
                                                        className={`h-5 w-5 rounded-full ${!isChecked && 'border-neutral-500'} data-[state=checked]:!bg-lime-400 data-[state=checked]:!text-slate-900`}
                                                    />
                                                    <Input
                                                        placeholder="Your Task"
                                                        {...field}
                                                        className="text-xl font-semibold border-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto"
                                                        variant="ghost"
                                                        autoFocus
                                                        onKeyDown={handleKeyDown}
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
                            {/* Hidden submit button to ensure form can be submitted */}
                            <button type="submit" style={{ display: 'none' }} />
                        </form>
                    </Form>
                </div>
            ) : (
                <>
                    <div className="flex items-center gap-3">
                        <Checkbox
                            checked={isChecked}
                            onCheckedChange={handleCheckboxChange}
                            className={`h-5 w-5 rounded-full ${!isChecked && 'border-neutral-500'} data-[state=checked]:!bg-lime-400 data-[state=checked]:!text-slate-900`}
                        />
                        <span
                            className={`flex-1 text-zinc-100 ${isChecked ? 'line-through text-zinc-500' : ''} cursor-pointer`}
                            onClick={() => toggleEditing(true)}
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
                </>
            )}
        </div>
    )
}

export default FocusTask
