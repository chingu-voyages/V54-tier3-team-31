'use client'

import { useEffect, useReducer } from 'react'
import { TaskFormValues } from '@/lib/types/types'
import { planTaskReducer } from '@/lib/reducers'
import { getAllPLanTasksFromLocal } from '@/lib/localforage'
import { z } from 'zod'
import { TaskFormSchema } from '@/lib/types/validations'

export function useTaskManagement() {
  const [planTasks, dispatch] = useReducer(planTaskReducer, [])

  useEffect(() => {
    const loadTasksFromLocal = async () => {
      const tasks = await getAllPLanTasksFromLocal()
      dispatch({
        type: 'initial',
        planTasks: tasks,
      })
    }
    loadTasksFromLocal()
  }, [])

  const addTask = (values: z.infer<typeof TaskFormSchema>) => {
    dispatch({
      type: 'added',
      values,
    })
  }

  const editTask = (id: number, values: TaskFormValues, goalId?: number) => {
    dispatch({
      id,
      goalId,
      values,
      type: 'edited',
    })
  }

  const deleteTask = (taskId: number) => {
    dispatch({
      type: 'deleted',
      id: taskId,
    })
  }

  return {
    planTasks,
    addTask,
    editTask,
    deleteTask,
  }
}