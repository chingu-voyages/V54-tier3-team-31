'use client'

import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'

const Account: React.FC = () => {
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
            <div>Login Section</div>
            <div>Waitlist</div>
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
