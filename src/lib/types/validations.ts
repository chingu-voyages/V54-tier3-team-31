import { z } from "zod";

// Zod schema for the new goal form
export const TaskFormSchema = z.object({
    title: z.string().min(1, {
        message: 'Task title cannot be empty.',
    }),
    frequency: z.string().optional().default('Once'), // Made optional, default 'Once'
    duration: z.string().optional().default('5 mins'), // Made optional, default '5 mins'
})


export const GoalFormSchema = z.object({
    name: z.string().min(1,{
        message: 'Goal Title cannot be empty.'
    }),
    bestTimeTitle: z.string().optional(),
    bestTimeDescription: z.string().optional()

})


