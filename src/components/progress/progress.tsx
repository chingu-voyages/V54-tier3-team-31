'use client'

import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import CompletionCard from '@/components/progress/completion-card'
import { placeholderData } from '@/db/placeholderData'
import HabitCompletions from '@/components/progress/habit-completions'
import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'
import { Tooltip } from 'react-tooltip'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const currentYear = new Date().getUTCFullYear()
const currentMonth = new Date().getUTCMonth()
// const currentWeek = new Date().getUTCWeek()

function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

const Progress: React.FC = () => {
    interface Habit {
        id: string
        title: string
        completions: {
            id: number
            name: string
            frequency: string
            duration: string
        }[]
    }

    const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null)

    // Heatmap: State for the current year, month, and week
    const [year, setYear] = useState(currentYear)
    const [month, setMonth] = useState(currentMonth)
    // const [week, setWeek] = useState(currentWeek)

    // get first and last days of the selected month
    const firstDayOfMonth = new Date(Date.UTC(year, month, 1))
    const lastDayOfMonth = new Date(Date.UTC(year, month + 1, 0))
    const numDays = lastDayOfMonth.getUTCDate()

    // to ensure the heatmap starts at the correct day
    const startDate = new Date(firstDayOfMonth)
    startDate.setUTCDate(firstDayOfMonth.getUTCDate() - 1)

    //Generate heatmap data for the selected month for testing purposes
    const randomValues = Array.from({ length: numDays }, (_, i) => {
        const date = new Date(Date.UTC(year, month, i + 1)) // Explicitly set UTC
        return {
            date,
            count: getRandomInt(0, 5),
        }
    })

    // Handle previous month navigation
    const handlePrevMonth = () => {
        if (month > 0) {
            setMonth(month - 1)
        } else {
            setYear(year - 1)
            setMonth(11)
        }
    }

    // Handle next month navigation (only allowed if it's before or equal to the current month)
    const handleNextMonth = () => {
        if (
            year < currentYear ||
            (year === currentYear && month < currentMonth)
        ) {
            setMonth(month + 1)
        }
    }

    const handleSelectHabit = (habit: Habit) => {
        setSelectedHabit(habit)
    }

    if (selectedHabit) {
        return (
            <HabitCompletions
                title={selectedHabit.title}
                completions={selectedHabit.completions}
                onBack={() => setSelectedHabit(null)}
            />
        )
    }

    return (
        <div className="min-h-screen flex flex-col pb-16 md:pb-0 md:max-w-3xl md:mx-auto md:w-full pt-4 md:pt-8 ">
            <div className="items-center mb-6 px-4">
                <h1 className="text-3xl font-semibold">My Progress</h1>
            </div>
            {/* Productivity Trend */}
            <div className="items-center mb-4 px-4">
                <h2 className="text-xl font-semibold">Productivity Trend</h2>

                <Tabs defaultValue="weekly" className="w-full mt-4">
                    {/* Toggle Button - Weekly/Monthly */}
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
                    {/* Heatmap for each tab */}
                    <TabsContent value="weekly">Weekly heatmap</TabsContent>
                    {/* Monthly Tab */}
                    <TabsContent value="monthly">
                        <div>
                            <div className="flex items-center justify-center mb-2 w-full max-w-[670px] border-blue-600 border">
                                <Button
                                    onClick={handlePrevMonth}
                                    disabled={
                                        year === currentYear - 1 && month === 0
                                    }
                                >
                                    <ArrowLeft size={20} />
                                </Button>
                                {/* Month name display */}
                                {/* Montly Heatmap */}
                                <div className="mx-4 border border-amber-300 flex justify-center ">
                                    <Tooltip id="heatmap-tooltip" />
                                    <CalendarHeatmap
                                        startDate={startDate}
                                        endDate={lastDayOfMonth}
                                        values={randomValues}
                                        horizontal={false}
                                        gutterSize={18}
                                        classForValue={(value) => {
                                            if (!value || value.count === 0) {
                                                return 'color-scale-0'
                                            } else if (value.count === 1) {
                                                return 'color-scale-1'
                                            } else if (
                                                value.count >= 2 &&
                                                value.count < 4
                                            ) {
                                                return 'color-scale-2'
                                            } else {
                                                return 'color-scale-3'
                                            }
                                        }}
                                        tooltipDataAttrs={(
                                            value: {
                                                date: Date
                                                count: number
                                            } | null
                                        ) =>
                                            value && value.date
                                                ? {
                                                      'data-tooltip-id':
                                                          'heatmap-tooltip',
                                                      'data-tooltip-content': `${value.date
                                                          .toISOString()
                                                          .slice(
                                                              0,
                                                              10
                                                          )} has count: ${value.count}`,
                                                  }
                                                : {}
                                        }
                                        showWeekdayLabels={false}
                                        transformDayElement={(rect) => {
                                            const { x, y } = rect.props // Get current positioning
                                            return React.cloneElement(rect, {
                                                width: 18,
                                                height: 18,
                                                rx: 2,
                                                ry: 2,
                                            })
                                        }}
                                    />
                                </div>
                                <Button>
                                    <ArrowRight
                                        size={20}
                                        onClick={handleNextMonth}
                                        disabled={
                                            year === currentYear &&
                                            month === currentMonth
                                        }
                                    />
                                </Button>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Completion List */}
            <div className="items-center mb-4 px-4">
                <h2 className="text-xl font-semibold">Completion List</h2>
                {placeholderData.length > 0 ? (
                    placeholderData.map((habit) => (
                        <CompletionCard
                            key={habit.id}
                            habitId={habit.id}
                            title={habit.title}
                            count={habit.count}
                            completions={habit.completions}
                            onClick={() => handleSelectHabit(habit)}
                        />
                    ))
                ) : (
                    <p>No habit completions found.</p>
                )}
            </div>
        </div>
    )
}

export default Progress
