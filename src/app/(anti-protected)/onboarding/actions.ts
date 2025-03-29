'use server'

import { z } from 'zod'
import { auth } from '@/lib/auth'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { generateObject } from 'ai'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import { habits } from '@/lib/db/schema'

// --- NEW: Updated Zod Schema for individual fields ---
const formSchema = z.object({
    role: z.string().min(1, 'Role cannot be empty.'),
    habit1: z.string().min(1, 'First habit/action cannot be empty.'),
    benefit: z.string().min(1, 'Benefit/reason cannot be empty.'),
    habit2: z.string().min(1, 'Second habit/action cannot be empty.'),
})

// Zod schema for the expected AI output structure (remains the same)
const habitSchema = z.object({
    name: z.string().describe('Concise name of the actionable habit.'),
    frequency: z
        .string()
        .optional()
        .describe(
            "Suggested frequency like 'daily', 'weekly', 'Mon, Wed, Fri'."
        ),
    description: z
        .string()
        .optional()
        .describe('Detailed description of the actionable habit.'),
})
const aiOutputSchema = z
    .array(habitSchema)
    .length(3, 'Expected exactly 3 habits.')

// --- NEW: Updated FormState to reflect new fields ---
export type FormState = {
    message: string
    errors?: {
        role?: string[]
        habit1?: string[]
        benefit?: string[]
        habit2?: string[]
        ai?: string[]
        database?: string[]
    }
    // Keep track of input fields for potential pre-filling on error
    fields?: {
        role?: string
        habit1?: string
        benefit?: string
        habit2?: string
    }
}

export async function createGoalsAction(
    prevState: FormState,
    formData: FormData
): Promise<FormState> {
    const session = await auth()

    if (!session?.user?.id) {
        return { message: 'Error: User not authenticated.' }
    }
    const userId = session.user.id

    // 1. Validate form input using the new schema
    const validatedFields = formSchema.safeParse({
        role: formData.get('role'),
        habit1: formData.get('habit1'),
        benefit: formData.get('benefit'),
        habit2: formData.get('habit2'),
    })

    if (!validatedFields.success) {
        // Return field values so the form can re-render them
        return {
            message: 'Error: Please fill in all fields.',
            errors: validatedFields.error.flatten().fieldErrors,
            fields: {
                role: (formData.get('role') as string) ?? '',
                habit1: (formData.get('habit1') as string) ?? '',
                benefit: (formData.get('benefit') as string) ?? '',
                habit2: (formData.get('habit2') as string) ?? '',
            },
        }
    }

    // --- NEW: Destructure validated data ---
    const { role, habit1, benefit, habit2 } = validatedFields.data

    try {
        // 2. Call AI - Construct the prompt from individual fields
        console.log('Calling AI...')
        const google = createGoogleGenerativeAI({
            apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
        })
        const model = google('models/gemini-2.0-flash')

        // --- NEW: Construct prompt from parts ---
        const userGoal = `As a ${role}, I hope to build habits for ${habit1} ${benefit} and ${habit2}.`
        const prompt = `Based on the user's goal: "${userGoal}", generate exactly 3 specific, actionable habits they can start building to achieve this. Focus on small, manageable steps. Output the result as a JSON array of objects, where each object strictly follows this structure: { "name": "habit name", "frequency": "suggested frequency" }.`

        console.log('Constructed Prompt:', prompt)

        const { object: generatedHabits } = await generateObject({
            model: model,
            schema: aiOutputSchema,
            prompt: prompt,
            mode: 'json',
        })

        console.log('AI Response:', generatedHabits)

        // 3. Prepare habits for database insertion (remains similar)
        const habitsToInsert = generatedHabits.map((h) => ({
            name: h.name,
            frequency: h.frequency,
            userId: userId,
            notes: h.description,
        }))

        // 4. Save habits to the database (remains similar)
        console.log('Inserting habits into DB:', habitsToInsert)
        await db.insert(habits).values(habitsToInsert)
        console.log('Habits inserted successfully.')
    } catch (error: any) {
        console.error('Error during goal creation:', error)
        // Return field values on error too
        const currentFields = {
            role: (formData.get('role') as string) ?? '',
            habit1: (formData.get('habit1') as string) ?? '',
            benefit: (formData.get('benefit') as string) ?? '',
            habit2: (formData.get('habit2') as string) ?? '',
        }
        if (error.message?.includes('rate limit')) {
            return {
                message: 'Error: AI service is busy. Please try again later.',
                errors: { ai: ['Rate limit exceeded.'] },
                fields: currentFields,
            }
        }
        return {
            message: `Error: Failed to generate or save habits. ${error.message || ''}`,
            errors: {
                ai: ['An unexpected error occurred.'],
                database: ['Failed to save habits.'],
            },
            fields: currentFields,
        }
    }

    // 5. Revalidate and Redirect (remains similar)
    revalidatePath('/plans')
    redirect('/plans?onboarding=success')
}
