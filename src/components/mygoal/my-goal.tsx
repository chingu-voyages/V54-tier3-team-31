"use client";

import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import TextareaAutosize from 'react-textarea-autosize'; // Import the autosize component
import { generateGoalsFromInput } from "@/app/(protected)/app/actions";
import { saveGoalsToLocal, getAllGoalsFromLocal } from "@/lib/localforage";
import { useRouter } from "next/navigation";
import {motion} from 'motion/react'
import { Textarea } from "../ui/textarea";

const goalSchema = z.object({
  goal: z.string().min(1, "Please enter your goal."),
});

type GoalFormValues = z.infer<typeof goalSchema>;

export default function MyGoalPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<GoalFormValues>({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      goal: "As a remote engineer, I hope to build habits for exercising to get healthier and sleeping early",
    },
  });
  const router = useRouter();

  const onSubmit = async (data: GoalFormValues) => {
    try {
      setIsLoading(true);
      const goalsWithTasks = await generateGoalsFromInput(data.goal)
      
      // Get existing goals to determine the next available ID
      const existingGoals = await getAllGoalsFromLocal();
      
      // Find the highest existing goal ID
      const maxExistingGoalId = existingGoals.reduce((max, goal) => 
        Math.max(max, goal.id), 0);
      
      // Find the highest existing task ID
      const maxExistingTaskId = existingGoals.reduce((max, goal) => 
        Math.max(max, ...goal.tasks.map(task => task.id)), 0);
      
      // Generate new unique IDs for goals and tasks
      const goalsWithUniqueIds = goalsWithTasks.map((goal, goalIndex) => {
        const newGoalId = maxExistingGoalId + goalIndex + 1;
        return {
          ...goal,
          id: newGoalId,
          tasks: goal.tasks.map((task, taskIndex) => ({
            ...task,
            id: maxExistingTaskId + (goalIndex * goal.tasks.length) + taskIndex + 1,
            goalId: newGoalId
          }))
        };
      });
      
      // Combine existing goals with new goals
      const combinedGoals = [...existingGoals, ...goalsWithUniqueIds];
      
      // Save the combined goals
      await saveGoalsToLocal(combinedGoals);
      router.push("plans");
    } catch (error) {
      console.error("Error generating goals:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 sm:px-6 md:px-8">
      <div className="w-full max-w-3xl">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="2" />
              <circle cx="16" cy="16" r="6" fill="currentColor" />
            </svg>
            <span className="ml-2 text-2xl font-bold text-white">GoalFlow</span>
          </div>

          <div className="mb-10 w-full text-center">
            <p className="text-base text-gray-400 md:text-lg">
              To customize your actionable plan, let us know more about your goals or the habits you want to build.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-8">
            <Controller
              name="goal"
              control={control}
              render={({ field }) => (
                <TextareaAutosize
                  {...field}
                  minRows={3} // Set a minimum number of rows if desired
                  className={cn(
                    // Base shadcn/ui textarea styles (adjust if your base styles differ)
                    "flex min-h-[80px] w-full rounded-md border border-none bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none  focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    // Your custom styles
                    "text-center text-2xl font-medium leading-tight text-white placeholder-gray-500 md:text-4xl md:leading-tight resize-none" // Added resize-none
                  )}
                  placeholder="As a [role], I hope to build habits for [goal] and [goal]"
                />
              )}
            />
            {errors.goal && <p className="text-red-500 text-sm">{errors.goal.message}</p>}

            <div className="flex flex-col items-center space-y-4">
              <Link href="/plans" passHref onClick={() => setIsCustomizing(true)}>
                <button
                  type="button"
                  className="flex items-center space-x-2 text-sm font-medium text-gray-400 hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487c.34-.34.574-.574.718-.698a2.25 2.25 0 1 1 3.182 3.182c-.124.144-.358.378-.698.718l-9.193 9.193a4.5 4.5 0 0 1-1.414.94l-3.11 1.244a.75.75 0 0 1-.976-.976l1.244-3.11a4.5 4.5 0 0 1 .94-1.414l9.193-9.193z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 12.75h.008v.008H19.5v-.008z"
                    />
                  </svg>
                  <span>Customize it myself</span>
                </button>
              </Link>

              <motion.div
                className="mt-6 w-full"
                
                initial={{ width: 'auto' }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.5 }}
              >
                <Button
                  type="submit"
                  className="h-14 w-full bg-white text-black text-base font-medium hover:bg-gray-200"
                  disabled={isLoading || isCustomizing}
                >
                  {isLoading ? "Creating Tasks..." : "Create Tasks"}
                </Button>
              </motion.div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
const AnimatedTextarea = ({ value, onChange }: { value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void }) => {
  const [displayText, setDisplayText] = useState('');
  const words = value.split(' ');
  
  useEffect(() => {
    // Only run on initial render
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < words.length) {
        setDisplayText(prev => prev + ' ' + words[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100); // Adjust timing as needed

    return () => clearInterval(interval);
  }, []); // Empty dependency array means this only runs once on mount

  return (
    <Textarea
      value={displayText || value} // Use displayText for animation, fallback to value
      onChange={onChange}
      className="min-h-[100px]"
      placeholder="Enter your goal description..."
    />
  );
};


