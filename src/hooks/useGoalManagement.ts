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
    const [isLoading, setIsLoading] = useState(false); // Add isLoading state
    const pathname = usePathname();

    const refreshGoals = useCallback(async () => {
        if (status === 'loading') return;
        setIsLoading(true); // Set loading true
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
            setIsLoading(false); // Set loading false in finally block
        }
    }, [status]);

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
        try {
            if (status === 'authenticated') {
                await addGoalForUser(values);
                 await refreshGoals(); // Refresh from DB
             } else if (status === 'unauthenticated') {
                 // Removed unused tempId generation
                 dispatch({
                     type: 'added',
                     values,
                     isInFocus: pathname === "/focus"
                    // goalId: tempId // Removed goalId as it's likely not expected by reducer
                });
                // Reducer handles localForage update
            }
            toast.success("Goal added successfully!");
        } catch (error) {
            console.error("Error adding goal:", error);
            toast.error(`Failed to add goal: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    // Combined edit function for name and best time
    const editGoal = async (id: number, values: Partial<GoalFormValues>) => {
         if (status === 'loading') {
             toast.info("Waiting for session status...");
             return;
         }
        try {
            if (status === 'authenticated') {
                await editGoalForUser(id, values); // Server action updates fields passed in 'values'
                await refreshGoals(); // Refresh from DB
            } else if (status === 'unauthenticated') {
                // Cast values to the expected type, assuming reducer handles partial updates internally
                // or requires a full object which might need fetching first (more complex)
                dispatch({
                    type: 'edited',
                    id,
                    values: values as GoalFormValues // Cast to expected type, might need adjustment based on reducer
                });
                // Reducer handles localForage update
            }
            toast.success("Goal updated successfully!");
        } catch (error) {
            console.error("Error editing goal:", error);
            toast.error(`Failed to update goal: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    // Removed editBestTime as it's merged into editGoal

    const deleteGoal = async (id: number) => {
         if (status === 'loading') {
             toast.info("Waiting for session status...");
             return;
         }
        try {
            if (status === 'authenticated') {
                await deleteGoalForUser(id);
                await refreshGoals(); // Refresh from DB
            } else if (status === 'unauthenticated') {
                dispatch({
                    id,
                    type: 'deleted',
                });
                // Reducer handles localForage update
            }
            toast.success("Goal deleted successfully!");
        } catch (error) {
            console.error("Error deleting goal:", error);
            toast.error(`Failed to delete goal: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    // Function to dispatch optimistic focus toggle for a task within a goal
    const optimisticToggleTaskFocusInGoal = (goalId: number, taskId: number, newFocusState: boolean) => {
        dispatch({
            type: 'TOGGLE_TASK_FOCUS_IN_GOAL',
            goalId,
            taskId,
            isInFocus: newFocusState
        });
    };

    return {
        goals, // Return goals directly
        addGoal,
        editGoal,
        deleteGoal,
        refreshGoals,
        isInitialized,
        isLoading, // Return isLoading
        optimisticToggleTaskFocusInGoal
    }
}
