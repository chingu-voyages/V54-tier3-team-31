'use client'

import { goalReducer } from "@/lib/reducers";
import { getAllGoalsFromLocal } from "@/lib/localforage";
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

  const editGoal = () => {
    
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
