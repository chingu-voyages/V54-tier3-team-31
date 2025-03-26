import { auth } from "@/lib/auth";
import { redirect } from 'next/navigation';

export default async function ProtectedLayout({
    children
}: {
    children: React.ReactNode
}) {

    return (
        <div>
            {children}
        </div>
    );
}