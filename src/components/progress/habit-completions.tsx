import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, CircleCheck, Circle } from 'lucide-react'

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
        <div>
            <Button onClick={onBack}>
                <ArrowLeft /> Back to Progress
            </Button>
            <h2>{title}</h2>
            <div>
                {completions.map((completion) => (
                    <Card key={completion.id}>
                        <div>
                            <CircleCheck />
                            <span>{completion.name}</span>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default HabitCompletions
