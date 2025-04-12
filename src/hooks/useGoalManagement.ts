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
             setIsInitialized(true);
        } catch (error) {
            console.error("Error refreshing goals:", error);
            toast.error("Failed to load goals.");
             setIsInitialized(true); // Mark as initialized even on error
        } finally {
            if (!isInitialized) {
                setIsInitialLoading(false);
            }
        }
    }, [status, isInitialized]);

    useEffect(() => {
         console.log("useGoalManagement useEffect triggered. Status:", status);
         // REMOVE the !isInitialized check to always refresh on mount/status change
         // if (!isInitialized) {
            refreshGoals();
         // }
    }, [status, refreshGoals]); // Remove isInitialized from dependencies

    const addGoal = async (values: GoalFormValues) => {
         if (status === 'loading') {
             toast.info("Waiting for session status...");
             return;
         }

         setIsMutating(true);
         // Generate temporary ID for optimistic update
         const tempGoalId = Date.now() + Math.floor(Math.random() * 1000);
         let newGoalServer: GoalWithTasks | undefined;

         // --- Optimistic UI Update ---
         dispatch({
             type: 'added',
             values,
             isInFocus: pathname === "/focus"
         });

        try {
            if (status === 'authenticated') {
                newGoalServer = await addGoalForUser(values, pathname === "/focus");
                 // Refresh from DB to get the real ID and confirm state
                 await refreshGoals();
                 // Optional: Update temp ID if needed, but refreshGoals handles it
                 // if (newGoalServer) {
                 //     dispatch({ type: 'UPDATE_TEMP_ID', tempId: tempGoalId, newId: newGoalServer.id });
                 // }
             } else if (status === 'unauthenticated') {
                 // Reducer handles localForage update for 'added' type
            } else {
                toast.info("Waiting for session status...");
                // --- Revert Optimistic Update ---
                dispatch({ type: 'deleted', id: tempGoalId });
                return;
            }
            toast.success("Goal added successfully!");
            return newGoalServer?.id ?? tempGoalId; // Return server ID or temp ID
        } catch (error) {
            console.error("Error adding goal:", error);
            toast.error(`Failed to add goal: ${error instanceof Error ? error.message : String(error)}`);
            // --- Revert Optimistic Update on Error ---
            dispatch({ type: 'deleted', id: tempGoalId });
            // If authenticated, refresh might be needed if revert dispatch fails
            if (status === 'authenticated') await refreshGoals();
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

         // --- Optimistic UI Update ---
         dispatch({
             type: 'edited',
             id,
             // Apply partial updates optimistically
             // Ensure reducer can handle partial GoalFormValues or merge internally
             values: values as GoalFormValues // Cast might be needed depending on reducer
         });

        try {
            if (status === 'authenticated') {
                await editGoalForUser(id, values); // Server action updates fields passed in 'values'
                await refreshGoals(); // Refresh from DB to confirm state
            } else if (status === 'unauthenticated') {
                // Reducer handles localForage update for 'edited' type
            } else {
                 toast.info("Waiting for session status...");
                 // --- Revert Optimistic Update ---
                 if (originalGoal) {
                     dispatch({ type: 'edited', id, values: originalValues as GoalFormValues });
                 } else {
                     await refreshGoals(); // Refresh if no original data
                 }
                 return;
            }
            toast.success("Goal updated successfully!");
        } catch (error) {
            console.error("Error editing goal:", error);
            toast.error(`Failed to update goal: ${error instanceof Error ? error.message : String(error)}`);
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

         // --- Optimistic UI Update ---
         dispatch({
             id,
             type: 'deleted',
         });

        try {
            if (status === 'authenticated') {
                await deleteGoalForUser(id);
                await refreshGoals(); // Refresh from DB to confirm deletion
            } else if (status === 'unauthenticated') {
                // Reducer handles localForage update for 'deleted' type
            } else {
                 toast.info("Waiting for session status...");
                 // --- Revert Optimistic Update ---
                 if (originalGoal) {
                     // Re-add using 'added' dispatch if reducer supports it
                     dispatch({
                         type: 'added',
                         values: { // Reconstruct GoalFormValues
                             name: originalGoal.name,
                             bestTimeTitle: originalGoal.bestTimeTitle ?? undefined,
                             bestTimeDescription: originalGoal.bestTimeDescription ?? undefined,
                         },
                         // Reducer handles isInFocus and generates ID/tasks
                         // isInFocus: originalGoal.isInFocus, // Not part of GoalFormValues
                     });
                 } else {
                     await refreshGoals(); // Refresh if no original data
                 }
                 return;
            }
            toast.success("Goal deleted successfully!");
        } catch (error) {
            console.error("Error deleting goal:", error);
            toast.error(`Failed to delete goal: ${error instanceof Error ? error.message : String(error)}`);
            // --- Revert Optimistic Update on Error ---
            if (originalGoal) {
                 // Re-add using 'added' dispatch
                 // Pass only GoalFormValues and let reducer handle the rest
                 dispatch({
                     type: 'added',
                     values: {
                         name: originalGoal.name,
                         bestTimeTitle: originalGoal.bestTimeTitle ?? undefined,
                         bestTimeDescription: originalGoal.bestTimeDescription ?? undefined,
                     },
                     // Reducer determines isInFocus based on pathname
                     // Reducer generates default tasks array
                 });
            } else {
                // If original goal wasn't found, refresh might be the only way to revert
                await refreshGoals();
            }
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
