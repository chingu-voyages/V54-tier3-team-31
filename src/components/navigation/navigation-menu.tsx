'use client'

import {
    StretchHorizontal,
    StretchHorizontalIcon,
    Star,
    StarIcon,
    Sprout,
    SproutIcon,
    User,
    UserIcon,
} from 'lucide-react'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NavigationMenu: React.FC = () => {
    const pathname = usePathname()

    return (
        <div className="fixed bottom-0 left-0 right-0 border-t border-zinc-800 bg-navbar flex justify-around items-center py-3 px-4">
            <div className="flex flex-col items-center hover:cursor-pointer">
                <Link
                    href="/plans"
                    className={`flex items-center text-sm font-medium ${
                        pathname === '/plans' ? 'text-white' : 'text-zinc-400'
                    } hover:text-white transition-colors`}
                >
                    {pathname === '/plans' ? (
                        <StretchHorizontalIcon className="mr-2 h-6 w-6 text-white fill-white" />
                    ) : (
                        <StretchHorizontal className="mr-2 h-6 w-6" />
                    )}
                </Link>
            </div>
            <div className="flex flex-col items-center hover:cursor-pointer">
                <Link
                    href="/focus"
                    className={`flex items-center text-sm font-medium ${
                        pathname === '/focus' ? 'text-white' : 'text-zinc-400'
                    } hover:text-white transition-colors`}
                >
                    {pathname === '/focus' ? (
                        <StarIcon className="mr-2 h-6 w-6  text-white fill-white" />
                    ) : (
                        <Star className="mr-2 h-6 w-6" />
                    )}
                </Link>
            </div>
            <div className="flex flex-col items-center hover:cursor-pointer">
                <Link
                    href="/progress"
                    className={`flex items-center text-sm font-medium ${
                        pathname === '/progress'
                            ? 'text-white'
                            : 'text-zinc-400'
                    } hover:text-white transition-colors`}
                >
                    {pathname === '/progress' ? (
                        <SproutIcon className="mr-2 h-6 w-6 text-white fill-white" />
                    ) : (
                        <Sprout className="mr-2 h-6 w-6" />
                    )}
                </Link>
            </div>
            <div className="flex flex-col items-center hover:cursor-pointer">
                <Link
                    href="/account"
                    className={`flex items-center text-sm font-medium ${
                        pathname === '/account' ? 'text-white' : 'text-zinc-400'
                    } hover:text-white transition-colors`}
                >
                    {pathname === '/account' ? (
                        <UserIcon className="mr-2 h-6 w-6 text-white fill-white" />
                    ) : (
                        <User className="mr-2 h-6 w-6" />
                    )}
                </Link>
            </div>
        </div>
    )
}

export default NavigationMenu
