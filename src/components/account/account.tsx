import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { auth } from '@/lib/auth'
import { signInAction, signOutAction } from '@/lib/auth.actions.ts'

const Account: React.FC = async () => {
    const session = await auth()

    const teamMembers = [
        {
            name: 'Abishek',
            role: 'Developer',
            email: 'abishekvendrenan@gmail.com',
            icon: 'abi-icon.png',
        },
        {
            name: 'Jericho',
            role: 'Developer',
            email: 'serranojerichowenzel@gmail.com',
            icon: 'jer-icon.png',
        },
        {
            name: 'Thea Win',
            role: 'Developer',
            email: 'mstheawin@gmail.com',
            icon: 'thea-icon.png',
        },
        {
            name: 'Sophie',
            role: 'Product Designer',
            email: 'hello.sophieljang@gmail.com',
            icon: 'sophie-icon.png',
        },
    ]

    return (
        <div className="min-h-screen flex flex-col px-[15px] md:px-0 pb-16 md:pb-0 md:max-w-3xl md:mx-auto md:w-full pt-4 md:pt-8 ">
            {/* Login/Logout Section */}
            <Card className="mt-8 bg-neutral-900 rounded-[6px] border-neutral-700 border py-6 px-6 md:px-3">
                <CardContent className="px-0 flex flex-col gap-3">
                    {session?.user ? (
                        // Logout Section
                        <>
                            <div className="flex items-center gap-3 py-[1.5px]">
                                <Image
                                    src={
                                        session?.user?.image ||
                                        '/profile.jpeg'
                                    }
                                    alt="Avatar"
                                    width={43}
                                    height={43}
                                    className="rounded-full bg-zinc-50"
                                />
                                <div className="flex flex-col gap-0.5 font-medium ">
                                    <p className="text-gray-50 text-sm">
                                        {session?.user?.name || 'User'}
                                    </p>
                                    <p className="text-neutral-400 text-xs">
                                        {session?.user?.email || 'No email'}
                                    </p>
                                </div>
                            </div>
                            <form action={signOutAction}>
                                <Button
                                    type="submit"
                                    className="rounded-[6px] text-neutral-50 font-medium text-sm border-neutral-700 border bg-neutral-900 w-full"
                                >
                                    Logout
                                </Button>
                            </form>
                        </>
                    ) : (
                        // Login Section
                        <>
                            <h2 className="text-xl leading-7 font-semibold ">
                                Log in to GoalFlow
                                <br />
                                to save and track your goals seamlessly
                            </h2>
                            <p className="text-neutral-400 text-sm leading-5">
                                Access your progress anytime and stay on top of
                                your achievements!
                            </p>
                            <form action={signInAction}>
                                <Button
                                    type="submit"
                                    className="rounded-[6px] text-zinc-900 font-medium text-sm w-full"
                                >
                                    Login with Google
                                </Button>
                            </form>
                        </>
                    )}
                </CardContent>
            </Card>

            {/* Team Members Section */}
            <Card className="mt-8 bg-neutral-900 rounded-[6px] border-neutral-700 border py-6 px-6 md:px-3">
                <CardContent className="px-0">
                    <h2 className="font-bold text-sm font-mono ">
                        Meet the GoalFlow Team
                    </h2>
                    <div className="pt-6 flex flex-col gap-2">
                        {teamMembers.map((member) => (
                            <div
                                key={member.email}
                                className="flex items-center gap-3 py-[1.5px]"
                            >
                                <Image
                                    src={`/${member.icon}`}
                                    alt="Avatar"
                                    width={43}
                                    height={43}
                                    className="rounded-full bg-zinc-50"
                                />
                                <div className="flex flex-col gap-0.5 font-medium ">
                                    <p className="text-gray-50 text-sm">
                                        {member.name} x {member.role}
                                    </p>
                                    <p className="text-neutral-400 text-xs">
                                        {member.email}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Account
