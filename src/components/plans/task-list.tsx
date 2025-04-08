'use client'

import React, { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import { UseFormReturn } from 'react-hook-form'
import { TaskFormValues, GoalWithTasks } from '@/lib/types/types'
import Task from './task'
import { getTasksInFocus } from '@/lib/localforage'

interface TaskListProps {
    tasks: GoalWithTasks['tasks']
    form: UseFormReturn<TaskFormValues>
    onDeleteTask: (id: number) => void
    onEditTask: (id: number, values: TaskFormValues) => void
}

export const TaskList: React.FC<TaskListProps> = ({ 
    tasks, 
    form, 
    onDeleteTask, 
    onEditTask 
}) => {
    const [focusTasks, setFocusTasks] = useState<number[]>([])

    useEffect(() => {
        const fetchFocusTasks = async () => {
            try {
                const tasks = await getTasksInFocus()
                setFocusTasks(tasks.map(task => task.id))
            } catch (error) {
                console.error("Error fetching focus tasks:", error)
            }
        }

        fetchFocusTasks()
    }, [])

    if (!tasks.length) {
        return null
    }

    return (
        <div className="space-y-4">
            {tasks.map((planTask) => (
                <Task
                    key={nanoid()}
                    {...planTask}
                    completed={planTask.completed === null ? undefined : planTask.completed}
                    onDeleteTaskClick={onDeleteTask}
                    onEditTask={onEditTask}
                    form={form}
                    goalId={undefined}
                    isInFocus={focusTasks.includes(planTask.id)}
                />
            ))}
        </div>
    )
}

export default TaskList 