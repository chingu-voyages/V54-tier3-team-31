'use client'

import React from 'react'
import Goal from './goal'
import { WandSparkles, Plus } from 'lucide-react'
import { Button } from '../ui/button'
import PlansHeader from './plans-header'

const Plans: React.FC = () => {
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
            ],
        },
        {
            id: 2,
            title: 'Sleep Early',
            tasks: [
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
            ],
            bestTimeTitle: 'Best Time',
            bestTimeDescription: '30 minutes before bed.',
        },
    ]

    return (
        <div className="min-h-screen flex flex-col">
            {/* Main container */}
            <div className="flex flex-col flex-1 pb-16 md:pb-0 md:max-w-3xl md:mx-auto md:w-full md:pt-8">
                {/* Mobile Header - Hidden on desktop */}
                <div className="sticky top-0 z-10 pt-4 pb-3 px-4 flex items-center justify-between border-b border-zinc-800 md:hidden">
                    <PlansHeader />
                </div>

                {/* Desktop Header - Hidden on mobile */}
                <div className="hidden md:flex mb-6 px-4">
                    <PlansHeader className="w-full" />
                </div>

                {/* Content */}
                <div className="flex flex-col px-4">
                    {goals.map(goal => (
                        <Goal
                            key={goal.id}
                            title={goal.title}
                            tasks={goal.tasks}
                            bestTimeTitle={goal.bestTimeTitle}
                            bestTimeDescription={goal.bestTimeDescription}
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
