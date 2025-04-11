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
    onToggleTaskFocus: (taskId: number, currentFocusState: boolean) => void
}

export const TaskList: React.FC<TaskListProps> = ({ 
    tasks, 
    form, 
    onDeleteTask, 
    onEditTask,
    onToggleTaskFocus,
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
                    completed={planTask.completed === null ? undefined : planTask.completed}
                    onDeleteTaskClick={onDeleteTask}
                    onEditTask={onEditTask}
                    form={form}
                    goalId={undefined}
                    isInFocus={planTask.isInFocus ?? false}
                    onToggleFocus={onToggleTaskFocus}
                />
            ))}
        </div>
    )
}

export default TaskList 