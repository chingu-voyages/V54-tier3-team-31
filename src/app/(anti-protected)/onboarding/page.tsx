// app/onboarding/page.tsx
import OnboardingForm from './_components/OnboardingForm'
import { auth } from '@/lib/auth' // Adjust path if needed

export default async function OnboardingPage() {
    const session = await auth()
    // For simplicity, we'll handle potential prefill within the client component if needed.
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-8">
            <div className="text-center max-w-2xl">
                {/* You can replace this with an actual logo component */}
                <div className="mb-4 text-2xl font-bold">◎ GoalFlow</div>

                <p className="mb-8 text-neutral-400">
                    To customize your actionable plan, let us know more about
                    your goals or the habits you want to build.
                </p>

                {/* Pass session to the client component */}
                <OnboardingForm session={session} />
            </div>
        </div>
    )
}
