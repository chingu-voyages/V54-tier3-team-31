import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import FocusTask from '@/components/focus/focus-task'

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
            <div className="mt-4 w-full space-y-4">
                {completions.map((completion) => (
                    <FocusTask
                        key={completion.id}
                        id={completion.id}
                        title={completion.name}
                        frequency={completion.frequency}
                        duration={completion.duration}
                        completed={true}
                        form={{} as any} // Pass an empty form or adapt as needed
                        onTaskComplete={() => {}}
                        onFrequencyChange={() => {}}
                        onDurationChange={() => {}}
                        onDeleteTask={() => {}}
                        onEditTask={() => {}}
                    />
                ))}
            </div>
        </div>
    )
}

export default HabitCompletions
