'use client'

import React, { ReactNode } from 'react'
import { Star, Trash } from 'lucide-react'
import { Button } from '../ui/button'
import { DropdownMenuItem } from '../ui/dropdown-menu'
import ActionDropdown from '../ui/action-dropdown'

interface TaskProps {
    title: string
    difficultyIcon: ReactNode
    difficultyText: string
}

const Task: React.FC<TaskProps> = ({
    title,
    difficultyIcon,
    difficultyText,
}) => {
    return (
        <div className="w-full border-b border-border py-3">
            <div className="flex w-full items-center gap-2 text-base text-foreground font-medium">
                <Star strokeWidth={1.5} className="text-neutral-500" />
                <div className="self-stretch my-auto">{title}</div>
            </div>
            <div className="flex w-full items-center text-xs text-foreground font-medium justify-between mt-3">
                <div className="self-stretch flex items-center gap-4 my-auto">
                    <div className="self-stretch border border-border bg-background whitespace-nowrap my-auto px-3 py-1 rounded-md border-solid">
                        Once
                    </div>
                    <div className="self-stretch border border-border bg-background -ml-2 whitespace-nowrap my-auto px-3 py-1 rounded-md border-solid">
                        5 mins
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        className="flex items-center gap-1 whitespace-nowrap"
                    >
                        <div className="w-4 h-4 text-primary">
                            {difficultyIcon}
                        </div>
                        <div>{difficultyText}</div>
                    </Button>
                    <ActionDropdown iconSize={16}>
                        <DropdownMenuItem className="text-destructive">
                            <Trash className="mr-2 h-4 w-4 text-red-400" />
                            Delete
                        </DropdownMenuItem>
                    </ActionDropdown>
                </div>
            </div>
        </div>
    )
}

export default Task
