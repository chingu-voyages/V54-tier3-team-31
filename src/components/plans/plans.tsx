'use client'

import React from 'react'
import Goal from './goal'
import { WandSparkles, Plus } from 'lucide-react'
import { Button } from '../ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Plans: React.FC = () => {
    const pathname = usePathname()
    // Exercise goal tasks
    const exerciseTasks = [
        {
            title: 'Stretch (neck, shoulders, back)',
            difficultyIcon: <WandSparkles size={16} />,
            difficultyText: 'Simpler',
        },
        {
            title: '10 push-ups, squats, or jumping jacks',
            difficultyIcon: <WandSparkles size={16} />,
            difficultyText: 'Simpler',
        },
        {
            title: 'Walk while listening to music/podcast',
            difficultyIcon: <WandSparkles size={16} />,
            difficultyText: 'Simpler',
        },
    ]

    // Sleep goal tasks
    const sleepTasks = [
        {
            title: 'Dim lights, activate night mode',
            difficultyIcon: <WandSparkles size={16} />,
            difficultyText: 'Simpler',
        },
        {
            title: 'Do 4-7-8 deep breathing.',
            difficultyIcon: <WandSparkles size={16} />,
            difficultyText: 'Simpler',
        },
        {
            title: 'Write one sentence about your day',
            difficultyIcon: <WandSparkles size={16} />,
            difficultyText: 'Simpler',
        },
    ]

    const dropDownActions = [
        {
            name: 'Add a Task',
            href: null,
        },
        {
            name: 'Add a Goal and Tasks',
            href: '/add-goal-and-tasks',
        },
        {
            name: 'Add Plans Bassed on My Goal',
            href: '/add-plans-ai',
        },
    ]

    const addPlanBtn = (
        <>
            <h1 className="text-2xl font-semibold">Plans</h1>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center">
                        <Plus size={16} className="md:w-5 md:h-5" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {dropDownActions.map((item) => (
                        <DropdownMenuItem key={item.name}>
                            {item.href ? (
                                <Link
                                    href={item.href}
                                    className={`flex w-full items-center ${pathname === item.href ? 'bg-muted' : ''}`}
                                >
                                    {item.name}
                                </Link>
                            ) : (
                                <Button variant='ghost' className='p-0 m-0 h-auto'>{item.name}</Button>
                            )}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )

    return (
        <div className="min-h-screen flex flex-col">
            {/* Main container */}
            <div className="flex flex-col flex-1 pb-16 md:pb-0 md:max-w-3xl md:mx-auto md:w-full md:pt-8">
                {/* Mobile Header - Hidden on desktop */}
                <div className="sticky top-0 z-10 pt-4 pb-3 px-4 flex items-center justify-between border-b border-zinc-800 md:hidden">
                    {addPlanBtn}
                </div>

                {/* Desktop Header - Hidden on mobile */}
                <div className="hidden md:flex items-center justify-between mb-6 px-4">
                    {addPlanBtn}
                </div>

                {/* Content */}
                <div className="flex flex-col px-4">
                    <Goal
                        title="Exercise to Get Healthier"
                        tasks={exerciseTasks}
                        bestTimeTitle="Best Time"
                        bestTimeDescription="After a long coding session or before lunch, refresh your mind."
                    />

                    <Goal
                        title="Sleep Early"
                        tasks={sleepTasks}
                        bestTimeTitle="Best Time"
                        bestTimeDescription="30 minutes before bed."
                    />

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
