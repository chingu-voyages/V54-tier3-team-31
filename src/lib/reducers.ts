import { Task as TaskSchema } from '@/lib/db/schema'
import { nanoid } from 'nanoid'
import {
    GoalAction,
    GoalState,
    TaskState,
    GoalWithTasks,
    TaskFormValues, // Import TaskFormValues
} from '@/lib/types/types'
import { TaskAction } from '@/lib/types/types'

export function planTaskReducer(state: TaskState, action: TaskAction): TaskState { // Added return type
    switch (action.type) {
        case 'initial': {
            return action.planTasks
        }

        case 'deleted': {
            return state.filter((t) => t.id !== action.id)
        }

        case 'added': {
            // Create a complete task object with all required properties
            const newTask: TaskSchema = {
                ...action.values,
                userId: nanoid(), // Keep nanoid for userId if it's suitable there
                // Use provided taskId (temp ID from hook) or generate fallback (though hook should always provide)
                id: action.taskId || Date.now() + Math.floor(Math.random() * 1000),
                difficulty: null,
                description: null,
                createdAt: new Date(),
                updatedAt: new Date(),
                goalId: action.goalId || null, // Use provided goalId or null
                completed: false,
                completedAt: null, // Add the completedAt property
                isInFocus: action.isInFocus,
            }

            // If this task belongs to a goal, don't add it to the main planTasks state
            if (action.goalId) {
                return state;
            } else {
                // This is a regular plan task, add it to the state optimistically
                const nextState = [newTask, ...state]; // Use nextState variable
                return nextState; // Return the new state
            }
        }
        case 'edited': {
            // If the task has a goalId, it shouldn't be in the planTasks state
            if (action.goalId) {
                // Filter it out if it somehow ended up here (defensive)
                return state.filter(t => t.id !== action.id)
            } else {
                // Update the task in the planTasks state
                const updatedState = state.map((t) => {
                    if (t.id === action.id) {
                        return {
                            ...t,
                            ...action.values, // Apply partial updates from TaskFormValues
                            updatedAt: new Date(), // Always update timestamp on edit
                        };
                    }
                    return t;
                });
                return updatedState; // Return the updated state
            }
        }
        case 'TOGGLED_FOCUS': {
            // Persistence handled by hook
            const updatedState = state.map((t) => {
                // Only toggle focus for plan tasks (no goalId)
                if (t.id === action.id && !t.goalId) {
                    return { ...t, isInFocus: action.isInFocus, updatedAt: new Date() };
                }
                return t;
            });
            // Persistence handled by hook
            return updatedState;
        }
        case 'COMPLETION_UPDATED': {
             // Persistence handled by hook
            return state.map((t) => {
                 // Only update completion for plan tasks (no goalId)
                if (t.id === action.id && !t.goalId) {
                    return {
                        ...t,
                        completed: action.completed,
                        completedAt: action.completedAt,
                        updatedAt: new Date(),
                    };
                }
                return t;
            });
             // Persistence handled by hook
        }
        default: { // Added braces for block scope
             // Enforce that all action types are handled
             const exhaustiveCheck: never = action;
             throw new Error(`Unhandled action type: ${(exhaustiveCheck as any).type}`);
        }
    }
}

export function goalReducer(state: GoalState, action: GoalAction): GoalState { // Added return type
    switch (action.type) {
        case 'initial': {
            return action.goals;
        }
        case 'deleted': {
            return state.filter(g => g.id !== action.id);
        }

        case 'added': {
            // Generate a unique number ID using crypto.randomUUID() or similar
            // Hook should provide temp ID if needed for revert, reducer uses it or generates final for unauth
             const goalId = action.goalId || Date.now() + Math.floor(Math.random() * 1000); // Use provided or generate
             const taskId = Date.now() + Math.floor(Math.random() * 1001); // Temp ID for initial task

            const newGoal: GoalWithTasks = {
                // Base properties from form values
                name: action.values.name,
                bestTimeTitle: action.values.bestTimeTitle ?? null,
                bestTimeDescription: action.values.bestTimeDescription ?? null,
                // Default/generated properties
                id: goalId,
                description: null, // Add default
                createdAt: new Date(),
                updatedAt: new Date(),
                startDate: new Date(), // Add default
                endDate: null, // Default to null or based on logic
                frequency: null, // Add default
                userId: nanoid(), // Or use a placeholder like 'localUser' for unauth
                tasks: [ // Add default initial task
                    {
                        id: taskId,
                        title: 'Define first step', // Default task title
                        difficulty: null,
                        description: null,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        frequency: 'Once',
                        duration: '5 mins',
                        userId: nanoid(), // Match goal's user ID placeholder
                        goalId: goalId,
                        completed: false,
                        completedAt: null,
                        isInFocus: action.isInFocus ?? false // Use provided or default
                    }
                ],
            }
            const nextState = [...state, newGoal]; // Use nextState
            return nextState; // Return new state
        }

        case 'edited': {
            const updatedGoals = state.map(goal => {
                if (goal.id === action.id) {
                    return {
                        ...goal,
                        ...action.values, // Apply partial updates
                        updatedAt: new Date() // Always update timestamp
                    };
                }
                return goal;
            });
            return updatedGoals; // Return the updated state
        }
        case 'TOGGLE_TASK_FOCUS_IN_GOAL': {
            const updatedGoalsState = state.map(goal => {
                if (goal.id === action.goalId) {
                    const updatedTasks = goal.tasks.map(task => {
                        if (task.id === action.taskId) {
                            // Ensure updatedAt is updated for the task
                            return { ...task, isInFocus: action.isInFocus, updatedAt: new Date() };
                        }
                        return task;
                    });
                    // Also update the goal's updatedAt timestamp
                    return { ...goal, tasks: updatedTasks, updatedAt: new Date() };
                }
                return goal;
            });
            // Persistence handled by hook
            return updatedGoalsState;
        }
         case 'TASK_ADDED_TO_GOAL': { // New action type
             return state.map(goal => {
                 if (goal.id === action.goalId) {
                     // Avoid adding duplicates if task already exists (e.g., due to optimistic/refresh race)
                     if (goal.tasks.some(task => task.id === action.task.id)) {
                         return goal; // Task already present, return goal unchanged
                     }
                     return {
                         ...goal,
                         tasks: [...goal.tasks, action.task],
                         updatedAt: new Date() // Update goal timestamp
                     };
                 }
                 return goal;
             });
         }
         case 'TASK_EDITED_IN_GOAL': { // New action type
             return state.map(goal => {
                 if (goal.id === action.goalId) {
                     const updatedTasks = goal.tasks.map(task => {
                         if (task.id === action.taskId) {
                             return {
                                 ...task,
                                 ...action.values,
                                 updatedAt: new Date() // Update task timestamp
                             };
                         }
                         return task;
                     });
                     return { ...goal, tasks: updatedTasks, updatedAt: new Date() }; // Update goal timestamp
                 }
                 return goal;
             });
         }
         case 'TASK_DELETED_FROM_GOAL': { // New action type
             return state.map(goal => {
                 if (goal.id === action.goalId) {
                     const updatedTasks = goal.tasks.filter(task => task.id !== action.taskId);
                     return { ...goal, tasks: updatedTasks, updatedAt: new Date() }; // Update goal timestamp
                 }
                 return goal;
             });
         }
         case 'TASK_COMPLETION_IN_GOAL_UPDATED': { // New action type
             return state.map(goal => {
                 if (goal.id === action.goalId) {
                     const updatedTasks = goal.tasks.map(task => {
                         if (task.id === action.taskId) {
                             return {
                                 ...task,
                                 completed: action.completed,
                                 completedAt: action.completedAt,
                                 updatedAt: new Date() // Update task timestamp
                             };
                         }
                         return task;
                     });
                     return { ...goal, tasks: updatedTasks, updatedAt: new Date() }; // Update goal timestamp
                 }
                 return goal;
             });
         }
        default: { // Added braces for block scope
             const exhaustiveCheck: never = action;
             throw new Error(`Unhandled action type: ${(exhaustiveCheck as any).type}`);
        }
    }
}
