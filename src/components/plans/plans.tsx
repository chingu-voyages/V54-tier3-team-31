'use client'

import React, { useState } from 'react'
import Goal from './goal'
import { Plus } from 'lucide-react'
import { Button } from '../ui/button'
import PlansHeader from './plans-header'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TaskFormSchema } from '@/lib/types/validations'
import Task from './task'
import { nanoid } from 'nanoid'
import { useTaskManagement } from '@/hooks/useTaskManagement'
import { useGoalManagement } from '@/hooks/useGoalManagement'
import TaskForm from './TaskForm'
import { GoalFormValues, TaskFormValues } from '@/lib/types/types'
import { TaskGoalProvider } from '@/hooks/useTaskGoalContext'

const Plans: React.FC = () => {
    // State to manage the visibility of the add task form
    const [isAddingPlan, setIsAddingPlan] = useState<boolean>(false)

    // Use our custom hook for task management
    const { planTasks, addTask, editTask, deleteTask } = useTaskManagement()
    const { goals, addGoal, deleteGoal } = useGoalManagement()

    // Form setup for editing tasks
    const taskForm = useForm<typeof TaskFormSchema._type>({
        resolver: zodResolver(TaskFormSchema),
        defaultValues: {
            title: '',
            frequency: 'Once',
            duration: '5 mins',
        },
    })

    // Handle adding a task, with optional goalId parameter
    const handleAddTask = (values: TaskFormValues, goalId?: number) => {
        addTask(values, goalId);
    }

    const handleAddGoal = () => {
        const values: GoalFormValues = {
            name: 'My Goal',
            bestTimeTitle: 'Your Best time',
            bestTimeDescription: 'And your description',
        }
        addGoal(values)
    }

    return (
        <TaskGoalProvider>
            <div className="min-h-screen flex flex-col">
                {/* Main container */}
                <div className="flex flex-col flex-1 pb-16 md:pb-0 md:max-w-3xl md:mx-auto md:w-full md:pt-8">
                    {/* Mobile Header - Hidden on desktop */}
                    <div className="sticky top-0 z-10 pb-6 px-4">
                        <PlansHeader
                            onAddTaskClick={() => setIsAddingPlan(true)}
                            onAddGoalClick={() => handleAddGoal()}
                            className="w-full"
                        />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col px-4">
                        {/* Task Form - shown when adding a new task */}
                        {isAddingPlan && (
                            <TaskForm
                                onAddTask={(values) => handleAddTask(values)}
                                onCancel={() => setIsAddingPlan(false)}
                            />
                        )}

                        {/* List of user's tasks */}
                        {planTasks.map((planTask) => (
                            <Task
                                key={nanoid()}
                                {...planTask}
                                onDeleteTaskClick={deleteTask}
                                onEditTask={editTask}
                                form={taskForm}
                                goalId={undefined}
                            />
                        ))}

                        {/* Predefined goals */}
                        {goals.map((goal) => (
                            <Goal
                                key={goal.id}
                                {...goal}
                                form={taskForm}
                                onDeleteGoal={() => deleteGoal(goal.id)}
                                onDeleteTask={deleteTask}
                                onEditTask={editTask}
                                onAddTask={handleAddTask}
                            />
                        ))}

                        {/* Add a Task button - visible on larger screens */}
                        <div className="hidden md:flex mt-8 mb-4 items-center gap-2">
                            <Button
                                className="rounded-full border-zinc-700 transition-colors md:w-10 md:h-10"
                                onClick={() => setIsAddingPlan(true)}
                            >
                                <Plus size={16} className="md:w-5 md:h-5" />
                            </Button>
                            <span className="font-medium">Add a Task</span>
                        </div>
                    </div>
                </div>
            </div>
        </TaskGoalProvider>
    )
}

export default Plans
