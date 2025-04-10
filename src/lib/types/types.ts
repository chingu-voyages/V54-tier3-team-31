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
          goalId?: number
      }
    | { 
          type: 'added'; 
          values: TaskFormValues; 
          goalId?: number;
          taskId?: number;
          isInFocus: boolean;
      }
    | { type: 'initial'; planTasks: schema.Task[] }
    | { type: 'edited'; values: TaskFormValues; id: number; goalId?: number }
    | { type: 'TOGGLED_FOCUS'; id: number; isInFocus: boolean }
    | { 
          type: 'COMPLETION_UPDATED'; 
          id: number; 
          completed: boolean; 
          completedAt: Date | null 
      }

export type GoalAction =
    | {
          type: 'deleted'
          id: number
      }
    | { type: 'added'; values: GoalFormValues, isInFocus?: boolean }
    | { type: 'initial'; goals: GoalWithTasks[] }
    | { type: 'edited'; values: GoalFormValues; id: number }
    | { type: 'TOGGLE_TASK_FOCUS_IN_GOAL'; goalId: number; taskId: number; isInFocus: boolean }

export interface GoalWithTasks extends schema.Goal {
    tasks: schema.Task[]
}
