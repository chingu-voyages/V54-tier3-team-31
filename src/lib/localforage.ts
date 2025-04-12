import localforage from 'localforage'
import * as schema from './db/schema'
import { TaskFormValues } from './types/types'
import { GoalWithTasks } from './types/types'

const PLANS_KEY = `plan-tasks-all`
const GOALS_KEY = 'goals-all'

// Define a single source of truth for browser detection
const isBrowser = typeof window !== 'undefined'

// Create a separate utility for safe localforage operations
const safeLocalForage = {
  // Internal initialization state
  _initialized: false,
  
  // Initialize localforage safely
  init() {
    if (!isBrowser || this._initialized) return
    
    try {
      localforage.config({
        driver: [
          localforage.INDEXEDDB, 
          localforage.WEBSQL,
          localforage.LOCALSTORAGE
        ],
        name: 'myOfflineAppDB',
        storeName: 'offline_data_store',
        description: 'Client-side storage for offline application data'
      })
      this._initialized = true
      console.log('localForage configured successfully.')
    } catch (err) {
      console.error('Error configuring localForage:', err)
      if (err instanceof Error && err.message.includes('No available storage method found')) {
        console.error('LocalForage configuration failed: Storage APIs may be unavailable in this environment.')
      }
    }
  },
  
  // Wrapper for getItem with proper error handling
  async getItem<T>(key: string): Promise<T | null> {
    if (!isBrowser) return null
    this.init()
    
    try {
      return await localforage.getItem<T>(key)
    } catch (err) {
      console.error(`Error retrieving "${key}" from localForage:`, err)
      return null
    }
  },
  
  // Wrapper for setItem with proper error handling
  async setItem<T>(key: string, value: T): Promise<boolean> {
    if (!isBrowser) return false
    this.init()
    
    try {
      await localforage.setItem(key, value)
      return true
    } catch (err) {
      console.error(`Error saving to "${key}" in localForage:`, err)
      return false
    }
  },
  
  // Wrapper for removeItem with proper error handling
  async removeItem(key: string): Promise<boolean> {
    if (!isBrowser) return false
    this.init()
    
    try {
      await localforage.removeItem(key)
      return true
    } catch (err) {
      console.error(`Error removing "${key}" from localForage:`, err)
      return false
    }
  }
}

// Export functions that use safeLocalForage internally
export const getAllPLanTasksFromLocal = async (): Promise<schema.Task[]> => {
  if (!isBrowser) return []
  const tasks = await safeLocalForage.getItem<schema.Task[]>(PLANS_KEY)
  return tasks || []
}

export const saveTasksToLocal = async (tasks: schema.Task[]): Promise<void> => {
  if (!isBrowser) return
  await safeLocalForage.setItem(PLANS_KEY, tasks)
}

export const removeTaskFromLocal = async ({
  taskId,
  goalId,
}: {
  taskId: number
  goalId?: number
}): Promise<void> => {
  if (!isBrowser) return

  try {
    if (!goalId) {
      const allPlanTasks = await getAllPLanTasksFromLocal()
      const updatedPlanTasks = allPlanTasks.filter(
        (task) => task.id !== taskId
      )
      
      if (updatedPlanTasks.length !== allPlanTasks.length) {
        await saveTasksToLocal(updatedPlanTasks)
        console.log(`Task ${taskId} removed from the 'plan-tasks-all' list.`)
      }
    } else {
      // Task belongs to a goal - remove it from the goal's tasks
      const goals = await getAllGoalsFromLocal()
      const updatedGoals = goals.map((goal) => {
        if (goal.id === goalId) {
          return {
            ...goal,
            tasks: goal.tasks.filter((task) => task.id !== taskId),
          }
        }
        return goal
      })
      
      await saveGoalsToLocal(updatedGoals)
      console.log(`Task ${taskId} removed from goal ${goalId} successfully.`)
    }
  } catch (err) {
    console.error(`Error removing task ${taskId} from localForage:`, err)
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
  if (!isBrowser) return

  try {
    if (!goalId) {
      // It means it's a Plans Task and it's not associated with any goal
      const allPlanTasks = await getAllPLanTasksFromLocal()
      const updatedTasks = allPlanTasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, ...values }
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
          return {
            ...goal,
            tasks: goal.tasks.map((task) => {
              if (task.id === taskId) {
                return { ...task, ...values }
              }
              return task
            }),
          }
        }
        return goal
      })

      await saveGoalsToLocal(updatedGoals)
      console.log(`Task ${taskId} in goal ${goalId} updated successfully.`)
    }
  } catch (err) {
    console.error(`Error editing task ${taskId} in localForage:`, err)
  }
}

// Save a goal (with tasks) to localForage
export const saveGoalsToLocal = async (
  goals: GoalWithTasks[]
): Promise<void> => {
  if (!isBrowser) return
  await safeLocalForage.setItem(GOALS_KEY, goals)
}

export const getAllGoalsFromLocal = async (): Promise<GoalWithTasks[]> => {
  if (!isBrowser) return []
  const goals = await safeLocalForage.getItem<GoalWithTasks[]>(GOALS_KEY)
  return goals || []
}

export const removeGoalFromLocal = async (goalId: number): Promise<void> => {
  if (!isBrowser) return
  
  try {
    const allGoals = await getAllGoalsFromLocal()
    const updatedGoals = allGoals.filter((goal) => goal.id !== goalId)
    
    if (updatedGoals.length !== allGoals.length) {
      await saveGoalsToLocal(updatedGoals)
      console.log(`goal ${goalId} removed from the 'goals-all' list.`)
    }
  } catch (err) {
    console.error(`Error removing task ${goalId} from localForage:`, err)
  }
}

// Function to update a goal in localForage
export const editGoalInLocal = async (
  goalId: number,
  updates: Partial<GoalWithTasks>
): Promise<void> => {
  if (!isBrowser) return
  
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
    
    await saveGoalsToLocal(updatedGoals)
    console.log(`Goal ${goalId} updated successfully.`)
  } catch (err) {
    console.error(`Error updating goal ${goalId} in localForage:`, err)
  }
}

// Add a task to a specific goal
export const addTaskToGoal = async (
  task: schema.Task,
  goalId: number
): Promise<void> => {
  if (!isBrowser) return

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
  }
}

// Function to toggle task focus state
export const toggleTaskFocus = async (taskId: number, isInFocus: boolean): Promise<void> => {
  if (!isBrowser) return
  
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
  if (!isBrowser) return []
  
  try {
    const planTasks = await getAllPLanTasksFromLocal()
    const goals = await getAllGoalsFromLocal()
    
    // Get current date at midnight for comparison
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    // Filter plan tasks that are in focus and either not completed or completed today
    const focusPlanTasks = planTasks.filter(task => {
      if (!task.isInFocus) return false
      if (!task.completed) return true
      
      // If task has completedAt timestamp, check if it was completed today
      if (task.completedAt) {
        const completedDate = task.completedAt instanceof Date 
          ? task.completedAt 
          : new Date(task.completedAt);
        
        return completedDate >= today
      }
      
      return true
    })
    
    // Filter goal tasks that are in focus and either not completed or completed today
    const focusGoalTasks = goals.flatMap(goal => 
      goal.tasks.filter(task => {
        if (!task.isInFocus) return false
        if (!task.completed) return true
        
        // If task has completedAt timestamp, check if it was completed today
        if (task.completedAt) {
          const completedDate = task.completedAt instanceof Date 
            ? task.completedAt 
            : new Date(task.completedAt);
          
          return completedDate >= today
        }
        
        return true
      })
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
  goalId?: number
): Promise<void> => {
  if (!isBrowser) return
  
  try {
    // Convert string to Date if provided
    const completedAtDate = completed ? new Date() : null;
    
    if (!goalId) {
      // Update plan task
      const allPlanTasks = await getAllPLanTasksFromLocal()
      const updatedTasks = allPlanTasks.map(task => {
        if (task.id === taskId) {
          return {
            ...task,
            completed,
            completedAt: completedAtDate
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
                completedAt: completedAtDate
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

// Function to automatically remove tasks from focus after 24 hours
export const cleanupOldFocusTasks = async (): Promise<void> => {
  if (!isBrowser) return
  
  try {
    // Get current date at midnight for comparison
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    // Get yesterday's date
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    
    // Update plan tasks
    const allPlanTasks = await getAllPLanTasksFromLocal()
    let planTasksUpdated = false
    
    const updatedPlanTasks = allPlanTasks.map(task => {
      // If task is completed and completed more than 24 hours ago, remove from focus
      if (task.completed && task.completedAt) {
        const completedDate = task.completedAt instanceof Date 
          ? task.completedAt 
          : new Date(task.completedAt);
        
        if (completedDate < yesterday) {
          planTasksUpdated = true
          return { ...task, isInFocus: false }
        }
      }
      return task
    })
    
    if (planTasksUpdated) {
      await saveTasksToLocal(updatedPlanTasks)
    }
    
    // Update goal tasks
    const goals = await getAllGoalsFromLocal()
    let goalsUpdated = false
    
    const updatedGoals = goals.map(goal => {
      let tasksUpdated = false
      const updatedTasks = goal.tasks.map(task => {
        // If task is completed and completed more than 24 hours ago, remove from focus
        if (task.completed && task.completedAt) {
          const completedDate = task.completedAt instanceof Date 
            ? task.completedAt 
            : new Date(task.completedAt);
          
          if (completedDate < yesterday) {
            tasksUpdated = true
            return { ...task, isInFocus: false }
          }
        }
        return task
      })
      
      if (tasksUpdated) {
        goalsUpdated = true
        return { ...goal, tasks: updatedTasks }
      }
      return goal
    })
    
    if (goalsUpdated) {
      await saveGoalsToLocal(updatedGoals)
    }
  } catch (error) {
    console.error('Error cleaning up old focus tasks:', error)
  }
}

export const clearLocalData = async (): Promise<void> => {
  if (!isBrowser) return
  
  try {
    await safeLocalForage.removeItem(PLANS_KEY)
    await safeLocalForage.removeItem(GOALS_KEY)
    console.log("LocalForage data cleared.")
  } catch (err) {
    console.error('Error clearing data from localForage:', err)
  }
}
