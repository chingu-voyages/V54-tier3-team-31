'use client'

import { useEffect, useReducer, useCallback } from 'react'
import { TaskFormValues } from '@/lib/types/types'
import { planTaskReducer } from '@/lib/reducers'
import { getAllPLanTasksFromLocal } from '@/lib/localforage'
import { z } from 'zod'
import { TaskFormSchema } from '@/lib/types/validations'
import { usePathname } from 'next/navigation'

export function useTaskManagement(onTaskInGoalUpdated?: () => Promise<void>) {
  const [planTasks, dispatch] = useReducer(planTaskReducer, [])
  const pathname = usePathname()

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

    const newTaskId =  parseInt(crypto.randomUUID().replace(/-/g, '').slice(0, 8), 16)

    dispatch({
      type: 'added',
      values,
      goalId,
      taskId: newTaskId, // Pass the ID to the reducer,
      isInFocus: pathname === '/focus'
    })
    
    // If this task belongs to a goal and we have a callback to refresh goals, call it
    if (goalId && onTaskInGoalUpdated) {
      onTaskInGoalUpdated()
    }

    return newTaskId // Return the ID
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
/*  */
  return {
    planTasks,
    addTask,
    editTask,
    deleteTask,
    refreshTasks
  }
}