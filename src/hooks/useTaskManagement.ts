'use client'

import { useEffect, useReducer, useCallback } from 'react'
import { TaskFormValues } from '@/lib/types/types'
import { planTaskReducer } from '@/lib/reducers'
import { getAllPLanTasksFromLocal } from '@/lib/localforage'
import { z } from 'zod'
import { TaskFormSchema } from '@/lib/types/validations'

export function useTaskManagement(onTaskInGoalUpdated?: () => Promise<void>) {
  const [planTasks, dispatch] = useReducer(planTaskReducer, [])

  const refreshTasks = useCallback(async () => {
    const tasks = await getAllPLanTasksFromLocal()
    dispatch({
      type: 'initial',
      planTasks: tasks,
    })
  }, [])

  useEffect(() => {
    refreshTasks()
  }, [refreshTasks])

  const addTask = (values: z.infer<typeof TaskFormSchema>, goalId?: number) => {
    dispatch({
      type: 'added',
      values,
      goalId, // Pass the goal ID to the reducer
    })
    
    // If this task belongs to a goal and we have a callback to refresh goals, call it
    if (goalId && onTaskInGoalUpdated) {
      onTaskInGoalUpdated()
    }
  }

  const editTask = async (id: number, values: TaskFormValues, goalId?: number) => {
    dispatch({
      id,
      goalId,
      values,
      type: 'edited',
    })

    // If this task belongs to a goal and we have a callback to refresh goals, call it
    if (goalId && onTaskInGoalUpdated) {
      await onTaskInGoalUpdated()
    }
  }

  const deleteTask = (taskId: number, goalId?: number) => {
    dispatch({
      type: 'deleted',
      id: taskId,
      goalId, // Pass the goal ID to the reducer
    })
    
    // If this task belongs to a goal and we have a callback to refresh goals, call it
    if (goalId && onTaskInGoalUpdated) {
      onTaskInGoalUpdated()
    }
  }

  return {
    planTasks,
    addTask,
    editTask,
    deleteTask,
    refreshTasks
  }
}