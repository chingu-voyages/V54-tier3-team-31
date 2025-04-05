'use client'

import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { TaskFormValues, GoalWithTasks } from '@/lib/types/types'
import Goal from './goal'

interface GoalsListProps {
    goals: GoalWithTasks[]
    form: UseFormReturn<TaskFormValues>
    onDeleteGoal: (id: number) => void
    onDeleteTask: (id: number) => void
    onEditTask: (id: number, values: TaskFormValues, goalId?: number) => void
    onEditGoal: (id: number, newName: string) => void
    onEditBestTime: (id: number, updates: { bestTimeTitle?: string, bestTimeDescription?: string }) => void
    onAddTask: (values: TaskFormValues, goalId?: number) => void
}

export const GoalsList: React.FC<GoalsListProps> = ({ 
    goals, 
    form, 
    onDeleteGoal, 
    onDeleteTask, 
    onEditTask, 
    onEditGoal, 
    onEditBestTime,
    onAddTask 
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
                />
            ))}
        </div>
    )
}

export default GoalsList 