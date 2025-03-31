import { TaskFormValues } from '@/lib/types/types'
import {
    saveTasksToLocal,
    removeTaskFromLocal,
    editTaskFromLocal,
} from '@/lib/localforage'
import { Task as TaskSchema } from '@/lib/schema'
import { nanoid } from 'nanoid'

type State = TaskSchema[]

type TaskAction =
    | {
          type: 'deleted'
          id: number
      }
    | { type: 'added'; values: TaskFormValues }
    | { type: 'initial'; planTasks: TaskSchema[] }
    | { type: 'edited'; values: TaskFormValues; id: number }

export function planTaskReducer(state: State, action: TaskAction) {
    switch (action.type) {
        case 'initial': {
            return action.planTasks
        }

        case 'deleted': {
            removeTaskFromLocal(action.id)
            return state.filter((t) => t.id !== action.id)
        }

        case 'added': {
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
            const nextTask = [newTask, ...state]
            saveTasksToLocal(nextTask)
            return nextTask
        }
        case 'edited': {
            editTaskFromLocal(action.id, action.values)
            return state.map((t) => {
                if (t.id === action.id) {
                    return {
                        ...t,
                        ...action.values,
                    }
                }
                return t
            })
        }
        default:
            throw new Error('Unknown action')
    }
}
