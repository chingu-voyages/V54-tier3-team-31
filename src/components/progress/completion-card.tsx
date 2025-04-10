/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { Card } from '@/components/ui/card'

interface CompletionCardProps {
    habitId: string
    title: string
    count: number
    completions: {
        id: number
        name: string
        frequency: string
        duration: string
    }[]
    onClick: () => void
}

const CompletionCard: React.FC<CompletionCardProps> = ({
    habitId,
    title,
    count,
    onClick,
}) => {
    return (
        <div onClick={onClick}>
            <Card className="mt-4 px-6 py-3 flex justify-between bg-neutral-800 rounded-md w-full md:w-[670px] min-h-[94px] hover:cursor-pointer">
                <span>{title}</span>
                <h2 className="text-3xl font-semibold">{count}</h2>
            </Card>
        </div>
    )
}

export default CompletionCard
