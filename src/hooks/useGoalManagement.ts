'use client'

import { goalReducer } from "@/lib/reducers" // Corrected path
import { 
    getAllGoalsFromLocal, 
    saveGoalsToLocal, 
    removeGoalFromLocal, 
    editGoalInLocal 
} from "@/lib/localforage" // Import all necessary localforage functions
import { useReducer, useEffect, useCallback, useState } from "react";
import { useSession } from 'next-auth/react'; // Import useSession
import { GoalFormValues, GoalWithTasks } from "@/lib/types/types" // Corrected path
import {
    getGoalsForUser,
    addGoalForUser,
    editGoalForUser,
    deleteGoalForUser
} from '@/app/(protected)/app/actions/goals' // Corrected path
import { toast } from 'sonner';
import { usePathname } from "next/navigation";

export function useGoalManagement() {
    const [goals, dispatch] = useReducer(goalReducer, []);
    const { status } = useSession(); // Get session status, removed unused 'session'
    const [isInitialized, setIsInitialized] = useState(false);
    const [isInitialLoading, setIsInitialLoading] = useState(false);
    const [isMutating, setIsMutating] = useState(false);
    const pathname = usePathname();

    // Effect to persist goals to localForage whenever they change (for unauthenticated users)
    useEffect(() => {
        if (isInitialized && status === 'unauthenticated' && goals.length > 0) {
            console.log("Persisting goals to localForage:", goals);
            saveGoalsToLocal(goals).catch(error => {
                console.error("Error saving goals to localForage:", error);
            });
        }
    }, [goals, isInitialized, status]);

    const refreshGoals = useCallback(async () => {
        if (status === 'loading') return;

        // Only set initial loading if not initialized yet
        if (!isInitialized) {
            setIsInitialLoading(true);
        }

        try {
            let fetchedGoals: GoalWithTasks[] = [];
            if (status === 'authenticated') {
                console.log("Fetching goals for authenticated user...");
                fetchedGoals = await getGoalsForUser(); // Fetch goals with tasks
            } else if (status === 'unauthenticated') {
                console.log("Fetching goals from localForage...");
                fetchedGoals = await getAllGoalsFromLocal();
            }
             console.log("Dispatching initial goals:", fetchedGoals);
            dispatch({
                type: 'initial',
                goals: fetchedGoals
            });
             setIsInitialized(true); // Mark as initialized after first successful load
        } catch (error) {
            console.error("Error refreshing goals:", error);
            toast.error("Failed to load goals.");
             setIsInitialized(true); // Still mark as initialized even on error
        } finally {
             // Only stop initial loading indicator if it was started
            if (!isInitialized) {
                setIsInitialLoading(false);
            }
        }
    }, [status, isInitialized]); // Keep dependencies

    // Effect for initial load
    useEffect(() => {
         console.log("useGoalManagement initial load effect triggered. Status:", status);
         // Only refresh if status is determined and not initialized yet
         if (status !== 'loading' && !isInitialized) {
            refreshGoals();
         }
    }, [status, isInitialized, refreshGoals]); // Include all dependencies used

    // Effect for status changes *after* initial load
    useEffect(() => {
        if (isInitialized && status !== 'loading') {
            console.log("Auth status changed after init, refreshing goals. Status:", status);
            refreshGoals();
        }
    }, [status, isInitialized, refreshGoals]); // Include all dependencies used

    const addGoal = async (values: GoalFormValues) => {
         if (status === 'loading') {
             toast.info("Waiting for session status...");
             return;
         }

         setIsMutating(true);
         let newGoalServer: GoalWithTasks | undefined;
         let newGoalId: number | undefined;

         // --- Optimistic UI Update --- (Reducer handles state update)
         dispatch({
             type: 'added',
             values,
             isInFocus: pathname === "/focus"
         });

        try {
            if (status === 'authenticated') {
                newGoalServer = await addGoalForUser(values, pathname === "/focus");
                // Refresh from DB to get the real ID and confirm state
                await refreshGoals(); // Keep refresh on success
                newGoalId = newGoalServer?.id;
            } else if (status === 'unauthenticated') {
                // For unauthenticated users, we need to:
                // 1. Get the current updated state
                const currentGoals = await getAllGoalsFromLocal();
                
                // 2. Find the newly added goal (it should be the last one added)
                const newGoal = currentGoals.find(goal => 
                    goal.name === values.name && 
                    !goal.id.toString().includes('-') // Avoid picking up server IDs if any
                );
                
                if (newGoal) {
                    newGoalId = newGoal.id;
                    console.log("New goal added locally with ID:", newGoalId);
                    
                    // 3. Explicitly save the updated state to localForage
                    await saveGoalsToLocal(currentGoals);
                }
            } else {
                toast.info("Waiting for session status...");
                // --- Revert Optimistic Update --- (Rely on refresh as fallback)
                await refreshGoals();
                throw new Error("Session status is loading"); // Throw to prevent success toast
            }
            toast.success("Goal added successfully!");
            return newGoalId; // Return goal ID
        } catch (error) {
            console.error("Error adding goal:", error);
            if (!(error instanceof Error && error.message === "Session status is loading")) {
                toast.error(`Failed to add goal: ${error instanceof Error ? error.message : String(error)}`);
            }
            // --- Revert Optimistic Update on Error --- (Rely on refresh)
            await refreshGoals();
        } finally {
            setIsMutating(false);
        }
    }

    // Combined edit function for name and best time
    const editGoal = async (id: number, values: Partial<GoalFormValues>) => {
         if (status === 'loading') {
             toast.info("Waiting for session status...");
             return;
         }

         setIsMutating(true);
         const originalGoal = goals.find(g => g.id === id);
         // Construct original values for revert, handling partial updates
         const originalValues = originalGoal ? {
             name: originalGoal.name,
             bestTimeTitle: originalGoal.bestTimeTitle,
             bestTimeDescription: originalGoal.bestTimeDescription,
             // Add other fields if necessary
         } : values; // Fallback if original not found

         // --- Optimistic UI Update --- (Reducer handles state update)
         dispatch({
             type: 'edited',
             id,
             values: values as GoalFormValues // Cast might be needed depending on reducer
         });

        try {
            if (status === 'authenticated') {
                await editGoalForUser(id, values); // Server action updates fields passed in 'values'
                await refreshGoals(); // Keep refresh on success
            } else if (status === 'unauthenticated') {
                // For unauthenticated users, explicitly update in localForage
                await editGoalInLocal(id, values);
            } else {
                 toast.info("Waiting for session status...");
                 // --- Revert Optimistic Update --- (Dispatch original values)
                 if (originalGoal) {
                     dispatch({ type: 'edited', id, values: originalValues as GoalFormValues });
                 } else {
                     await refreshGoals(); // Refresh if no original data
                 }
                 throw new Error("Session status is loading");
            }
            toast.success("Goal updated successfully!");
        } catch (error) {
            console.error("Error editing goal:", error);
            if (!(error instanceof Error && error.message === "Session status is loading")) {
                toast.error(`Failed to update goal: ${error instanceof Error ? error.message : String(error)}`);
            }
            // --- Revert Optimistic Update on Error ---
            if (originalGoal) {
                dispatch({ type: 'edited', id, values: originalValues as GoalFormValues });
            } else {
                // If original goal wasn't found, refresh might be the only way to revert
                await refreshGoals();
            }
        } finally {
            setIsMutating(false);
        }
    }

    const deleteGoal = async (id: number) => {
         if (status === 'loading') {
             toast.info("Waiting for session status...");
             return;
         }

         setIsMutating(true);
         const originalGoal = goals.find(g => g.id === id);

         // --- Optimistic UI Update --- (Reducer handles state update)
         dispatch({
             id,
             type: 'deleted',
         });

        try {
            if (status === 'authenticated') {
                await deleteGoalForUser(id);
                await refreshGoals(); // Keep refresh on success
            } else if (status === 'unauthenticated') {
                // For unauthenticated users, explicitly delete from localForage
                await removeGoalFromLocal(id);
            } else {
                 toast.info("Waiting for session status...");
                 // --- Revert Optimistic Update --- (Rely on refresh as fallback)
                 await refreshGoals();
                 throw new Error("Session status is loading");
            }
            toast.success("Goal deleted successfully!");
        } catch (error) {
            console.error("Error deleting goal:", error);
            if (!(error instanceof Error && error.message === "Session status is loading")) {
                toast.error(`Failed to delete goal: ${error instanceof Error ? error.message : String(error)}`);
            }
            // --- Revert Optimistic Update on Error --- (Rely on refresh)
            await refreshGoals();
        } finally {
            setIsMutating(false);
        }
    }

    // Function to dispatch optimistic focus toggle for a task within a goal
    const optimisticToggleTaskFocusInGoal = (goalId: number, taskId: number, newFocusState: boolean) => {
        // This dispatch directly updates the goal's task state optimistically
        dispatch({
            type: 'TOGGLE_TASK_FOCUS_IN_GOAL',
            goalId,
            taskId,
            isInFocus: newFocusState
        });
        // The actual server call and revert logic happens in useTaskManagement.toggleTaskFocus
    };

    return {
        goals, // Return goals directly
        addGoal,
        editGoal,
        deleteGoal,
        refreshGoals,
        isInitialized,
        isInitialLoading,
        isMutating,
        optimisticToggleTaskFocusInGoal
    }
}
