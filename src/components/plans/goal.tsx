"use client"

import React, { ReactNode } from "react";
import Task from "./task";

interface GoalProps {
  title: string;
  toggleIcon?: string;
  tasks: {
    title: string;
    difficultyIcon: ReactNode;
    difficultyText: string;
  }[];
  bestTimeTitle: string;
  bestTimeDescription: string;
}

const Goal: React.FC<GoalProps> = ({
  title,
  tasks,
  bestTimeTitle,
  bestTimeDescription,
}) => {
  return (
    <div className="flex w-full flex-col items-stretch mt-6 first:mt-0 border-b border-border pb-4">
      <div className="flex w-full items-center text-xl text-foreground font-semibold mb-2 justify-between">
        <div>{title}</div>
        <div className="text-muted-foreground">⋯</div>
      </div>
      <div className="w-full">
        {tasks.map((task, index) => (
          <Task
            key={index}
            title={task.title}
            difficultyIcon={task.difficultyIcon}
            difficultyText={task.difficultyText}
          />
        ))}
      </div>
      <div className="flex items-center gap-1.5 text-sm text-foreground font-medium my-2">
        <span className="text-sm text-muted-foreground">+</span>
        <div className="text-muted-foreground">add</div>
      </div>
      <div className="items-stretch bg-muted flex w-full flex-col text-sm justify-center p-3 rounded-md">
        <div className="w-full">
          <div className="text-foreground font-medium leading-none">
            {bestTimeTitle}
          </div>
          <div className="text-muted-foreground font-normal leading-5 mt-1">
            {bestTimeDescription}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Goal;