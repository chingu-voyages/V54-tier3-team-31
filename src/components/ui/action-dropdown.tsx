'use client'

import React, { ReactNode } from 'react'
import { MoreHorizontal } from 'lucide-react'
import { Button } from './button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from './dropdown-menu'

interface ActionDropdownProps {
    align?: 'start' | 'center' | 'end'
    children: ReactNode
    iconSize?: number
    className?: string
}

/**
 * A reusable action dropdown menu with the three dots icon
 */
const ActionDropdown: React.FC<ActionDropdownProps> = ({
    align = 'end',
    children,
    iconSize = 16,
    className = 'w-3xs',
}) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors cursor"
                >
                    <MoreHorizontal size={iconSize} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={align} className={className}>
                {children}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ActionDropdown 