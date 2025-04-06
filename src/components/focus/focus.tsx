'use client'

import type React from 'react'
import { MoreHorizontal } from 'lucide-react'
import { Button } from '../ui/button'
import { useEffect, useState } from 'react'
import { getTasksInFocus, updateTaskCompletion, toggleTaskFocus } from '@/lib/localforage'
import type { Task } from '@/lib/schema'
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

// Extend the Task type for our local usage
type TaskWithMeta = Task & {
    completedAt?: string; // Store as ISO string
}

const Focus: React.FC = () => {
    const [focusTasks, setFocusTasks] = useState<TaskWithMeta[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isAddingPlan, setIsAddingPlan] = useState(false)
    const { addTask, editTask, deleteTask } = useTaskManagement()
    const { goals, addGoal, editGoal, deleteGoal, editBestTime } = useGoalManagement()
    const form = useForm<TaskFormValues>({
        resolver: zodResolver(TaskFormSchema),
        defaultValues: {
            title: '',
            frequency: 'Once',
            duration: '5 mins',
        },
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tasks = await getTasksInFocus()
                
                // Filter out tasks that were completed yesterday or before
                const today = new Date()
                today.setHours(0, 0, 0, 0)
                
                const filteredTasks = (tasks as TaskWithMeta[]).filter(task => {
                    if (!task.completed) return true
                    if (!task.completedAt) return true
                    const completedDate = new Date(task.completedAt)
                    return completedDate >= today
                })
                
                setFocusTasks(filteredTasks)
            } catch (error) {
                console.error('Error fetching data:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [])

    const handleTaskComplete = async (taskId: number, completed: boolean, completedAt?: Date) => {
        try {
            // Find the task to get its goalId
            const task = focusTasks.find(t => t.id === taskId)
            if (!task) return

            // Update local state first for immediate feedback
            setFocusTasks(prev => 
                prev.map(t => 
                    t.id === taskId 
                        ? { 
                            ...t, 
                            completed, 
                            completedAt: completed ? completedAt?.toISOString() : undefined 
                        }
                        : t
                )
            )

            // Persist to storage
            await updateTaskCompletion(
                taskId,
                completed,
                completed ? completedAt?.toISOString() : undefined,
                task.goalId || undefined
            )
        } catch (error) {
            console.error('Error updating task completion:', error)
            // Revert local state on error
            setFocusTasks(prev => 
                prev.map(t => 
                    t.id === taskId 
                        ? { ...t, completed: !completed, completedAt: undefined }
                        : t
                )
            )
        }
    }

    // Group tasks by goal name
    const groupedTasks = focusTasks.reduce((acc, task) => {
        if (!task.goalId) {
            // This is a Plan Task
            if (!acc['Plan Tasks']) {
                acc['Plan Tasks'] = []
            }
            acc['Plan Tasks'].push(task)
        } else {
            // This is a Goal Task
            const goal = goals.find(g => g.id === task.goalId)
            if (goal) {
                if (!acc[goal.name]) {
                    acc[goal.name] = []
                }
                acc[goal.name].push(task)
            }
        }
        return acc
    }, {} as Record<string, TaskWithMeta[]>)

    const handleAddTask = async (values: TaskFormValues) => {
        try {
            // Add the task and get its ID
            const newTaskId = addTask(values)
            // Set it to be in focus
            await toggleTaskFocus(newTaskId, true)
            // Refresh the focus tasks list
            const updatedTasks = await getTasksInFocus()
            setFocusTasks(updatedTasks)
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
    const handleFrequencyChange = async (taskId: number, newFrequency: string) => {
        // Find the task to get its goalId
        const task = focusTasks.find(t => t.id === taskId)
        if (!task) return

        // Update local state first for immediate feedback
        setFocusTasks(prev => 
            prev.map(t => 
                t.id === taskId 
                    ? { ...t, frequency: newFrequency }
                    : t
            )
        )

        try {
            // Persist to storage
            await editTask(
                taskId,
                { 
                    title: task.title,
                    frequency: newFrequency,
                    duration: task.duration || '5 mins'
                },
                task.goalId || undefined
            )
        } catch (error) {
            console.error('Error updating task frequency:', error)
            // Revert local state on error
            setFocusTasks(prev => 
                prev.map(t => 
                    t.id === taskId 
                        ? { ...t, frequency: task.frequency || 'Once' }
                        : t
                )
            )
        }
    }

    // Handler for duration change
    const handleDurationChange = async (taskId: number, newDuration: string) => {
        // Find the task to get its goalId
        const task = focusTasks.find(t => t.id === taskId)
        if (!task) return

        // Update local state first for immediate feedback
        setFocusTasks(prev => 
            prev.map(t => 
                t.id === taskId 
                    ? { ...t, duration: newDuration }
                    : t
            )
        )

        try {
            // Persist to storage
            await editTask(
                taskId,
                { 
                    title: task.title,
                    frequency: task.frequency || 'Once',
                    duration: newDuration
                },
                task.goalId || undefined
            )
        } catch (error) {
            console.error('Error updating task duration:', error)
            // Revert local state on error
            setFocusTasks(prev => 
                prev.map(t => 
                    t.id === taskId 
                        ? { ...t, duration: task.duration || '5 mins' }
                        : t
                )
            )
        }
    }

    // Handler for task deletion
    const handleDeleteTask = async (taskId: number) => {
        const task = focusTasks.find(t => t.id === taskId)
        if (!task) return

        try {
            // Update local state first
            setFocusTasks(prev => prev.filter(t => t.id !== taskId))

            // Persist to storage
            await deleteTask(
                taskId,
                task.goalId || undefined
            )
        } catch (error) {
            console.error('Error deleting task:', error)
            // Revert local state on error
            setFocusTasks(prev => [...prev, task])
        }
    }

    // Handler for task editing
    const handleEditTask = async (taskId: number, values: TaskFormValues) => {
        const task = focusTasks.find(t => t.id === taskId)
        if (!task) return

        try {
            // Update local state first
            setFocusTasks(prev => prev.map(t => 
                t.id === taskId 
                    ? { ...t, ...values }
                    : t
            ))

            // Persist to storage
            await editTask(
                taskId,
                values,
                task.goalId || undefined
            )
        } catch (error) {
            console.error('Error editing task:', error)
            // Revert local state on error
            setFocusTasks(prev => prev.map(t => 
                t.id === taskId 
                    ? task
                    : t
            ))
        }
    }

    const handleEditGoal = (id: number, newName: string) => {
        editGoal(id, newName)
    }

    const handleEditBestTime = (id: number, updates: { bestTimeTitle?: string, bestTimeDescription?: string }) => {
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
            href: '/add-plans-ai',
        },
    ]

    if (isLoading) {
        return <div>Loading...</div>
    }

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
                                <Button variant="ghost" size="icon" className="h-10 w-10 text-zinc-400 p-0 bg-white rounded-full">
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
                    <div className="mb-6">
                        {/* Task Form - shown when adding a new task */}
                        {isAddingPlan && (
                            <TaskForm
                                onAddTask={handleAddTask}
                                onCancel={() => setIsAddingPlan(false)}
                            />
                        )}
                        
                        <div className="space-y-8">
                            {Object.entries(groupedTasks).map(([goalName, tasks]) => (
                                <div key={goalName} className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-xl font-medium">
                                            {goalName}
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
                                        {tasks.map((task) => (
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
                                        ))}
                                    </div>
                                    <div className="mt-4">
                                        <button className="flex items-center text-zinc-400 text-sm">
                                            <span className="mr-2">+</span>
                                            add
                                        </button>
                                    </div>
                                    {goalName !== 'Plan Tasks' && goals.find(g => g.name === goalName)?.bestTimeTitle && (
                                        <div className="mt-4 bg-zinc-900 rounded-lg p-4">
                                            <h3 className="text-sm font-medium mb-1">Best Time</h3>
                                            <p className="text-sm text-zinc-400">
                                                {goals.find(g => g.name === goalName)?.bestTimeDescription}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                            {focusTasks.length === 0 && (
                                <p className="text-zinc-400 text-sm">
                                    No tasks in focus. Click the star icon on tasks
                                    to add them here.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Goals Section */}
                    <div className="mb-6">
                        <GoalsList
                            goals={goals}
                            form={form}
                            onDeleteGoal={handleDeleteGoal}
                            onDeleteTask={handleDeleteTask}
                            onEditTask={handleEditTask}
                            onEditGoal={handleEditGoal}
                            onEditBestTime={handleEditBestTime}
                            onAddTask={handleAddTask}
                        />
                    </div>
                </div>
            </div>
        </TaskGoalProvider>
    )
}

export default Focus
