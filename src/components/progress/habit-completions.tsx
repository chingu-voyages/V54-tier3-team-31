import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import FocusTask from '@/components/focus/focus-task'
import { useTaskManagement } from '@/hooks/useTaskManagement'
import { useGoalManagement } from '@/hooks/useGoalManagement'

interface HabitCompletionsProps {
    id: string
    title: string
    goalId: number | null
    completions: {
        id: number
        name: string
        goalId: number | null
        frequency: string
        duration: string
        completed: boolean
        completedAt: Date | null
    }[]
    onBack: () => void
}

const HabitCompletions: React.FC<HabitCompletionsProps> = ({
    title,
    completions,
    onBack,
}) => {
    const { goals, refreshGoals } = useGoalManagement()
    const { planTasks, updateTaskCompletion } = useTaskManagement(refreshGoals)

    const handleTaskComplete = async (taskId: number, completed: boolean) => {
        console.log(`Toggling task ${taskId} to completed: ${completed}`)
        const task = [...planTasks, ...goals.flatMap((g) => g.tasks)].find(
            (t) => t.id === taskId
        )

        if (!task) {
            console.error('Task not found for completion update:', taskId)
            return
        }

        try {
            await updateTaskCompletion(
                taskId,
                completed,
                task.goalId || undefined
            )
        } catch (error) {
            console.error('Error updating task completion:', error)
        }
    }

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
                        completed={completion.completed}
                        form={{} as never}
                        onTaskComplete={() => {
                            console.log(
                                'Clicked to toggle:',
                                completion.id,
                                !completion.completed
                            )
                            handleTaskComplete(
                                completion.id,
                                !completion.completed
                            )
                        }}
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
