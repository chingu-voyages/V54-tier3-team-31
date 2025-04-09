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

export type GoalAction =
    | {
          type: 'deleted'
          id: number
      }
    | { type: 'added'; values: GoalFormValues }
    | { type: 'initial'; goals: GoalWithTasks[] }
    | { type: 'edited'; values: GoalFormValues; id: number }

export interface GoalWithTasks extends schema.Goal {
    tasks: schema.Task[]
}
