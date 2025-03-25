import { auth } from "@/lib/auth";
// import { db } from "@/lib/db";
import { redirect } from 'next/navigation';

export default async function ProtectedLayout({
    children
}: {
    children: React.ReactNode
}) {
    const session = await auth();
    if (!session) redirect('/');
    // const user = await db.query.habits.findMany({
    //     where: (habit, { eq }) => eq(habit.userId, session.user!.id!)
    // });
    // TODO: Check if the user has been onboarded, else always redirect to /onboarding

    return (
        <div>
            {children}
        </div>
    );
}