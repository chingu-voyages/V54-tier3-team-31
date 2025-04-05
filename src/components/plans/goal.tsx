'use client'

import React, { useState } from 'react'
import Task from './task'
import { Plus, Trash } from 'lucide-react'
import { Button } from '../ui/button'
import { DropdownMenuItem } from '../ui/dropdown-menu'
import ActionDropdown from '../ui/action-dropdown'
import { UseFormReturn } from 'react-hook-form'
import { GoalWithTasks, TaskFormValues } from '@/lib/types/types'
import { useTaskGoalContext } from '@/hooks/useTaskGoalContext'
import TaskForm from './TaskForm'

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
    onAddTask
}) => {
    // State to track whether the TaskForm is visible
    const [isAddingTask, setIsAddingTask] = useState(false);
    
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

    return (
        <div className="flex w-full flex-col items-stretch mt-6 first:mt-0 border-b border-zinc-200 dark:border-zinc-800 pb-4">
            <div className="flex w-full items-center text-xl font-semibold mb-4 justify-between">
                <div>{name}</div>
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
