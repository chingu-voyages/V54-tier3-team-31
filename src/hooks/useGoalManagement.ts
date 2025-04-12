'use client'

import { goalReducer } from "@/lib/reducers" // Corrected path
// Removed unused localforage functions: saveGoalsToLocal, removeGoalFromLocal, editGoalInLocal
import { getAllGoalsFromLocal } from "@/lib/localforage" // Corrected path
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
         // Generate temporary ID for optimistic update
         // Note: Reducer generates the ID, so we don't strictly need tempGoalId here for revert
         // unless the reducer doesn't handle revert well.
         // const tempGoalId = Date.now() + Math.floor(Math.random() * 1000);
         let newGoalServer: GoalWithTasks | undefined;

         // --- Optimistic UI Update --- (Reducer handles state and localForage)
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
            } else if (status === 'unauthenticated') {
                 // Reducer handles localForage update for 'added' type
                 // No explicit refresh needed here as reducer updates state
            } else {
                toast.info("Waiting for session status...");
                // --- Revert Optimistic Update --- (Rely on refresh as fallback)
                await refreshGoals();
                throw new Error("Session status is loading"); // Throw to prevent success toast
            }
            toast.success("Goal added successfully!");
            // Return server ID if available, otherwise rely on reducer's generated ID (which might be temp)
            return newGoalServer?.id; // Return only server ID if available
        } catch (error) {
            console.error("Error adding goal:", error);
            if (!(error instanceof Error && error.message === "Session status is loading")) {
                toast.error(`Failed to add goal: ${error instanceof Error ? error.message : String(error)}`);
            }
            // --- Revert Optimistic Update on Error --- (Rely on refresh)
            // Reverting 'added' via 'deleted' is complex if the temp ID isn't tracked.
            // Refreshing is a safer fallback for now.
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

         // --- Optimistic UI Update --- (Reducer handles state and localForage)
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
                // Reducer handles localForage update for 'edited' type
                // No explicit refresh needed here
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

    // Removed editBestTime as it's merged into editGoal

    const deleteGoal = async (id: number) => {
         if (status === 'loading') {
             toast.info("Waiting for session status...");
             return;
         }

         setIsMutating(true);
         const originalGoal = goals.find(g => g.id === id);

         // --- Optimistic UI Update --- (Reducer handles state and localForage)
         dispatch({
             id,
             type: 'deleted',
         });

        try {
            if (status === 'authenticated') {
                await deleteGoalForUser(id);
                await refreshGoals(); // Keep refresh on success
            } else if (status === 'unauthenticated') {
                // Reducer handles localForage update for 'deleted' type
                // No explicit refresh needed here
            } else {
                 toast.info("Waiting for session status...");
                 // --- Revert Optimistic Update --- (Rely on refresh as fallback)
                 // Reverting delete via 'added' is complex, refresh is safer
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
