'use client'

import React, { createContext, useContext, useCallback } from 'react' // Removed useState, useEffect
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { TaskFormValues } from '@/lib/types/types' // Removed GoalWithTasks
import { Task } from '@/lib/db/schema' // Import Task type
import {
    editTaskFromLocal,
    // getAllGoalsFromLocal, // Removed unused import
    addTaskToGoal as addTaskToGoalLocal,
    removeTaskFromLocal,
} from '@/lib/localforage'
// Import server actions
import {
    // getGoalsForUser, // Removed unused import
    addTaskToGoalForUser,
    // editGoalForUser, // Not needed directly here, task edits handled by task actions
    // deleteGoalForUser // Goal deletion handled by useGoalManagement
} from '@/app/(protected)/app/actions/goals'
import {
    editTaskForUser,
    deleteTaskForUser
} from '@/app/(protected)/app/actions/tasks'

// Context now focuses on providing actions for tasks within goals
type TaskGoalContextType = {
    // Removed goals, isInitialized, setGoals, refreshGoals from context type
    updateTaskInGoal: (
        taskId: number,
        goalId: number,
        values: TaskFormValues
    ) => Promise<void>
    addTaskToGoal: (values: TaskFormValues, goalId: number) => Promise<void>
    removeTaskInGoal: (goalId: number, taskId: number) => Promise<void>
}

// Create the context with a default value
const TaskGoalContext = createContext<TaskGoalContextType | undefined>(
    undefined
)

// Define props for the provider, including the refresh callback
interface TaskGoalProviderProps {
    children: React.ReactNode;
    refreshGoalsCallback: () => Promise<void>; // Callback to refresh goal state externally
}

export const TaskGoalProvider: React.FC<TaskGoalProviderProps> = ({
    children,
    refreshGoalsCallback, // Receive the callback
}) => {
    const { status } = useSession();
    // Removed internal state: goals, setGoals, isInitialized
    // Removed internal refreshGoals function and useEffect

    // Function to add a task to a specific goal
    const addTaskToGoal = useCallback(
        async (values: TaskFormValues, goalId: number) => {
            if (status === 'loading') {
                toast.info("Waiting for session status...");
                return;
            }
            try {
                if (status === 'authenticated') {
                    // Use server action for authenticated users
                    // Assuming isInFocus is false by default when adding directly to a goal list
                    await addTaskToGoalForUser(values, goalId, false);
                    // Server action should revalidate, call the external refresh callback
                    await refreshGoalsCallback();
                } else if (status === 'unauthenticated') {
                    // Create task object for localForage
                    const taskData: Task = { // Use the imported Task type
                        ...values,
                        id: Date.now() + Math.floor(Math.random() * 1000), // Simple unique ID for local
                        userId: 'anonymous', // Placeholder for anonymous
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        goalId: goalId,
                        difficulty: null,
                        description: null,
                        completed: false,
                        completedAt: null,
                        isInFocus: false, // Default focus state
                    };
                    await addTaskToGoalLocal(taskData, goalId);
                    await refreshGoalsCallback(); // Refresh external state
                }
                toast.success("Task added to goal successfully!");
            } catch (error) {
                console.error('TaskGoalContext: Failed to add task to goal:', error);
                toast.error(`Failed to add task to goal: ${error instanceof Error ? error.message : String(error)}`);
            }
        },
        [refreshGoalsCallback, status] // Corrected dependency array
    )

    // Function to update a task within a specific goal
    const updateTaskInGoal = useCallback(
        async (taskId: number, goalId: number, values: TaskFormValues) => {
             if (status === 'loading') {
                toast.info("Waiting for session status...");
                return;
            }
            try {
                 if (status === 'authenticated') {
                    // Use the generic task edit action, providing the goalId
                    await editTaskForUser(taskId, values, goalId);
                    // Server action should revalidate, call the external refresh callback
                    await refreshGoalsCallback();
                 } else if (status === 'unauthenticated') {
                    await editTaskFromLocal({ taskId, values, goalId });
                    await refreshGoalsCallback(); // Refresh external state
                 }
                 toast.success("Task updated successfully!");
            } catch (error) {
                console.error('TaskGoalContext: Failed to update task in goal:', error);
                toast.error(`Failed to update task: ${error instanceof Error ? error.message : String(error)}`);
            }
        },
        [refreshGoalsCallback, status]
    )
    
    // Function to remove a task from a specific goal
    const removeTaskInGoal = useCallback(
        async (goalId: number, taskId: number) => {
             if (status === 'loading') {
                toast.info("Waiting for session status...");
                return;
            }
            try {
                 if (status === 'authenticated') {
                    // Use the generic task delete action
                    await deleteTaskForUser(taskId);
                    // Server action should revalidate, call the external refresh callback
                    await refreshGoalsCallback();
                 } else if (status === 'unauthenticated') {
                    await removeTaskFromLocal({ goalId, taskId });
                    await refreshGoalsCallback(); // Refresh external state
                 }
                 toast.success("Task removed from goal successfully!");
            } catch (error) {
                console.error('TaskGoalContext: Failed to delete task in goal: ', error);
                toast.error(`Failed to remove task: ${error instanceof Error ? error.message : String(error)}`);
            }
        },
        [refreshGoalsCallback, status] // Depend on the callback
    )

    // Context value now only contains the action functions
    const contextValue = {
        updateTaskInGoal,
        addTaskToGoal,
        removeTaskInGoal,
    }

    return (
        <TaskGoalContext.Provider value={contextValue}>
            {children}
        </TaskGoalContext.Provider>
    )
}

// Custom hook to use the context
export const useTaskGoalContext = () => {
    const context = useContext(TaskGoalContext)
    if (context === undefined) {
        throw new Error(
            'useTaskGoalContext must be used within a TaskGoalProvider'
        )
    }
    return context
}
