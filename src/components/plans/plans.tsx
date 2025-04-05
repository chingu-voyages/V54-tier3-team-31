'use client'

import React, { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '../ui/button'
import PlansHeader from './plans-header'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TaskFormSchema } from '@/lib/types/validations'
import { useTaskManagement } from '@/hooks/useTaskManagement'
import { useGoalManagement } from '@/hooks/useGoalManagement'
import TaskForm from './task-form'
import { GoalFormValues, TaskFormValues, } from '@/lib/types/types'
import { TaskGoalProvider } from '@/hooks/useTaskGoalContext'
import TaskList from './task-list'
import GoalsList from './goals-list'

const Plans: React.FC = () => {
    // State to manage the visibility of the add task form
    const [isAddingPlan, setIsAddingPlan] = useState<boolean>(false)

    // Use our custom hook for task management
    const { planTasks, addTask, editTask, deleteTask } = useTaskManagement()
    const { goals, addGoal, deleteGoal, editGoal, editBestTime } = useGoalManagement()

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
        if (goalId !== undefined) {
            addTask(values, goalId);
        } else {
            addTask(values);
        }
        setIsAddingPlan(false);
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
                                onAddTask={handleAddTask}
                                onCancel={() => setIsAddingPlan(false)}
                            />
                        )}

                        {/* List of user's tasks */}
                        <TaskList
                            tasks={planTasks}
                            form={taskForm}
                            onDeleteTask={deleteTask}
                            onEditTask={editTask}
                        />

                        {/* Predefined goals */}
                        <GoalsList
                            goals={goals}
                            form={taskForm}
                            onDeleteGoal={deleteGoal}
                            onDeleteTask={deleteTask}
                            onEditTask={editTask}
                            onEditGoal={editGoal}
                            onEditBestTime={editBestTime}
                            onAddTask={handleAddTask}
                        />

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
