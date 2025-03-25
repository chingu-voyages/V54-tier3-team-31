"use client"

import React, { ReactNode } from "react";

interface TaskProps {
  title: string;
  difficultyIcon: ReactNode;
  difficultyText: string;
}

const Task: React.FC<TaskProps> = ({
  title,
  difficultyIcon,
  difficultyText,
}) => {
  return (
    <div className="w-full border-b border-border py-3">
      <div className="flex w-full items-center gap-2 text-base text-foreground font-medium">
        <span className="text-xl text-muted-foreground">★</span>
        <div className="self-stretch my-auto">{title}</div>
      </div>
      <div className="flex w-full items-center text-xs text-foreground font-medium justify-between mt-3">
        <div className="self-stretch flex items-center gap-4 my-auto">
          <div className="self-stretch border border-border bg-background gap-2.5 whitespace-nowrap my-auto px-3 py-1 rounded-md border-solid">
            Once
          </div>
          <div className="self-stretch text-muted-foreground my-auto">5 mins</div>
        </div>
        <div className="self-stretch flex items-center gap-1 whitespace-nowrap my-auto">
          <div className="w-4 h-4 text-primary">
            {difficultyIcon}
          </div>
          <div className="self-stretch my-auto">{difficultyText}</div>
          <div className="ml-2 text-muted-foreground">⋯</div>
        </div>
      </div>
    </div>
  );
};

export default Task;