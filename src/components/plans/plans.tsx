'use client'

import React, { useEffect, useState } from 'react'
import Goal from './goal'
import { Plus, Star, Trash } from 'lucide-react'
import { Button } from '../ui/button'
import PlansHeader from './plans-header'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import ActionDropdown from '../ui/action-dropdown'
import Task from './task'
import { nanoid } from 'nanoid'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { saveTasksToLocal, getAllPLanTasksFromLocal } from '@/lib/localforage'
import { Task as TaskSchema} from '@/lib/schema'
// Zod schema for the new goal form
const TaskFormSchema = z.object({
    title: z.string().min(1, {
        message: 'Goal title cannot be empty.',
    }),
    frequency: z.string().optional().default('Once'), // Made optional, default 'Once'
    duration: z.string().optional().default('5 mins'), // Made optional, default '5 mins'
})

const goals = [
    {
        id: 1,
        title: 'Exercise to Get Healthier',
        bestTimeTitle: 'Best Time',
        bestTimeDescription:
            'After a long coding session or before lunch, refresh your mind.',
        tasks: [
            {
                title: 'Stretch (neck, shoulders, back)',
                frequency: 'Daily',
                duration: '5 mins',
            },
            {
                title: '10 push-ups, squats, or jumping jacks',
                frequency: 'Daily',
                duration: '5 mins',
            },
            {
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
                title: 'Dim lights, activate night mode',
                frequency: 'Monthly',
                duration: '15 mins',
            },
            {
                title: 'Do 4-7-8 deep breathing.',
                frequency: 'Daily',
                duration: '10 mins',
            },
            {
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
    // State to manage the visibility of the add goal form
    const [isAddingTasks, setIsAddingTasks] = useState(false)
    const [planTasks, setPlanTasks] = useState<TaskSchema[]>([])
    const frequencyOptions = ['Once', 'Daily', 'Weekly', 'Monthly']
    const durationOptions = [
        '5 mins',
        '10 mins',
        '15 mins',
        '30 mins',
        '1 hour',
    ]

    // --- Form Setup ---
    const form = useForm<z.infer<typeof TaskFormSchema>>({
        resolver: zodResolver(TaskFormSchema),
        defaultValues: {
            title: '',
            frequency: 'Once',
            duration: '5 mins',
        },
    })

    // --- Event Handlers ---
    const handleAddTaskClick = () => {
        setIsAddingTasks(true)
        form.reset() // Reset form when opening
    }

    function onSubmit(values: z.infer<typeof TaskFormSchema>) {
        // User hits enter then we need to persist those inputted values
        console.log('New Goal:', values);
        
        // Create a complete task object with all required properties
        const newTask = {
            ...values,
            userId: nanoid(),
            id: Date.now(), // Generate a unique ID
            difficulty: null,
            description: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            goalId: 0, // Default goal ID or approplkjjjriate value
            completed: false
        };
        
        setPlanTasks((prev) => [newTask, ...prev]);
        setIsAddingTasks(false);
        saveTasksToLocal([...planTasks, newTask])
        form.reset()
    }
    // --- End Form Setup & Handlers ---

    useEffect(()=> {
        const localPlanTasks = async () => {

         const planTasks = await getAllPLanTasksFromLocal();
         setPlanTasks(planTasks);

        }
        localPlanTasks()

        
        
    }, [])

    return (
        <div className="min-h-screen flex flex-col">
            {/* Main container */}
            <div className="flex flex-col flex-1 pb-16 md:pb-0 md:max-w-3xl md:mx-auto md:w-full md:pt-8">
                {/* Mobile Header - Hidden on desktop */}
                <div className="sticky top-0 z-10 pb-6 px-4 fle">
                    <PlansHeader
                        onAddTaskClick={handleAddTaskClick}
                        className="w-full"
                    />
                </div>

                {/* Content */}
                <div className="flex flex-col px-4">
                    {/* --- New Task Form --- */}
                    {isAddingTasks && (
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-4 border-b border-border pb-3 pt-4" // Added border like Task
                            >
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div>
                                                    <div className="flex w-full items-center gap-2 text-base text-foreground font-medium">
                                                        <Star
                                                            strokeWidth={1.5}
                                                            className="text-neutral-500"
                                                        />
                                                        <Input
                                                            placeholder="Your Task"
                                                            {...field}
                                                            className="text-xl font-semibold border-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto" // Adjusted Input style
                                                            variant="ghost"
                                                        />
                                                    </div>
                                                    <div className="flex w-full items-center text-xs text-foreground font-medium justify-between mt-3">
                                                        <div className="flex items-center gap-4">
                                                            {' '}   
                                                            {/* Added gap */}
                                                            {/* --- Frequency Dropdown --- */}
                                                            <FormField
                                                                control={
                                                                    form.control
                                                                }
                                                                name="frequency"
                                                                render={({
                                                                    field,
                                                                }) => (
                                                                    <FormItem>
                                                                        <DropdownMenu>
                                                                            <DropdownMenuTrigger
                                                                                asChild
                                                                            >
                                                                                <Button
                                                                                    variant="outline"
                                                                                    size="sm"
                                                                                    className="h-auto px-3 py-1 text-xs border-border bg-background whitespace-nowrap rounded-md border-solid hover:bg-accent"
                                                                                >
                                                                                    {field.value ||
                                                                                        'Frequency'}{' '}
                                                                                    {/* Display selected or default */}
                                                                                </Button>
                                                                            </DropdownMenuTrigger>
                                                                            <DropdownMenuContent align="start">
                                                                                {frequencyOptions.map(
                                                                                    (
                                                                                        option
                                                                                    ) => (
                                                                                        <DropdownMenuItem
                                                                                            key={
                                                                                                option
                                                                                            }
                                                                                            onSelect={() =>
                                                                                                field.onChange(
                                                                                                    option
                                                                                                )
                                                                                            }
                                                                                        >
                                                                                            {
                                                                                                option
                                                                                            }
                                                                                        </DropdownMenuItem>
                                                                                    )
                                                                                )}
                                                                            </DropdownMenuContent>
                                                                        </DropdownMenu>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            {/* --- Duration Dropdown --- */}
                                                            <FormField
                                                                control={
                                                                    form.control
                                                                }
                                                                name="duration"
                                                                render={({
                                                                    field,
                                                                }) => (
                                                                    <FormItem>
                                                                        <DropdownMenu>
                                                                            <DropdownMenuTrigger
                                                                                asChild
                                                                            >
                                                                                <Button
                                                                                    variant="outline"
                                                                                    size="sm"
                                                                                    className="h-auto px-3 py-1 text-xs border-border bg-background whitespace-nowrap rounded-md border-solid hover:bg-accent -ml-2" // Kept -ml-2 like Task
                                                                                >
                                                                                    {field.value ||
                                                                                        'Duration'}{' '}
                                                                                    {/* Display selected or default */}
                                                                                </Button>
                                                                            </DropdownMenuTrigger>
                                                                            <DropdownMenuContent align="start">
                                                                                {durationOptions.map(
                                                                                    (
                                                                                        option
                                                                                    ) => (
                                                                                        <DropdownMenuItem
                                                                                            key={
                                                                                                option
                                                                                            }
                                                                                            onSelect={() =>
                                                                                                field.onChange(
                                                                                                    option
                                                                                                )
                                                                                            }
                                                                                        >
                                                                                            {
                                                                                                option
                                                                                            }
                                                                                        </DropdownMenuItem>
                                                                                    )
                                                                                )}
                                                                            </DropdownMenuContent>
                                                                        </DropdownMenu>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>
                                                        {/* Action Dropdown remains */}
                                                        <ActionDropdown
                                                            iconSize={16}
                                                        >
                                                            <DropdownMenuItem
                                                                className="text-destructive"
                                                                onClick={() =>
                                                                    setIsAddingTasks(
                                                                        false
                                                                    )
                                                                } // Close form on delete/cancel
                                                            >
                                                                <Trash className="mr-2 h-4 w-4 text-red-400" />
                                                                Cancel
                                                            </DropdownMenuItem>
                                                            {/* Consider adding a Save button here or rely on Enter */}
                                                        </ActionDropdown>
                                                    </div>
                                                </div>
                                            </FormControl>
                                            <FormMessage />{' '}
                                            {/* Message for title field */}
                                        </FormItem>
                                    )}
                                />
                                {/* Implicit submit on Enter, or add an explicit Save button */}
                                {/* <Button type="submit">Save Task</Button> */}
                            </form>
                        </Form>
                    )}
                    {/* --- End New Task Form --- */}
                    {planTasks.map((planTask) => (
                        <Task key={nanoid()} {...planTask} />
                    ))}
                    {goals.map((goal) => (
                        <Goal
                            key={goal.id}
                            {...goal}

                        />
                    ))}

                    {/* Add a Task button - visible on larger screens */}
                    <div className="hidden md:flex mt-8 mb-4 items-center gap-2">
                        <Button className="rounded-full border-zinc-700 transition-colors md:w-10 md:h-10">
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
