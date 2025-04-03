import { saveTasksToLocal } from '@/lib/localforage'
import { Task as TaskSchema } from '@/lib/schema'
import { nanoid } from 'nanoid'


type State = TaskSchema[]

type TaskAction = {
  type: "deleted"
  id: number
} | { type: "submit", values: {
  duration: string;
  title: string;
  frequency: string;
} } | { type: "initial", planTasks: TaskSchema[] }



export function planTaskReducer(state: State, action: TaskAction ){ 
  switch (action.type) {

    case "initial": {
      return action.planTasks
    }
      
    case "deleted": {
      return state.filter(t => t.id !== action.id)
    }

    case "submit": {
        // Create a complete task object with all required properties
        // Date.now() provides a number based on milliseconds since epoch,
        // offering high practical uniqueness for client-side generation.
        const newTask: TaskSchema = {
          ...action.values,
          userId: nanoid(), // Keep nanoid for userId if it's suitable there
          id: Date.now(), // Use timestamp for a practically unique numeric ID
          difficulty: null,
          description: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          goalId: 0, // Default goal ID or appropriate value
          completed: false,
      } 
      const nextTask = [newTask, ...state];
      saveTasksToLocal(nextTask)
      return nextTask;
    }
    default:
      throw new Error("Unknown action");

  } 
  
}

