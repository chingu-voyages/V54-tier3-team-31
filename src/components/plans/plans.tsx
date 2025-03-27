'use client'

import React from 'react'
import Goal from './goal'
import NavigationMenu from '../navigation/navigation-menu'
import DesktopNav from '../navigation/desktop-nav'
import { WandSparkles, Plus } from 'lucide-react'
import { Button } from '../ui/button'

const Plans: React.FC = () => {
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

    return (
        <div className="min-h-screen flex flex-col">
            {/* Desktop Navigation */}
            <DesktopNav />

            {/* Main container */}
            <div className="flex flex-col flex-1 pb-16 md:pb-0 md:max-w-3xl md:mx-auto md:w-full md:pt-8">
                {/* Mobile Header - Hidden on desktop */}
                <div className="sticky top-0 z-10 pt-4 pb-3 px-4 flex items-center justify-between border-b border-zinc-800 md:hidden">
                    <h1 className="text-2xl font-semibold">Plans</h1>
                    <Button className="w-8 h-8 rounded-full flex items-center justify-center">
                        <Plus size={16} />
                    </Button>
                </div>

                {/* Desktop Header - Hidden on mobile */}
                <div className="hidden md:flex items-center justify-between mb-6 px-4">
                    <h1 className="text-2xl font-semibold">Plans</h1>
                    <Button className="w-8 h-8 rounded-full flex items-center justify-center">
                        <Plus size={16} />
                    </Button>
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
                        <Button className="rounded-full border-zinc-700 transition-colors">
                            <Plus size={16} />
                        </Button>
                        <span className="font-medium">Add a Task</span>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Bar - Hidden on desktop */}
            <div className="md:hidden">
                <NavigationMenu />
            </div>
        </div>
    )
}

export default Plans
