'use client'

import React from 'react'
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
                <div className="mt-2 flex gap-2">
                    <div>Weekly</div>
                    <div>Monthly</div>
                </div>
                {/* Heatmap */}
                <div className="mt-4 border-neutral-700 border-1 p-4 rounded-md h-40 flex items-center justify-center"></div>
            </div>

            {/* Completion List */}
            <div className="items-center mb-4 px-4">
                <h2 className="text-xl font-semibold">Completion List</h2>
            </div>
        </div>
    )
}

export default Progress
