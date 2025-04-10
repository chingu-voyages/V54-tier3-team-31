'use client'

import React, { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import CompletionCard from '@/components/progress/completion-card'
import HabitCompletions from '@/components/progress/habit-completions'
import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'
import { Tooltip } from 'react-tooltip'
import { ChevronRight, ChevronLeft } from 'lucide-react'

interface HeatmapValue {
    userId: string
    completionDate: string
    completedTasks: number
}

interface Completion {
    id: number
    name: string
    frequency: string
    duration: string
}

interface Habit {
    id: string
    title: string
    count: number
    completions: Completion[]
}

const getWeekRange = () => {
    const start = new Date()
    start.setUTCDate(start.getUTCDate() - start.getUTCDay() - 1)
    start.setUTCHours(0, 0, 0, 0)

    const end = new Date(start)
    end.setUTCDate(start.getUTCDate() + 6)
    end.setUTCHours(23, 59, 59, 999)

    return { start, end }
}

const getMonthRange = (year: number, month: number) => {
    const firstDay = new Date(Date.UTC(year, month, 1))
    const lastDay = new Date(Date.UTC(year, month + 1, 0))
    const startDate = new Date(firstDay)
    startDate.setUTCDate(firstDay.getUTCDate() - 1)

    return { startDate, endDate: lastDay }
}

const getClassForValue = (value: HeatmapValue | undefined): string => {
    const count = Number(value?.completedTasks ?? 0)
    if (count === 0) return 'color-scale-0'
    if (count === 1) return 'color-scale-1'
    if (count >= 2 && count < 4) return 'color-scale-2'
    return 'color-scale-3'
}

const getTooltipAttrs = (value: HeatmapValue) =>
    value?.completionDate
        ? {
              'data-tooltip-id': 'heatmap-tooltip',
              'data-tooltip-content': `${value.completionDate.slice(0, 10)} has count: ${value.completedTasks}`,
          }
        : {}

const Progress: React.FC = () => {
    const currentYear = new Date().getUTCFullYear()
    const currentMonth = new Date().getUTCMonth()
    const { start: initialWeekStart, end: initialWeekEnd } = getWeekRange()

    const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null)
    const [habits, setHabits] = useState<Habit[]>([])
    const [loading, setLoading] = useState(true)

    const [activeTab, setActiveTab] = useState<'weekly' | 'monthly'>('weekly')
    const [year, setYear] = useState(currentYear)
    const [month, setMonth] = useState(currentMonth)
    const [weekStartDate, setWeekStartDate] = useState(initialWeekStart)
    const [weekEndDate, setWeekEndDate] = useState(initialWeekEnd)
    const [heatmapData, setHeatmapData] = useState<HeatmapValue[]>([])

    // fetch heatmap data
    const fetchHeatmapData = async () => {
        try {
            const response = await fetch('/api/heatmap')
            if (response.ok) {
                const data = await response.json()
                setHeatmapData(data.data)
            } else {
                console.error('Error fetching heatmap data')
            }
        } catch (error) {
            console.error('Error fetching heatmap data:', error)
        }
    }

    // Fetch completed habit data from the database
    const fetchHabits = async () => {
        const res = await fetch('/api/progress')
        const data = await res.json()
        setHabits(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchHabits()
        fetchHeatmapData()
    }, [])

    // Handle previous month navigation
    const handlePrev = () => {
        if (activeTab === 'weekly') {
            const prevWeekStart = new Date(weekStartDate)
            prevWeekStart.setUTCDate(prevWeekStart.getUTCDate() - 7)

            const prevWeekEnd = new Date(weekEndDate)
            prevWeekEnd.setUTCDate(prevWeekEnd.getUTCDate() - 7)

            setWeekStartDate(prevWeekStart)
            setWeekEndDate(prevWeekEnd)
        } else {
            // Monthly
            if (month === 0) {
                setMonth(11)
                setYear((prev) => prev - 1)
            } else {
                setMonth((prev) => prev - 1)
            }
        }
    }

    // Handle next month navigation (only allowed if it's before or equal to the current month)
    const handleNext = () => {
        if (activeTab === 'weekly') {
            const nextWeekStart = new Date(weekStartDate)
            nextWeekStart.setUTCDate(nextWeekStart.getUTCDate() + 7)

            const nextWeekEnd = new Date(weekEndDate)
            nextWeekEnd.setUTCDate(nextWeekEnd.getUTCDate() + 7)

            setWeekStartDate(nextWeekStart)
            setWeekEndDate(nextWeekEnd)
        } else {
            // Monthly
            if (month === 11) {
                setMonth(0)
                setYear((prev) => prev + 1)
            } else {
                setMonth((prev) => prev + 1)
            }
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

    const { startDate, endDate } = getMonthRange(year, month)

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

                    {/* Heatmap */}
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
                                            values={heatmapData.map((d) => ({
                                                ...d,
                                                date: d.completionDate,
                                            }))}
                                            horizontal={false}
                                            gutterSize={6}
                                            classForValue={getClassForValue}
                                            tooltipDataAttrs={getTooltipAttrs}
                                            showMonthLabels={false}
                                            showWeekdayLabels={false}
                                            transformDayElement={(rect) =>
                                                React.cloneElement(rect, {
                                                    rx: 2,
                                                    ry: 2,
                                                })
                                            }
                                        />
                                    </TabsContent>
                                    {/* Monthly heatmap */}
                                    <TabsContent value="monthly">
                                        <CalendarHeatmap
                                            startDate={startDate}
                                            endDate={endDate}
                                            values={heatmapData.map((d) => ({
                                                ...d,
                                                date: d.completionDate,
                                            }))}
                                            horizontal={false}
                                            gutterSize={6}
                                            classForValue={getClassForValue}
                                            tooltipDataAttrs={getTooltipAttrs}
                                            showMonthLabels={false}
                                            showWeekdayLabels={false}
                                            transformDayElement={(rect) =>
                                                React.cloneElement(rect, {
                                                    rx: 2,
                                                    ry: 2,
                                                })
                                            }
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
                                          month === currentMonth
                                        : weekStartDate.toISOString() ===
                                              initialWeekStart.toISOString() &&
                                          weekEndDate.toISOString() ===
                                              initialWeekEnd.toISOString()
                                }
                                className="w-8 h-8 rounded-[12px] bg-neutral-900 text-neutral-50 border-neutral-700 border hover:bg-neutral-50 hover:text-neutral-900 hover:cursor-pointer"
                            >
                                <ChevronRight size={16} />
                            </Button>
                        </div>
                        <div className="flex items-center justify-center mt-2">
                            <p className="text-sm font-medium text-neutral-50">
                                {activeTab === 'weekly'
                                    ? `${weekStartDate.toLocaleDateString(
                                          'default',
                                          { month: 'long', day: 'numeric' }
                                      )} - ${weekEndDate.toLocaleDateString(
                                          'default',
                                          { month: 'long', day: 'numeric' }
                                      )}`
                                    : `${new Date(year, month).toLocaleString(
                                          'default',
                                          { month: 'long' }
                                      )} ${year}`}
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
