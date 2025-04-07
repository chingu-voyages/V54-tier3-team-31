'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import { GoalWithTasks, TaskFormValues } from '@/lib/types/types'
import {
    editTaskFromLocal,
    getAllGoalsFromLocal,
    addTaskToGoal as addTaskToGoalLocal,
    removeTaskFromLocal,
} from '@/lib/localforage'

type TaskGoalContextType = {
    goals: GoalWithTasks[]
    setGoals: React.Dispatch<React.SetStateAction<GoalWithTasks[]>>
    refreshGoals: () => Promise<void>
    updateTaskInGoal: (
        taskId: number,
        goalId: number,
        values: TaskFormValues
    ) => Promise<void>
    addTaskToGoal: (values: TaskFormValues, goalId: number) => Promise<void>
    removeTaskInGoal: (goalId: number, taskId: number) => Promise<void>
}

// Create the context with a default value
const TaskGoalContext = createContext<TaskGoalContextType | undefined>(
    undefined
)

export const TaskGoalProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [goals, setGoals] = useState<GoalWithTasks[]>([])

    // Function to refresh goals from localForage
    const refreshGoals = useCallback(async () => {
        const localGoals = await getAllGoalsFromLocal()
        setGoals(localGoals)
    }, [])

    // Initialize goals on mount
    React.useEffect(() => {
        refreshGoals()
    }, [refreshGoals])

    // Function to add a task to a goal
    const addTaskToGoal = useCallback(
        async (values: TaskFormValues, goalId: number) => {
            try {
                // Create task object with the values
                const taskData = {
                    ...values,
                    id: Date.now(), // Generate a unique ID
                    userId: 'user', // This will be replaced by the actual user ID in production
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    goalId: goalId,
                    difficulty: null,
                    description: null,
                    completed: false,
                    completedAt: null, // Add the completedAt property
                    isInFocus: false, // Add the isInFocus property
                }

                // Add the task to the goal in localForage
                await addTaskToGoalLocal(taskData, goalId)

                // Refresh goals to update the UI
                await refreshGoals()
            } catch (error) {
                console.error('Failed to add task to goal:', error)
            }
        },
        [refreshGoals]
    )

    // Function to update a task within a goal and refresh the goals state
    const updateTaskInGoal = useCallback(
        async (taskId: number, goalId: number, values: TaskFormValues) => {
            try {
                // First, update in localForage
                await editTaskFromLocal({
                    taskId,
                    values,
                    goalId,
                })

                // Then refresh the goals state
                await refreshGoals()
            } catch (error) {
                console.error('Failed to update task in goal:', error)
            }
        },
        [refreshGoals]
    )
    
    // Function to remove a task from a goal
    const removeTaskInGoal = useCallback(
        async (goalId: number, taskId: number) => {
            try {
                await removeTaskFromLocal({
                    goalId,
                    taskId,
                })
                // Then refresh the goals state
                await refreshGoals()
            } catch (error) {
                console.error('Failed to delete task in goal: ', error)
            }
        },
        [refreshGoals]
    )

    const contextValue = {
        goals,
        setGoals,
        refreshGoals,
        updateTaskInGoal,
        addTaskToGoal,
        removeTaskInGoal,
    }

    return (
        <TaskGoalContext.Provider value={contextValue}>
            {children}
        </TaskGoalContext.Provider>
    )
}

// Custom hook to use the context
export const useTaskGoalContext = () => {
    const context = useContext(TaskGoalContext)
    if (context === undefined) {
        throw new Error(
            'useTaskGoalContext must be used within a TaskGoalProvider'
        )
    }
    return context
}
