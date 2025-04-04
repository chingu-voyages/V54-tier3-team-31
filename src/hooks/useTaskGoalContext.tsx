'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import { GoalWithTasks, TaskFormValues } from '@/lib/types/types'
import { editTaskFromLocal, getAllGoalsFromLocal } from '@/lib/localforage'

type TaskGoalContextType = {
  goals: GoalWithTasks[]
  setGoals: React.Dispatch<React.SetStateAction<GoalWithTasks[]>>
  refreshGoals: () => Promise<void>
  updateTaskInGoal: (taskId: number, goalId: number, values: TaskFormValues) => Promise<void>
}

// Create the context with a default value
const TaskGoalContext = createContext<TaskGoalContextType | undefined>(undefined)

export const TaskGoalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

  // Function to update a task within a goal and refresh the goals state
  const updateTaskInGoal = useCallback(async (taskId: number, goalId: number, values: TaskFormValues) => {
    // First, update in localForage
    await editTaskFromLocal({
      taskId,
      values,
      goalId,
    })

    // Then refresh the goals state
    await refreshGoals()
  }, [refreshGoals])

  return (
    <TaskGoalContext.Provider value={{ goals, setGoals, refreshGoals, updateTaskInGoal }}>
      {children}
    </TaskGoalContext.Provider>
  )
}

// Custom hook to use the context
export const useTaskGoalContext = () => {
  const context = useContext(TaskGoalContext)
  if (context === undefined) {
    throw new Error('useTaskGoalContext must be used within a TaskGoalProvider')
  }
  return context
}