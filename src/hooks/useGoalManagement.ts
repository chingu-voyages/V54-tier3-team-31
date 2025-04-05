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
    deleteGoal
  }

  
}
