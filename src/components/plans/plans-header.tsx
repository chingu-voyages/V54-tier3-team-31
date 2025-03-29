'use client'

import React from 'react'
import { Plus } from 'lucide-react'
import { Button } from '../ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export type DropdownAction = {
    name: string
    href: string | null
}

interface PlansHeaderProps {
    className?: string
    onAddTaskClick?: () => void
}

export const PlansHeader: React.FC<PlansHeaderProps> = ({
    className = '',
    onAddTaskClick,
}) => {
    const pathname = usePathname()

    const dropDownActions: DropdownAction[] = [
        {
            name: 'Add a Task',
            href: null,
        },
        {
            name: 'Add a Goal and Tasks',
            href: '/add-goal-and-tasks',
        },
        {
            name: 'Add Plans Based on My Goal',
            href: '/add-plans-ai',
        },
    ]

    return (
        <div className={`flex items-center justify-between ${className}`}>
            <h1 className="text-2xl font-semibold">Plans</h1>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center">
                        <Plus size={16} className="md:w-5 md:h-5" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {dropDownActions.map((item) => (
                        <DropdownMenuItem
                            key={item.name}
                            onClick={() => {
                                if (
                                    item.name === 'Add a Task' &&
                                    onAddTaskClick
                                ) {
                                    onAddTaskClick()
                                }
                            }}
                        >
                            {item.href ? (
                                <Link
                                    href={item.href}
                                    className={`flex w-full items-center ${pathname === item.href ? 'bg-muted' : ''}`}
                                >
                                    {item.name}
                                </Link>
                            ) : (
                                <Button
                                    variant="ghost"
                                    className="p-0 m-0 h-auto"
                                >
                                    {item.name}
                                </Button>
                            )}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default PlansHeader
