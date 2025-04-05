'use client'

import { goalReducer } from "@/lib/reducers";
import { getAllGoalsFromLocal, editGoalInLocal } from "@/lib/localforage";
import { useReducer, useEffect  } from "react";
import { GoalFormValues } from "@/lib/types/types";

export function useGoalManagement(){ 
  const [goals, dispatch] = useReducer(goalReducer, []);

  useEffect(() => {
    const loadGoalsFromLocal = async () => {
        const localGoals = await getAllGoalsFromLocal();
        dispatch({
          type: 'initial',
          goals: localGoals
        })
    }
    loadGoalsFromLocal();
  }, []);


  const addGoal = (values: GoalFormValues) => {
    dispatch({
      type: 'added',
      values
    })
  }

  const editGoal = (id: number, newName: string) => {
    dispatch({
      type: 'edited',
      id,
      values: { name: newName } // Change to use 'values' property as per the type definition
    });
    
    // Also update in local storage
    editGoalInLocal(id, { name: newName });
  }

  const editBestTime = (id: number, updates: { bestTimeTitle?: string, bestTimeDescription?: string }) => {
    // Find the current goal to get its name
    const currentGoal = goals.find(goal => goal.id === id);
    if (!currentGoal) return;

    const updatesWithName = {
      ...updates,
      name: currentGoal.name  // Preserve the existing name
    };

    dispatch({
      type: 'edited',
      id,
      values: updatesWithName
    });
    
    // Also update in local storage
    editGoalInLocal(id, updatesWithName);
  }

  const deleteGoal = (id: number) => {
    dispatch({
      id,
      type: 'deleted',
    })
    
  }


  return {
    goals,
    addGoal,
    editGoal,
    editBestTime,
    deleteGoal
  }

  
}
