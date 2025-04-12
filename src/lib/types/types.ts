import { z } from 'zod'
import { GoalFormSchema, TaskFormSchema } from './validations'
import * as schema from '@/lib/db/schema'

export type TaskFormValues = z.infer<typeof TaskFormSchema>
export type GoalFormValues = z.infer<typeof GoalFormSchema>

export type TaskState = schema.Task[]
export type GoalState = GoalWithTasks[]

export type TaskAction =
    | {
          type: 'deleted'
          id: number
          goalId?: number // Keep goalId for potential filtering in reducer
      }
    | { 
          type: 'added'; 
          values: TaskFormValues; 
          goalId?: number;
          taskId: number; // Use the temporary ID generated in the hook
          isInFocus: boolean;
      }
    | { type: 'initial'; planTasks: schema.Task[] }
    | { 
          type: 'edited'; 
          values: Partial<TaskFormValues>; // Allow partial updates for edit
          id: number; 
          goalId?: number // Keep goalId for potential filtering in reducer
      }
    | { type: 'TOGGLED_FOCUS'; id: number; isInFocus: boolean } // No goalId needed here, handled by hook logic
    | { 
          type: 'COMPLETION_UPDATED'; 
          id: number; 
          completed: boolean; 
          completedAt: Date | null 
      } // No goalId needed here, handled by hook logic

export type GoalAction =
    | {
          type: 'deleted'
          id: number
      }
    | { 
          type: 'added'; 
          values: GoalFormValues;
          goalId?: number; // Optional temporary ID from hook
          isInFocus?: boolean 
      }
    | { type: 'initial'; goals: GoalWithTasks[] }
    | { 
          type: 'edited'; 
          values: Partial<GoalFormValues>; // Allow partial updates
          id: number 
      }
    | { 
          type: 'TOGGLE_TASK_FOCUS_IN_GOAL'; 
          goalId: number; 
          taskId: number; 
          isInFocus: boolean 
      }
    // New actions for managing tasks within goals directly in goal state
    | { 
          type: 'TASK_ADDED_TO_GOAL'; 
          goalId: number; 
          task: schema.Task 
      }
    | { 
          type: 'TASK_EDITED_IN_GOAL'; 
          goalId: number; 
          taskId: number; 
          values: Partial<TaskFormValues> 
      }
    | { 
          type: 'TASK_DELETED_FROM_GOAL'; 
          goalId: number; 
          taskId: number 
      }
    | { 
          type: 'TASK_COMPLETION_IN_GOAL_UPDATED'; 
          goalId: number; 
          taskId: number; 
          completed: boolean; 
          completedAt: Date | null 
      }

export interface GoalWithTasks extends schema.Goal {
    tasks: schema.Task[]
}
