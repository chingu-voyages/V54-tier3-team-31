'use client'

import React from 'react'
import { nanoid } from 'nanoid'
import { UseFormReturn } from 'react-hook-form'
import { TaskFormValues, GoalWithTasks } from '@/lib/types/types'
import Task from './task'

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
    if (!tasks.length) {
        return null
    }

    return (
        <div className="space-y-4">
            {tasks.map((planTask) => (
                <Task
                    key={nanoid()}
                    {...planTask}
                    onDeleteTaskClick={onDeleteTask}
                    onEditTask={onEditTask}
                    form={form}
                    goalId={undefined}
                />
            ))}
        </div>
    )
}

export default TaskList 