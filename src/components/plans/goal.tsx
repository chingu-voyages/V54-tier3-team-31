'use client'

import React, {
    useState,
    useRef,
    KeyboardEvent,
    useEffect,
    useCallback,
} from 'react'
import Task from './task'
import { Plus, Trash, Check, X } from 'lucide-react'
import { Button } from '../ui/button'
import { DropdownMenuItem } from '../ui/dropdown-menu'
import ActionDropdown from '../ui/action-dropdown'
import { UseFormReturn } from 'react-hook-form'
import { GoalWithTasks, TaskFormValues } from '@/lib/types/types'
import { useTaskGoalContext } from '@/hooks/useTaskGoalContext'
import TaskForm from './task-form'
import { Input } from '@/components/ui/input'
import { usePathname } from 'next/navigation'

// Task type for better type safety
interface TaskItem {
    id: number
    title: string
    frequency?: string | null
    duration?: string | null
    completed?: boolean | null
    difficulty?: string | null
    description?: string | null
    createdAt?: Date
    updatedAt?: Date
    userId?: string
    goalId?: number | null
    isInFocus?: boolean | null
}

// BestTime component for displaying best time information
const BestTimeInfo: React.FC<{
    title: string | null
    description: string | null
    goalId: number
    onEditBestTime?: (
        goalId: number,
        updates: {
            bestTimeTitle?: string | undefined
            bestTimeDescription?: string | undefined
        }
    ) => void
}> = ({ title, description, goalId, onEditBestTime }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [editedTitle, setEditedTitle] = useState(title || '')
    const [editedDescription, setEditedDescription] = useState(
        description || ''
    )
    const bestTimeRef = useRef<HTMLDivElement>(null)

    // Move handleUpdateBestTime inside a useCallback hook to prevent recreation on every render
    const handleUpdateBestTime = useCallback(() => {
        if (onEditBestTime) {
            const updates: {
                bestTimeTitle?: string | undefined
                bestTimeDescription?: string | undefined
            } = {}

            // Only include fields that have changed
            if (editedTitle !== title) {
                updates.bestTimeTitle = editedTitle || undefined
            }

            if (editedDescription !== description) {
                updates.bestTimeDescription = editedDescription || undefined
            }

            // Only update if something changed
            if (Object.keys(updates).length > 0) {
                onEditBestTime(goalId, updates)
            }
        }
        setIsEditing(false)
    }, [
        editedTitle,
        editedDescription,
        title,
        description,
        goalId,
        onEditBestTime,
    ])

    // Handle key presses
    const handleKeyDown = (
        e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleUpdateBestTime()
        } else if (e.key === 'Escape') {
            setEditedTitle(title || '')
            setEditedDescription(description || '')
            setIsEditing(false)
        }
    }

    // Setup document click handler - memoize to prevent unnecessary re-renders
    const handleClickOutside = useCallback(
        (e: MouseEvent) => {
            if (
                bestTimeRef.current &&
                !bestTimeRef.current.contains(e.target as Node)
            ) {
                handleUpdateBestTime()
            }
        },
        [bestTimeRef, handleUpdateBestTime]
    )

    // Always define the effect, never conditionally call hooks
    useEffect(() => {
        // Only add event listener when editing
        if (isEditing) {
            document.addEventListener('mousedown', handleClickOutside)

            return () => {
                document.removeEventListener('mousedown', handleClickOutside)
            }
        }

        return undefined // Return empty cleanup function when not editing
    }, [isEditing, handleClickOutside])

    // Skip rendering if no title and description and not in edit mode
    if (!isEditing && !title && !description) return null

    return (
        <div
            ref={bestTimeRef}
            className="items-stretch bg-zinc-100 dark:bg-neutral-800 border border-zinc-200 dark:border-zinc-800 flex w-full flex-col text-sm justify-center p-3 rounded-md"
        >
            <div className="w-full">
                {isEditing ? (
                    <div className="space-y-2">
                        <Input
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="text-sm font-medium border-none focus-visible:ring-1 p-2 h-auto dark:bg-neutral-800 dark:text-white"
                            placeholder="Best Time Title"
                            autoFocus
                        />
                        <textarea
                            value={editedDescription}
                            onChange={(e) =>
                                setEditedDescription(e.target.value)
                            }
                            onKeyDown={handleKeyDown}
                            className="w-full resize-none bg-transparent text-zinc-600 dark:text-zinc-400 font-normal leading-5 focus:outline-none"
                            placeholder="Add a description..."
                            rows={2}
                        />
                        <div className="flex gap-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleUpdateBestTime}
                                className="h-6 px-2 text-xs text-green-600"
                            >
                                <Check size={14} className="mr-1" />
                                Save
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                    setEditedTitle(title || '')
                                    setEditedDescription(description || '')
                                    setIsEditing(false)
                                }}
                                className="h-6 px-2 text-xs text-red-500"
                            >
                                <X size={14} className="mr-1" />
                                Cancel
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div
                        className="cursor-pointer hover:bg-zinc-200 dark:hover:bg-neutral-700 transition-colors p-1 rounded-sm"
                        onClick={() => setIsEditing(true)}
                    >
                        <div className="font-medium leading-none text-zinc-900 dark:text-white">
                            {title || 'Best Time'}
                        </div>
                        <div className="text-zinc-600 dark:text-zinc-400 font-normal leading-5 mt-1">
                            {description || 'No description provided'}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

interface GoalProps extends Omit<GoalWithTasks, 'tasks'> {
    toggleIcon?: string
    tasks: TaskItem[]
    bestTimeTitle: string | null
    bestTimeDescription: string | null
    form: UseFormReturn<TaskFormValues>
    onAddTask?: (values: TaskFormValues, goalId?: number) => void
    onDeleteTask?: (taskId: number) => void
    onEditTask?: (id: number, values: TaskFormValues, goalId?: number) => void
    onDeleteGoal: () => void
    onEditGoal?: (goalId: number, newName: string) => void
    onEditBestTime?: (
        goalId: number,
        updates: { bestTimeTitle?: string; bestTimeDescription?: string }
    ) => void
    id: number
    useCheckbox?: boolean
    onTaskComplete?: (taskId: number, completed: boolean, completedAt?: Date) => void
    onToggleFocus: (taskId: number, currentFocusState: boolean, goalId?: number) => void
}

const Goal: React.FC<GoalProps> = ({
    id,
    name,
    tasks,
    bestTimeTitle,
    bestTimeDescription,
    form,
    onDeleteGoal,
    onDeleteTask,
    onEditTask,
    onAddTask,
    onEditGoal,
    onEditBestTime,
    useCheckbox = false,
    onTaskComplete,
    onToggleFocus,
}) => {
    const pathname = usePathname();

    // Use the shared context for goal tasks
    const { addTaskToGoal } = useTaskGoalContext()

    // Use tasks from context if available, otherwise use props
    const currentTasks = tasks

    // State to track whether the TaskForm is visible
    const [isAddingTask, setIsAddingTask] = useState(false)
    // State to track whether the goal name is being edited
    const [isEditingName, setIsEditingName] = useState(false)
    // State to store the edited name
    const [editedName, setEditedName] = useState(name)
    // Ref for detecting clicks outside the edit field
    const nameInputRef = useRef<HTMLInputElement>(null)
    // Create ref for the cancel button
    const cancelButtonRef = useRef<HTMLButtonElement>(null)

    // Handler for adding a task to this specific goal
    const handleAddTask = async (values: TaskFormValues) => {
        // Check if we have a context or direct props
        if (addTaskToGoal) {
            // Use the context method (this will handle the synchronization)
            await addTaskToGoal(values, id)
        } else if (onAddTask) {
            // Only use prop method if context method is not available
            onAddTask(values, id)
        }

        // Hide the form after submission
        setIsAddingTask(false)
    }

    // Handler to cancel adding a task
    const handleCancelAddTask = () => {
        setIsAddingTask(false)
    }

    // Handler for updating the goal name - memoize to prevent unnecessary re-renders
    const handleUpdateGoalName = useCallback(() => {
        if (editedName.trim() !== '' && editedName !== name && onEditGoal) {
            onEditGoal(id, editedName)
        }
        setIsEditingName(false)
    }, [editedName, name, onEditGoal, id])

    // Handle Enter key press when editing goal name
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            handleUpdateGoalName()
        } else if (e.key === 'Escape') {
            setEditedName(name) // Reset to original name
            setIsEditingName(false)
        }
    }

    // Handle canceling the edit with event stopping
    const handleCancel = useCallback(
        (e?: React.MouseEvent) => {
            // Stop propagation if event is provided to prevent document click handler from firing
            if (e) {
                e.stopPropagation()
            }

            setEditedName(name)
            setIsEditingName(false)
        },
        [name]
    )

    // Setup document click handler when editing name
    useEffect(() => {
        const handleDocumentClick = (e: MouseEvent) => {
            // Check if the click is on the input or on the cancel button
            const isCancelButtonClick =
                cancelButtonRef.current &&
                cancelButtonRef.current.contains(e.target as Node)

            // Only update the goal name if the click is outside both the input and cancel button
            if (
                nameInputRef.current &&
                !nameInputRef.current.contains(e.target as Node) &&
                !isCancelButtonClick
            ) {
                handleUpdateGoalName()
            }
        }

        if (isEditingName) {
            document.addEventListener('mousedown', handleDocumentClick)
        }

        return () => {
            document.removeEventListener('mousedown', handleDocumentClick)
        }
    }, [isEditingName, handleUpdateGoalName])

    // Determine if the goal should be hidden on the /focus page
    const shouldHideGoal = 
        pathname === '/focus' && 
        currentTasks.every(task => !(task.isInFocus ?? false));

    // If on /focus page and no tasks are in focus, don't render the goal
    if (shouldHideGoal) {
        return null;
    }

    return (
        <div className="flex w-full flex-col items-stretch mt-6 border-b border-zinc-200 dark:border-zinc-800 pb-4">
            <div className="flex w-full items-center text-xl font-semibold mb-3 justify-between">
                {isEditingName ? (
                    <div className="flex-1">
                        <Input
                            ref={nameInputRef}
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="text-xl font-semibold border-none focus-visible:ring-1 p-0 h-auto"
                            variant="ghost"
                            autoFocus
                        />
                        <div className="flex gap-2 mt-1">
                            <Button
                                ref={cancelButtonRef}
                                variant="ghost"
                                size="sm"
                                onClick={handleCancel}
                                className="h-6 px-2 text-xs text-red-500"
                            >
                                <X size={14} className="mr-1" />
                                Cancel
                            </Button>
                        </div>
                    </div>
                ) : 
                (
                    <div
                        className="cursor-pointer hover:text-primary transition-colors"
                        onClick={() => setIsEditingName(true)}
                    >
                        {name}
                    </div>
                )}
                <ActionDropdown iconSize={32}>
                    <DropdownMenuItem
                        className="text-destructive flex items-center text-sm p-3 font-medium"
                        onClick={onDeleteGoal}
                    >
                        <Trash className="mr-2 h-4 w-4 text-red-400" />
                        Delete
                    </DropdownMenuItem>
                </ActionDropdown>
            </div>
            <div className="space-y-4">
                {currentTasks.map((task) => (
                    <Task
                        key={task.id}
                        {...task}
                        completed={task.completed === null ? undefined : task.completed}
                        onDeleteTaskClick={onDeleteTask || (() => {})}
                        onEditTask={onEditTask || (() => {})}
                        form={form}
                        goalId={id}
                        isInFocus={task.isInFocus ?? false}
                        useCheckbox={useCheckbox}
                        onTaskComplete={onTaskComplete}
                        onToggleFocus={onToggleFocus}
                    />
                ))}
            </div>
            {/* Task Form - shown when adding a new task to this goal */}
            {isAddingTask && (
                <TaskForm
                    onAddTask={handleAddTask}
                    onCancel={handleCancelAddTask}
                />
            )}
            <Button
                variant="ghost"
                className="flex items-center gap-2 my-4 py-3"
                onClick={() => setIsAddingTask(true)}
            >
                <Plus />
                <span className="text-sm font-medium">Add</span>
                <div className="flex-grow"></div>
                <span className="text-zinc-400">⋯</span>
            </Button>
            <BestTimeInfo
                title={bestTimeTitle}
                description={bestTimeDescription}
                goalId={id}
                onEditBestTime={onEditBestTime}
            />
        </div>
    )
}

export default Goal
