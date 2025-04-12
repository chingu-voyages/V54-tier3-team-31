import { useCallback, useEffect, useReducer, useState } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { z } from 'zod';
import { toast } from 'sonner';

import { planTaskReducer } from '@/lib/reducers';
import {
    getAllPLanTasksFromLocal,
    saveTasksToLocal,
    removeTaskFromLocal,
    editTaskFromLocal,
    toggleTaskFocus as toggleTaskFocusLocal, // Renamed import
    updateTaskCompletion as updateTaskCompletionLocal,
} from '@/lib/localforage';
import { TaskFormValues } from '@/lib/types/types';
import { TaskFormSchema } from '@/lib/types/validations';
import { Task } from '@/lib/db/schema';
import {
    getTasksForUser,
    addTaskForUser,
    editTaskForUser,
    deleteTaskForUser,
    toggleTaskFocusForUser,
    updateTaskCompletionForUser,
} from '@/app/(protected)/app/actions/tasks';

// Define the type for the optional optimistic toggle function
type OptimisticGoalToggleFn = (goalId: number, taskId: number, newFocusState: boolean) => void;
// Define type for goal update callback
type OnTaskInGoalUpdatedFn = (actionType: 'added' | 'edited' | 'deleted' | 'completion' | 'focus', data?: any) => Promise<void>;

// Helper function to generate temporary numeric ID
function generateTempId(): number {
    return Date.now() + Math.floor(Math.random() * 1000);
}

export function useTaskManagement(
    onTaskInGoalUpdated?: OnTaskInGoalUpdatedFn, // Updated type
    optimisticGoalToggle?: OptimisticGoalToggleFn
    ) {
    const [planTasks, dispatch] = useReducer(planTaskReducer, [])
    const { data: session, status } = useSession();
    const pathname = usePathname()
    const [isInitialized, setIsInitialized] = useState(false);
    const [isInitialLoading, setIsInitialLoading] = useState(false);
    const [isMutating, setIsMutating] = useState(false);

    const refreshTasks = useCallback(async () => {
        if (status === 'loading') return;

        if (!isInitialized) {
            setIsInitialLoading(true);
        }

        try {
            let tasks: Task[] = [];
            if (status === 'authenticated') {
                tasks = await getTasksForUser();
            } else if (status === 'unauthenticated') {
                tasks = await getAllPLanTasksFromLocal();
            }
            const filteredTasks = tasks.filter(task => !task.goalId);
            dispatch({
                type: 'initial',
                planTasks: filteredTasks,
            });
            setIsInitialized(true);
        } catch (error) {
            console.error("Error refreshing tasks:", error);
            toast.error("Failed to load tasks.");
             setIsInitialized(true);
        } finally {
            if (!isInitialized) {
                 setIsInitialLoading(false);
            }
        }
    }, [status, isInitialized]);

    useEffect(() => {
         if (status !== 'loading' && !isInitialized) {
             refreshTasks();
         }
    }, [status, isInitialized, refreshTasks]);

    useEffect(() => {
        if (isInitialized && status !== 'loading') {
            refreshTasks();
        }
    }, [status, isInitialized, refreshTasks]);


    const addTask = async (values: z.infer<typeof TaskFormSchema>, goalId?: number) => {
        const isInFocus = pathname === '/focus';
        const tempTaskId = generateTempId();
        let newTaskServer: Task | undefined;

        setIsMutating(true);

        // --- Optimistic UI Update ---
        if (!goalId) {
            dispatch({
                type: 'added',
                values,
                goalId,
                taskId: tempTaskId,
                isInFocus,
            });
        } else if (onTaskInGoalUpdated) {
            // Optimistically signal goal update (reducer handles goal state)
            const optimisticTask: Task = { // Construct optimistic task data
                 ...values,
                 id: tempTaskId,
                 userId: 'temp', // Placeholder
                 difficulty: null,
                 description: null,
                 createdAt: new Date(),
                 updatedAt: new Date(),
                 goalId: goalId,
                 completed: false,
                 completedAt: null,
                 isInFocus: isInFocus,
             };
            await onTaskInGoalUpdated('added', { task: optimisticTask });
        }

        try {
            if (status === 'authenticated') {
                newTaskServer = await addTaskForUser(values, goalId, isInFocus);
                // Reconciliation: Refresh might be too broad. If goal task, signal update.
                if (goalId && onTaskInGoalUpdated) {
                    // Signal again with server data to ensure consistency
                    await onTaskInGoalUpdated('added', { task: newTaskServer });
                } else if (!goalId) {
                    // For plan tasks, refresh might be okay, or dispatch an 'edited' action
                    // to replace the temp task with the server one if IDs differ.
                    // Let's try refreshing for simplicity for now.
                    await refreshTasks();
                }
            } else if (status === 'unauthenticated') {
                // --- Persistence (Unauthenticated) ---
                const currentTasks = await getAllPLanTasksFromLocal();
                const newTaskLocal: Task = { // Create the full task object for local storage
                     ...values,
                     id: tempTaskId,
                     userId: 'localUser',
                     difficulty: null,
                     description: null,
                     createdAt: new Date(),
                     updatedAt: new Date(),
                     goalId: goalId ?? null,
                     completed: false,
                     completedAt: null,
                     isInFocus: isInFocus,
                 };
                if (!goalId) {
                    await saveTasksToLocal([newTaskLocal, ...currentTasks.filter(t => !t.goalId)]);
                } else {
                    // If task belongs to a goal, update the goal in localForage
                    // This requires a function like `addTaskToGoalLocal(goalId, newTaskLocal)`
                    // For now, assume `onTaskInGoalUpdated` triggers goal save in useGoalManagement
                    console.warn("Local persistence for adding task to goal needs implementation in useGoalManagement or localforage helper.");
                }
                newTaskServer = newTaskLocal; // Simulate server response
            } else {
                 toast.info("Waiting for session status...");
                 throw new Error("Session status is loading");
            }
            toast.success("Task added successfully!");
            return newTaskServer?.id ?? tempTaskId;
        } catch (error) {
            console.error("Error adding task:", error);
            if (!(error instanceof Error && error.message === "Session status is loading")) {
                toast.error(`Failed to add task: ${error instanceof Error ? error.message : String(error)}`);
            }
            // --- Revert Optimistic Update on Error ---
            if (!goalId) {
                 dispatch({ type: 'deleted', id: tempTaskId, goalId });
            } else if (goalId && onTaskInGoalUpdated) {
                 // Signal goal to remove the optimistic task
                 await onTaskInGoalUpdated('deleted', { taskId: tempTaskId });
            }
            return undefined;
        } finally {
            setIsMutating(false);
        }
    }

    const editTask = async (id: number, values: Partial<TaskFormValues>, goalId?: number | null) => {
        if (status === 'loading') return;
        setIsMutating(true);

        let originalTask: Task | undefined | null = null;
        let originalValuesForRevert: Partial<TaskFormValues> = values; // Default to current values

        // --- Find Original Task for Revert ---
        // Need to find original in planTasks OR within goals state (complex)
        // For simplicity, we'll focus on reverting planTasks for now.
        if (!goalId) {
            originalTask = planTasks.find(task => task.id === id);
            if (originalTask) {
                originalValuesForRevert = {
                    title: originalTask.title,
                    frequency: originalTask.frequency ?? 'Once', // Provide default if null
                    duration: originalTask.duration ?? '5 mins', // Provide default if null
                    // Include other relevant fields if needed
                };
            }
        }

        // --- Optimistic UI Update ---
        if (!goalId) {
            dispatch({ id, goalId: undefined, values, type: 'edited' });
        } else if (goalId && onTaskInGoalUpdated) {
            await onTaskInGoalUpdated('edited', { taskId: id, values });
        }

        try {
            if (status === 'authenticated') {
                await editTaskForUser(id, values, goalId ?? undefined);
                // Reconciliation: Signal goal update if needed
                if (goalId && onTaskInGoalUpdated) {
                    await onTaskInGoalUpdated('edited', { taskId: id, values }); // Signal again to confirm
                } else if (!goalId) {
                    // Optionally refresh plan tasks if needed, but optimistic should suffice
                    // await refreshTasks();
                }
            } else if (status === 'unauthenticated') {
                // --- Persistence (Unauthenticated) ---
                if (!goalId) {
                    // Ensure values passed match the expected type, even if partial
                    // Assuming editTaskFromLocal handles partial updates correctly despite type hint
                    await editTaskFromLocal({ taskId: id, values: values as TaskFormValues }); // Use type assertion
                } else {
                    // Update task within goal in localForage
                    // Requires function like `editTaskInGoalLocal(goalId, taskId, values)`
                    console.warn("Local persistence for editing task in goal needs implementation.");
                }
            } else {
                 throw new Error("Session status is loading");
            }
            toast.success("Task updated successfully!");
        } catch (error) {
            console.error("Error editing task:", error);
            if (!(error instanceof Error && error.message === "Session status is loading")) {
                toast.error(`Failed to update task: ${error instanceof Error ? error.message : String(error)}`);
            }
            // --- Revert Optimistic Update on Error ---
            if (!goalId && originalTask) {
                dispatch({ id, goalId: undefined, values: originalValuesForRevert, type: 'edited' });
            } else if (goalId && onTaskInGoalUpdated) {
                // Signal goal to revert the edit (might need original values)
                // This is complex, refresh might be easier for now
                await onTaskInGoalUpdated('edited', { taskId: id, values: {} }); // Signal refresh
            }
        } finally {
            setIsMutating(false);
        }
    }

    const deleteTask = async (taskId: number, goalId?: number) => {
        if (status === 'loading') return;
        setIsMutating(true);

        // Find original task for potential revert (mainly for plan tasks)
        const originalTask = !goalId ? planTasks.find(task => task.id === taskId) : null;

        // --- Optimistic UI Update ---
        if (!goalId) {
            dispatch({ type: 'deleted', id: taskId, goalId });
        } else if (goalId && onTaskInGoalUpdated) {
            await onTaskInGoalUpdated('deleted', { taskId });
        }

        try {
            if (status === 'authenticated') {
                await deleteTaskForUser(taskId);
                // Reconciliation: Signal goal update if needed
                if (goalId && onTaskInGoalUpdated) {
                    await onTaskInGoalUpdated('deleted', { taskId }); // Confirm deletion
                }
            } else if (status === 'unauthenticated') {
                // --- Persistence (Unauthenticated) ---
                if (!goalId) {
                    await removeTaskFromLocal({ taskId });
                } else {
                    // Remove task from goal in localForage
                    // Requires function like `removeTaskFromGoalLocal(goalId, taskId)`
                    console.warn("Local persistence for deleting task from goal needs implementation.");
                }
            } else {
                 throw new Error("Session status is loading");
            }
            toast.success("Task deleted successfully!");
        } catch (error) {
            console.error("Error deleting task:", error);
            if (!(error instanceof Error && error.message === "Session status is loading")) {
                toast.error(`Failed to delete task: ${error instanceof Error ? error.message : String(error)}`);
            }
            // --- Revert Optimistic Update on Error ---
            if (!goalId && originalTask) {
                 // Re-add the task optimistically
                 dispatch({
                     type: 'added',
                     values: { // Reconstruct TaskFormValues, providing defaults for null
                         title: originalTask.title,
                         frequency: originalTask.frequency ?? 'Once', // Provide default if null
                         duration: originalTask.duration ?? '5 mins', // Provide default if null
                     },
                     goalId: undefined,
                     taskId: originalTask.id, // Use original ID
                     isInFocus: originalTask.isInFocus ?? false,
                 });
            } else if (goalId && onTaskInGoalUpdated) {
                // Signal goal to re-add or refresh
                await onTaskInGoalUpdated('added', { task: {} }); // Signal refresh
            }
        } finally {
            setIsMutating(false);
        }
    }

     const toggleTaskFocus = async (taskId: number, currentFocusState: boolean, goalId?: number) => {
         if (status === 'loading') return;
         const newFocusState = !currentFocusState;
         setIsMutating(true);

         // --- Optimistic UI Update ---
         if (goalId && optimisticGoalToggle) {
             optimisticGoalToggle(goalId, taskId, newFocusState);
         } else if (!goalId) {
             dispatch({ type: 'TOGGLED_FOCUS', id: taskId, isInFocus: newFocusState });
         }

         try {
             if (status === 'authenticated') {
                 await toggleTaskFocusForUser(taskId, newFocusState);
                 // Reconciliation: Signal goal update if needed
                 if (goalId && onTaskInGoalUpdated) {
                     await onTaskInGoalUpdated('focus', { taskId, isInFocus: newFocusState });
                 }
             } else if (status === 'unauthenticated') {
                 // --- Persistence (Unauthenticated) ---
                 // Use the renamed imported function and remove goalId
                 await toggleTaskFocusLocal(taskId, newFocusState);
             } else {
                 throw new Error("Session status is loading");
             }
         } catch (error) {
             console.error("Error toggling task focus:", error);
             if (!(error instanceof Error && error.message === "Session status is loading")) {
                 toast.error(`Failed to toggle task focus: ${error instanceof Error ? error.message : String(error)}`);
             }
             // --- Revert Optimistic Update on Error ---
             if (goalId && optimisticGoalToggle) {
                 optimisticGoalToggle(goalId, taskId, currentFocusState);
             } else if (!goalId) {
                 dispatch({ type: 'TOGGLED_FOCUS', id: taskId, isInFocus: currentFocusState });
             }
         } finally {
             setIsMutating(false);
         }
     };

    const updateTaskCompletion = async (taskId: number, completed: boolean, goalId?: number) => {
        if (status === 'loading') return;
        setIsMutating(true);

        const originalTask = !goalId ? planTasks.find(t => t.id === taskId) : undefined;
        const originalCompleted = originalTask?.completed ?? !completed;
        const originalCompletedAt = originalTask?.completedAt ?? null;
        const newCompletedAt = completed ? new Date() : null;

        // --- Optimistic UI Update ---
        if (!goalId) {
            dispatch({
                type: 'COMPLETION_UPDATED',
                id: taskId,
                completed,
                completedAt: newCompletedAt,
            });
        } else if (goalId && onTaskInGoalUpdated) {
            await onTaskInGoalUpdated('completion', { taskId, completed, completedAt: newCompletedAt });
        }

        try {
            if (status === 'authenticated') {
                await updateTaskCompletionForUser(taskId, completed, newCompletedAt);
                 if (goalId && onTaskInGoalUpdated) {
                     await onTaskInGoalUpdated('completion', { taskId, completed, completedAt: newCompletedAt }); // Confirm
                 }
            } else if (status === 'unauthenticated') {
                // --- Persistence (Unauthenticated) ---
                // Pass goalId as the third argument, not newCompletedAt
                await updateTaskCompletionLocal(taskId, completed, goalId);
            } else {
                 throw new Error("Session status is loading");
            }
        } catch (error) {
            console.error("Error updating task completion:", error);
             if (!(error instanceof Error && error.message === "Session status is loading")) {
                 toast.error(`Failed to update task completion: ${error instanceof Error ? error.message : String(error)}`);
             }
             // --- Revert Optimistic Update on Error ---
             if (!goalId) {
                 dispatch({
                     type: 'COMPLETION_UPDATED',
                     id: taskId,
                     completed: originalCompleted,
                     completedAt: originalCompletedAt,
                 });
             } else if (goalId && onTaskInGoalUpdated) {
                 await onTaskInGoalUpdated('completion', { taskId, completed: originalCompleted, completedAt: originalCompletedAt }); // Revert
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
