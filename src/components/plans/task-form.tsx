'use client'

import React, { KeyboardEvent, useRef, useEffect, useCallback } from 'react'
import { Star, Trash } from 'lucide-react'
import { Button } from '../ui/button'
import { useForm, Control } from 'react-hook-form'
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

// FrequencyDropdown component
const FrequencyDropdown: React.FC<{
    control: Control<TaskFormValues>
    name: keyof TaskFormValues
}> = ({ control, name }) => (
    <FormField
        control={control}
        name={name}
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
)

// DurationDropdown component
const DurationDropdown: React.FC<{
    control: Control<TaskFormValues>
    name: keyof TaskFormValues
}> = ({ control, name }) => (
    <FormField
        control={control}
        name={name}
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
)

// TaskFormActions component
const TaskFormActions: React.FC<{
    onCancel: () => void
}> = ({ onCancel }) => (
    <ActionDropdown iconSize={16}>
        <DropdownMenuItem
            className="text-destructive"
            onClick={onCancel}
        >
            <Trash className="mr-2 h-4 w-4 text-red-400" />
            Cancel
        </DropdownMenuItem>
    </ActionDropdown>
)

export const TaskForm: React.FC<TaskFormProps> = ({ onAddTask, onCancel }) => {
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
        if (values.title?.trim()) {
            onAddTask(values)
            form.reset()
        }
    }, [onAddTask, form])
    
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            const values = form.getValues()
            if (values.title?.trim()) {
                handleSubmit(values)
            }
        }
    }
    
    useEffect(() => {
        const handleDocumentClick = (e: MouseEvent) => {
            if (formRef.current && !formRef.current.contains(e.target as Node)) {
                const values = form.getValues()
                if (values.title?.trim()) {
                    form.handleSubmit(handleSubmit)()
                }
            }
        }
        
        document.addEventListener('mousedown', handleDocumentClick)
        return () => document.removeEventListener('mousedown', handleDocumentClick)
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
                                            <FrequencyDropdown control={form.control} name="frequency" />
                                            <DurationDropdown control={form.control} name="duration" />
                                        </div>
                                        <TaskFormActions onCancel={onCancel} />
                                    </div>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <button type="submit" style={{ display: 'none' }} />
            </form>
        </Form>
    )
}

export default TaskForm 