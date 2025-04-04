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

export const removeTaskFromLocal = async (taskId: number): Promise<void> => {
    ensureLocalForageConfigured() // Ensure config before use
    if (typeof window === 'undefined') {
        console.warn('Attempted to remove task from localForage on the server.')
        return // Don't run on server
    }
    try {
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
            const updatedGoals = goals.map(goal => {
                if (goal.id === goalId) {
                    // Update the tasks array within this goal
                    const updatedTasks = goal.tasks.map(task => {
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
                        tasks: updatedTasks
                    }
                }
                return goal
            })
            
            // Save the updated goals back to storage
            await saveGoalsToLocal(updatedGoals)
            console.log(`Task ${taskId} in goal ${goalId} updated successfully.`)
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
