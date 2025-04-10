'use client'

import React, { useState, useRef, KeyboardEvent } from "react";
import type { UseFormReturn } from 'react-hook-form';
import type { TaskFormValues } from '@/lib/types/types';
import { simplifyTask } from "@/app/(protected)/app/actions";
import { toast } from 'sonner';
import { FREQUENCY_OPTIONS, DURATION_OPTIONS } from '@/lib/constants/taskOptions';

// UI Components
import { Button } from "../ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import ActionDropdown from "@/components/ui/action-dropdown";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';

// Icons
import { Trash } from "lucide-react";

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
    completed,
    onTaskComplete,
    onFrequencyChange,
    onDurationChange,
    onDeleteTask,
    onEditTask,
    form,
}) => {
    const [isChecked, setIsChecked] = useState(completed)
    const [isEditing, setIsEditing] = useState(false)
    const formRef = useRef<HTMLDivElement>(null)

    // State for simplification feature
    const [isSimplifying, setIsSimplifying] = useState(false)
    const [simplifiedTaskSuggestion, setSimplifiedTaskSuggestion] = useState<string | null>(null)
    const [showSimplificationConfirmation, setShowSimplificationConfirmation] = useState(false)
    const [simplifyError, setSimplifyError] = useState<string | null>(null)

    const handleCheckboxChange = async (checked: boolean) => {
        // Optimistic UI update
        setIsChecked(checked);

        try {
            // Call parent handler
            onTaskComplete?.(id, checked, checked ? new Date() : undefined);
        } catch (error) {
            // Revert UI on error
            setIsChecked(!checked);
            console.error('Error updating task completion:', error);
            // Consider adding a toast message here
        }
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

    // --- Simplification Handlers (copied from Task.tsx) ---
    const handleSimplifyTask = async () => {
        setIsSimplifying(true);
        setSimplifyError(null);
        
        try {
            const simplifiedTask = await simplifyTask(title);
            setSimplifiedTaskSuggestion(simplifiedTask.title);
            setShowSimplificationConfirmation(true);
        } catch (error) {
            console.error('Error simplifying task:', error);
            setSimplifyError(error instanceof Error ? error.message : 'Unknown error');
        } finally {
            setIsSimplifying(false);
        }
    };

    const handleAcceptSimplifiedTask = async () => {
        if (!simplifiedTaskSuggestion) return
        try {
            const updatedValues = {
                title: simplifiedTaskSuggestion,
                frequency: frequency || 'Once',
                duration: duration || '5 mins',
            }
            await handleTaskEdit(id, updatedValues) // Use the existing edit handler
            toast.success('Task updated with simplified version!')
        } catch (error) {
            console.error('Error applying simplified task:', error)
            toast.error('Failed to update task. Please try again.')
        } finally {
            setSimplifiedTaskSuggestion(null)
            setShowSimplificationConfirmation(false)
        }
    }

    const handleRetrySimplifyTask = async () => {
        setSimplifiedTaskSuggestion(null)
        setShowSimplificationConfirmation(false)
        await handleSimplifyTask()
    }

    const handleCancelSimplifiedTask = () => {
        setSimplifiedTaskSuggestion(null)
        setShowSimplificationConfirmation(false)
    }
    // --- End Simplification Handlers ---

    // Render simplification elements if in focus and while simplifying
    const renderSimplificationElements = () => {
        if (isSimplifying) {
            return (
                <div className="ml-2 flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-700 mr-2" />
                    <span className="text-sm text-blue-700">Simplifying...</span>
                </div>
            );
        }

        if (showSimplificationConfirmation) {
            return (
                <div className="relative flex flex-col ml-2 p-2 border border-gray-200 rounded-md bg-white shadow-sm">
                    <p className="text-sm font-medium mb-2">Simplified suggestion:</p>
                    <p className="text-sm italic mb-2">{simplifiedTaskSuggestion}</p>
                    <div className="flex space-x-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center gap-1"
                            onClick={handleAcceptSimplifiedTask}
                        >
                            Apply
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center gap-1"
                            onClick={handleRetrySimplifyTask}
                            disabled={isSimplifying}
                        >
                            Try Again
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center gap-1 absolute top-0 right-0"
                            onClick={handleCancelSimplifiedTask}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            );
        }

        if (simplifyError) {
            return (
                <div className="ml-2 text-sm text-red-500">
                    Error: {simplifyError}
                </div>
            );
        }

        return null;
    };

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
                                                        {/* Consider addinfg a Save button here or rely on Enter */}
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
                            {/* --- Simplification UI (copied/adapted from Task.tsx) --- */}
                            {renderSimplificationElements()}
                            {/* --- End Simplification UI --- */}
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
