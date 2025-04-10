'use client'

import { useEffect, useReducer, useCallback, useState } from 'react'
import { useSession } from 'next-auth/react' // Import useSession
import { TaskFormValues } from '@/lib/types/types' // Corrected path
import { planTaskReducer } from '@/lib/reducers' // Corrected path
// Removed unused localforage functions: saveTasksToLocal, removeTaskFromLocal, editTaskFromLocal
import { getAllPLanTasksFromLocal, updateTaskCompletion as updateTaskCompletionLocal, toggleTaskFocus as toggleTaskFocusLocal } from '@/lib/localforage' // Corrected path, added local update/toggle functions
import { z } from 'zod'
import { TaskFormSchema } from '@/lib/types/validations' // Corrected path
import { usePathname } from 'next/navigation'
import { Task } from '@/lib/db/schema' // Corrected path
import {
    getTasksForUser,
    addTaskForUser,
    editTaskForUser,
    deleteTaskForUser,
    updateTaskCompletionForUser,
    toggleTaskFocusForUser
} from '@/app/(protected)/app/actions/tasks' // Corrected path, added imports
import { addTaskToGoalForUser } from '@/app/(protected)/app/actions/goals' // Added import for adding task to goal
import { toast } from 'sonner'

// Define the type for the optional optimistic toggle function
type OptimisticGoalToggleFn = (goalId: number, taskId: number, newFocusState: boolean) => void;

export function useTaskManagement(
    onTaskInGoalUpdated?: () => Promise<void>,
    optimisticGoalToggle?: OptimisticGoalToggleFn // Add optional parameter
    ) {
    const [planTasks, dispatch] = useReducer(planTaskReducer, [])
    const { status } = useSession() // Get session status, removed unused 'session'
    const pathname = usePathname()
    const [isInitialized, setIsInitialized] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Add isLoading state

    const refreshTasks = useCallback(async () => {
        if (status === 'loading') return; // Don't do anything while loading
        setIsLoading(true); // Set loading true
        try {
            let tasks: Task[] = [];
            if (status === 'authenticated') {
                console.log("Fetching tasks for authenticated user...");
                // getTasksForUser now only fetches plan tasks (goalId is null)
                tasks = await getTasksForUser();
                // tasks = tasks.sort((a,b) => b.createdAt - a.createdAt)
            } else if (status === 'unauthenticated') {
                console.log("Fetching tasks from localForage for unauthenticated user...");
                tasks = await getAllPLanTasksFromLocal();
                 // Ensure local tasks also only include plan tasks for this state
                 tasks = tasks.filter(task => task.goalId === null);
            }
             console.log("Dispatching initial plan tasks:", tasks);
            dispatch({
                type: 'initial',
                planTasks: tasks, // Dispatch only plan tasks
            });
            setIsInitialized(true);
        } catch (error) {
            console.error("Error refreshing tasks:", error);
            toast.error("Failed to load tasks.");
             setIsInitialized(true); // Mark as initialized even on error to prevent infinite loops
        } finally {
            setIsLoading(false); // Set loading false in finally block
        }
    }, [status]); // Depend on session status

    useEffect(() => {
        console.log("useTaskManagement useEffect triggered. Status:", status);
        refreshTasks();
    }, [status, refreshTasks]); // Remove isInitialized from dependencies

    const addTask = async (values: z.infer<typeof TaskFormSchema>, goalId?: number) => {
        const isInFocus = pathname === '/focus';
        let newTaskId: number | undefined;

        try {
            if (status === 'authenticated') {
                let newTask: Task | undefined;
                if (goalId) {
                    // Use the specific server action for adding tasks to goals
                    newTask = await addTaskToGoalForUser(values, goalId, isInFocus);
                    // Trigger the goal update callback if provided
                    if (onTaskInGoalUpdated) {
                        await onTaskInGoalUpdated();
                    }
                } else {
                    // Add as a plan task (no goalId) using the task action
                    newTask = await addTaskForUser(values, undefined, isInFocus);
                    // Refresh the main task list since a plan task was added
                    await refreshTasks();
                }
                newTaskId = newTask?.id;

            } else if (status === 'unauthenticated') {
                // Generate a temporary ID for local state/localForage
                // Note: Using Date.now() combined with a random element for better uniqueness locally
                newTaskId = Date.now() + Math.floor(Math.random() * 1000);
                dispatch({
                    type: 'added',
                    values,
                    goalId,
                    taskId: newTaskId,
                    isInFocus,
                });
                 // Reducer handles localForage update for plan tasks.
                 // If it's a goal task, the reducer prevents adding to main state,
                 // but localForage goal update should be handled separately (e.g., in useGoalManagement or component)
                 if (goalId && onTaskInGoalUpdated) {
                     await onTaskInGoalUpdated(); // Still call callback for consistency
                 }
            } else {
                 toast.info("Waiting for session status...");
                 return undefined; // Or handle loading state appropriately
            }

            toast.success("Task added successfully!");
            return newTaskId;

        } catch (error) {
            console.error("Error adding task:", error);
            toast.error(`Failed to add task: ${error instanceof Error ? error.message : String(error)}`);
            return undefined;
        }
    }


    const editTask = async (id: number, values: TaskFormValues, goalId?: number | null) => {
         if (status === 'loading') {
             toast.info("Waiting for session status...");
             return;
         }
        try {
            if (status === 'authenticated') {
                await editTaskForUser(id, values, goalId);
                 // If it's a goal task, trigger the goal update callback
                 if (goalId && onTaskInGoalUpdated) {
                     await onTaskInGoalUpdated();
                 } else {
                     // If it's a plan task, refresh the main task list
                     await refreshTasks();
                 }
            } else if (status === 'unauthenticated') {
                dispatch({
                    id,
                    goalId: goalId ?? undefined, // Pass undefined if null
                    values,
                    type: 'edited',
                });
                 // Reducer handles localForage update and state update for plan tasks
                 if (goalId && onTaskInGoalUpdated) {
                     await onTaskInGoalUpdated(); // Still call callback for consistency if needed by UI
                 }
            }
            toast.success("Task updated successfully!");
        } catch (error) {
            console.error("Error editing task:", error);
            toast.error(`Failed to update task: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    const deleteTask = async (taskId: number, goalId?: number) => {
         if (status === 'loading') {
             toast.info("Waiting for session status...");
             return;
         }
        try {
            if (status === 'authenticated') {
                await deleteTaskForUser(taskId); // Server action handles deletion
                 // If it was a goal task, trigger the goal update callback
                 if (goalId && onTaskInGoalUpdated) {
                     await onTaskInGoalUpdated();
                 } else {
                     // If it was a plan task, refresh the main task list
                     await refreshTasks();
                 }
            } else if (status === 'unauthenticated') {
                dispatch({
                    type: 'deleted',
                    id: taskId,
                    goalId,
                });
                 // Reducer handles localForage update and state update for plan tasks
                 if (goalId && onTaskInGoalUpdated) {
                     await onTaskInGoalUpdated(); // Still call callback for consistency
                 }
            }
             toast.success("Task deleted successfully!");
        } catch (error) {
            console.error("Error deleting task:", error);
            toast.error(`Failed to delete task: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

     // Function to toggle task focus
     const toggleTaskFocus = async (taskId: number, currentFocusState: boolean, goalId?: number) => {
         if (status === 'loading') {
             toast.info("Waiting for session status...");
             return;
         }
         const newFocusState = !currentFocusState;

         // --- Optimistic UI Update --- 
         // Dispatch differently based on whether it's a plan task or goal task
         if (goalId && optimisticGoalToggle) {
             optimisticGoalToggle(goalId, taskId, newFocusState);
         } else {
             dispatch({ type: 'TOGGLED_FOCUS', id: taskId, isInFocus: newFocusState });
         }

         try {
             if (status === 'authenticated') {
                 await toggleTaskFocusForUser(taskId, newFocusState);
                 // Server action revalidates path, no need to refreshTasks here
                 // Optional: Trigger goal callback if needed for UI updates within goal context
                 if (goalId && onTaskInGoalUpdated) {
                     await onTaskInGoalUpdated();
                 }
             } else if (status === 'unauthenticated') {
                 // Call local storage function (no need for reducer to call it again)
                 await toggleTaskFocusLocal(taskId, newFocusState);
                 // Optional: Trigger goal callback if needed
                 if (goalId && onTaskInGoalUpdated) {
                     await onTaskInGoalUpdated();
                 }
             }
             // Don't toast success here, let the component handle it if needed
             // toast.success(`Task ${newFocusState ? 'added to' : 'removed from'} focus.`);
         } catch (error) {
             console.error('Error toggling task focus:', error);
             toast.error(`Failed to update task focus: ${error instanceof Error ? error.message : String(error)}`);
             // --- Revert Optimistic Update on Error --- 
             // Revert differently based on whether it's a plan task or goal task
             if (goalId && optimisticGoalToggle) {
                 optimisticGoalToggle(goalId, taskId, currentFocusState); // Revert goal task state
             } else {
                 dispatch({ type: 'TOGGLED_FOCUS', id: taskId, isInFocus: currentFocusState }); // Revert plan task state
             }
             // Also revert local storage if unauthenticated and toggleTaskFocusLocal failed
             if (status === 'unauthenticated') {
                 try {
                    await toggleTaskFocusLocal(taskId, currentFocusState); // Attempt revert
                 } catch (revertError) {
                     console.error('Error reverting local task focus:', revertError);
                     toast.error('Failed to revert local focus state. Please refresh.');
                 }
             }
         }
     };

    // Function to update task completion status
    const updateTaskCompletion = async (taskId: number, completed: boolean, goalId?: number) => {
        if (status === 'loading') {
            toast.info("Waiting for session status...");
            return;
        }

        const originalTask = planTasks.find(t => t.id === taskId);
        const originalCompleted = originalTask?.completed ?? !completed; // Best guess for revert
        const originalCompletedAt = originalTask?.completedAt ?? null;

        // --- Optimistic UI Update (for unauthenticated) --- 
        if (status === 'unauthenticated') {
             if (!goalId) { // Only dispatch for plan tasks optimistically
                 dispatch({ 
                    type: 'COMPLETION_UPDATED', 
                    id: taskId, 
                    completed, 
                    completedAt: completed ? new Date() : null 
                });
             }
        }

        try {
            if (status === 'authenticated') {
                await updateTaskCompletionForUser(taskId, completed, completed ? new Date() : null);
                // Trigger appropriate refresh/callback
                if (goalId && onTaskInGoalUpdated) {
                    await onTaskInGoalUpdated();
                } else if (!goalId) {
                    await refreshTasks(); // Refresh plan tasks if a plan task was updated
                }
            } else if (status === 'unauthenticated') {
                // Perform local storage update
                await updateTaskCompletionLocal(taskId, completed); 
                // Trigger goal callback if needed (state update already happened optimistically for plan tasks)
                 if (goalId && onTaskInGoalUpdated) {
                     await onTaskInGoalUpdated();
                 }
            }
            // toast.success("Task completion updated!"); // Optional success message
        } catch (error) {
            console.error('Error updating task completion:', error);
            toast.error(`Failed to update task completion: ${error instanceof Error ? error.message : String(error)}`);
            
            // --- Revert Optimistic Update on Error (for unauthenticated plan tasks) --- 
            if (status === 'unauthenticated' && !goalId) {
                dispatch({ 
                    type: 'COMPLETION_UPDATED', 
                    id: taskId, 
                    completed: originalCompleted, // Revert to original state
                    completedAt: originalCompletedAt 
                });
                 // Attempt to revert local storage as well
                 try {
                    await updateTaskCompletionLocal(taskId, originalCompleted);
                 } catch (revertError) {
                     console.error('Error reverting local task completion:', revertError);
                     // Potentially notify user that local storage might be inconsistent
                 }
            }
            // Note: No state revert needed for authenticated, relies on refresh/revalidation
        }
    };

    return {
        planTasks, // Return directly
        addTask,
        editTask,
        deleteTask,
        toggleTaskFocus,
        updateTaskCompletion,
        refreshTasks,
        isInitialized,
        isLoading, // Return isLoading
    }
}
