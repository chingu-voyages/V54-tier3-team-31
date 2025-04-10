/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Focus from '../../../src/components/focus/focus'
import '@testing-library/jest-dom/vitest'
import { useTaskManagement } from '@/hooks/useTaskManagement'
import { useGoalManagement } from '@/hooks/useGoalManagement'
import { getTasksInFocus, updateTaskCompletion, toggleTaskFocus, cleanupOldFocusTasks } from '@/lib/localforage'
import { cleanupOldFocusTasks as cleanupOldFocusTasksDb, getFocusTasksForUser } from '@/app/(protected)/app/actions/focus'
import { useSession } from 'next-auth/react'
import type { TaskFormValues } from '@/lib/types/types'
import type { Task } from '@/lib/db/schema'
import type { ReactNode } from 'react'
import { act } from 'react'
import type { RenderResult } from '@testing-library/react'

// Mock next-auth/react
vi.mock('next-auth/react', () => ({
    useSession: vi.fn(() => ({ status: 'unauthenticated', data: null })), // Default mock
    SessionProvider: ({ children }: { children: React.ReactNode }) => children,
}));

// Add Next.js headers mock to prevent "headers was called outside a request scope" error
vi.mock('next/headers', () => ({
    headers: vi.fn(() => new Map()),
    cookies: vi.fn(() => new Map())
}));

// Mock other required components and hooks
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

// Mock the server actions
vi.mock('@/app/(protected)/app/actions/focus', () => ({
    cleanupOldFocusTasks: vi.fn().mockResolvedValue(undefined),
    getFocusTasksForUser: vi.fn().mockResolvedValue([]),
    toggleTaskFocusForUser: vi.fn().mockResolvedValue(undefined),
    updateTaskCompletionForUser: vi.fn().mockResolvedValue(undefined)
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
        onDeleteTask,
        onEditTask,
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
        onEditTask?: (id: number, values: TaskFormValues) => void
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
            <button data-testid={`edit-${id}`} onClick={() => onEditTask?.(id, { title, frequency, duration })}>Edit</button>
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
    const mockEditTask = vi.fn();
    const mockDeleteTask = vi.fn();
    const mockToggleTaskFocus = vi.fn(); // Added mock
    const mockUpdateTaskCompletion = vi.fn(); // Added mock
    const mockRefreshTasks = vi.fn(); // Added mock
    const mockAddGoal = vi.fn();
    const mockEditGoal = vi.fn(); // Added mock
    const mockDeleteGoal = vi.fn(); // Added mock
    const mockRefreshGoals = vi.fn(); // Added mock

    beforeEach(() => {
        vi.clearAllMocks();
        // Update useTaskManagement mock
        (useTaskManagement as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            planTasks: mockTasks,
            addTask: mockAddTask,
            editTask: mockEditTask,
            deleteTask: mockDeleteTask,
            toggleTaskFocus: mockToggleTaskFocus, // Added
            updateTaskCompletion: mockUpdateTaskCompletion, // Added
            refreshTasks: mockRefreshTasks, // Added
            isInitialized: true // Added
        });
        // Update useGoalManagement mock
        (useGoalManagement as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            goals: mockGoals,
            addGoal: mockAddGoal,
            editGoal: mockEditGoal, // Use added mock
            deleteGoal: mockDeleteGoal, // Use added mock
            // editBestTime: vi.fn(), // Removed editBestTime
            refreshGoals: mockRefreshGoals, // Added
            isInitialized: true,
            optimisticToggleTaskFocusInGoal: vi.fn()
        });
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
        // Mock planTasks to be empty as well, include all required fields
        vi.mocked(useTaskManagement).mockReturnValueOnce({
            planTasks: [],
            addTask: mockAddTask,
            editTask: mockEditTask,
            deleteTask: mockDeleteTask,
            toggleTaskFocus: mockToggleTaskFocus,
            updateTaskCompletion: mockUpdateTaskCompletion,
            refreshTasks: mockRefreshTasks,
            isInitialized: true
        });

        // Mock useGoalManagement to return empty goals, include all required fields
        vi.mocked(useGoalManagement).mockReturnValueOnce({
            goals: [],
            addGoal: mockAddGoal,
            editGoal: mockEditGoal,
            deleteGoal: mockDeleteGoal,
            refreshGoals: mockRefreshGoals,
            isInitialized: true,
            optimisticToggleTaskFocusInGoal: vi.fn()
        });

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
        await user.click(checkboxes[0]);

        // Check if the hook's updateTaskCompletion was called
        expect(mockUpdateTaskCompletion).toHaveBeenCalledWith(1, true, undefined); // Check the mock function
    });

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

    // --- Test for Cleanup Logic ---
    afterEach(() => {
      vi.restoreAllMocks(); // Restore spies
    });

    it('calls cleanup and handles old focus tasks (unauthenticated)', async () => {
        // Reset mocks before test
        vi.resetAllMocks();
        
        // Create a simple task list to return from getTasksInFocus
        const mockTaskList = [
            {
                id: 1,
                title: 'Test Task',
                frequency: 'Daily',
                duration: '5 mins',
                completed: false,
                isInFocus: true,
                completedAt: null,
                goalId: null,
                userId: 'test-user',
                createdAt: new Date(),
                updatedAt: new Date(),
                difficulty: null,
                description: null
            }
        ];
        
        // Setup mocks for this specific test
        vi.mocked(getTasksInFocus).mockResolvedValue(mockTaskList);
        vi.mocked(cleanupOldFocusTasks).mockResolvedValue(undefined);
        
        // Mock useSession for unauthenticated
        vi.mocked(useSession).mockReturnValue({ 
            status: 'unauthenticated', 
            data: null, 
            update: async () => null 
        });
        
        // Mock the hooks to return simple values
        vi.mocked(useTaskManagement).mockReturnValue({
            planTasks: mockTaskList,
            addTask: vi.fn(),
            editTask: vi.fn(),
            deleteTask: vi.fn(),
            toggleTaskFocus: vi.fn(),
            updateTaskCompletion: vi.fn(),
            refreshTasks: vi.fn(),
            isInitialized: true
        });
        
        vi.mocked(useGoalManagement).mockReturnValue({
            goals: [],
            addGoal: vi.fn(),
            editGoal: vi.fn(),
            deleteGoal: vi.fn(),
            refreshGoals: vi.fn(),
            isInitialized: true,
            optimisticToggleTaskFocusInGoal: vi.fn()
        });
        
        // Render the component
        render(<Focus />);
        
        // Use fake timers to control asynchronous operations
        vi.useFakeTimers();

        // Wrap rendering in act() to handle React state updates
        await act(async () => {
            render(<Focus />);
            // Advance timers to trigger useEffect hooks
            vi.advanceTimersToNextTimer();
        });
        
        // Restore real timers
        vi.useRealTimers();
        
        // Check that cleanupOldFocusTasks gets called
        await vi.waitFor(() => {
            expect(cleanupOldFocusTasks).toHaveBeenCalled();
        });
        
        // Check that getTasksInFocus gets called after cleanup
        await vi.waitFor(() => {
            expect(getTasksInFocus).toHaveBeenCalled();
        });
    });

    it('calls cleanup and handles old focus tasks (authenticated)', async () => {
        // Reset mocks before test
        vi.resetAllMocks();
        
        // Create a simple task list to return from getTasksInFocus
        const mockTaskList = [
            {
                id: 1,
                title: 'Test Task',
                frequency: 'Daily',
                duration: '5 mins',
                completed: false,
                isInFocus: true,
                completedAt: null,
                goalId: null,
                userId: 'test-user',
                createdAt: new Date(),
                updatedAt: new Date(),
                difficulty: null,
                description: null
            }
        ];
        
        // Setup mocks for this specific test
        vi.mocked(getFocusTasksForUser).mockResolvedValue(mockTaskList);
        vi.mocked(cleanupOldFocusTasksDb).mockResolvedValue(undefined);
        
        // Mock useSession for authenticated user
        vi.mocked(useSession).mockReturnValue({ 
            status: 'authenticated', 
            data: {
                user: { id: 'test-user', email: 'test@example.com' },
                expires: '2024-12-31'
            },
            update: async () => null 
        });
        
        // Mock the hooks to return simple values
        vi.mocked(useTaskManagement).mockReturnValue({
            planTasks: mockTaskList,
            addTask: vi.fn(),
            editTask: vi.fn(),
            deleteTask: vi.fn(),
            toggleTaskFocus: vi.fn(),
            updateTaskCompletion: vi.fn(),
            refreshTasks: vi.fn(),
            isInitialized: true
        });
        
        vi.mocked(useGoalManagement).mockReturnValue({
            goals: [],
            addGoal: vi.fn(),
            editGoal: vi.fn(),
            deleteGoal: vi.fn(),
            refreshGoals: vi.fn(),
            isInitialized: true,
            optimisticToggleTaskFocusInGoal: vi.fn()
        });
        
        // Use fake timers for controlled testing
        vi.useFakeTimers();
        
        // Render the component wrapped in act
        let rendered: RenderResult = {} as RenderResult;
        await act(async () => {
            rendered = render(<Focus />);
        });
        
        // Advance timers to trigger useEffects
        await act(async () => {
            vi.runAllTimers();
        });
        
        // Restore real timers
        vi.useRealTimers();
        
        // Check that the server action cleanupOldFocusTasksDb gets called (for authenticated users)
        await vi.waitFor(() => {
            expect(cleanupOldFocusTasksDb).toHaveBeenCalled();
        });
        
        // Check that the server action getFocusTasksForUser gets called after cleanup
        await vi.waitFor(() => {
            expect(getFocusTasksForUser).toHaveBeenCalled();
        });
        
        // Clean up
        rendered.unmount();
    });

    // --- End of Test for Cleanup Logic ---

})
