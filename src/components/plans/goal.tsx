'use client'

import React, { useState, useRef, KeyboardEvent } from 'react'
import Task from './task'
import { Plus, Trash, Check, X } from 'lucide-react'
import { Button } from '../ui/button'
import { DropdownMenuItem } from '../ui/dropdown-menu'
import ActionDropdown from '../ui/action-dropdown'
import { UseFormReturn } from 'react-hook-form'
import { GoalWithTasks, TaskFormValues } from '@/lib/types/types'
import { useTaskGoalContext } from '@/hooks/useTaskGoalContext'
import TaskForm from './TaskForm'
import { Input } from '@/components/ui/input'

// Task type for better type safety 
interface TaskItem {
    id: number
    title: string
    frequency?: string | null
    duration?: string | null
}

// BestTime component for displaying best time information
const BestTimeInfo: React.FC<{
    title: string | null
    description: string | null
}> = ({ title, description }) => {
    if (!title && !description) return null;
    
    return (
        <div className="items-stretch bg-zinc-100 dark:bg-neutral-800 border border-zinc-200 dark:border-zinc-800 flex w-full flex-col text-sm justify-center p-3 rounded-md">
            <div className="w-full">
                <div className="font-medium leading-none text-zinc-900 dark:text-white">
                    {title || "Best Time"}
                </div>
                <div className="text-zinc-600 dark:text-zinc-400 font-normal leading-5 mt-1">
                    {description || "No description provided"}
                </div>
            </div>
        </div>
    );
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
    id: number
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
    onEditGoal
}) => {
    // State to track whether the TaskForm is visible
    const [isAddingTask, setIsAddingTask] = useState(false);
    // State to track whether the goal name is being edited
    const [isEditingName, setIsEditingName] = useState(false);
    // State to store the edited name
    const [editedName, setEditedName] = useState(name);
    // Ref for detecting clicks outside the edit field
    const nameInputRef = useRef<HTMLInputElement>(null);
    
    // Use the shared context for goal tasks
    const { goals, addTaskToGoal } = useTaskGoalContext();
    
    // Find this goal in the context to ensure we're using the most up-to-date tasks
    const contextGoal = goals.find(g => g.id === id);
    
    // Use tasks from context if available, otherwise use props
    const currentTasks = contextGoal ? contextGoal.tasks : tasks;
    
    // Handler for adding a task to this specific goal
    const handleAddTask = async (values: TaskFormValues) => {
        // Check if we have a context or direct props
        if (addTaskToGoal) {
            // Use the context method (this will handle the synchronization)
            await addTaskToGoal(values, id);
        } else if (onAddTask) {
            // Only use prop method if context method is not available
            onAddTask(values, id);
        }
        
        // Hide the form after submission
        setIsAddingTask(false);
    };
    
    // Handler to cancel adding a task
    const handleCancelAddTask = () => {
        setIsAddingTask(false);
    };
    
    // Handler for updating the goal name
    const handleUpdateGoalName = () => {
        if (editedName.trim() !== '' && editedName !== name && onEditGoal) {
            onEditGoal(id, editedName);
        }
        setIsEditingName(false);
    };

    // Handle Enter key press when editing goal name
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleUpdateGoalName();
        } else if (e.key === 'Escape') {
            setEditedName(name); // Reset to original name
            setIsEditingName(false);
        }
    };

    // Setup document click handler when editing name
    React.useEffect(() => {
        const handleDocumentClick = (e: MouseEvent) => {
            if (nameInputRef.current && !nameInputRef.current.contains(e.target as Node)) {
                handleUpdateGoalName();
            }
        };
        
        if (isEditingName) {
            document.addEventListener('mousedown', handleDocumentClick);
        }
        
        return () => {
            document.removeEventListener('mousedown', handleDocumentClick);
        };
    }, [isEditingName, editedName, name]);

    return (
        <div className="flex w-full flex-col items-stretch mt-6 first:mt-0 border-b border-zinc-200 dark:border-zinc-800 pb-4">
            <div className="flex w-full items-center text-xl font-semibold mb-4 justify-between">
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
                                variant="ghost" 
                                size="sm" 
                                onClick={handleUpdateGoalName}
                                className="h-6 px-2 text-xs text-green-600"
                            >
                                <Check size={14} className="mr-1" />
                                Save
                            </Button>
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => {
                                    setEditedName(name);
                                    setIsEditingName(false);
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
            <div className="w-full space-y-1">
                {currentTasks.map((task, index) => (
                    <Task
                        key={task.id || index} /* Use stable key if possible */
                        {...task}
                        onDeleteTaskClick={onDeleteTask ? onDeleteTask : () => {}}
                        onEditTask={onEditTask ? onEditTask : () => {}}
                        form={form}
                        goalId={id} /* Pass the goal ID to each task */
                    />
                ))}
                
                {/* Task Form - shown when adding a new task to this goal */}
                {isAddingTask && (
                    <TaskForm
                        onAddTask={handleAddTask}
                        onCancel={handleCancelAddTask}
                    />
                )}
            </div>
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
            />
        </div>
    )
}

export default Goal
