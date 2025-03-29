'use client'

import React, {
    useState,
    useTransition,
    useEffect,
    useActionState,
} from 'react'
import { useFormStatus } from 'react-dom'
import { type Session } from 'next-auth'
import { useRouter, useSearchParams } from 'next/navigation'
import { createGoalsAction, type FormState } from '../actions'
// Remove Textarea import if not used elsewhere
// import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button' // Keep Button

// Initial state (adjust field names)
const initialState: FormState = {
    message: '',
    fields: {
        role: 'remote engineer',
        habit1: 'exercising',
        benefit: 'to get healthier',
        habit2: 'sleeping early',
    },
}

// SubmitButton remains the same
function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <Button
            type="submit"
            disabled={pending}
            className="cursor-pointer w-full bg-white text-black hover:bg-neutral-200 disabled:opacity-50 mt-8" // Added margin top
            aria-disabled={pending}
        >
            {pending ? 'Generating Habits...' : 'Create Tasks'}
        </Button>
    )
}

interface OnboardingFormProps {
    session: Session | null
}

export default function OnboardingForm({ session }: OnboardingFormProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [state, formAction] = useActionState(createGoalsAction, initialState)
    const [isPending, startTransition] = useTransition()

    // --- NEW: State for each input field ---
    // Initialize with default values or values from the state if form submission failed
    const [role, setRole] = useState(
        state?.fields?.role ?? initialState.fields?.role ?? ''
    )
    const [habit1, setHabit1] = useState(
        state?.fields?.habit1 ?? initialState.fields?.habit1 ?? ''
    )
    const [benefit, setBenefit] = useState(
        state?.fields?.benefit ?? initialState.fields?.benefit ?? ''
    )
    const [habit2, setHabit2] = useState(
        state?.fields?.habit2 ?? initialState.fields?.habit2 ?? ''
    )

    // --- NEW: Effect to update local state if server action returns errors+fields ---
    useEffect(() => {
        if (state?.fields) {
            setRole(state.fields.role ?? '')
            setHabit1(state.fields.habit1 ?? '')
            setBenefit(state.fields.benefit ?? '')
            setHabit2(state.fields.habit2 ?? '')
        }
    }, [state?.fields])

    // --- NEW: Pre-fill from query params on initial load (after potential redirect) ---
    useEffect(() => {
        // Only run this logic once on initial mount if searchParams exist
        const initialRole = searchParams?.get('role')
        const initialHabit1 = searchParams?.get('habit1')
        const initialBenefit = searchParams?.get('benefit')
        const initialHabit2 = searchParams?.get('habit2')

        // Check if *any* param exists to avoid overwriting defaults unnecessarily
        if (initialRole || initialHabit1 || initialBenefit || initialHabit2) {
            setRole(
                initialRole
                    ? decodeURIComponent(initialRole)
                    : (initialState.fields?.role ?? '')
            )
            setHabit1(
                initialHabit1
                    ? decodeURIComponent(initialHabit1)
                    : (initialState.fields?.habit1 ?? '')
            )
            setBenefit(
                initialBenefit
                    ? decodeURIComponent(initialBenefit)
                    : (initialState.fields?.benefit ?? '')
            )
            setHabit2(
                initialHabit2
                    ? decodeURIComponent(initialHabit2)
                    : (initialState.fields?.habit2 ?? '')
            )

            // Optional: Clean the URL (only if you are sure this effect runs just once as intended)
            // router.replace('/onboarding', { scroll: false });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]) // Dependencies: only run when searchParams potentially change

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!session) {
            // --- NEW: Encode all fields for redirect ---
            const encodedRole = encodeURIComponent(role)
            const encodedHabit1 = encodeURIComponent(habit1)
            const encodedBenefit = encodeURIComponent(benefit)
            const encodedHabit2 = encodeURIComponent(habit2)
            const goalParams = `role=${encodedRole}&habit1=${encodedHabit1}&benefit=${encodedBenefit}&habit2=${encodedHabit2}`
            const callbackUrl = encodeURIComponent(`/onboarding?${goalParams}`)
            router.push(`/api/auth/signin?callbackUrl=${callbackUrl}`)
        } else {
            const formData = new FormData(event.currentTarget)
            // Add current state values to formData just before submitting
            // This ensures the action gets the latest values from the controlled inputs
            formData.set('role', role)
            formData.set('habit1', habit1)
            formData.set('benefit', benefit)
            formData.set('habit2', habit2)
            startTransition(() => {
                formAction(formData)
            })
        }
    }

    // Helper function for input styling
    const inputClasses =
        'bg-transparent border-none outline-none focus:ring-1 focus:ring-lime-300 focus:rounded-[2px] text-lime-400 font-semibold mx-1 px-1'

    const errorPrefixes = {
        ai: 'AI Error: ',
        database: 'Database Error: ',
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="text-center text-lg md:text-xl lg:text-2xl leading-relaxed md:leading-relaxed lg:leading-relaxed">
                {' '}
                <p>
                    <span className="text-neutral-500">As a </span>
                    <input
                        type="text"
                        name="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className={inputClasses}
                        style={{ width: `${(role.length || 15) * 0.8}ch` }} // Dynamic width based on content
                        aria-label="Your role or profession"
                        required
                    />
                    <span className="text-neutral-500">
                        , I hope to build habits for{' '}
                    </span>
                    <br className="md:hidden" />{' '}
                    <input
                        type="text"
                        name="habit1"
                        value={habit1}
                        onChange={(e) => setHabit1(e.target.value)}
                        className={inputClasses}
                        style={{ width: `${(habit1.length || 10) * 0.9}ch` }}
                        aria-label="First habit or action"
                        required
                    />
                    <input
                        type="text"
                        name="benefit"
                        value={benefit}
                        onChange={(e) => setBenefit(e.target.value)}
                        className={inputClasses}
                        style={{ width: `${(benefit.length || 15) * 0.8}ch` }}
                        aria-label="Benefit or reason for the habit"
                        required
                    />
                    <br className="md:hidden" />
                    <span className="text-neutral-500"> and </span>
                    <input
                        type="text"
                        name="habit2"
                        value={habit2}
                        onChange={(e) => setHabit2(e.target.value)}
                        className={inputClasses}
                        style={{ width: `${(habit2.length || 14) * 0.9}ch` }}
                        aria-label="Second habit or action"
                        required
                    />
                    <span className="text-neutral-500">.</span>{' '}
                </p>
            </div>

            {/* Display Form Errors/Messages (check for new field names) */}
            <div className="mt-4 text-center">
                {' '}
                {/* Container for messages */}
                {state?.message && !isPending && (
                    <p
                        className={`text-sm ${state.errors ? 'text-red-500' : 'text-green-500'}`}
                    >
                        {state.message}
                    </p>
                )}
                {!isPending && state?.errors && (
                    <>
                        {Object.keys(state.errors).map((key) => {
                            const fieldErrors = state.errors?.[key as keyof typeof state.errors]
                            const prefix = errorPrefixes[key as keyof typeof errorPrefixes] || ''

                            return fieldErrors ? ( // Render only if errors exist
                                <p key={key} className="text-sm text-red-500">
                                    {prefix}
                                    {Array.isArray(fieldErrors)
                                        ? fieldErrors.join(', ')
                                        : String(fieldErrors)}
                                </p>
                            ) : null
                        })}
                    </>
                )}
            </div>

            {/* Submit Button */}
            <SubmitButton />
        </form>
    )
}
