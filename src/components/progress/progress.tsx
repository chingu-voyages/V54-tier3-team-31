'use client'

import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// import { useState } from 'react'

const Progress: React.FC = () => {
    // data for list of completed tasks

    return (
        <div className="min-h-screen flex flex-col pb-16 md:pb-0 md:max-w-3xl md:mx-auto md:w-full pt-4 md:pt-8 ">
            <div className="items-center mb-6 px-4">
                <h1 className="text-3xl font-semibold">My Progress</h1>
            </div>
            {/* Productivity Trend */}
            <div className="items-center mb-4 px-4">
                <h2 className="text-xl font-semibold">Productivity Trend</h2>
                {/* Toggle Button - Weekly/Monthly */}
                <Tabs defaultValue="weekly" className="w-full mt-4">
                    <TabsList className="flex w-[161px] h-[42px]">
                        <TabsTrigger
                            value="weekly"
                            className="flex-1 w-[73px] h-[32px] flex items-center justify-center"
                        >
                            Weekly
                        </TabsTrigger>
                        <TabsTrigger
                            value="monthly"
                            className="flex-1 w-[73px] h-[32px] flex items-center justify-center"
                        >
                            Monthly
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="weekly">Weekly heatmap</TabsContent>
                    <TabsContent value="monthly">Monthly heatmap</TabsContent>
                </Tabs>
            </div>

            {/* Completion List */}
            <div className="items-center mb-4 px-4">
                <h2 className="text-xl font-semibold">Completion List</h2>
            </div>
        </div>
    )
}

export default Progress
