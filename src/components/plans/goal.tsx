'use client'

import React from 'react'
import Task from './task'
import { Plus, Trash } from 'lucide-react'
import { Button } from '../ui/button'
import { DropdownMenuItem } from '../ui/dropdown-menu'
import ActionDropdown from '../ui/action-dropdown'
import { UseFormReturn } from 'react-hook-form'
import { TaskFormValues } from '@/lib/types/types'


// Task type for better type safety 
interface TaskItem {
    id: number
    title: string
    frequency: string
    duration: string
}

// BestTime component for displaying best time information
const BestTimeInfo: React.FC<{
    title: string
    description: string
}> = ({ title, description }) => (
    <div className="items-stretch bg-zinc-100 dark:bg-neutral-800 border border-zinc-200 dark:border-zinc-800 flex w-full flex-col text-sm justify-center p-3 rounded-md">
        <div className="w-full">
            <div className="font-medium leading-none text-zinc-900 dark:text-white">
                {title}
            </div>
            <div className="text-zinc-600 dark:text-zinc-400 font-normal leading-5 mt-1">
                {description}
            </div>
        </div>
    </div>
)

interface GoalProps {
    title: string
    toggleIcon?: string
    tasks: TaskItem[]
    bestTimeTitle: string
    bestTimeDescription: string
    form: UseFormReturn<TaskFormValues>
    onAddTask?: (goalId: number) => void
    onDeleteGoal?: (goalId: number) => void
    id: number
}

const Goal: React.FC<GoalProps> = ({
    id,
    title,
    tasks,
    bestTimeTitle,
    bestTimeDescription,
    form,
    onAddTask,
    onDeleteGoal
}) => {
    const handleAddTaskToGoal = () => {
        onAddTask?.(id)
    }

    const handleDeleteGoal = () => {
        onDeleteGoal?.(id)
    }

    return (
        <div className="flex w-full flex-col items-stretch mt-6 first:mt-0 border-b border-zinc-200 dark:border-zinc-800 pb-4">
            <div className="flex w-full items-center text-xl font-semibold mb-4 justify-between">
                <div>{title}</div>
                <ActionDropdown iconSize={32}>
                    <DropdownMenuItem 
                        className="text-destructive flex items-center text-sm p-3 font-medium"
                        onClick={handleDeleteGoal}
                    >
                        <Trash className="mr-2 h-4 w-4 text-red-400" />
                        Delete
                    </DropdownMenuItem>
                </ActionDropdown>
            </div>
            <div className="w-full space-y-1">
                {tasks.map((task, index) => (
                    <Task
                        key={index}
                        {...task}
                        onDeleteTaskClick={() => {}}
                        onEditTask={() => {}}
                        form={form}

                    />
                ))}
            </div>
            <Button
                variant="ghost"
                className="flex items-center gap-2 my-4 py-3"
                onClick={handleAddTaskToGoal}
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
