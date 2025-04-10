'use client'

import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { TaskFormValues, GoalWithTasks } from '@/lib/types/types'
import { GoalFormValues } from '../../lib/types/types'
import Goal from './goal'

interface GoalsListProps {
    goals: GoalWithTasks[]
    form: UseFormReturn<TaskFormValues>
    onDeleteGoal: (id: number) => void
    onDeleteTask: (id: number, goalId?: number) => void
    onEditTask: (id: number, values: TaskFormValues, goalId?: number) => void
    onEditGoal: (id: number, newName: string) => void
    onEditBestTime: (id: number, values: Partial<GoalFormValues>) => void
    onAddTask: (values: TaskFormValues, goalId?: number) => void
    useCheckbox?: boolean
    onTaskComplete?: (taskId: number, completed: boolean, completedAt?: Date) => void
    onToggleTaskFocus?: (taskId: number, currentFocusState: boolean, goalId?: number) => void
}

export const GoalsList: React.FC<GoalsListProps> = ({ 
    goals, 
    form, 
    onDeleteGoal, 
    onDeleteTask, 
    onEditTask, 
    onEditGoal, 
    onEditBestTime,
    onAddTask,
    useCheckbox = false,
    onTaskComplete,
    onToggleTaskFocus
}) => {
    if (!goals.length) {
        return null
    }

    return (
        <div className="space-y-6">
            {goals.map((goal) => (
                <Goal
                    key={goal.id}
                    {...goal}
                    form={form}
                    onDeleteGoal={() => onDeleteGoal(goal.id)}
                    onDeleteTask={onDeleteTask}
                    onEditTask={onEditTask}
                    onAddTask={onAddTask}
                    onEditGoal={onEditGoal}
                    onEditBestTime={onEditBestTime}
                    useCheckbox={useCheckbox}
                    onTaskComplete={onTaskComplete}
                    onToggleFocus={(taskId: number, currentFocusState: boolean) => onToggleTaskFocus?.(taskId, currentFocusState, goal.id)}
                />
            ))}
        </div>
    )
}

export default GoalsList 