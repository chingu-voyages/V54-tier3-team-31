import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { act } from 'react'
import '@testing-library/jest-dom/vitest'
import Focus from '../../../src/components/focus/focus'
import { useTaskManagement } from '@/hooks/useTaskManagement'
import { useGoalManagement } from '@/hooks/useGoalManagement'
import { getTasksInFocus, cleanupOldFocusTasks } from '@/lib/localforage'
import { cleanupOldFocusTasks as cleanupOldFocusTasksDb, getFocusTasksForUser } from '@/app/(protected)/app/actions/focus'
import { useSession } from 'next-auth/react'
import type { Task } from '@/lib/db/schema'
import type { ReactNode } from 'react'

// Mock next-auth/react
vi.mock('next-auth/react', () => ({
    useSession: vi.fn(),
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

// Mock localforage
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

// Mock FocusTask component
vi.mock('../../../src/components/focus/focus-task', () => ({
    default: ({ id, title }: { id: number, title: string }) => (
        <div data-testid={`focus-task-${id}`}>{title}</div>
    )
}))

describe('Focus Component Cleanup Tests', () => {
    const mockTask: Task = {
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
    };

    beforeEach(() => {
        // Reset mocks before each test
        vi.resetAllMocks();

        // Default mock for useTaskManagement
        vi.mocked(useTaskManagement).mockReturnValue({
            planTasks: [mockTask],
            addTask: vi.fn(),
            editTask: vi.fn(),
            deleteTask: vi.fn(),
            toggleTaskFocus: vi.fn(),
            updateTaskCompletion: vi.fn(),
            refreshTasks: vi.fn(),
            isInitialized: true
        });

        // Default mock for useGoalManagement
        vi.mocked(useGoalManagement).mockReturnValue({
            goals: [],
            addGoal: vi.fn(),
            editGoal: vi.fn(),
            deleteGoal: vi.fn(),
            refreshGoals: vi.fn(),
            isInitialized: true,
            optimisticToggleTaskFocusInGoal: vi.fn()
        });

        // Default mocks for localforage functions
        vi.mocked(getTasksInFocus).mockResolvedValue([mockTask]);
        vi.mocked(cleanupOldFocusTasks).mockResolvedValue(undefined);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('calls cleanup function when user is unauthenticated', async () => {
        // Mock session for unauthenticated user
        vi.mocked(useSession).mockReturnValue({
            status: 'unauthenticated',
            data: null,
            update: async () => null
        });

        // Setup test
        let rendered;
        await act(async () => {
            rendered = render(<Focus />);
        });

        // Verify cleanup was called
        await waitFor(() => {
            expect(cleanupOldFocusTasks).toHaveBeenCalled();
        });

        // Verify tasks are fetched after cleanup
        await waitFor(() => {
            expect(getTasksInFocus).toHaveBeenCalled();
        });

        // Clean up
        rendered.unmount();
    });

    it('calls cleanup function when user is authenticated', async () => {
        // Mock session for authenticated user
        vi.mocked(useSession).mockReturnValue({
            status: 'authenticated',
            data: {
                user: { id: 'test-user', email: 'test@example.com' },
                expires: '2024-12-31'
            },
            update: async () => null
        });

        // Add debug console logs
        console.log('Before render - authenticated test');
        
        // Set up mock for server-side cleanup function that's used for authenticated users
        vi.mocked(cleanupOldFocusTasksDb).mockImplementation(async () => {
            console.log('cleanupOldFocusTasksDb called - authenticated test');
            return undefined;
        });
        
        // Mock getFocusTasksForUser to return our test task
        vi.mocked(getFocusTasksForUser).mockResolvedValue([mockTask]);
        
        // Use fake timers
        vi.useFakeTimers();
        
        // Setup test with explicit act wrapper
        let rendered;
        await act(async () => {
            console.log('Rendering Focus component - authenticated test');
            rendered = render(<Focus />);
        });
        
        // Advance timers to trigger useEffect
        await act(async () => {
            console.log('Advancing timers - authenticated test');
            vi.advanceTimersToNextTimer();
            vi.advanceTimersToNextTimer();
        });
        
        // Restore real timers
        vi.useRealTimers();

        // Verify cleanup was called
        await waitFor(() => {
            console.log('Waiting for cleanupOldFocusTasksDb - authenticated test');
            expect(cleanupOldFocusTasksDb).toHaveBeenCalled();
        });

        // Verify tasks are fetched after cleanup
        await waitFor(() => {
            console.log('Waiting for getFocusTasksForUser - authenticated test');
            expect(getFocusTasksForUser).toHaveBeenCalled();
        });

        // Clean up
        rendered.unmount();
    });
}); 