'use client'

import type React from 'react'
import { MoreHorizontal } from 'lucide-react'
import { Button } from '../ui/button'
import { useEffect, useState } from 'react'
import {
    getTasksInFocus,
    updateTaskCompletion,
    toggleTaskFocus,
    cleanupOldFocusTasks,
} from '@/lib/localforage'
import type { Task } from '@/lib/db/schema'
import type { TaskFormValues } from '@/lib/types/types'
import FocusTask from './focus-task'
import { useForm } from 'react-hook-form'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import TaskForm from '../plans/task-form'
import { useTaskManagement } from '@/hooks/useTaskManagement'
import { useGoalManagement } from '@/hooks/useGoalManagement'
import { GoalFormValues } from '@/lib/types/types'
import { TaskGoalProvider } from '@/hooks/useTaskGoalContext'
import GoalsList from '../plans/goals-list'
import { zodResolver } from '@hookform/resolvers/zod'
import { TaskFormSchema } from '@/lib/types/validations'
import { nanoid } from 'nanoid'

type TaskWithMeta = Task & {
    isInFocus: boolean | null
    completedAt: Date | null
}

const Focus: React.FC = () => {
    const [tasks, setTasks] = useState<TaskWithMeta[]>([])
    const [isAddingPlan, setIsAddingPlan] = useState(false)
    const { planTasks, addTask, editTask, deleteTask } = useTaskManagement()
    console.log("currently the plantasks", planTasks)
    const { goals, addGoal, editGoal, deleteGoal, editBestTime } =
        useGoalManagement()
    const form = useForm<TaskFormValues>({
        resolver: zodResolver(TaskFormSchema),
        defaultValues: {
            title: '',
            frequency: 'Once',
            duration: '5 mins',
        },
    })

    useEffect(() => {
        const loadTasks = async () => {
            await cleanupOldFocusTasks()
            const tasksInFocus = await getTasksInFocus()
            setTasks(tasksInFocus)
        }
        loadTasks()
    }, [])

    const handleTaskComplete = async (taskId: number, completed: boolean) => {
        try {
            // Find the task to get its goalId
            const task = tasks.find((t) => t.id === taskId)
            if (!task) return

            // Update local state first for immediate feedback
            setTasks((prev) =>
                prev.map((t) =>
                    t.id === taskId
                        ? {
                              ...t,
                              completed,
                              completedAt: completed ? new Date() : null,
                          }
                        : t
                )
            )

            // Persist to storage
            await updateTaskCompletion(
                taskId,
                completed,
                task.goalId || undefined
            )
        } catch (error) {
            console.error('Error updating task completion:', error)
            // Revert local state on error
            setTasks((prev) =>
                prev.map((t) =>
                    t.id === taskId
                        ? {
                              ...t,
                              completed: !completed,
                              completedAt: completed ? null : new Date(),
                          }
                        : t
                )
            )
        }
    }

    const handleAddTask = async (values: TaskFormValues) => {
        try {
            // Add the task and get its ID
            const newTaskId = addTask(values)
            // Set it to be in focus
            await toggleTaskFocus(newTaskId, true)
            // Refresh the focus tasks list
            const updatedTasks = await getTasksInFocus()
            setTasks(updatedTasks)
            setIsAddingPlan(false)
        } catch (error) {
            console.error('Error adding task to focus:', error)
        }
    }

    const handleAddGoal = () => {
        const values: GoalFormValues = {
            name: 'My Goal',
            bestTimeTitle: 'Your Best time',
            bestTimeDescription: 'And your description',
        }
        addGoal(values)
    }

    // Handler for frequency change
    const handleFrequencyChange = async (
        taskId: number,
        newFrequency: string
    ) => {
        // Find the task to get its goalId
        const task = tasks.find((t) => t.id === taskId)
        if (!task) return

        // Update local state first for immediate feedback
        setTasks((prev) =>
            prev.map((t) =>
                t.id === taskId ? { ...t, frequency: newFrequency } : t
            )
        )

        try {
            // Persist to storage
            await editTask(
                taskId,
                {
                    title: task.title,
                    frequency: newFrequency,
                    duration: task.duration || '5 mins',
                },
                task.goalId || undefined
            )
        } catch (error) {
            console.error('Error updating task frequency:', error)
            // Revert local state on error
            setTasks((prev) =>
                prev.map((t) =>
                    t.id === taskId
                        ? { ...t, frequency: task.frequency || 'Once' }
                        : t
                )
            )
        }
    }

    // Handler for duration change
    const handleDurationChange = async (
        taskId: number,
        newDuration: string
    ) => {
        // Find the task to get its goalId
        const task = tasks.find((t) => t.id === taskId)
        if (!task) return

        // Update local state first for immediate feedback
        setTasks((prev) =>
            prev.map((t) =>
                t.id === taskId ? { ...t, duration: newDuration } : t
            )
        )

        try {
            // Persist to storage
            await editTask(
                taskId,
                {
                    title: task.title,
                    frequency: task.frequency || 'Once',
                    duration: newDuration,
                },
                task.goalId || undefined
            )
        } catch (error) {
            console.error('Error updating task duration:', error)
            // Revert local state on error
            setTasks((prev) =>
                prev.map((t) =>
                    t.id === taskId
                        ? { ...t, duration: task.duration || '5 mins' }
                        : t
                )
            )
        }
    }

    // Handler for task deletion
    const handleDeleteTask = async (taskId: number) => {
        const task = tasks.find((t) => t.id === taskId)
        if (!task) return

        try {
            // Update local state first
            setTasks((prev) => prev.filter((t) => t.id !== taskId))

            // Persist to storage
            await deleteTask(taskId, task.goalId || undefined)
        } catch (error) {
            console.error('Error deleting task:', error)
            // Revert local state on error
            setTasks((prev) => [...prev, task])
        }
    }

    // Handler for task editing
    const handleEditTask = async (taskId: number, values: TaskFormValues) => {
        const task = tasks.find((t) => t.id === taskId)
        if (!task) return

        try {
            // Update local state first
            setTasks((prev) =>
                prev.map((t) => (t.id === taskId ? { ...t, ...values } : t))
            )

            // Persist to storage
            await editTask(taskId, values, task.goalId || undefined)
        } catch (error) {
            console.error('Error editing task:', error)
            // Revert local state on error
            setTasks((prev) => prev.map((t) => (t.id === taskId ? task : t)))
        }
    }

    const handleEditGoal = (id: number, newName: string) => {
        editGoal(id, newName)
    }

    const handleEditBestTime = (
        id: number,
        updates: { bestTimeTitle?: string; bestTimeDescription?: string }
    ) => {
        editBestTime(id, updates)
    }

    const handleDeleteGoal = (id: number) => {
        deleteGoal(id)
    }

    const dropDownActions = [
        {
            name: 'Add a Task',
            action: () => setIsAddingPlan(true),
        },
        {
            name: 'Add a Goal and Tasks',
            action: handleAddGoal,
        },
        {
            name: 'Add Plans Based on My Goal',
            href: '/',
        },
    ]

    // Filter goals that have tasks in focus
    const goalsWithTasksInFocus = goals.map((goal) => ({
        ...goal,
        tasks: goal.tasks.filter((task) => task.isInFocus && task.goalId),
    }))

    const focusTasks = planTasks.map((task) =>
        task.isInFocus ? (
            <FocusTask
                key={task.id}
                id={task.id}
                title={task.title}
                frequency={task.frequency || 'Once'}
                duration={task.duration || '5 mins'}
                completed={task.completed || false}
                form={form}
                onTaskComplete={handleTaskComplete}
                onFrequencyChange={handleFrequencyChange}
                onDurationChange={handleDurationChange}
                onDeleteTask={handleDeleteTask}
                onEditTask={handleEditTask}
            />
        ) : null
    )

    return (
        <TaskGoalProvider>
            <div className="min-h-screen flex flex-col text-white">
                <div className="flex flex-col flex-1 px-4 pb-16 md:pb-0 md:max-w-3xl md:mx-auto md:w-full">
                    {/* Header */}
                    <div className="flex items-center justify-between mt-4 mb-6">
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-semibold">
                                Today&apos;s Focus
                            </h1>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-10 w-10 text-zinc-400 p-0 bg-white rounded-full"
                                >
                                    <span className="text-2xl">≡</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {dropDownActions.map((item) => (
                                    <DropdownMenuItem
                                        key={item.name}
                                        onClick={item.action}
                                    >
                                        {item.name}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {/* Focus Tasks Section */}
                    <div>
                        {/* Task Form - shown when adding a new task */}
                        {isAddingPlan && (
                            <TaskForm
                                onAddTask={handleAddTask}
                                onCancel={() => setIsAddingPlan(false)}
                            />
                        )}

                        <div className="space-y-8">
                            {!focusTasks.every((e) => e === null) && (
                                <div key={nanoid()} className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-xl font-medium">
                                            Plans
                                        </h2>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-zinc-400 h-8 w-8 p-0"
                                        >
                                            <MoreHorizontal className="h-5 w-5" />
                                        </Button>
                                    </div>
                                    <div className="space-y-4">
                                        {focusTasks}
                                    </div>
                                </div>
                            )}
                            {goalsWithTasksInFocus.length === 0 &&
                                focusTasks.every((e) => e === null) && (
                                    <p className="text-zinc-400 text-sm">
                                        No tasks in focus. Click the star icon
                                        on tasks to add them here.
                                    </p>
                                )}
                        </div>
                    </div>

                    {/* Goals Section */}
                    <div className="mb-6">
                        <GoalsList
                            goals={goalsWithTasksInFocus}
                            form={form}
                            onDeleteGoal={handleDeleteGoal}
                            onDeleteTask={handleDeleteTask}
                            onEditTask={handleEditTask}
                            onEditGoal={handleEditGoal}
                            onEditBestTime={handleEditBestTime}
                            onAddTask={handleAddTask}
                            useCheckbox={true}
                            onTaskComplete={handleTaskComplete}
                        />
                    </div>
                </div>
            </div>
        </TaskGoalProvider>
    )
}

export default Focus
