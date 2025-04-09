/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Focus from '../../../src/components/focus/focus'
import '@testing-library/jest-dom/vitest'
import { useTaskManagement } from '@/hooks/useTaskManagement'
import { useGoalManagement } from '@/hooks/useGoalManagement'
import { getTasksInFocus, updateTaskCompletion, toggleTaskFocus, cleanupOldFocusTasks } from '@/lib/localforage'
import type { TaskFormValues } from '@/lib/types/types'
import type { Task } from '@/lib/db/schema'
import type { ReactNode } from 'react'

// Mock all required components and hooks
vi.mock('../../../src/hooks/useTaskGoalContext', () => ({
    TaskGoalProvider: ({ children }: { children: ReactNode }) => children
}))

vi.mock('../../../src/components/plans/task-form', () => ({
    default: ({ onAddTask, onCancel }: {
        onAddTask: (values: TaskFormValues) => void
        onCancel: () => void
    }) => (
        <div data-testid="task-form">
            <button onClick={() => onAddTask({ title: 'New Task', frequency: 'Daily', duration: '15 mins' })}>
                Add Task
            </button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    )
}))

// Mock localForage
vi.mock('localforage', () => ({
    default: {
        config: vi.fn().mockReturnThis(),
        getItem: vi.fn().mockResolvedValue([]),
        setItem: vi.fn().mockResolvedValue(null),
        createInstance: vi.fn().mockReturnValue({
            getItem: vi.fn().mockResolvedValue([]),
            setItem: vi.fn().mockResolvedValue(null),
        }),
    }
}))

// Mock the hooks
vi.mock('@/hooks/useTaskManagement', () => ({
    useTaskManagement: vi.fn()
}))

vi.mock('@/hooks/useGoalManagement', () => ({
    useGoalManagement: vi.fn()
}))

// Mock the localforage functions
vi.mock('@/lib/localforage', () => ({
    getTasksInFocus: vi.fn().mockResolvedValue([]),
    updateTaskCompletion: vi.fn().mockResolvedValue(undefined),
    toggleTaskFocus: vi.fn().mockResolvedValue(undefined),
    cleanupOldFocusTasks: vi.fn().mockResolvedValue(undefined)
}))

// Mock GoalsList component
vi.mock('../../../src/components/plans/goals-list', () => ({
    default: ({ goals }: { goals: Array<{
        id: number;
        name: string;
        bestTimeTitle?: string;
        bestTimeDescription?: string;
        description?: string | null;
        createdAt?: Date;
        updatedAt?: Date;
        userId?: string;
    }> }) => (
        <div data-testid="goals-list">
            {goals.map(goal => (
                <div key={goal.id} data-testid={`goal-${goal.id}`}>
                    <h3>{goal.name}</h3>
                    {goal.bestTimeTitle && (
                        <div>
                            <div>{goal.bestTimeTitle}</div>
                            <div>{goal.bestTimeDescription}</div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}))

// Mock FocusTask component
vi.mock('../../../src/components/focus/focus-task', () => ({
    default: ({
        id,
        title,
        frequency,
        duration,
        completed,
        onTaskComplete,
        onFrequencyChange,
        onDurationChange,
        onDeleteTask
    }: {
        id: number
        title: string
        frequency: string
        duration: string
        completed: boolean
        onTaskComplete?: (id: number, completed: boolean) => void
        onFrequencyChange?: (id: number, frequency: string) => void
        onDurationChange?: (id: number, duration: string) => void
        onDeleteTask?: (id: number) => void
    }) => (
        <div data-testid={`focus-task-${id}`} className="task">
            <input 
                type="checkbox" 
                checked={completed} 
                onChange={(e) => onTaskComplete?.(id, e.target.checked)}
            />
            <span>{title}</span>
            <button data-testid={`frequency-${id}`} onClick={() => onFrequencyChange?.(id, 'Weekly')}>{frequency}</button>
            <button data-testid={`duration-${id}`} onClick={() => onDurationChange?.(id, '15 mins')}>{duration}</button>
            <button data-testid={`more-${id}`}>More</button>
            <button data-testid={`delete-${id}`} onClick={() => onDeleteTask?.(id)}>Delete</button>
        </div>
    )
}))

describe('Focus Component', () => {
    const mockTasks: Task[] = [
        {
            id: 1,
            title: 'Test Task 1',
            frequency: 'Daily',
            duration: '10 mins',
            completed: false,
            isInFocus: true,
            completedAt: null,
            difficulty: null,
            description: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            userId: 'test-user',
            goalId: null
        },
        {
            id: 2,
            title: 'Test Task 2',
            frequency: 'Weekly',
            duration: '30 mins',
            completed: true,
            isInFocus: true,
            completedAt: new Date(),
            difficulty: null,
            description: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            userId: 'test-user',
            goalId: null
        }
    ]

    const mockGoals = [
        {
            id: 1,
            name: 'Test Goal',
            bestTimeTitle: 'Morning',
            bestTimeDescription: 'Best time to work',
            description: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            userId: 'test-user',
            tasks: [
                {
                    id: 1,
                    title: 'Test Task 1',
                    frequency: 'Daily',
                    duration: '10 mins',
                    completed: false,
                    isInFocus: true,
                    completedAt: null,
                    difficulty: null,
                    description: null,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    userId: 'test-user',
                    goalId: 1
                }
            ]
        }
    ]

    const mockAddTask = vi.fn().mockReturnValue(3)
    const mockEditTask = vi.fn()
    const mockDeleteTask = vi.fn()
    const mockAddGoal = vi.fn()

    beforeEach(() => {
        vi.clearAllMocks()
        ;(useTaskManagement as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            planTasks: mockTasks,
            addTask: mockAddTask,
            editTask: mockEditTask,
            deleteTask: mockDeleteTask
        })
        ;(useGoalManagement as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            goals: mockGoals,
            addGoal: mockAddGoal,
            editGoal: vi.fn(),
            deleteGoal: vi.fn(),
            editBestTime: vi.fn()
        })
        // Mock getTasksInFocus to return mockTasks
        vi.mocked(getTasksInFocus).mockResolvedValue(mockTasks)
    })

    it('renders without crashing', () => {
        render(<Focus />)
        expect(screen.getByText("Today's Focus")).toBeInTheDocument()
    })

    it('shows dropdown menu with correct actions', async () => {
        const user = userEvent.setup()
        render(<Focus />)
        
        // Click the dropdown trigger button
        const menuButton = screen.getByRole('button', { name: '≡' })
        await user.click(menuButton)
        
        // Check dropdown items
        expect(screen.getByText('Add a Task')).toBeInTheDocument()
        expect(screen.getByText('Add a Goal and Tasks')).toBeInTheDocument()
        expect(screen.getByText('Add Plans Based on My Goal')).toBeInTheDocument()
    })

    it('displays empty state message when no tasks', () => {
        vi.mocked(getTasksInFocus).mockResolvedValueOnce([])
        // Mock planTasks to be empty as well
        vi.mocked(useTaskManagement).mockReturnValueOnce({
            planTasks: [],
            addTask: mockAddTask,
            editTask: mockEditTask,
            deleteTask: mockDeleteTask,
            refreshTasks: vi.fn().mockResolvedValue(undefined) // Add refreshTasks mock
        })

        // Mock useGoalManagement to return empty goals
        vi.mocked(useGoalManagement).mockReturnValueOnce({
            goals: [],
            addGoal: vi.fn(),
            editGoal: vi.fn(),
            deleteGoal: vi.fn(),
            editBestTime: vi.fn()
        })

        render(<Focus />)
        expect(screen.getByText(/no tasks in focus/i)).toBeInTheDocument()
        expect(screen.getByText(/click the star icon/i)).toBeInTheDocument()
    })

    it('displays best time information for goals', () => {
        render(<Focus />)
        const goal = mockGoals[0]
        expect(screen.getByText(goal.bestTimeTitle)).toBeInTheDocument()
        expect(screen.getByText(goal.bestTimeDescription)).toBeInTheDocument()
    })

    it('displays tasks with their correct information', async () => {
        render(<Focus />)
        // Wait for tasks to be loaded
        expect(screen.getByText('Test Task 1')).toBeInTheDocument()
        expect(screen.getByText('Daily')).toBeInTheDocument()
        expect(screen.getByText('10 mins')).toBeInTheDocument()
        
        expect(screen.getByText('Test Task 2')).toBeInTheDocument()
        expect(screen.getByText('Weekly')).toBeInTheDocument()
        expect(screen.getByText('30 mins')).toBeInTheDocument()
    })

    it('handles adding a new goal', async () => {
        const user = userEvent.setup()
        render(<Focus />)
        
        // Open dropdown and click "Add a Goal and Tasks"
        const menuButton = screen.getByRole('button', { name: '≡' })
        await user.click(menuButton)
        await user.click(screen.getByText('Add a Goal and Tasks'))
        
        expect(mockAddGoal).toHaveBeenCalledWith({
            name: 'My Goal',
            bestTimeTitle: 'Your Best time',
            bestTimeDescription: 'And your description',
        })
    })

    it('handles showing and hiding task form', async () => {
        const user = userEvent.setup()
        render(<Focus />)
        
        // Initially task form should not be visible
        expect(screen.queryByTestId('task-form')).not.toBeInTheDocument()
        
        // Open dropdown and click "Add a Task"
        const menuButton = screen.getByRole('button', { name: '≡' })
        await user.click(menuButton)
        await user.click(screen.getByText('Add a Task'))
        
        // Task form should be visible
        const taskForm = await screen.findByTestId('task-form')
        expect(taskForm).toBeInTheDocument()
    })

    it('handles task completion', async () => {
        const user = userEvent.setup()
        render(<Focus />)
        
        // Wait for tasks to load
        await screen.findByText('Test Task 1')
        
        // Find and click the checkbox for Test Task 1
        const checkboxes = screen.getAllByRole('checkbox')
        await user.click(checkboxes[0])
        
        expect(vi.mocked(updateTaskCompletion)).toHaveBeenCalledWith(1, true, undefined)
    })

    it('handles task frequency change', async () => {
        const user = userEvent.setup()
        render(<Focus />)
        
        // Wait for tasks to load
        await screen.findByTestId('focus-task-1')
        
        // Find and click the frequency button for Test Task 1
        const frequencyButton = screen.getByTestId('frequency-1')
        await user.click(frequencyButton)
        
        expect(mockEditTask).toHaveBeenCalledWith(
            1,
            expect.objectContaining({
                frequency: 'Weekly',
                title: 'Test Task 1',
                duration: '10 mins'
            }),
            undefined
        )
    })

    it('handles task duration change', async () => {
        const user = userEvent.setup()
        render(<Focus />)
        
        // Wait for tasks to load
        await screen.findByTestId('focus-task-1')
        
        // Find and click the duration button for Test Task 1
        const durationButton = screen.getByTestId('duration-1')
        await user.click(durationButton)
        
        expect(mockEditTask).toHaveBeenCalledWith(
            1,
            expect.objectContaining({
                duration: '15 mins',
                title: 'Test Task 1',
                frequency: 'Daily'
            }),
            undefined
        )
    })

    it('handles task deletion', async () => {
        const user = userEvent.setup()
        render(<Focus />)
        
        // Wait for tasks to load
        await screen.findByTestId('focus-task-1')
        
        // Click delete button
        const deleteButton = screen.getByTestId('delete-1')
        await user.click(deleteButton)
        
        expect(mockDeleteTask).toHaveBeenCalledWith(1, undefined)
    })

})