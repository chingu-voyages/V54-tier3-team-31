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
import TaskForm from './TaskForm'

// Mock data - in a real application, this would come from an API or database
const goals = [
    {
        id: 1,
        title: 'Exercise to Get Healthier',
        bestTimeTitle: 'Best Time',
        bestTimeDescription:
            'After a long coding session or before lunch, refresh your mind.',
        tasks: [
            {
                id: Date.now(),
                title: 'Stretch (neck, shoulders, back)',
                frequency: 'Daily',
                duration: '5 mins',
            },
            {
                id: Date.now(),
                title: '10 push-ups, squats, or jumping jacks',
                frequency: 'Daily',
                duration: '5 mins',
            },
            {
                id: Date.now(),
                title: 'Walk while listening to music/podcast',
                frequency: 'Weekly',
                duration: '15 mins',
            },
        ],
    },
    {
        id: 2,
        title: 'Sleep Early',
        tasks: [
            {
                id: Date.now(),
                title: 'Dim lights, activate night mode',
                frequency: 'Monthly',
                duration: '15 mins',
            },
            {
                id: Date.now(),
                title: 'Do 4-7-8 deep breathing.',
                frequency: 'Daily',
                duration: '10 mins',
            },
            {
                id: Date.now(),
                title: 'Write one sentence about your day',
                frequency: 'Once',
                duration: '5 mins',
            },
        ],
        bestTimeTitle: 'Best Time',
        bestTimeDescription: '30 minutes before bed.',
    },
]

const Plans: React.FC = () => {
    // State to manage the visibility of the add task form
    const [isAdding, setIsAdding] = useState<boolean>(false)
    
    // Use our custom hook for task management
    const { planTasks, addTask, editTask, deleteTask } = useTaskManagement()
    
    // Form setup for editing tasks
    const form = useForm<typeof TaskFormSchema._type>({
        resolver: zodResolver(TaskFormSchema),
        defaultValues: {
            title: '',
            frequency: 'Once',
            duration: '5 mins',
        },
    })

    // Event Handlers
    const handleAddTaskClick = () => {
        setIsAdding(true)
    }

    const handleCancelAdd = () => {
        setIsAdding(false)
    }

    return (
        <div className="min-h-screen flex flex-col">
            {/* Main container */}
            <div className="flex flex-col flex-1 pb-16 md:pb-0 md:max-w-3xl md:mx-auto md:w-full md:pt-8">
                {/* Mobile Header - Hidden on desktop */}
                <div className="sticky top-0 z-10 pb-6 px-4">
                    <PlansHeader
                        onAddTaskClick={handleAddTaskClick}
                        className="w-full"
                    />
                </div>
                
                {/* Content */}
                <div className="flex flex-col px-4">
                    {/* Task Form - shown when adding a new task */}
                    {isAdding && (
                        <TaskForm 
                            onAddTask={addTask}
                            onCancel={handleCancelAdd}
                        />
                    )}
                    
                    {/* List of user's tasks */}
                    {planTasks.map((planTask) => (
                        <Task
                            key={nanoid()}
                            {...planTask}
                            onDeleteTaskClick={deleteTask}
                            onEditTask={editTask}
                            form={form}
                        />
                    ))}
                    
                    {/* Predefined goals */}
                    {goals.map((goal) => (
                        <Goal key={goal.id} {...goal} form={form} />
                    ))}

                    {/* Add a Task button - visible on larger screens */}
                    <div className="hidden md:flex mt-8 mb-4 items-center gap-2">
                        <Button 
                            className="rounded-full border-zinc-700 transition-colors md:w-10 md:h-10"
                            onClick={handleAddTaskClick}
                        >
                            <Plus size={16} className="md:w-5 md:h-5" />
                        </Button>
                        <span className="font-medium">Add a Task</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Plans
