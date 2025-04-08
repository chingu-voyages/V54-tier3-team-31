'use client'

import React, { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import CompletionCard from '@/components/progress/completion-card'
import { placeholderData } from '@/db/placeholderData'
import HabitCompletions from '@/components/progress/habit-completions'
import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'
import { Tooltip } from 'react-tooltip'
import { ChevronRight, ChevronLeft } from 'lucide-react'

const currentYear = new Date().getUTCFullYear()
const currentMonth = new Date().getUTCMonth()
// const currentWeek = new Date().getUTCWeek()

// Calculate the start and end dates of the current week in UTC
const startOfWeekUTC = new Date()
startOfWeekUTC.setUTCDate(
    startOfWeekUTC.getUTCDate() - startOfWeekUTC.getUTCDay() - 1
) // Set to Sunday (start of the week)
startOfWeekUTC.setUTCHours(0, 0, 0, 0) // Ensure time is set to midnight in UTC

const endOfWeekUTC = new Date(startOfWeekUTC)
endOfWeekUTC.setUTCDate(startOfWeekUTC.getUTCDate() + 6) // Set to Saturday (end of the week)
endOfWeekUTC.setUTCHours(23, 59, 59, 999) // Ensure time is set to the end of the day in UTC

function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

const Progress: React.FC = () => {
    interface Habit {
        id: string
        title: string
        count: number
        completions: {
            id: number
            name: string
            frequency: string
            duration: string
        }[]
    }

    const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null)
    const [habits, setHabits] = useState<Habit[]>([])
    const [loading, setLoading] = useState(true)

    const [activeTab, setActiveTab] = useState<'weekly' | 'monthly'>('weekly')
    // Heatmap: State for the current year, month, and week
    const [year, setYear] = useState(currentYear)
    const [month, setMonth] = useState(currentMonth)
    const [weekStartDate, setWeekStartDate] = useState(startOfWeekUTC)
    const [weekEndDate, setWeekEndDate] = useState(endOfWeekUTC)

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

    //data for weekly view
    const weeklyHeatmapData = randomValues.filter(({ date }) => {
        return date >= weekStartDate && date <= weekEndDate
    })

    // Handle previous month navigation
    const handlePrev = () => {
        if (activeTab === 'monthly') {
            if (month > 0) {
                setMonth(month - 1)
            } else {
                setYear(year - 1)
                setMonth(11)
            }
        } else if (activeTab === 'weekly') {
            setWeekStartDate((prev) => {
                const newStartDate = new Date(prev)
                newStartDate.setUTCDate(newStartDate.getUTCDate() - 7)
                return newStartDate
            })

            setWeekEndDate((prev) => {
                const newEndDate = new Date(prev)
                newEndDate.setUTCDate(newEndDate.getUTCDate() - 7)
                return newEndDate
            })
        }
    }

    // Handle next month navigation (only allowed if it's before or equal to the current month)
    const handleNext = () => {
        if (activeTab === 'monthly') {
            if (year === currentYear && month === currentMonth) {
                // Prevent navigating to the next month if it's already the current month
                return
            }

            if (month < 11) {
                setMonth(month + 1)
            } else {
                setYear(year + 1)
                setMonth(0)
            }
        } else if (activeTab === 'weekly') {
            if (
                weekStartDate.toISOString() === startOfWeekUTC.toISOString() &&
                weekEndDate.toISOString() === endOfWeekUTC.toISOString()
            ) {
                // Prevent navigating to the next week if it's already the current week
                return
            }

            setWeekStartDate((prev) => {
                const newStartDate = new Date(prev)
                newStartDate.setUTCDate(newStartDate.getUTCDate() + 7)
                return newStartDate
            })

            setWeekEndDate((prev) => {
                const newEndDate = new Date(prev)
                newEndDate.setUTCDate(newEndDate.getUTCDate() + 7)
                return newEndDate
            })
        }
    }

    const handleSelectHabit = (habit: Habit) => {
        setSelectedHabit(habit)
    }

    // Fetch completed habit data from the database
    useEffect(() => {
        const fetchHabits = async () => {
            try {
                const res = await fetch('/api/progress')
                if (!res.ok) throw new Error('Failed to fetch')
                const data = await res.json()
                setHabits(data)
            } catch (err) {
                console.error('Error loading progress data:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchHabits()
    }, [])

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

                <Tabs
                    defaultValue="weekly"
                    className="w-full mt-4"
                    onValueChange={(value) => {
                        setActiveTab(value as 'weekly' | 'monthly')
                    }}
                >
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
                    <div className="flex flex-col items-center justify-center neutral-700 rounded-[6px] border">
                        <div className="flex items-center justify-center mb-2.5 mt-6">
                            <Button
                                onClick={handlePrev}
                                className="w-8 h-8 rounded-[12px] bg-neutral-900 text-neutral-50 border-neutral-700 border hover:bg-neutral-50 hover:text-neutral-900 hover:cursor-pointer"
                            >
                                <ChevronLeft size={16} />
                            </Button>

                            {/* Heatmap Wrapper */}
                            <div className="mx-4 flex flex-col justify-center items-center">
                                <div className="w-[200px] px-1">
                                    <Tooltip id="heatmap-tooltip" />
                                    {/* Weekly heatmap */}
                                    <TabsContent value="weekly">
                                        <CalendarHeatmap
                                            startDate={weekStartDate}
                                            endDate={weekEndDate}
                                            values={weeklyHeatmapData}
                                            horizontal={false}
                                            gutterSize={6}
                                            classForValue={(value) => {
                                                if (
                                                    !value ||
                                                    value.count === 0
                                                ) {
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
                                            showMonthLabels={false}
                                            showWeekdayLabels={false}
                                            transformDayElement={(rect) => {
                                                return React.cloneElement(
                                                    rect,
                                                    {
                                                        rx: 2,
                                                        ry: 2,
                                                    }
                                                )
                                            }}
                                        />
                                    </TabsContent>
                                    {/* Monthly heatmap */}
                                    <TabsContent value="monthly">
                                        <CalendarHeatmap
                                            startDate={startDate}
                                            endDate={lastDayOfMonth}
                                            values={randomValues}
                                            horizontal={false}
                                            gutterSize={6}
                                            classForValue={(value) => {
                                                if (
                                                    !value ||
                                                    value.count === 0
                                                ) {
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
                                            showMonthLabels={false}
                                            showWeekdayLabels={false}
                                            transformDayElement={(rect) => {
                                                return React.cloneElement(
                                                    rect,
                                                    {
                                                        rx: 2,
                                                        ry: 2,
                                                    }
                                                )
                                            }}
                                        />
                                    </TabsContent>
                                </div>

                                {/* Weekday Labels */}
                                <div className="grid grid-cols-7 text-center text-xs font-medium text-neutral-400 mt-1.5 w-[200px] h-[20px]">
                                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(
                                        (day, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-center h-5"
                                            >
                                                {day}
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>

                            <Button
                                onClick={handleNext}
                                disabled={
                                    activeTab === 'monthly'
                                        ? year === currentYear &&
                                          month === currentMonth // Disable if it's the current month
                                        : weekStartDate.toISOString() ===
                                              startOfWeekUTC.toISOString() &&
                                          weekEndDate.toISOString() ===
                                              endOfWeekUTC.toISOString() // Disable if it's the current week
                                }
                                className="w-8 h-8 rounded-[12px] bg-neutral-900 text-neutral-50 border-neutral-700 border hover:bg-neutral-50 hover:text-neutral-900 hover:cursor-pointer"
                            >
                                <ChevronRight size={16} />
                            </Button>
                        </div>
                        <div className="">
                            <p className="text-sm font-medium text-neutral-50">
                                {new Date(year, month).toLocaleString(
                                    'default',
                                    { month: 'long' }
                                )}{' '}
                                {year}
                            </p>
                        </div>
                        {/* Legend for heatmap */}
                        <div className="flex gap-2 justify-center items-center bg-neutral-800 px-4 py-2.5 rounded-full text-xs text-neutral-400 mt-2.5 mb-6">
                            <p>Low</p>
                            <div className="w-[18px] h-[18px] bg-[#f7fee7] rounded-xs"></div>
                            <div className="w-[18px] h-[18px] bg-[#365314] rounded-xs"></div>
                            <div className="w-[18px] h-[18px] bg-[#65a30d] rounded-xs"></div>
                            <div className="w-[18px] h-[18px] bg-[#d9f99d] rounded-xs"></div>
                            <p>High</p>
                        </div>
                    </div>
                </Tabs>
            </div>

            {/* Completion List */}
            <div className="items-center mb-4 px-4">
                <h2 className="text-xl font-semibold">Completion List</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : habits.length > 0 ? (
                    habits.map((habit) => (
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
