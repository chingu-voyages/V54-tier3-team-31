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
import { AuthProviderWrapper } from '@/components/providers/auth-provider'
import TaskForm from './task-form'
import { GoalFormValues, TaskFormValues, } from '@/lib/types/types'
import { TaskGoalProvider } from '@/hooks/useTaskGoalContext'
import TaskList from './task-list'
import GoalsList from './goals-list'

const PlansContent: React.FC = () => {
    // State to manage the visibility of the add task form
    const [isAddingPlan, setIsAddingPlan] = useState<boolean>(false)

    // Destructure states from hooks, keeping only what we need
    const { 
        goals, 
        addGoal, 
        deleteGoal, 
        editGoal, 
        refreshGoals, 
        optimisticToggleTaskFocusInGoal, 
        isInitialLoading: goalsInitialLoading
    } = useGoalManagement()
    
    const { 
        planTasks, 
        addTask, 
        editTask, 
        deleteTask, 
        toggleTaskFocus, 
        isInitialLoading: tasksInitialLoading
    } = useTaskManagement(
        refreshGoals, 
        optimisticToggleTaskFocusInGoal 
    )

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

    // Conditional rendering for loading state - only for initial loading, not mutations
    if (goalsInitialLoading || tasksInitialLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Loading...</p> { /* Simple loading indicator */ }
            </div>
        )
    }

    return (
        // Pass refreshGoals from useGoalManagement to the provider
        <TaskGoalProvider refreshGoalsCallback={refreshGoals}>
            <div className="min-h-screen flex flex-col">
                {/* Main container */}
                <div className="flex flex-col flex-1 pb-16 md:pb-0 md:max-w-3xl md:mx-auto md:w-full md:pt-8">
                    {/* Mobile Header - Hidden on desktop */}
                    <div className="sticky top-0 z-10 pb-0 px-4">
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
                            onToggleTaskFocus={toggleTaskFocus}
                        />

                        {/* Predefined goals */}
                        <GoalsList
                            goals={goals}
                            form={taskForm}
                            onDeleteGoal={deleteGoal}
                            onDeleteTask={deleteTask}
                            onEditTask={editTask}
                            onEditGoal={(id, newName) => editGoal(id, { name: newName })}
                            onEditBestTime={editGoal}
                            onAddTask={handleAddTask}
                            onToggleTaskFocus={toggleTaskFocus}
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

// Wrapper component that provides the authentication context
const Plans: React.FC = () => {
    return (
        <AuthProviderWrapper>
            <PlansContent />
        </AuthProviderWrapper>
    )
}

export default Plans
