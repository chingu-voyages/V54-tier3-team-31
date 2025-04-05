import {
    saveTasksToLocal,
    removeTaskFromLocal,
    editTaskFromLocal,
    saveGoalsToLocal,
    removeGoalFromLocal,
} from '@/lib/localforage'
import { Task as TaskSchema } from '@/lib/schema'
import { nanoid } from 'nanoid'
import {
    GoalAction,
    GoalState,
    TaskState,
    GoalWithTasks,
} from '@/lib/types/types'
import { TaskAction } from '@/lib/types/types'

export function planTaskReducer(state: TaskState, action: TaskAction) {
    switch (action.type) {
        case 'initial': {
            return [...state, ...action.planTasks]
        }

        case 'deleted': {
            removeTaskFromLocal({ taskId: action.id})
            return state.filter((t) => t.id !== action.id)
        }

        case 'added': {
            // Create a complete task object with all required properties
            const newTask: TaskSchema = {
                ...action.values,
                userId: nanoid(), // Keep nanoid for userId if it's suitable there
                id: Date.now(), // Use timestamp for a practically unique numeric ID
                difficulty: null,
                description: null,
                createdAt: new Date(),
                updatedAt: new Date(),
                goalId: action.goalId || null, // Use provided goalId or null
                completed: false,
            }
            
            // If this task belongs to a goal, don't add it to the main tasks array
            if (action.goalId) {
                // IMPORTANT: We're removing this code to prevent duplicate task creation
                // Goal tasks are now handled by the useTaskGoalContext directly
                // and don't need to be saved again here
                
                // Return state unchanged since the task shouldn't be in the main tasks array
                return state;
            } else {
                // This is a regular task, add it to the main tasks array
                const nextTask = [newTask, ...state];
                saveTasksToLocal(nextTask);
                return nextTask;
            }
        }
        case 'edited': {
            // First, update the task in localForage
            editTaskFromLocal({
                taskId: action.id, 
                values: action.values, 
                goalId: action.goalId
            })
            
            // If the task has a goalId, it means it belongs to a goal and shouldn't be in the main tasks array
            // Only update tasks in the state that don't have a goalId or match our current task
            if (action.goalId) {
                // Don't modify tasks in the main task array if they belong to a goal
                return state.filter(t => t.id !== action.id)
            } else {
                // Update the task in the main tasks array
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
        }
        default:
            throw new Error('Unknown action')
    }
}

export function goalReducer(state: GoalState, action: GoalAction) {
    switch (action.type) {
        case 'initial': {
            return action.goals;
        }
        case 'deleted': {
            removeGoalFromLocal(action.id);
            return state.filter(g => g.id !== action.id);
        }

        case 'added': {
            const newGoal: GoalWithTasks = {
                ...action.values,
                id: Date.now(),
                description: null,
                createdAt: new Date(),
                updatedAt: new Date(),
                startDate: new Date(),
                endDate: new Date(),
                frequency: null,
                userId: nanoid(),
                bestTimeTitle: action.values.bestTimeTitle ?? null, // Ensure null is used
                bestTimeDescription: action.values.bestTimeDescription ?? null, // Ensure null is used
                tasks: [
                    {
                        id: Date.now(),
                        title: 'Your Goal Here',
                        difficulty: null,
                        description: null,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        frequency: 'Once',
                        duration: '5 mins',
                        userId: nanoid(),
                        goalId: null,
                        completed: false
                    }

                ], // Add an empty tasks array to conform to GoalWithTasks
            }
            const nextGoal = [...state, newGoal]
            saveGoalsToLocal(nextGoal)
           
            return nextGoal
        }

        case 'edited': {
            return state
        }
        default:
            throw new Error('Unknown action')
    }
}
