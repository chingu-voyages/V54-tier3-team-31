'use client'

import type React from 'react'
import { MoreHorizontal } from 'lucide-react'
import { Button } from '../ui/button'
import { useEffect, useState } from 'react'
import {
    getTasksInFocus,
    // updateTaskCompletion, // Removed unused import
    // toggleTaskFocus, // Removed unused import
    cleanupOldFocusTasks,
} from '@/lib/localforage'
import {
    getFocusTasksForUser,
    cleanupOldFocusTasks as cleanupOldFocusTasksDb
} from '@/app/(protected)/app/actions/focus'
import { 
    updateTaskCompletionForUser,
    toggleTaskFocusForUser
} from '@/app/(protected)/app/actions/tasks'
import { useSession } from 'next-auth/react'
import type { Task } from '@/lib/db/schema'
import type { TaskFormValues } from '@/lib/types/types'
import FocusTask from './focus-task'
import { toast } from 'sonner'
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
import { GoalFormValues } from '@/lib/types/types' // Removed unused GoalWithTasks
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
    const { status } = useSession() // Removed unused 'session'
    const [tasks, setTasks] = useState<TaskWithMeta[]>([])
    const [isAddingPlan, setIsAddingPlan] = useState(false)
    // Removed unused 'isLoading'

    // Get refreshGoals from useGoalManagement first
    const { goals, addGoal, editGoal, deleteGoal, refreshGoals } = useGoalManagement()

    // Pass refreshGoals to useTaskManagement
    // Removed toggleTaskFocus, updateTaskCompletion from destructuring as they are now part of the hook's return value
    const { planTasks, addTask, editTask, deleteTask, toggleTaskFocus, updateTaskCompletion } = useTaskManagement(refreshGoals)

    console.log("currently the plantasks", planTasks)
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
            // Removed isLoading state update
            try {
                if (status === 'authenticated') {
                    // Use server actions for authenticated users
                    await cleanupOldFocusTasksDb()
                    const tasksInFocus = await getFocusTasksForUser()
                    setTasks(tasksInFocus)
                } else if (status === 'unauthenticated') {
                    // Use localForage for anonymous users
                    await cleanupOldFocusTasks()
                    const tasksInFocus = await getTasksInFocus()
                    setTasks(tasksInFocus)
                }
            } catch (error) {
                console.error("Error loading focus tasks:", error)
                toast.error("Failed to load focus tasks")
            } 
        }
        
        if (status !== 'loading') {
            loadTasks()
        }
    }, [status])

    const handleTaskComplete = async (taskId: number, completed: boolean) => {
        try {
            // Find the task to get its goalId
            const task = tasks.find((t) => t.id === taskId)
            if (!task) return

            // Use null instead of undefined for consistency with schema/types
            const completionDate = completed ? new Date() : null;

            // Update local state first for immediate feedback
            setTasks((prev) =>
                prev.map((t) =>
                    t.id === taskId
                        ? ({
                              ...t,
                              completed,
                              completedAt: completed ? completionDate : null,
                          } as TaskWithMeta)
                        : t
                )
            )

            // Persist based on authentication status
            if (status === 'authenticated') {
                // Use server action for authenticated users (pass null if completionDate is null)
                await updateTaskCompletionForUser(taskId, completed, completionDate)
            } else if (status === 'unauthenticated') {
            // Use localForage for anonymous users via the hook
            await updateTaskCompletion(taskId, completed, task.goalId || undefined)
            }
        } catch (error) {
            console.error('Error updating task completion:', error)
            toast.error("Failed to update task")
            // Revert local state on error
            setTasks((prev) =>
                prev.map((t) =>
                    t.id === taskId
                        ? ({
                              ...t,
                              completed: !completed,
                              completedAt: !completed ? (t.completedAt ?? null) : null,
                          } as TaskWithMeta)
                        : t
                )
            )
        }
    }

     // Handler for adding PLAN tasks (tasks not associated with a goal)
     const handleAddPlanTask = async (values: TaskFormValues) => {
         try {
             // Add the task using the hook (which handles auth status)
             const newTaskId = await addTask(values) // This adds a PLAN task

             if (newTaskId === undefined) {
                 toast.error("Failed to add task, cannot set focus.")
                 return;
             }

             // Set it to be in focus using the appropriate method based on auth status
             if (status === 'authenticated') {
                 await toggleTaskFocusForUser(newTaskId, true);
             } else if (status === 'unauthenticated') {
                 // Use the hook's toggleTaskFocus which handles localforage
                 await toggleTaskFocus(newTaskId, false, undefined); // Pass currentFocusState (false initially) and goalId (undefined for plan task)
             }

             // Refresh the focus tasks list after adding a plan task
             const updatedTasks = status === 'authenticated'
                ? await getFocusTasksForUser()
                : await getTasksInFocus(); // Fetch combined focus tasks
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

     // Handler for adding tasks TO A GOAL (adjusting goalId type for prop compatibility)
     const handleAddTaskToGoal = async (values: TaskFormValues, goalId?: number) => {
        if (goalId === undefined) {
             toast.error("Cannot add task: Goal ID is missing.");
             console.error("handleAddTaskToGoal called without a goalId.");
             return;
         }
        try {
            // Use the hook's addTask, providing the goalId
            const newTaskId = await addTask(values, goalId); // addTask handles auth status

            if (newTaskId === undefined) {
                toast.error("Failed to add task to goal.");
                return;
            }

            // Set the new task to be in focus
             if (status === 'authenticated') {
                 await toggleTaskFocusForUser(newTaskId, true);
             } else if (status === 'unauthenticated') {
                 // Use the hook's toggleTaskFocus which handles localforage
                 await toggleTaskFocus(newTaskId, false, goalId); // Pass currentFocusState (false initially) and goalId
             }

            // Refresh the focus list
            const updatedTasks = status === 'authenticated'
               ? await getFocusTasksForUser()
               : await getTasksInFocus();
           setTasks(updatedTasks)
           // No need to setIsAddingPlan(false) here as this is triggered from GoalsList

        } catch (error) {
            console.error('Error adding task to goal:', error);
            toast.error(`Failed to add task to goal: ${error instanceof Error ? error.message : String(error)}`);
        }
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
         // Pass name update as a partial object
         editGoal(id, { name: newName })
     }

     const handleEditBestTime = (
        id: number,
        updates: { bestTimeTitle?: string; bestTimeDescription?: string }
    ) => {
         // Use editGoal for best time updates
         editGoal(id, updates)
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
        // Pass refreshGoals to the provider
        <TaskGoalProvider refreshGoalsCallback={refreshGoals}>
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
                         {/* Task Form for adding PLAN tasks */}
                         {isAddingPlan && (
                             <TaskForm
                                 onAddTask={handleAddPlanTask} // Use specific handler
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
                             onEditBestTime={handleEditBestTime} // Still uses the wrapper function
                             onAddTask={handleAddTaskToGoal} // Pass the goal-specific add handler
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
