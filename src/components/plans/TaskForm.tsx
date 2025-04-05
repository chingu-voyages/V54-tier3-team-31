'use client'

import React, { KeyboardEvent, useRef, useEffect, useCallback } from 'react'
import { Star, Trash } from 'lucide-react'
import { Button } from '../ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import ActionDropdown from '../ui/action-dropdown'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { TaskFormSchema } from '@/lib/types/validations'
import { FREQUENCY_OPTIONS, DURATION_OPTIONS } from '@/lib/constants/taskOptions'
import { TaskFormValues } from '@/lib/types/types'

interface TaskFormProps {
    onAddTask: (values: TaskFormValues) => void
    onCancel: () => void
}

export function TaskForm({ onAddTask, onCancel }: TaskFormProps) {
    const formRef = useRef<HTMLFormElement>(null)
    const form = useForm<TaskFormValues>({
        resolver: zodResolver(TaskFormSchema),
        defaultValues: {
            title: '',
            frequency: 'Once',
            duration: '5 mins',
        },
    })

    const handleSubmit = useCallback((values: TaskFormValues) => {
        // Only submit if title is not empty
        if (values.title && values.title.trim() !== '') {
            onAddTask(values)
            form.reset()
        }
    }, [onAddTask, form])
    
    // Direct handler for the Enter key on the input field
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault() // Stop the default Enter behavior
            
            const values = form.getValues()
            // Simple validation - only submit if we have a title
            if (values.title && values.title.trim() !== '') {
                handleSubmit(values)
            }
        }
    }
    
    // Handler for document clicks - checks if click is outside the form
    useEffect(() => {
        const handleDocumentClick = (e: MouseEvent) => {
            if (formRef.current && !formRef.current.contains(e.target as Node)) {
                const values = form.getValues()
                if (values.title && values.title.trim() !== '') {
                    form.handleSubmit(handleSubmit)()
                }
            }
        }
        
        // Add event listener when component mounts
        document.addEventListener('mousedown', handleDocumentClick)
        
        // Clean up event listener when component unmounts
        return () => {
            document.removeEventListener('mousedown', handleDocumentClick)
        }
    }, [form, handleSubmit])

    return (
        <Form {...form}>
            <form
                ref={formRef}
                onSubmit={(e) => {
                    e.preventDefault()
                    form.handleSubmit(handleSubmit)(e)
                }}
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
                                                            <DropdownMenuTrigger asChild>
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    className="h-auto px-3 py-1 text-xs border-border bg-background whitespace-nowrap rounded-md border-solid hover:bg-accent"
                                                                    type="button"
                                                                >
                                                                    {field.value || 'Frequency'}
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="start">
                                                                {FREQUENCY_OPTIONS.map(option => (
                                                                    <DropdownMenuItem
                                                                        key={option}
                                                                        onSelect={() => field.onChange(option)}
                                                                    >
                                                                        {option}
                                                                    </DropdownMenuItem>
                                                                ))}
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
                                                            <DropdownMenuTrigger asChild>
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    className="h-auto px-3 py-1 text-xs border-border bg-background whitespace-nowrap rounded-md border-solid hover:bg-accent -ml-2"
                                                                    type="button"
                                                                >
                                                                    {field.value || 'Duration'}
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="start">
                                                                {DURATION_OPTIONS.map(option => (
                                                                    <DropdownMenuItem
                                                                        key={option}
                                                                        onSelect={() => field.onChange(option)}
                                                                    >
                                                                        {option}
                                                                    </DropdownMenuItem>
                                                                ))}
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        {/* Action Dropdown */}
                                        <ActionDropdown iconSize={16}>
                                            <DropdownMenuItem
                                                className="text-destructive"
                                                onClick={onCancel}
                                            >
                                                <Trash className="mr-2 h-4 w-4 text-red-400" />
                                                Cancel
                                            </DropdownMenuItem>
                                        </ActionDropdown>
                                    </div>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* Hidden button to help with form submission */}
                <button type="submit" style={{ display: 'none' }} />
            </form>
        </Form>
    )
}

export default TaskForm