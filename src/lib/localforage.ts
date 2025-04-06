import localforage from 'localforage'
import * as schema from './schema'
import { TaskFormValues } from './types/types'
import { GoalWithTasks } from './types/types'

const PLANS_KEY = `plan-tasks-all`
const GOALS_KEY = 'goals-all'

// offline support for db storage (using localForage)
localforage.config({
    driver: localforage.INDEXEDDB, // Prioritize IndexedDB
    name: 'myOfflineAppDB',
})

// Save a goal (with tasks) to localForage
// offline support for db storage (using localForage)
let localForageConfigured = false

function ensureLocalForageConfigured() {
    // Ensure this only runs in the browser and only once
    if (typeof window !== 'undefined' && !localForageConfigured) {
        localforage.config({
            driver: [
                localforage.INDEXEDDB,
                localforage.WEBSQL,
                localforage.LOCALSTORAGE,
            ], // Explicitly list drivers in order of preference
            name: 'myOfflineAppDB',
            storeName: 'offline_data_store', // Optional: Define a specific store name
            description: 'Client-side storage for offline application data',
        })
        localForageConfigured = true
        console.log('localForage configured successfully.')
    }
}

export const getAllPLanTasksFromLocal = async (): Promise<schema.Task[]> => {
    ensureLocalForageConfigured()
    if (typeof window === 'undefined') {
        return []
    }
    try {
        const tasks = await localforage.getItem<schema.Task[]>('plan-tasks-all')
        return tasks || []
    } catch (err) {
        console.error('Error retrieving plan tasks list from localForage:', err)
        return []
    }
}
export const saveTasksToLocal = async (tasks: schema.Task[]): Promise<void> => {
    ensureLocalForageConfigured() // Ensure config before use
    try {
        // Generate a single key for the list of planned tasks for easier retrieval/management if needed
        // Using a fixed key might be better if you always want to overwrite the same list

        await localforage.setItem(PLANS_KEY, tasks) // Save the array itself

        console.log(`Planned tasks saved locally under key ${PLANS_KEY}.`)
    } catch (err) {
        console.error('Error saving tasks to localForage:', err) // Corrected error message
        if (
            err instanceof Error &&
            err.message.includes('No available storage method found')
        ) {
            console.error(
                'LocalForage could not find a suitable storage driver. Check browser settings/permissions (e.g., private browsing).'
            )
        }
    }
}

export const removeTaskFromLocal = async ({
    taskId,
    goalId,
}: {
    taskId: number
    goalId?: number
}): Promise<void> => {
    ensureLocalForageConfigured() // Ensure config before use
    if (typeof window === 'undefined') {
        console.warn('Attempted to remove task from localForage on the server.')
        return // Don't run on server
    }
    try {
        if (!goalId) {
            const allPlanTasks = await getAllPLanTasksFromLocal()
            const updatedPlanTasks = allPlanTasks.filter(
                (task) => task.id !== taskId
            )
            // Only save back if the list actually changed
            if (updatedPlanTasks.length !== allPlanTasks.length) {
                await saveTasksToLocal(updatedPlanTasks)
                console.log(
                    `Task ${taskId} removed from the 'plan-tasks-all' list.`
                )
            }
        } else {
            // Task belongs to a goal - remove it from the goal's tasks
            const goals = await getAllGoalsFromLocal()
            const updatedGoals = goals.map((goal) => {
                if (goal.id === goalId) {
                    // Filter out the task to be removed
                    const updatedTasks = goal.tasks.filter(
                        (task) => task.id !== taskId
                    )
                    // Return the goal with the filtered tasks
                    return {
                        ...goal,
                        tasks: updatedTasks,
                    }
                }
                return goal
            })
            
            // Save the updated goals back to storage
            await saveGoalsToLocal(updatedGoals)
            console.log(`Task ${taskId} removed from goal ${goalId} successfully.`)
        }   
    } catch (err) {
        console.error(`Error removing task ${taskId} from localForage:`, err)
        if (
            err instanceof Error &&
            err.message.includes('No available storage method found')
        ) {
            console.error(
                'LocalForage could not find a suitable storage driver. Check browser settings/permissions (e.g., private browsing).'
            )
        }
    }
}
export const editTaskFromLocal = async ({
    taskId,
    values,
    goalId,
}: {
    taskId: number
    values: TaskFormValues
    goalId?: number
}): Promise<void> => {
    ensureLocalForageConfigured() // Ensure config before use
    if (typeof window === 'undefined') {
        console.warn('Attempted to edit task from localForage on the server.')
        return // Don't run on server
    }
    try {
        if (!goalId) {
            // It means it's a Plans Task and it's not associated with any goal
            const allPlanTasks = await getAllPLanTasksFromLocal()
            const updatedTasks = allPlanTasks.map((task) => {
                if (task.id === taskId) {
                    return {
                        ...task,
                        ...values,
                    }
                }
                return task
            })
            await saveTasksToLocal(updatedTasks)
            console.log(`Task ${taskId} updated in the 'plan-tasks-all' list.`)
        } else {
            // Task belongs to a goal
            const goals = await getAllGoalsFromLocal()
            const updatedGoals = goals.map((goal) => {
                if (goal.id === goalId) {
                    // Update the tasks array within this goal
                    const updatedTasks = goal.tasks.map((task) => {
                        if (task.id === taskId) {
                            return {
                                ...task,
                                ...values,
                            }
                        }
                        return task
                    })

                    // Return updated goal with modified tasks
                    return {
                        ...goal,
                        tasks: updatedTasks,
                    }
                }
                return goal
            })

            // Save the updated goals back to storage
            await saveGoalsToLocal(updatedGoals)
            console.log(
                `Task ${taskId} in goal ${goalId} updated successfully.`
            )
        }
    } catch (err) {
        console.error(`Error editing task ${taskId} in localForage:`, err)
        if (
            err instanceof Error &&
            err.message.includes('No available storage method found')
        ) {
            console.error(
                'LocalForage could not find a suitable storage driver. Check browser settings/permissions (e.g., private browsing).'
            )
        }
    }
}

// Save a goal (with tasks) to localForage
export const saveGoalsToLocal = async (
    goal: GoalWithTasks[]
): Promise<void> => {
    ensureLocalForageConfigured() // Ensure config before use
    try {
        await localforage.setItem(GOALS_KEY, goal)
        console.log(`Goal ${GOALS_KEY} and its tasks saved locally.`)
    } catch (err) {
        console.error('Error saving goal to localForage:', err)
        // Check if the error is the specific storage error
        if (
            err instanceof Error &&
            err.message.includes('No available storage method found')
        ) {
            console.error(
                'LocalForage could not find a suitable storage driver. Check browser settings/permissions (e.g., private browsing).'
            )
        }
    }
}

export const getAllGoalsFromLocal = async (): Promise<GoalWithTasks[]> => {
    ensureLocalForageConfigured() // Ensure config before use
    if (typeof window === 'undefined') {
        console.warn('Attempted to get goals from localForage on the server.')
        return [] // Don't run on server
    }

    try {
        const goals = await localforage.getItem<GoalWithTasks[]>(GOALS_KEY)
        console.log('All individual local goals and tasks retrieved:', goals)
        return goals || []
    } catch (err) {
        console.error('Error retrieving data from localForage:', err)
        if (
            err instanceof Error &&
            err.message.includes('No available storage method found')
        ) {
            console.error(
                'LocalForage could not find a suitable storage driver. Check browser settings/permissions (e.g., private browsing).'
            )
        }
        return []
    }
}

export const removeGoalFromLocal = async (goalId: number): Promise<void> => {
    ensureLocalForageConfigured() // Ensure config before use
    if (typeof window === 'undefined') {
        console.warn('Attempted to remove task from localForage on the server.')
        return // Don't run on server
    }
    try {
        const allGoals = await getAllGoalsFromLocal()
        const updatedGoals = allGoals.filter((goal) => goal.id !== goalId)
        // Only save back if the list actually changed
        if (updatedGoals.length !== allGoals.length) {
            await saveGoalsToLocal(updatedGoals)
            console.log(`goal ${goalId} removed from the 'goals-all' list.`)
        }
    } catch (err) {
        console.error(`Error removing task ${goalId} from localForage:`, err)
        if (
            err instanceof Error &&
            err.message.includes('No available storage method found')
        ) {
            console.error(
                'LocalForage could not find a suitable storage driver. Check browser settings/permissions (e.g., private browsing).'
            )
        }
    }
}

// Function to update a goal in localForage
export const editGoalInLocal = async (
    goalId: number,
    updates: Partial<GoalWithTasks>
): Promise<void> => {
    ensureLocalForageConfigured() // Ensure config before use
    if (typeof window === 'undefined') {
        console.warn('Attempted to edit goal in localForage on the server.')
        return // Don't run on server
    }
    
    try {
        const allGoals = await getAllGoalsFromLocal()
        const updatedGoals = allGoals.map((goal) => {
            if (goal.id === goalId) {
                return {
                    ...goal,
                    ...updates,
                    updatedAt: new Date()
                }
            }
            return goal
        })
        
        // Save the updated goals back to storage
        await saveGoalsToLocal(updatedGoals)
        console.log(`Goal ${goalId} updated successfully.`)
    } catch (err) {
        console.error(`Error updating goal ${goalId} in localForage:`, err)
        if (
            err instanceof Error &&
            err.message.includes('No available storage method found')
        ) {
            console.error(
                'LocalForage could not find a suitable storage driver. Check browser settings/permissions (e.g., private browsing).'
            )
        }
    }
}

// Add a task to a specific goal
export const addTaskToGoal = async (
    task: schema.Task,
    goalId: number
): Promise<void> => {
    ensureLocalForageConfigured() // Ensure config before use
    if (typeof window === 'undefined') {
        console.warn(
            'Attempted to add task to goal from localForage on the server.'
        )
        return // Don't run on server
    }

    try {
        // Get all goals
        const goals = await getAllGoalsFromLocal()

        // Find the goal to add the task to
        const updatedGoals = goals.map((goal) => {
            if (goal.id === goalId) {
                // Add the task to this goal's tasks array
                return {
                    ...goal,
                    tasks: [...goal.tasks, { ...task, goalId }],
                }
            }
            return goal
        })

        // Save the updated goals back to storage
        await saveGoalsToLocal(updatedGoals)
        console.log(`Task added to goal ${goalId} successfully.`)
    } catch (err) {
        console.error(
            `Error adding task to goal ${goalId} in localForage:`,
            err
        )
        if (
            err instanceof Error &&
            err.message.includes('No available storage method found')
        ) {
            console.error(
                'LocalForage could not find a suitable storage driver. Check browser settings/permissions (e.g., private browsing).'
            )
        }
    }
}

// Function to toggle task focus state
export const toggleTaskFocus = async (taskId: number, isInFocus: boolean): Promise<void> => {
    ensureLocalForageConfigured()
    if (typeof window === 'undefined') {
        console.warn('Attempted to toggle task focus from localForage on the server.')
        return
    }

    try {
        // First check if it's a plan task
        const allPlanTasks = await getAllPLanTasksFromLocal()
        const planTaskIndex = allPlanTasks.findIndex(task => task.id === taskId)
        
        if (planTaskIndex !== -1) {
            // Update plan task
            const updatedTasks = allPlanTasks.map(task => 
                task.id === taskId ? { ...task, isInFocus } : task
            )
            await saveTasksToLocal(updatedTasks)
            console.log(`Task ${taskId} focus state updated in plan tasks.`)
            return
        }

        // If not a plan task, check goals
        const goals = await getAllGoalsFromLocal()
        let taskFound = false

        const updatedGoals = goals.map(goal => {
            const taskIndex = goal.tasks.findIndex(task => task.id === taskId)
            if (taskIndex !== -1) {
                taskFound = true
                const updatedTasks = [...goal.tasks]
                updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], isInFocus }
                return { ...goal, tasks: updatedTasks }
            }
            return goal
        })

        if (taskFound) {
            await saveGoalsToLocal(updatedGoals)
            console.log(`Task ${taskId} focus state updated in goals.`)
        } else {
            console.warn(`Task ${taskId} not found in either plan tasks or goals.`)
        }
    } catch (err) {
        console.error(`Error toggling focus state for task ${taskId}:`, err)
    }
}

// Function to get all tasks in focus
export const getTasksInFocus = async (): Promise<schema.Task[]> => {
    ensureLocalForageConfigured()
    if (typeof window === 'undefined') {
        console.warn('Attempted to get focus tasks from localForage on the server.')
        return []
    }

    try {
        const planTasks = await getAllPLanTasksFromLocal()
        const goals = await getAllGoalsFromLocal()
        
        const focusPlanTasks = planTasks.filter(task => task.isInFocus)
        const focusGoalTasks = goals.flatMap(goal => 
            goal.tasks.filter(task => task.isInFocus)
        )

        return [...focusPlanTasks, ...focusGoalTasks]
    } catch (err) {
        console.error('Error getting tasks in focus:', err)
        return []
    }
}

export const updateTaskCompletion = async (
    taskId: number,
    completed: boolean,
    completedAt?: string,
    goalId?: number
): Promise<void> => {
    ensureLocalForageConfigured()
    if (typeof window === 'undefined') return

    try {
        if (!goalId) {
            // Update plan task
            const allPlanTasks = await getAllPLanTasksFromLocal()
            const updatedTasks = allPlanTasks.map(task => {
                if (task.id === taskId) {
                    return {
                        ...task,
                        completed,
                        completedAt
                    }
                }
                return task
            })
            await saveTasksToLocal(updatedTasks)
        } else {
            // Update goal task
            const goals = await getAllGoalsFromLocal()
            const updatedGoals = goals.map(goal => {
                if (goal.id === goalId) {
                    const updatedTasks = goal.tasks.map(task => {
                        if (task.id === taskId) {
                            return {
                                ...task,
                                completed,
                                completedAt
                            }
                        }
                        return task
                    })
                    return { ...goal, tasks: updatedTasks }
                }
                return goal
            })
            await saveGoalsToLocal(updatedGoals)
        }
    } catch (error) {
        console.error('Error updating task completion status:', error)
    }
}
