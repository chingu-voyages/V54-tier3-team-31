import {
    saveTasksToLocal,
    removeTaskFromLocal,
    editTaskFromLocal,
    saveGoalsToLocal,
    removeGoalFromLocal,
} from '@/lib/localforage'
import { Task as TaskSchema } from '@/lib/db/schema'
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
            return action.planTasks
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
                id: action.taskId || parseInt(crypto.randomUUID().replace(/-/g, '').slice(0, 8), 16), // Use the provided taskId or generate a unique numeric ID
                difficulty: null,
                description: null,
                createdAt: new Date(),
                updatedAt: new Date(),
                goalId: action.goalId || null, // Use provided goalId or null
                completed: false,
                completedAt: null, // Add the completedAt property
                isInFocus: action.isInFocus, // Default to false for new tasks
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
                const updatedState = state.map((t) => { // Assign result to updatedState
                    if (t.id === action.id) {
                        return {
                            ...t,
                            ...action.values,
                            completedAt: t.completedAt, // Preserve the completedAt property
                        };
                    }
                    return t;
                });
                // Save the updated plan tasks state to localForage
                saveTasksToLocal(updatedState);
                return updatedState; // Return the updated state
            }
        }
        case 'TOGGLED_FOCUS': { // Added case for optimistic focus toggle
            // Update localForage first for unauthenticated users
            // Assuming toggleTaskFocusLocal exists and handles the persistence
            // toggleTaskFocusLocal(action.id, action.isInFocus); // We'll call this from the hook instead to handle auth status
            
            const updatedState = state.map((t) => {
                if (t.id === action.id) {
                    return { ...t, isInFocus: action.isInFocus };
                }
                return t;
            });
            // Save updated state to local storage if tasks don't belong to a goal
            // Note: This assumes saveTasksToLocal filters out goal tasks or handles them appropriately.
            // Persistence (local storage update) is handled by the hook (`useTaskManagement`) 
            // calling `toggleTaskFocusLocal` for unauthenticated users.
            // Reducer only handles the optimistic state update.

            return updatedState;
        }
        case 'COMPLETION_UPDATED': { // Handle optimistic update for task completion
            return state.map((t) => {
                if (t.id === action.id) {
                    return {
                        ...t,
                        completed: action.completed,
                        completedAt: action.completedAt,
                    };
                }
                return t;
            });
             // Note: Persistence (localForage update) is handled by the hook (`useTaskManagement`)
             // calling `updateTaskCompletionLocal` for unauthenticated users.
             // Reducer only handles the optimistic state update.
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
            // Generate a unique number ID using crypto.randomUUID()
            const goalId = parseInt(crypto.randomUUID().replace(/-/g, '').slice(0, 8), 16);
            const newGoal: GoalWithTasks = {
                ...action.values,
                id: goalId,
                description: null,
                createdAt: new Date(),
                updatedAt: new Date(),
                startDate: new Date(),
                endDate: new Date(),
                frequency: null,
                userId: nanoid(),
                bestTimeTitle: action.values.bestTimeTitle ?? null,
                bestTimeDescription: action.values.bestTimeDescription ?? null,
                tasks: [
                    {
                        id: parseInt(crypto.randomUUID().replace(/-/g, '').slice(0, 8), 16),
                        title: 'Your Goal Here',
                        difficulty: null,
                        description: null,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        frequency: 'Once',
                        duration: '5 mins',
                        userId: nanoid(),
                        goalId: goalId,
                        completed: false,
                        completedAt: null,
                        isInFocus: false
                    }
                ],
            }
            const nextGoal = [...state, newGoal]
            saveGoalsToLocal(nextGoal)
           
            return nextGoal
        }

        case 'edited': {
            // Update the goal with the values from the action
            const updatedGoals = state.map(goal => { // Assign result to updatedGoals
                if (goal.id === action.id) {
                    return {
                        ...goal,
                        ...action.values,
                        updatedAt: new Date()
                    };
                }
                return goal;
            });
            // Save the updated goals state to localForage
            saveGoalsToLocal(updatedGoals);
            return updatedGoals; // Return the updated state
        }
        case 'TOGGLE_TASK_FOCUS_IN_GOAL': { // Added action to toggle task focus within a goal
            const updatedGoalsState = state.map(goal => {
                if (goal.id === action.goalId) {
                    const updatedTasks = goal.tasks.map(task => {
                        if (task.id === action.taskId) {
                            return { ...task, isInFocus: action.isInFocus };
                        }
                        return task;
                    });
                    return { ...goal, tasks: updatedTasks };
                }
                return goal;
            });
            // Persistence (local storage) for goal tasks' focus state needs to be handled carefully.
            // If toggleTaskFocusLocal can handle tasks within goals, the hook will call it.
            // If not, we might need to update saveGoalsToLocal or have a specific function.
            // For now, reducer only handles optimistic state update.
            // saveGoalsToLocal(updatedGoalsState); // Avoid saving from reducer
            return updatedGoalsState;
        }
        default:
            throw new Error('Unknown action')
    }
}
