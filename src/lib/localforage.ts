import localforage from 'localforage'
import * as schema from './schema'

import { nanoid } from 'nanoid';

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

// Save a goal (with tasks) to localForage
export const saveGoalToLocal = async (
    goal: schema.Goal,
    tasks: schema.Task[]
): Promise<void> => {
    ensureLocalForageConfigured() // Ensure config before use
    try {
        await localforage.setItem(`goal-${goal.id}`, goal)
        for (const task of tasks) {
            await localforage.setItem(`task-${task.id}`, task)
        }
        console.log(`Goal ${goal.id} and its tasks saved locally.`)
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
        const planKey = `plan-tasks-all`
        await localforage.setItem(planKey, tasks) // Save the array itself

        console.log(`Planned tasks saved locally under key ${planKey}.`)
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
    ensureLocalForageConfigured(); // Ensure config before use
    if (typeof window === 'undefined') {
        console.warn('Attempted to remove task from localForage on the server.');
        return; // Don't run on server
    }
    try {
        const allPlanTasks = await getAllPLanTasksFromLocal();
        const updatedPlanTasks = allPlanTasks.filter(task => task.id !== taskId);
        // Only save back if the list actually changed
        if (updatedPlanTasks.length !== allPlanTasks.length) {
            
            await saveTasksToLocal(updatedPlanTasks);
            console.log(`Task ${taskId} removed from the 'plan-tasks-all' list.`);
        }

    } catch (err) {
        console.error(`Error removing task ${taskId} from localForage:`, err);
        if (
            err instanceof Error &&
            err.message.includes('No available storage method found')
        ) {
            console.error(
                'LocalForage could not find a suitable storage driver. Check browser settings/permissions (e.g., private browsing).'
            );
        }
    }
};

export const getAllGoalsFromLocal = async (): Promise<{
    goals: schema.Goal[]
    tasks: schema.Task[]
}> => {
    ensureLocalForageConfigured() // Ensure config before use
    if (typeof window === 'undefined') {
        console.warn('Attempted to get goals from localForage on the server.')
        return { goals: [], tasks: [] } // Don't run on server
    }
    const goals: schema.Goal[] = []
    const tasks: schema.Task[] = []
    try {
        await localforage.iterate((value, key) => {
            if (key.startsWith('goal-')) {
                goals.push(value as schema.Goal)
            } else if (key.startsWith('task-')) {
                // Only retrieve individual tasks here
                tasks.push(value as schema.Task)
            }
            // Note: This won't retrieve the 'plan-tasks-all' list directly,
            // you'd need a separate getItem call if you need that specific list.
        })
        console.log('All individual local goals and tasks retrieved:', {
            goals,
            tasks,
        })
        return { goals, tasks }
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
        return { goals: [], tasks: [] }
    }
}
