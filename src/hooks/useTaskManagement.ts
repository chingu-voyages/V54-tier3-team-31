import { useEffect, useReducer, useCallback, useState } from 'react';
import { useSession } from 'next-auth/react';
import { TaskFormValues } from '@/lib/types/types';
import { planTaskReducer } from '@/lib/reducers';
import { getAllPLanTasksFromLocal, updateTaskCompletion as updateTaskCompletionLocal, toggleTaskFocus as toggleTaskFocusLocal } from '@/lib/localforage';
import { z } from 'zod';
import { TaskFormSchema } from '@/lib/types/validations';
import { usePathname } from 'next/navigation';
import { Task } from '@/lib/db/schema';
import {
    getTasksForUser,
    addTaskForUser,
    editTaskForUser,
    deleteTaskForUser,
    updateTaskCompletionForUser,
    toggleTaskFocusForUser
} from '@/app/(protected)/app/actions/tasks';
import { addTaskToGoalForUser } from '@/app/(protected)/app/actions/goals';
import { toast } from 'sonner';

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
    const [isInitialLoading, setIsInitialLoading] = useState(false);
    const [isMutating, setIsMutating] = useState(false);

    const refreshTasks = useCallback(async () => {
        if (status === 'loading') return; // Don't do anything while loading

        if (!isInitialized) {
            setIsInitialLoading(true);
        }

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
            if (!isInitialized) {
                setIsInitialLoading(false);
            }
        }
    }, [status, isInitialized]); // Added isInitialized as dependency

    useEffect(() => {
        console.log("useTaskManagement useEffect triggered. Status:", status);
        refreshTasks();
    }, [status, refreshTasks]); // Remove isInitialized from dependencies

    const addTask = async (values: z.infer<typeof TaskFormSchema>, goalId?: number) => {
        const isInFocus = pathname === '/focus';
        // Generate a temporary ID for optimistic update regardless of auth status
        const tempTaskId = Date.now() + Math.floor(Math.random() * 1000);
        let newTaskServer: Task | undefined; // To store the result from server

        setIsMutating(true);

        // --- Optimistic UI Update ---
        // Dispatch 'added' immediately for both authenticated and unauthenticated
        // For authenticated, this adds the task temporarily until server confirms/fails
        // Only dispatch for plan tasks optimistically here
        if (!goalId) {
            dispatch({
                type: 'added',
                values,
                goalId, // Will be undefined here
                taskId: tempTaskId, // Use temporary ID
                isInFocus,
            });
        } else if (onTaskInGoalUpdated) {
            // If it's a goal task, trigger the goal update callback optimistically
            // We might need a way to pass the temp task to the goal update
            // For now, just trigger the refresh/update mechanism
             await onTaskInGoalUpdated(); // Consider if this needs adjustment for optimistic temp task
        }


        try {
            if (status === 'authenticated') {
                if (goalId) {
                    // Use the specific server action for adding tasks to goals
                    newTaskServer = await addTaskToGoalForUser(values, goalId, isInFocus);
                    // Trigger the goal update callback again after server confirmation
                    // This ensures the goal list has the final task data (with real ID)
                    if (onTaskInGoalUpdated) {
                        await onTaskInGoalUpdated();
                    }
                } else {
                    // Add as a plan task (no goalId) using the task action
                    newTaskServer = await addTaskForUser(values, undefined, isInFocus);
                    // Refresh the main task list to get the final task data
                    // We need to update the temp ID with the real one
                    // Refresh tasks to get the updated data with real ID instead of using non-existent action type
                    await refreshTasks();
                }

            } else if (status === 'unauthenticated') {
                // LocalForage update is handled by the reducer for 'added' type if it's a plan task
                // If it's a goal task, the reducer might ignore it, handle localForage update separately if needed
                 if (goalId && onTaskInGoalUpdated) {
                     // Callback was already called optimistically
                 } else if (!goalId) {
                     // Dispatch for unauth plan task (already done above)
                     // Ensure reducer handles localForage
                     dispatch({
                         type: 'added',
                         values,
                         goalId,
                         taskId: tempTaskId,
                         isInFocus,
                     });
                 }
            } else {
                 toast.info("Waiting for session status...");
                 // --- Revert Optimistic Update ---
                 if (!goalId) { // Only revert plan tasks
                    dispatch({ type: 'deleted', id: tempTaskId, goalId });
                 } else if (goalId && onTaskInGoalUpdated) {
                    await onTaskInGoalUpdated(); // Re-sync goal state
                 }
                 return undefined;
            }

            toast.success("Task added successfully!");
            // Return the server ID if available, otherwise the temp ID
            return newTaskServer?.id ?? tempTaskId;

        } catch (error) {
            console.error("Error adding task:", error);
            toast.error(`Failed to add task: ${error instanceof Error ? error.message : String(error)}`);

            // --- Revert Optimistic Update on Error ---
            if (!goalId) { // Only revert plan tasks
                dispatch({ type: 'deleted', id: tempTaskId, goalId });
            } else if (goalId && onTaskInGoalUpdated) {
                 // Re-trigger goal update to remove the optimistically added task
                 await onTaskInGoalUpdated();
            }
             // Note: For unauthenticated, the reducer should handle removing from localForage on 'deleted'

            return undefined;
        } finally {
            setIsMutating(false);
        }
    }


    const editTask = async (id: number, values: TaskFormValues, goalId?: number | null) => {
         if (status === 'loading') {
             toast.info("Waiting for session status...");
             return;
         }

         setIsMutating(true);
         let originalTask: Task | undefined;

         // Find the original task state for potential revert
         if (goalId) {
            // Need a way to get the original task from the goal context/state if possible
            // For now, assume we might not have it readily available here for goals
         } else {
             originalTask = planTasks.find(task => task.id === id);
         }
         // Fallback to current values if original not found or not applicable
         const originalValues = originalTask ? {
             title: originalTask.title,
             frequency: originalTask.frequency,
             duration: originalTask.duration,
             // include other relevant fields if needed
         } : values;


         // --- Optimistic UI Update ---
         if (!goalId) { // Only dispatch for plan tasks optimistically
             dispatch({
                 id,
                 goalId: goalId ?? undefined,
                 values,
                 type: 'edited',
             });
         } else if (goalId && onTaskInGoalUpdated) {
             // If it's a goal task, trigger the goal update callback optimistically
             await onTaskInGoalUpdated(); // Needs to reflect the optimistic edit
         }


        try {
            if (status === 'authenticated') {
                await editTaskForUser(id, values, goalId);
                 // If it's a goal task, trigger the goal update callback again after server confirmation
                 if (goalId && onTaskInGoalUpdated) {
                     await onTaskInGoalUpdated();
                 } else {
                     // If it's a plan task, refresh the main task list after server confirmation
                     await refreshTasks(); // Or rely on revalidation
                 }
            } else if (status === 'unauthenticated') {
                // Reducer handles localForage update for 'edited' type (if dispatched)
                // If goal task, handle localForage update separately if needed
                 if (goalId && onTaskInGoalUpdated) {
                     // Callback was already called optimistically
                     // Ensure localForage update happens if reducer doesn't handle goal tasks
                     dispatch({ // Dispatch even for unauth goal task if reducer handles localForage
                         id,
                         goalId: goalId ?? undefined,
                         values,
                         type: 'edited',
                     });
                 } else if (!goalId) {
                     // Dispatch for unauth plan task (already done above)
                     dispatch({
                         id,
                         goalId: goalId ?? undefined,
                         values,
                         type: 'edited',
                     });
                 }
            }
            toast.success("Task updated successfully!");
        } catch (error) {
            console.error("Error editing task:", error);
            toast.error(`Failed to update task: ${error instanceof Error ? error.message : String(error)}`);

             // --- Revert Optimistic Update on Error ---
             if (!goalId && originalTask) { // Only revert plan tasks with original data
                 dispatch({
                     id,
                     goalId: goalId ?? undefined,
                     values: originalValues as TaskFormValues, // Revert to original values
                     type: 'edited',
                 });
             } else if (goalId && onTaskInGoalUpdated) {
                 await onTaskInGoalUpdated(); // Re-sync goal state
             } else if (!goalId) {
                 // If no original task data, refresh might be needed
                 await refreshTasks();
             }
             // Note: For unauthenticated, reducer should handle reverting in localForage if 'edited' is called again
        } finally {
            setIsMutating(false);
        }
    }

    const deleteTask = async (taskId: number, goalId?: number) => {
         if (status === 'loading') {
             toast.info("Waiting for session status...");
             return;
         }

         setIsMutating(true);
         let originalTask: Task | undefined | null = null;

         // Find the original task state for potential revert
         if (goalId) {
             // Need a way to get the original task from the goal context/state
             // This might involve finding the goal first, then the task
         } else {
             originalTask = planTasks.find(task => task.id === taskId);
         }

         // --- Optimistic UI Update ---
         if (!goalId) { // Only dispatch for plan tasks optimistically
             dispatch({
                 type: 'deleted',
                 id: taskId,
                 goalId,
             });
         } else if (goalId && onTaskInGoalUpdated) {
             // If it was a goal task, trigger the goal update callback optimistically
             await onTaskInGoalUpdated(); // Needs to reflect the optimistic delete
         }

        try {
            if (status === 'authenticated') {
                await deleteTaskForUser(taskId); // Server action handles deletion
                 // If it was a goal task, trigger the goal update callback again after server confirmation
                 if (goalId && onTaskInGoalUpdated) {
                     await onTaskInGoalUpdated();
                 } else {
                     // If it was a plan task, refresh the main task list after server confirmation
                     await refreshTasks(); // Or rely on revalidation
                 }
            } else if (status === 'unauthenticated') {
                // Reducer handles localForage update for 'deleted' type (if dispatched)
                 if (goalId && onTaskInGoalUpdated) {
                     // Callback was already called optimistically
                     // Ensure localForage update happens if reducer doesn't handle goal tasks
                     dispatch({ // Dispatch even for unauth goal task if reducer handles localForage
                         type: 'deleted',
                         id: taskId,
                         goalId,
                     });
                 } else if (!goalId) {
                     // Dispatch for unauth plan task (already done above)
                     dispatch({
                         type: 'deleted',
                         id: taskId,
                         goalId,
                     });
                 }
            }
             toast.success("Task deleted successfully!");
        } catch (error) {
            console.error("Error deleting task:", error);
            toast.error(`Failed to delete task: ${error instanceof Error ? error.message : String(error)}`);

             // --- Revert Optimistic Update on Error ---
             if (!goalId && originalTask) { // Only revert plan tasks with original data
                 // Re-add the task using an 'added' dispatch if we have the original data
                 dispatch({
                     type: 'added',
                     values: { // Reconstruct TaskFormValues
                         title: originalTask.title,
                         // Provide default values if original frequency/duration is null
                         frequency: originalTask.frequency ?? 'Once',
                         duration: originalTask.duration ?? '5 mins',
                         // description and difficulty are not part of TaskFormValues
                     },
                     goalId: originalTask.goalId ?? undefined,
                     taskId: originalTask.id, // Use original ID
                     isInFocus: originalTask.isInFocus ?? false,
                     // Pass original completion status if needed by reducer's 'added' action
                     // completed: originalTask.completed,
                     // completedAt: originalTask.completedAt,
                 });
             } else if (goalId && onTaskInGoalUpdated) {
                 // If we couldn't get the original task for a goal, refresh
                 await onTaskInGoalUpdated();
             } else if (!goalId) {
                 // If no original task data for plan task, refresh
                 await refreshTasks();
             }

             // Optional: If reverting an unauthenticated delete, ensure localForage is updated
             // This might require the reducer's 'added' action to also handle localForage addition.
        } finally {
            setIsMutating(false);
        }
    }

     // Function to toggle task focus (already mostly optimistic)
     const toggleTaskFocus = async (taskId: number, currentFocusState: boolean, goalId?: number) => {
         if (status === 'loading') {
             toast.info("Waiting for session status...");
             return;
         }
         const newFocusState = !currentFocusState;

         setIsMutating(true);

         // --- Optimistic UI Update --- (Moved before try block)
         if (goalId && optimisticGoalToggle) {
             optimisticGoalToggle(goalId, taskId, newFocusState);
         } else {
             // Dispatch for plan tasks or if goal toggle function isn't provided
             dispatch({ type: 'TOGGLED_FOCUS', id: taskId, isInFocus: newFocusState });
         }

         try {
             if (status === 'authenticated') {
                 await toggleTaskFocusForUser(taskId, newFocusState);
                 // Server action revalidates path, potentially making refresh/callback redundant
                 // but call them for consistency if needed by specific UI parts.
                 if (goalId && onTaskInGoalUpdated) {
                     await onTaskInGoalUpdated();
                 }
                 // No explicit refreshTasks needed if revalidation works for plan tasks
             } else if (status === 'unauthenticated') {
                 // Call local storage function
                 await toggleTaskFocusLocal(taskId, newFocusState);
                 // Trigger goal callback if needed
                 if (goalId && onTaskInGoalUpdated) {
                     await onTaskInGoalUpdated(); // Ensure goal state reflects change
                 }
                 // Ensure plan task state reflects change if reducer didn't handle TOGGLED_FOCUS for local
                 if (!goalId) {
                     // Dispatch might be redundant if localForage call succeeded and state was updated optimistically
                     // dispatch({ type: 'TOGGLED_FOCUS', id: taskId, isInFocus: newFocusState });
                 }
             }
             // Success toast can be handled by the component triggering the action
         } catch (error) {
             console.error('Error toggling task focus:', error);
             toast.error(`Failed to update task focus: ${error instanceof Error ? error.message : String(error)}`);

             // --- Revert Optimistic Update on Error ---
             if (goalId && optimisticGoalToggle) {
                 optimisticGoalToggle(goalId, taskId, currentFocusState); // Revert goal task state
             } else {
                 dispatch({ type: 'TOGGLED_FOCUS', id: taskId, isInFocus: currentFocusState }); // Revert plan task state
             }
             // Also revert local storage if unauthenticated
             if (status === 'unauthenticated') {
                 try {
                    await toggleTaskFocusLocal(taskId, currentFocusState); // Attempt revert
                 } catch (revertError) {
                     console.error('Error reverting local task focus:', revertError);
                     toast.error('Failed to revert local focus state. Please refresh.');
                 }
             }
         } finally {
             setIsMutating(false);
         }
     };

    // Function to update task completion status
    const updateTaskCompletion = async (taskId: number, completed: boolean, goalId?: number) => {
        if (status === 'loading') {
            toast.info("Waiting for session status...");
            return;
        }

        setIsMutating(true);

        // Find original task state for revert
        const originalTask = planTasks.find(t => t.id === taskId) ?? // Check plan tasks first
                             // TODO: Need a way to find task in goals state if goalId is provided
                             undefined;
        const originalCompleted = originalTask?.completed ?? !completed; // Best guess for revert
        const originalCompletedAt = originalTask?.completedAt ?? null;
        const newCompletedAt = completed ? new Date() : null;

        // --- Optimistic UI Update ---
        // Dispatch optimistically for both authenticated and unauthenticated plan tasks
        if (!goalId) {
            dispatch({
                type: 'COMPLETION_UPDATED',
                id: taskId,
                completed,
                completedAt: newCompletedAt
            });
        } else {
            // TODO: Need optimistic update mechanism for tasks within goals
            // This might involve calling a function passed down from useGoalManagement
            // or having useGoalManagement handle this directly.
            // For now, goal task completion might not be visually optimistic for authenticated users.
            if (onTaskInGoalUpdated) {
                 // Trigger goal update optimistically, assuming the goal component handles the visual change
                 await onTaskInGoalUpdated();
            }
        }


        try {
            if (status === 'authenticated') {
                await updateTaskCompletionForUser(taskId, completed, newCompletedAt);
                // Trigger appropriate refresh/callback after server confirmation
                if (goalId && onTaskInGoalUpdated) {
                    await onTaskInGoalUpdated();
                } else if (!goalId) {
                    // Refresh plan tasks if a plan task was updated (or rely on revalidation)
                    await refreshTasks();
                }
            } else if (status === 'unauthenticated') {
                // Perform local storage update
                await updateTaskCompletionLocal(taskId, completed, goalId); // Pass goalId
                // Trigger goal callback if needed (state update already happened optimistically for plan tasks)
                 if (goalId && onTaskInGoalUpdated) {
                     // Callback might have been called optimistically already,
                     // but call again ensures consistency after localForage update.
                     await onTaskInGoalUpdated();
                 } else if (!goalId) {
                     // Ensure plan task state reflects change if reducer didn't handle COMPLETION_UPDATED for local
                     // Dispatch might be redundant if localForage call succeeded and state was updated optimistically
                     // dispatch({ type: 'COMPLETION_UPDATED', id: taskId, completed, completedAt: newCompletedAt });
                 }
            }
            // toast.success("Task completion updated!"); // Optional success message
        } catch (error) {
            console.error('Error updating task completion:', error);
            toast.error(`Failed to update task completion: ${error instanceof Error ? error.message : String(error)}`);

            // --- Revert Optimistic Update on Error ---
            if (!goalId && originalTask) { // Only revert plan tasks dispatched optimistically with original data
                dispatch({
                    type: 'COMPLETION_UPDATED',
                    id: taskId,
                    completed: originalCompleted, // Revert to original state
                    completedAt: originalCompletedAt
                });
            } else if (goalId && onTaskInGoalUpdated) {
                 // TODO: Revert optimistic update for goal tasks if implemented
                 await onTaskInGoalUpdated(); // Refresh goal state to revert visual change
            } else if (!goalId) {
                // If no original data for plan task, refresh
                await refreshTasks();
            }

            // Attempt to revert local storage as well for unauthenticated
            if (status === 'unauthenticated') {
                 try {
                    await updateTaskCompletionLocal(taskId, originalCompleted, goalId);
                 } catch (revertError) {
                     console.error('Error reverting local task completion:', revertError);
                 }
            }
        } finally {
            setIsMutating(false);
        }
    };

    return {
        planTasks,
        addTask,
        editTask,
        deleteTask,
        toggleTaskFocus,
        updateTaskCompletion,
        refreshTasks,
        isInitialized,
        isInitialLoading,
        isMutating,
    }
}
