import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, CircleCheck, Circle, MoreHorizontal } from 'lucide-react'

interface HabitCompletionsProps {
    title: string
    completions: {
        id: number
        name: string
        frequency: string
        duration: string
    }[]
    onBack: () => void
}

const HabitCompletions: React.FC<HabitCompletionsProps> = ({
    title,
    completions,
    onBack,
}) => {
    return (
        <div className="min-h-screen flex flex-col pb-16 md:pb-0 md:max-w-3xl md:mx-auto md:w-full pt-4 md:pt-8">
            {/* Back Button */}
            <Button
                onClick={onBack}
                variant="link"
                size="icon"
                className="justify-start hover:no-underline px-0 hover:cursor-pointer gap-5 mb-2"
            >
                <ArrowLeft className="!w-6 !h-6" />
                <h3 className="text-2xl font-semibold">Habit completions</h3>
            </Button>
            {/* Task details */}
            <h4 className="mt-4 text-xl font-semibold">{title}</h4>
            <div className="mt-4 w-full space-y-1">
                {completions.map((completion) => (
                    <Card
                        key={completion.id}
                        className="border-b-[1px] rounded-none mb-2 bg-neutral-900 min-h-[72px] pt-0 pb-3"
                    >
                        <div className="w-full">
                            <div className="flex w-full items-center gap-1.5 text-base text-foreground font-medium">
                                {/* To do: Clickable to mark it as uncomplete */}
                                <CircleCheck className="text-background fill-lime-400" />
                                <div className="self-stretch my-auto text-neutral-100 text-base font-normal">
                                    {completion.name}
                                </div>
                            </div>
                            <div className="flex w-full items-center text-xs text-foreground font-medium justify-between mt-3">
                                <div className="self-stretch flex items-center gap-4 my-auto">
                                    <div className="self-stretch border border-border bg-background whitespace-nowrap my-auto px-3 py-1 rounded-md border-solid">
                                        {completion.frequency}
                                    </div>
                                    <div className="self-stretch border border-border bg-background -ml-2 whitespace-nowrap my-auto px-3 py-1 rounded-md border-solid">
                                        {completion.duration}
                                    </div>
                                </div>
                                {/* To do: Delete dropdown */}
                                <Button
                                    variant="ghost"
                                    className="self-stretch flex items-center gap-1 whitespace-nowrap my-auto"
                                >
                                    <MoreHorizontal />
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default HabitCompletions
